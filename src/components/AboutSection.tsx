import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, animate, motion, useInView } from 'framer-motion';
import { GraduationCap, Award, MapPin, Languages } from 'lucide-react';
import FadeIn from './FadeIn';
import SectionHeader from './SectionHeader';
import { useDubaiTime } from '../lib/useDubaiTime';

const ABOUT_TEXT =
  "I'm an AI Engineer based in Dubai, specialising in production Generative AI, agentic LLM systems and financial automation on Microsoft Azure. At Alpago Group, I work directly with the CEO building an agentic AI financial intelligence platform: FinanceGPT, a conversational advisor that turns raw bank statements into cash-flow forecasts and real-time advice, and a Corporate Finance Module that runs contract payments, check monitoring and month-end reporting. B.Tech from NIT Delhi (ECE, 2024). Pursuing an MBA in AI for Business at BITS Pilani Dubai (2026–2028).";

const STATS = [
  { value: 7, suffix: '', label: 'AI & finance projects' },
  { value: 5, suffix: '', label: 'Core tech domains' },
  { value: 4, suffix: '', label: 'Certifications' },
  { value: 2000, suffix: '+', label: 'Professional connections' },
];

const EDUCATION = [
  { school: 'BITS Pilani — Dubai Campus', degree: 'MBA in AI for Business', years: '2026 – 2028', note: 'In progress' },
  { school: 'NIT Delhi', degree: 'B.Tech, Electronics & Communication', years: '2020 – 2024' },
];

const CERTS = [
  { org: 'Microsoft', name: 'Fabric Analytics Engineer' },
  { org: 'Microsoft', name: 'Security Operations Analyst (SC-200)' },
  { org: 'NVIDIA', name: 'Prompt Engineering with LLaMA-2' },
  { org: 'NVIDIA', name: 'Deploying RAG Pipelines for Production at Scale' },
];

const LANGUAGES = [
  { name: 'English', level: 'Fluent', dots: 4 },
  { name: 'Telugu', level: 'Native', dots: 4 },
  { name: 'Hindi', level: 'Fluent', dots: 4 },
  { name: 'Arabic', level: 'Basic', dots: 1 },
];

const SKILLS = [
  { label: 'AI / LLMs / GenAI', items: ['GPT-4o', 'LLaMA', 'BERT', 'LangChain', 'RAG', 'Agentic AI', 'Prompt Engineering', 'Fine-Tuning', 'Azure OpenAI', 'Hugging Face'] },
  { label: 'ML & Deep Learning', items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'LSTM', 'Transformers', 'Hybrid ML', 'ARIMA', 'Anomaly Detection'] },
  { label: 'Software', items: ['.NET C#', 'React', 'JavaScript', 'FastAPI', 'Flask', 'REST APIs', 'Transactional DB Design'] },
  { label: 'Data', items: ['Python', 'SQL Server', 'MySQL', 'ETL Pipelines', 'n8n', 'Azure Document Intelligence', 'Database Triggers'] },
  { label: 'Cloud, BI & MLOps', items: ['Microsoft Azure', 'Azure Cognitive Services', 'Power BI', 'DAX', 'MLflow', 'Docker', 'Kubernetes', 'CI/CD'] },
];

const Tile = ({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) => (
  <FadeIn delay={delay} y={30} className={className}>
    <div className="h-full rounded-[28px] border border-[var(--ink-10)] bg-[var(--surface-1)] p-6 sm:p-7 shadow-[var(--card-elevation)] transition-colors hover:border-[var(--ink-20)]">
      {children}
    </div>
  </FadeIn>
);

const TileLabel = ({ icon, children }: { icon?: ReactNode; children: ReactNode }) => (
  <p className="mb-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--ink-40)]">
    {icon}
    {children}
  </p>
);

const CountUp = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, { duration: value > 100 ? 1.6 : 1, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, value]);
  return (
    <span ref={ref}>
      {n.toLocaleString('en-US')}
      {suffix}
    </span>
  );
};

