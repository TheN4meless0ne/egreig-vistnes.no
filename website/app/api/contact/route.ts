import { NextRequest, NextResponse } from "next/server";

// POST /api/contact
// Replaces the Flask contact route (SMTP with a password). Sends through
// Microsoft Graph sendMail as the noreply mailbox, using the
// "egreig-vistnes Website Mail" app registration. That app can only send as
// noreply: Mail.Send is granted through RBAC for Applications in Exchange
// Online, scoped to that one mailbox, and not in Entra.
//
// Rate limiting is done by the Vercel Firewall rule on this path
// (2 requests per 600 s per IP), so there is no limiter in here.

const LIMITS = { name: 200, email: 254, message: 2000 };
const TIMEOUT_MS = 10_000;
const GENERIC_ERROR = "Failed to send message. Please try again later.";

// Deliberately loose. The real check is whether the reply reaches anyone.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type MailConfig = {
    tenantId: string;
    clientId: string;
    clientSecret: string;
    sender: string;
    recipient: string;
};

function readConfig(): MailConfig | null {
    const config = {
        tenantId: process.env.EMAIL_SERVICE_TENANT_ID,
        clientId: process.env.EMAIL_SERVICE_CLIENT_ID,
        clientSecret: process.env.EMAIL_SERVICE_SECRET,
        sender: process.env.EMAIL_SERVICE_SENDER,
        recipient: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    };
    const missing = Object.entries(config)
        .filter(([, value]) => !value)
        .map(([key]) => key);
    if (missing.length > 0) {
        console.error(`Contact form is missing configuration: ${missing.join(", ")}`);
        return null;
    }
    return config as MailConfig;
}

// Best effort only: serverless instances come and go, so this saves a token
// request when the same instance handles several submissions in a row.
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(config: MailConfig): Promise<string> {
    if (cachedToken && cachedToken.expiresAt > Date.now()) {
        return cachedToken.value;
    }

    const res = await fetch(`https://login.microsoftonline.com/${config.tenantId}/oauth2/v2.0/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: config.clientId,
            client_secret: config.clientSecret,
            scope: "https://graph.microsoft.com/.default",
            grant_type: "client_credentials",
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error(`Token request failed with ${res.status}: ${await res.text()}`);
    }

    const data = (await res.json()) as { access_token: string; expires_in: number };
    // Renew a minute early so a token never expires mid-request.
    cachedToken = { value: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 };
    return data.access_token;
}

async function sendMail(config: MailConfig, name: string, email: string, message: string): Promise<void> {
    const token = await getAccessToken(config);

    const res = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(config.sender)}/sendMail`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            message: {
                subject: `New message from ${name}`,
                body: {
                    contentType: "Text",
                    content: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
                },
                toRecipients: [{ emailAddress: { address: config.recipient } }],
                replyTo: [{ emailAddress: { address: email, name } }],
            },
            saveToSentItems: false,
        }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
        cache: "no-store",
    });

    // Graph answers 202 Accepted with an empty body on success.
    if (res.status !== 202) {
        if (res.status === 401) cachedToken = null;
        throw new Error(`sendMail failed with ${res.status}: ${await res.text()}`);
    }
}

function field(body: Record<string, unknown>, key: keyof typeof LIMITS): string {
    const value = body[key];
    return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: NextRequest) {
    let body: Record<string, unknown>;
    try {
        const parsed = await request.json();
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
        body = parsed as Record<string, unknown>;
    } catch {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    // Line breaks in the name would end up in the subject line.
    const name = field(body, "name").replace(/[\r\n]+/g, " ");
    const email = field(body, "email");
    const message = field(body, "message");

    if (!name || !email || !message) {
        return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }
    if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
        return NextResponse.json({ error: "Input exceeds maximum length." }, { status: 400 });
    }
    if (!EMAIL_PATTERN.test(email)) {
        return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const config = readConfig();
    if (!config) {
        return NextResponse.json({ error: GENERIC_ERROR }, { status: 503 });
    }

    try {
        await sendMail(config, name, email, message);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact email failed:", error);
        return NextResponse.json({ error: GENERIC_ERROR }, { status: 502 });
    }
}
