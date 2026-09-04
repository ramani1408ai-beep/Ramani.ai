import { useState } from 'react';
import { Mail, Linkedin, Instagram, Send, CheckCircle, AlertCircle } from 'lucide-react';
import FadeIn from './FadeIn';
import { sendEnquiry, isEmailConfigured, CONTACT_EMAIL, LINKEDIN_URL, INSTAGRAM_URL } from '../lib/email';

const PROJECT_TYPES = [
  'Agentic AI / LLM System',
  'Financial AI Platform',
  'RAG & Document Intelligence',
  'MLOps & Deployment',
  'ML Model Development',
  'Other / Consultation',
];

type Status = 'idle' | 'sending' | 'success' | 'error' | 'unconfigured';

const QUICK_LINKS = [
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'in/ramani1408',
    href: LINKEDIN_URL,
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@_raman.ai',
    href: INSTAGRAM_URL,
  },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', projectType: '', budget: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailConfigured) {
      setStatus('unconfigured');
      return;
    }
    setStatus('sending');
    const result = await sendEnquiry({
      subject: `New Enquiry from ${form.name} — ${form.projectType || 'Portfolio Contact'}`,
      name: form.name,
      email: form.email,
      message: form.message,
      extra: { 'Project Type': form.projectType, Budget: form.budget },
    });
    if (result.ok) {
      setStatus('success');
      setForm({ name: '', email: '', projectType: '', budget: '', message: '' });
    } else {
      setStatus(result.reason === 'not_configured' ? 'unconfigured' : 'error');
    }
  };

  const inputClass =
    'w-full rounded-2xl border border-[var(--ink-15)] bg-[var(--surface-1)] px-5 py-3.5 text-sm text-[var(--ink-100)] placeholder-[var(--ink-30)] outline-none transition focus:border-[var(--accent-2)]/60 focus:bg-[var(--surface-focus)] hover:border-[var(--ink-25)]';

  return (
    <section
      id="contact"
      className="relative w-full bg-[var(--bg)] px-5 sm:px-8 md:px-10 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20"
    >
      {/* Heading */}
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Get in touch
        </h2>
      </FadeIn>

      <FadeIn delay={0.15} y={20}>
        <p
          className="text-center font-light uppercase tracking-widest text-[var(--ink-60)] mb-16 sm:mb-20"
          style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
        >
          Let's build something intelligent together
        </p>
      </FadeIn>

      <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">

        {/* LEFT — quick info */}
        <div className="lg:col-span-2 flex flex-col gap-6 justify-start pt-2">
          <FadeIn delay={0.1} y={30}>
            <div className="rounded-[28px] border border-[var(--ink-10)] bg-[var(--surface-1)] p-7 flex flex-col gap-5">
              <p className="text-xs font-medium uppercase tracking-widest text-[var(--ink-40)]">Based in</p>
              <p className="text-lg font-medium text-[var(--ink-100)]">Dubai, UAE 🇦🇪</p>
              <div className="border-t border-[var(--ink-10)] pt-5 flex flex-col gap-3">
                <p className="text-xs font-medium uppercase tracking-widest text-[var(--ink-40)]">Open to</p>
                {['Freelance Projects', 'AI Consulting', 'Remote Contracts', 'GCC & Global'].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span className="text-sm text-[var(--ink-80)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-3">
            {QUICK_LINKS.map((link, i) => {
              const Icon = link.icon;
              return (
                <FadeIn key={link.label} delay={0.2 + i * 0.1} y={20}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-[var(--ink-15)] bg-[var(--surface-1)] px-5 py-4 transition hover:border-[var(--ink-40)] hover:bg-[var(--surface-2)]"
                  >
                    <div className="rounded-full border border-[var(--ink-20)] p-2.5 group-hover:border-[var(--ink-50)] transition">
                      <Icon size={16} className="text-[var(--ink-100)]" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-[10px] uppercase tracking-widest text-[var(--ink-40)]">{link.label}</span>
                      <span className="text-sm text-[var(--ink-80)] truncate">{link.value}</span>
                    </div>
                  </a>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* RIGHT — contact form */}
        <FadeIn delay={0.2} y={30} className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="rounded-[32px] border border-[var(--ink-15)] bg-[var(--surface-1)] p-6 sm:p-8 flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-[var(--ink-40)]">Name *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-[var(--ink-40)]">Email *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-[var(--ink-40)]">Project Type</label>
                <select
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                  className={inputClass + ' cursor-pointer'}
                  style={{ appearance: 'none' }}
                >
                  <option value="" disabled>Select type…</option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-[var(--surface-1)]">{t}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-widest text-[var(--ink-40)]">Budget (USD)</label>
                <select
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className={inputClass + ' cursor-pointer'}
                  style={{ appearance: 'none' }}
                >
                  <option value="" disabled>Select range…</option>
                  {['< $1,000', '$1,000 – $5,000', '$5,000 – $15,000', '$15,000+', 'Open to discuss'].map((b) => (
                    <option key={b} value={b} className="bg-[var(--surface-1)]">{b}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest text-[var(--ink-40)]">Message *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Describe your project, goals, and timeline…"
                className={inputClass + ' resize-none'}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              className="mt-1 inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-white transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
              style={{
                background: 'linear-gradient(123deg,var(--accent-1) 7%,var(--accent-2) 37%,var(--accent-3) 72%,var(--accent-4) 100%)',
                boxShadow: '0px 4px 4px var(--accent-glow),4px 4px 12px var(--accent-3) inset',
                outline: '2px solid var(--accent-outline)',
                outlineOffset: '-3px',
              }}
            >
              {status === 'sending' ? (
                <>
                  <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                  Sending…
                </>
              ) : status === 'success' ? (
                <>
                  <CheckCircle size={15} strokeWidth={2.5} />
                  Message Sent!
                </>
              ) : (
                <>
                  <Send size={15} strokeWidth={2.5} />
                  Send Message
                </>
              )}
            </button>

            {/* Feedback messages */}
            {status === 'success' && (
              <div className="flex items-center gap-2.5 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3">
                <CheckCircle size={16} className="text-emerald-400 shrink-0" strokeWidth={2} />
                <p className="text-sm text-emerald-300">Thanks! I'll get back to you within 24 hours.</p>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center gap-2.5 rounded-2xl border border-red-400/20 bg-red-400/5 px-4 py-3">
                <AlertCircle size={16} className="text-red-400 shrink-0" strokeWidth={2} />
                <p className="text-sm text-red-300">Something went wrong. Please email me directly at {CONTACT_EMAIL}</p>
              </div>
            )}
            {status === 'unconfigured' && (
              <div className="flex items-center gap-2.5 rounded-2xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
                <AlertCircle size={16} className="text-amber-400 shrink-0" strokeWidth={2} />
                <p className="text-sm text-amber-300">Live sending isn't wired up yet — reach me directly at {CONTACT_EMAIL} for now.</p>
              </div>
            )}

            <p className="text-[10px] text-[var(--ink-25)] text-center">
              Your details are only used to respond to your enquiry.
            </p>
          </form>
        </FadeIn>
      </div>

      {/* Footer */}
      <FadeIn delay={0.4} y={20}>
        <div className="mx-auto mt-20 sm:mt-24 md:mt-28 flex max-w-5xl flex-col items-center gap-3 border-t border-[var(--ink-10)] pt-8 text-center sm:flex-row sm:justify-between">
          <span className="font-light uppercase tracking-widest text-[var(--ink-50)]" style={{ fontSize: 'clamp(0.7rem,1.1vw,0.9rem)' }}>
            © 2026 Ramani Dulipala
          </span>
          <span className="font-light uppercase tracking-widest text-[var(--ink-50)]" style={{ fontSize: 'clamp(0.7rem,1.1vw,0.9rem)' }}>
            AI Engineer · Dubai, UAE
          </span>
        </div>
      </FadeIn>
    </section>
  );
};

export default ContactSection;
