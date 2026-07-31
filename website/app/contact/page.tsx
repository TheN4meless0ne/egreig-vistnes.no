"use client";
import { ContactCard } from "../components/cards/parts/cards";
import MailIcon from "../components/parts/icon/mail";
import { useState } from "react";
import { CONTACT_EMAIL } from "../lib/config";

const MAX_MESSAGE_LENGTH = 2000;

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [error, setError] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("sending");
        setError("");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong.");
            setStatus("sent");
        } catch (err) {
            const message = err instanceof Error ? err.message : "Something went wrong.";
            setError(message);
            setStatus("error");
        }
    }

    function handleReset() {
        setForm({ name: "", email: "", message: "" });
        setStatus("idle");
        setError("");
    }

    return (
        <main className="flex-1 flex items-center px-6 py-10 mx-auto">
            <section className="bg-[color-mix(in_srgb,hsl(var(--secondary))_80%,#3b82f6_8%)] rounded-2xl p-10">
                <div className="grid md:grid-cols-2 gap-8 items-stretch h-80">
                    <div className="flex flex-col justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-widest font-mono mb-3">
                                Contact
                            </p>
                            <h1 className="text-3xl font-light mb-2">Let's talk</h1>
                            <p className="text-sm leading-relaxed">
                                Have a question or want to work together?
                                Drop me a message and I'll get back to you soon.
                            </p>
                        </div>
                        <div>
                            <ContactCard
                                icon={MailIcon}
                                label="Email"
                                link="mailto"
                                value={CONTACT_EMAIL}
                            />
                        </div>
                    </div>
                    <div className="bg-background border border-border/40 rounded-xl p-6 flex flex-col gap-4">
                        {status === "sent" ? (
                            <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                                <p className="text-sm font-medium">Message sent!</p>
                                <p className="text-xs">I'll get back to you soon.</p>
                                <button
                                    onClick={handleReset}
                                    className="text-xs text-blue-600 underline underline-offset-2"
                                >
                                    Send another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name" className="text-xs">Name</label>
                                    <input id="name" name="name" type="text" placeholder="Your name"
                                        value={form.name} onChange={handleChange} required
                                        className="text-sm bg-secondary border border-border rounded-lg px-3 py-2 outline-none focus:border-blue-500" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="email" className="text-xs">Email</label>
                                    <input id="email" name="email" type="email" placeholder="you@email.com"
                                        value={form.email} onChange={handleChange} required
                                        className="text-sm bg-secondary border border-border rounded-lg px-3 py-2 outline-none focus:border-blue-500" />
                                </div>
                                <div className="flex flex-col gap-1 flex-1">
                                    <label htmlFor="message" className="text-xs">Message</label>
                                    <textarea id="message" name="message" placeholder="What's on your mind?"
                                        value={form.message} onChange={handleChange} required
                                        maxLength={MAX_MESSAGE_LENGTH}
                                        className="flex-1 resize-none text-sm bg-secondary border border-border rounded-lg px-3 py-2 outline-none focus:border-blue-500" />
                                </div>
                                {status === "error" && (
                                    <p className="text-xs text-red-500">{error}</p>
                                )}
                                <button type="submit" disabled={status === "sending"}
                                    className="self-start text-sm font-medium bg-blue-300 hover:bg-blue-400 disabled:opacity-50 rounded-lg px-5 py-2.5 transition-colors">
                                    {status === "sending" ? "Sending…" : "Send message"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}