const Toolkit = () => {
  const [tab, setTab] = useState(0);
  return (
    <>
      <div className="no-scrollbar -mx-1 mb-5 flex gap-1.5 overflow-x-auto px-1" role="tablist" aria-label="Skill categories">
        {SKILLS.map((g, i) => (
          <button
            key={g.label}
            role="tab"
            aria-selected={tab === i}
            onClick={() => setTab(i)}
            className={`relative shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              tab === i ? 'text-white' : 'text-[var(--ink-55)] hover:text-[var(--ink-100)]'
            }`}
          >
            {tab === i && (
              <motion.span
                layoutId="toolkit-tab"
                className="absolute inset-0 rounded-full"
                style={{ background: 'var(--accent-gradient)' }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{g.label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="flex flex-wrap gap-2"
          role="tabpanel"
        >
          {SKILLS[tab].items.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="rounded-full border border-[var(--ink-15)] bg-[var(--ink-03)] px-3.5 py-1.5 text-sm text-[var(--ink-80)]"
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const AboutSection = () => {
  const time = useDubaiTime();

  return (
    <section id="about" className="relative w-full px-5 sm:px-8 py-24 sm:py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="01"
          label="About"
          title={
            <>
              AI that holds up
              <br />
              against <em className="text-gradient">real money.</em>
            </>
          }
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-6 lg:grid-cols-12">
          {/* bio */}
          <Tile className="col-span-2 md:col-span-6 lg:col-span-7">
            <TileLabel>Who I am</TileLabel>
            <p className="text-lg sm:text-xl leading-relaxed text-[var(--ink-80)]">{ABOUT_TEXT}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Works directly with the CEO', 'Finance-grade AI', 'Azure-native'].map((t) => (
                <span key={t} className="rounded-full bg-[var(--ink-05)] px-3 py-1 text-xs font-semibold text-[var(--ink-60)]">
                  {t}
                </span>
              ))}
            </div>
          </Tile>

          {/* portrait */}
          <FadeIn delay={0.1} y={30} className="col-span-2 md:col-span-3 md:row-span-2 lg:col-span-5 lg:row-span-1">
            <figure className="group relative h-full min-h-[380px] overflow-hidden rounded-[28px] border border-[var(--ink-10)]">
              <img
                src="/life/downtown-alpago.webp"
                alt="Ramani Dulipala in Downtown Dubai at night, with the Alpago sign lit behind"
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-6 pb-6 pt-20">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">Downtown Dubai</p>
                <p className="mt-1 font-display text-lg font-semibold leading-snug text-white">Building AI for finance at Alpago Group.</p>
              </figcaption>
            </figure>
          </FadeIn>

          {/* stats */}
          {STATS.map((s, i) => (
            <Tile key={s.label} delay={0.05 * i} className="col-span-1 md:col-span-3 lg:col-span-3">
              <p className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-[var(--ink-100)]">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-xs sm:text-sm text-[var(--ink-50)]">{s.label}</p>
            </Tile>
          ))}

          {/* education */}
          <Tile className="col-span-2 md:col-span-3 lg:col-span-5">
            <TileLabel icon={<GraduationCap size={14} />}>Education</TileLabel>
            <ol className="relative flex flex-col gap-6 border-l border-[var(--ink-15)] pl-5">
              {EDUCATION.map((e) => (
                <li key={e.school} className="relative">
                  <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full" style={{ background: 'var(--accent-gradient)' }} />
                  <p className="font-mono text-[11px] text-[var(--ink-40)]">
                    {e.years}
                    {e.note && <span className="ml-2 text-[var(--success)]">· {e.note}</span>}
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold text-[var(--ink-100)]">{e.school}</p>
                  <p className="text-sm text-[var(--ink-55)]">{e.degree}</p>
                </li>
              ))}
            </ol>
          </Tile>

          {/* certifications */}
          <Tile delay={0.05} className="col-span-2 md:col-span-3 lg:col-span-4">
            <TileLabel icon={<Award size={14} />}>Certifications</TileLabel>
            <ul className="flex flex-col divide-y divide-[var(--ink-10)]">
              {CERTS.map((c) => (
                <li key={c.name} className="flex items-baseline gap-3 py-2.5 first:pt-0 last:pb-0">
                  <span className="w-14 shrink-0 font-mono text-[10px] uppercase tracking-wider text-[var(--ink-40)]">{c.org}</span>
                  <span className="text-sm text-[var(--ink-80)]">{c.name}</span>
                </li>
              ))}
            </ul>
          </Tile>

          {/* location + live clock */}
          <Tile delay={0.1} className="col-span-2 md:col-span-3 lg:col-span-3">
            <TileLabel icon={<MapPin size={14} />}>Based in</TileLabel>
            <p className="font-display text-3xl font-bold text-[var(--ink-100)]">Dubai, UAE</p>
            <p className="mt-1 font-mono text-xs text-[var(--ink-40)]">25.20° N · 55.27° E</p>
            <div className="mt-6 flex items-end justify-between border-t border-[var(--ink-10)] pt-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--ink-40)]">Local time</p>
                <p className="font-display text-2xl font-semibold tabular-nums text-[var(--ink-100)]">{time}</p>
              </div>
              <span className="text-right text-xs text-[var(--ink-50)]">
                Remote-friendly
                <br />
                GCC & global
              </span>
            </div>
          </Tile>

          {/* languages */}
          <Tile className="col-span-2 md:col-span-3 lg:col-span-4">
            <TileLabel icon={<Languages size={14} />}>Languages</TileLabel>
            <ul className="flex flex-col gap-3">
              {LANGUAGES.map((l) => (
                <li key={l.name} className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-[var(--ink-90)]">{l.name}</span>
                  <span className="flex items-center gap-3">
                    <span className="text-xs text-[var(--ink-45)]">{l.level}</span>
                    <span className="flex gap-1" aria-hidden>
                      {[0, 1, 2, 3].map((d) => (
                        <span
                          key={d}
                          className="h-1.5 w-5 rounded-full"
                          style={{ background: d < l.dots ? 'var(--accent-gradient)' : 'var(--ink-10)' }}
                        />
                      ))}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Tile>

          {/* toolkit */}
          <Tile delay={0.05} className="col-span-2 md:col-span-6 lg:col-span-8">
            <TileLabel>Toolkit</TileLabel>
            <Toolkit />
          </Tile>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
