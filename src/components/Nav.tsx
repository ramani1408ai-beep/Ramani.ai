import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Services', id: 'services' },
  { label: 'Projects', id: 'projects' },
  { label: 'Life', id: 'life' },
  { label: 'Contact', id: 'contact' },
];

/** Floating pill nav: highlights the section in view, collapses to a full-screen menu on mobile. */
const Nav = ({ onOpenResume }: { onOpenResume: () => void }) => {
  const [active, setActive] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* reading progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
        style={{ scaleX: progress, background: 'var(--accent-gradient)' }}
      />

      <header className="fixed inset-x-0 top-3 sm:top-4 z-50 px-3 sm:px-6">
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border px-2 py-2 pl-4 sm:pl-5 transition-all duration-300 ${
            scrolled || open
              ? 'border-[var(--ink-12)] glass shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          }`}
        >
          <a href="#top" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full font-display text-sm font-bold text-white"
              style={{ background: 'var(--accent-gradient)' }}
            >
              R
            </span>
            <span className="hidden sm:block font-display text-sm font-semibold tracking-tight text-[var(--ink-100)]">
              Ramani<span className="text-[var(--ink-40)]">.ai</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.id} className="relative">
                <a
                  href={`#${l.id}`}
                  className={`relative z-10 block rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                    active === l.id ? 'text-[var(--ink-100)]' : 'text-[var(--ink-50)] hover:text-[var(--ink-100)]'
                  }`}
                >
                  {l.label}
                </a>
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-[var(--ink-10)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <ThemeToggle />
            <button
              onClick={onOpenResume}
              className="hidden sm:inline-flex h-9 items-center rounded-full border border-[var(--ink-15)] px-4 text-[13px] font-medium text-[var(--ink-80)] transition hover:bg-[var(--ink-10)] hover:text-[var(--ink-100)]"
            >
              Resume
            </button>
            <a
              href="#contact"
              className="hidden sm:inline-flex h-9 items-center gap-1 rounded-full px-4 text-[13px] font-semibold text-white transition hover:scale-[1.03]"
              style={{ background: 'var(--accent-gradient)', boxShadow: 'var(--accent-shadow)' }}
            >
              Hire me <ArrowUpRight size={14} />
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ink-15)] text-[var(--ink-100)] lg:hidden"
            >
              {open ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </header>

      {/* mobile / tablet full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-[var(--bg)] px-6 pb-28 pt-28 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.35 }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-[var(--ink-10)] py-3 font-display text-4xl font-bold tracking-tight text-[var(--ink-100)]"
                  >
                    <span className="font-mono text-xs font-normal text-[var(--ink-40)]">0{i + 1}</span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setOpen(false);
                  onOpenResume();
                }}
                className="flex-1 rounded-full border border-[var(--ink-20)] py-3.5 text-sm font-semibold text-[var(--ink-100)]"
              >
                View resume
              </button>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full py-3.5 text-center text-sm font-semibold text-white"
                style={{ background: 'var(--accent-gradient)' }}
              >
                Hire me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
