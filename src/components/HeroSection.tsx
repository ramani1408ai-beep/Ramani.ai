import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, FileText, Volume2, VolumeX, Sparkles, Briefcase, Layers } from 'lucide-react';
import { useDubaiTime } from '../lib/useDubaiTime';

const ROLES = ['agentic AI systems.', 'financial copilots.', 'RAG pipelines.', 'MLOps that ships.'];

/** Types each role out, pauses, deletes it, moves to the next. */
function useTypewriter(words: string[]) {
  const [text, setText] = useState('');
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const done = !deleting && text === word;
    const cleared = deleting && text === '';
    const delay = done ? 1600 : cleared ? 250 : deleting ? 35 : 70;
    const t = window.setTimeout(() => {
      if (done) setDeleting(true);
      else if (cleared) {
        setDeleting(false);
        setI((n) => n + 1);
      } else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => window.clearTimeout(t);
  }, [text, deleting, i, words]);

  return text;
}

const Letters = ({ word, delay, gradient = false }: { word: string; delay: number; gradient?: boolean }) => {
  const chars = Array.from(word);
  return (
    <span className="inline-flex overflow-hidden pb-[0.08em]" aria-hidden>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ delay: delay + i * 0.035, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          className="inline-block"
          // Each letter shows its own slice of one continuous gradient: background-clip:text
          // on the parent doesn't paint through individually transformed children.
          style={
            gradient
              ? {
                  background: 'var(--accent-gradient)',
                  backgroundSize: `${chars.length * 100}% 100%`,
                  backgroundPosition: `${(i / Math.max(chars.length - 1, 1)) * 100}% 0`,
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }
              : undefined
          }
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
};

const FLOATING_CHIPS = [
  { Icon: Sparkles, text: 'FinanceGPT · GPT-4o + RAG', cls: '-left-6 top-16', delay: '0s' },
  { Icon: Briefcase, text: 'AI Engineer @ Alpago Group', cls: '-left-10 bottom-24', delay: '1.2s' },
  { Icon: Layers, text: '7 interactive prototypes', cls: '-right-6 top-1/2', delay: '2.4s' },
];

const HeroSection = ({ onOpenResume }: { onOpenResume: () => void }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const role = useTypewriter(ROLES);
  const time = useDubaiTime();

  // Re-mute the intro once the hero scrolls away, so audio never follows the visitor down the page.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current;
        if (!entry.isIntersecting && v && !v.muted) {
          v.muted = true;
          setMuted(true);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted) v.play().catch(() => undefined);
    setMuted(v.muted);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden px-5 sm:px-8 pt-28 pb-16 sm:pt-32"
    >
      {/* backdrop */}
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="aurora pointer-events-none -left-24 top-10 h-72 w-72 sm:h-96 sm:w-96" style={{ background: 'var(--accent-2)' }} />
      <div className="aurora pointer-events-none right-0 top-1/3 h-72 w-72 sm:h-[28rem] sm:w-[28rem]" style={{ background: 'var(--accent-3)', animationDelay: '-6s' }} />
      <div className="aurora pointer-events-none bottom-0 left-1/3 h-56 w-56 sm:h-80 sm:w-80" style={{ background: 'var(--accent-4)', animationDelay: '-12s', opacity: 0.2 }} />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* ── copy ── */}
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 flex flex-wrap items-center gap-2"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-[var(--success)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for freelance
            </span>
            <span className="inline-flex items-center rounded-full border border-[var(--ink-12)] px-3 py-1.5 font-mono text-[11px] text-[var(--ink-50)]">
              Dubai · {time} GST
            </span>
          </motion.div>

          <h1
            className="font-display font-extrabold leading-[0.9] tracking-[-0.03em] text-[var(--ink-100)]"
            style={{ fontSize: 'clamp(3.9rem, 11vw, 8.6rem)' }}
          >
            <span className="sr-only">Ramani Dulipala</span>
            <Letters word="Ramani" delay={0.1} />
            <br />
            <Letters word="Dulipala" delay={0.35} gradient />
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-6 min-h-[2.6em] text-2xl sm:text-3xl md:text-4xl leading-tight text-[var(--ink-60)]"
          >
            AI Engineer. I build{' '}
            <span className="caret font-serif italic text-[var(--ink-100)]">{role}</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.6 }}
            className="mt-4 max-w-lg text-base sm:text-lg leading-relaxed text-[var(--ink-50)]"
          >
            Production Generative AI on Microsoft Azure — turning raw financial data into answers executives can trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition hover:scale-[1.03]"
              style={{ background: 'var(--accent-gradient)', boxShadow: 'var(--accent-shadow)' }}
            >
              Start a project
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--ink-20)] px-7 py-3.5 text-sm font-semibold text-[var(--ink-100)] transition hover:bg-[var(--ink-05)]"
            >
              <FileText size={16} /> View resume
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-10 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--ink-40)]"
          >
            GenAI · Agentic AI · Azure · MLOps · Hybrid ML
          </motion.p>
        </div>

        {/* ── intro video, framed like a live agent window ── */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-[28px] border border-[var(--ink-12)] bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]">
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="aspect-[5/4] w-full object-cover sm:aspect-[4/3] lg:aspect-[4/5]"
            >
              <source src="/intro.mp4" type="video/mp4" />
            </video>

            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent px-4 pb-8 pt-3.5">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">ramani.ai / intro</span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-white/80">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" /> Live
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/75 to-transparent px-4 pb-4 pt-16">
              <div>
                <p className="font-display text-lg font-semibold text-white">Hi, I'm Ramani</p>
                <p className="text-xs text-white/60">AI Engineer · Dubai, UAE</p>
              </div>
              <button
                onClick={toggleMute}
                aria-label={muted ? 'Play intro with sound' : 'Mute intro'}
                className="flex shrink-0 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                {muted ? 'Tap for sound' : 'Sound on'}
              </button>
            </div>
          </div>

          {FLOATING_CHIPS.map(({ Icon, text, cls, delay }) => (
            <div
              key={text}
              className={`animate-bob glass absolute hidden items-center gap-2 rounded-full border border-[var(--ink-12)] px-3.5 py-2 text-xs font-semibold text-[var(--ink-90)] shadow-lg backdrop-blur-xl xl:flex ${cls}`}
              style={{ animationDelay: delay }}
            >
              <Icon size={13} className="text-[var(--accent-2)]" />
              {text}
            </div>
          ))}
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-40)]">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-[var(--ink-15)]">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-[var(--ink-60)]" style={{ animation: 'scrollLine 1.8s ease-in-out infinite' }} />
        </span>
        <style>{`@keyframes scrollLine { 0%{transform:translateY(-100%)} 100%{transform:translateY(200%)} }`}</style>
      </a>
    </section>
  );
};

export default HeroSection;
