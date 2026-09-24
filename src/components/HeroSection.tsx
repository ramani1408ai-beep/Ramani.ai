import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import FadeIn from './FadeIn';
import ResumeModal from './ResumeModal';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Life', href: '#life' },
  { label: 'Contact', href: '#contact' },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowSoundHint(false), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          const v = videoRef.current;
          if (v && !v.muted) { v.muted = true; setMuted(true); }
        }
      },
      { threshold: 0, rootMargin: '-50% 0px 0px 0px' }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let fired = false;
    const goToAbout = () => {
      if (fired) return;
      fired = true;
      const about = document.getElementById('about');
      if (about) about.scrollIntoView({ behavior: 'auto', block: 'start' });
    };
    const onWheel = (e: WheelEvent) => {
      if (fired || e.deltaY <= 0 || window.scrollY > 50) return;
      e.preventDefault();
      goToAbout();
    };
    const onKey = (e: KeyboardEvent) => {
      if (fired || window.scrollY > 50) return;
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); goToAbout(); }
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    setShowSoundHint(false);
  };

  return (
    <>
      <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">
        {/* ✅ Fixed: leading slash + correct public/ file */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

        <div className="relative z-10 flex h-full flex-col">
          {/* Nav */}
          <FadeIn delay={0} y={-20} className="relative z-20">
            <div className="flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8">
              {/* Desktop links */}
              <ul className="hidden sm:flex items-center gap-6 md:gap-12">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-white/80 transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md sm:hidden"
              >
                {menuOpen ? <X size={16} /> : <Menu size={16} />}
              </button>

              <div className="flex items-center gap-2 sm:gap-3">
                <ThemeToggle />
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 sm:px-5 sm:py-2.5 text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-[1.03]"
                >
                  Hire Me
                </a>
              </div>
            </div>

            {/* Mobile dropdown */}
            <AnimatePresence>
              {menuOpen && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mx-6 mt-3 flex flex-col gap-1 overflow-hidden rounded-2xl border border-white/15 bg-black/60 backdrop-blur-md sm:hidden"
                >
                  {NAV_LINKS.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="block px-5 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white/80 transition hover:bg-white/10 hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </FadeIn>

          {/* Hero content */}
          <div className="flex flex-1 items-center">
            <div className="w-full max-w-7xl px-6 md:px-10">
              {/* Available badge */}
              <FadeIn delay={0.2} y={20}>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 backdrop-blur-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.25em] text-emerald-300">
                    Available for Freelance
                  </span>
                </div>
              </FadeIn>

              <FadeIn delay={0.3} y={20}>
                <p className="mb-4 text-[10px] sm:text-xs font-medium uppercase tracking-[0.35em] text-white/60">
                  AI Engineer · Portfolio 2026
                </p>
              </FadeIn>

              <FadeIn delay={0.5} y={40}>
                <h1
                  className="font-black uppercase leading-[0.88] tracking-tight text-white"
                  style={{ fontSize: 'clamp(2.4rem, 10vw, 9rem)' }}
                >
                  Ramani<br />Dulipala
                </h1>
              </FadeIn>

              <FadeIn delay={0.85} y={20}>
                <p className="mt-5 md:mt-7 text-[10px] sm:text-xs md:text-sm font-medium uppercase tracking-[0.3em] text-white/75">
                  GenAI · Agentic AI · Azure · MLOps · Hybrid ML
                </p>
              </FadeIn>

              {/* CTA row */}
              <FadeIn delay={1.0} y={20}>
                <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center rounded-full px-7 py-3 text-xs sm:text-sm font-medium uppercase tracking-widest text-white transition hover:scale-[1.03]"
                    style={{
                      background: 'linear-gradient(123deg,var(--accent-1) 7%,var(--accent-2) 37%,var(--accent-3) 72%,var(--accent-4) 100%)',
                      boxShadow: '0px 4px 4px var(--accent-glow),4px 4px 12px var(--accent-3) inset',
                      outline: '2px solid var(--accent-outline)',
                      outlineOffset: '-3px',
                    }}
                  >
                    Start a Project
                  </a>
                  <button
                    onClick={() => setResumeOpen(true)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-xs sm:text-sm font-medium uppercase tracking-widest text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-[1.03]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                    </svg>
                    View Resume
                  </button>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex items-end justify-between px-6 md:px-10 pb-7 sm:pb-10 md:pb-12">
            <FadeIn delay={1.1} y={20}>
              <a href="#about" aria-label="Scroll" className="group flex flex-col items-center gap-3">
                <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.35em] text-white/70 group-hover:text-white transition">Scroll</span>
                <div className="relative h-12 w-px overflow-hidden bg-white/20">
                  <span className="absolute inset-x-0 top-0 h-1/2 w-full bg-white" style={{ animation: 'scrollLine 1.8s ease-in-out infinite' }} />
                </div>
              </a>
            </FadeIn>

            <FadeIn delay={1.1} y={20}>
              <div className="flex items-center gap-3">
                {showSoundHint && (
                  <span className="hidden sm:inline text-[10px] font-medium uppercase tracking-[0.25em] text-white/80" style={{ animation: 'pulseFade 2s ease-in-out infinite' }}>
                    Tap for sound
                  </span>
                )}
                <button onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'} className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 hover:scale-110">
                  {muted ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    </svg>
                  )}
                </button>
              </div>
            </FadeIn>
          </div>
        </div>

        <style>{`
          @keyframes scrollLine { 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }
          @keyframes pulseFade { 0%,100%{opacity:0.5} 50%{opacity:1} }
        `}</style>
      </section>

      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
};

export default HeroSection;
