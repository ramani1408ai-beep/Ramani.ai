// ─────────────────────────────────────────────────────────────────
//  Central email sender — used by the Contact form AND the Chatbot.
//
//  Powered by Web3Forms (https://web3forms.com) — a free service that
//  emails form submissions straight to your inbox with zero backend.
//
//  SETUP (one-time, ~1 minute):
//   1. Go to https://web3forms.com and enter the inbox email you want
//      submissions delivered to. You'll instantly get an Access Key.
//   2. Create a file named `.env` in the project root (same folder as
//      package.json) — it's already git-ignored — with:
//        VITE_WEB3FORMS_KEY=paste-your-access-key-here
//   3. Restart `npm run dev` (or rebuild) so Vite picks up the env var.
//
//  That access key is the ONLY parameter required to make both the
//  contact form and the chatbot's "email Ramani" fallback go live.
// ─────────────────────────────────────────────────────────────────

export const CONTACT_EMAIL = 'ramani1408.ai@gmail.com';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/ramani1408';
export const INSTAGRAM_URL = 'https://www.instagram.com/_raman.ai/';

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

export const isEmailConfigured = Boolean(ACCESS_KEY && ACCESS_KEY !== 'YOUR_WEB3FORMS_ACCESS_KEY');

export interface EnquiryPayload {
  subject: string;
  name?: string;
  email?: string;
  message: string;
  extra?: Record<string, string>;
}

export type SendResult = { ok: true } | { ok: false; reason: 'not_configured' | 'network' | 'rejected' };

/**
 * Sends an enquiry email to CONTACT_EMAIL via Web3Forms.
 * Fails soft with a typed reason instead of throwing, so callers can
 * show a friendly inline message.
 */
export async function sendEnquiry(payload: EnquiryPayload): Promise<SendResult> {
  if (!isEmailConfigured) {
    return { ok: false, reason: 'not_configured' };
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        to: CONTACT_EMAIL,
        subject: payload.subject,
        name: payload.name || 'Portfolio Visitor',
        email: payload.email || 'no-reply@portfolio.local',
        message: payload.message,
        ...payload.extra,
      }),
    });
    const data = await res.json();
    return data?.success ? { ok: true } : { ok: false, reason: 'rejected' };
  } catch {
    return { ok: false, reason: 'network' };
  }
}
