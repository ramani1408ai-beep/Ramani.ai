import { useState } from 'react';
import { Mail, Linkedin, Instagram, Send, CheckCircle, AlertCircle, ArrowUpRight, ArrowUp } from 'lucide-react';
import FadeIn from './FadeIn';
import SectionHeader from './SectionHeader';
import { NAV_LINKS } from './Nav';
import { useDubaiTime } from '../lib/useDubaiTime';
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
  const time = useDubaiTime();

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
    <section id="contact" className="relative w-full overflow-hidden px-5 sm:px-8 pt-24 sm:pt-28 md:pt-36 pb-10">
      <div className="aurora pointer-events-none -right-24 top-24 h-80 w-80" style={{ background: 'var(--accent-2)', opacity: 0.18 }} />
      <div className="relative mx-auto max-w-6xl">
      <SectionHeader
        index="06"
        label="Contact"
        title={
          <>
            Let&apos;s build something
            <br />
            <em className="text-gradient">intelligent.</em>
          </>
        }
        intro="Tell me what you're trying to automate, predict or understand — I'll reply within 24 hours."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-10">

        {/* LEFT — quick info */}
        <div className="lg:col-span-2 flex flex-col gap-6 justify-start pt-2">
          <FadeIn delay={0.1} y={30}>
            <div className="rounded-[28px] border border-[var(--ink-10)] bg-[var(--surface-1)] p-7 flex flex-col gap-5">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-[var(--success)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Taking new projects
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink-40)]">Based in</p>
                <p className="mt-1 font-display text-2xl font-bold text-[var(--ink-100)]">Dubai, UAE</p>
                <p className="font-mono text-xs text-[var(--ink-45)]">{time} GST · usually replies within 24h</p>
              </div>
              <div className="border-t border-[var(--ink-10)] pt-5 flex flex-col gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink-40)]">Open to</p>
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
                    <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-40)]">{link.label}</span>
                      <span className="text-sm font-semibold text-[var(--ink-90)] truncate">{link.value}</span>
                    </div>
                    <ArrowUpRight size={16} className="shrink-0 text-[var(--ink-40)] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--ink-100)]" />
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
            className="rounded-[28px] border border-[var(--ink-12)] bg-[var(--surface-1)] p-6 sm:p-8 flex flex-col gap-5 shadow-[var(--card-elevation)]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-45)]">Name *</label>
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
                <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-45)]">Email *</label>
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
                <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-45)]">Project Type</label>
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
                <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-45)]">Budget (USD)</label>
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
              <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-45)]">Message *</label>
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
              style={{ background: 'var(--accent-gradient)', boxShadow: 'var(--accent-shadow)' }}
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

      </div>

      {/* Footer */}
      <footer className="relative mx-auto mt-24 sm:mt-32 max-w-6xl border-t border-[var(--ink-10)] pt-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--ink-55)]">
            {NAV_LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="transition hover:text-[var(--ink-100)]">
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="#top"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--ink-15)] px-4 py-2 text-sm font-semibold text-[var(--ink-80)] transition hover:bg-[var(--ink-05)]"
          >
            Back to top <ArrowUp size={14} />
          </a>
        </div>
        <p
          className="text-fade mt-10 select-none whitespace-nowrap text-center font-display font-extrabold leading-none tracking-tighter"
          style={{ fontSize: 'clamp(3rem, 13.5vw, 12rem)' }}
          aria-hidden
        >
          RAMANI.AI
        </p>
        <div className="mt-6 flex flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink-40)] sm:flex-row sm:justify-between">
          <span>© 2026 Ramani Dulipala</span>
          <span>AI Engineer · Dubai, UAE · {time} GST</span>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
