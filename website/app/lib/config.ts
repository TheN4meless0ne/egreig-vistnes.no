export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
if (!CONTACT_EMAIL) throw new Error("NEXT_PUBLIC_CONTACT_EMAIL is not set");