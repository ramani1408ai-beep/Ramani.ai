import { forwardRef, useState } from 'react';
import type { ComponentType } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import FadeIn from './FadeIn';
import SectionHeader from './SectionHeader';
import ProjectDetailModal from './ProjectDetailModal';
import FinanceGPTDemo from './prototypes/FinanceGPTDemo';
import ReconciliationDemo from './prototypes/ReconciliationDemo';
import MeetingIntelligenceDemo from './prototypes/MeetingIntelligenceDemo';
import DashboardDemo from './prototypes/DashboardDemo';
import TTSDemo from './prototypes/TTSDemo';
import SafetyDemo from './prototypes/SafetyDemo';
import CorporateFinanceDemo from './prototypes/CorporateFinanceDemo';

export interface ProjectData {
  number: string;
  category: string;
  name: string;
  description: string;
  stack: string[];
  Prototype?: ComponentType;
  /** A full, standalone click-through prototype for this project (opens in a new tab). */
  externalPrototype?: { url: string; label: string };
}

export const PROJECTS: ProjectData[] = [
  {
    number: '01',
    category: 'Alpago 2025',
    name: 'Finance GPT',
    description:
      "Built on LangChain + Azure OpenAI (GPT-40) with a RAG layer over the user's personal transaction history, enabling context-aware, real-time financial conversations. Integrated Hybrid ML models (LSTM + Transformer + collaborative filtering) that continuously learn individual user behaviour tracking spending habits, income cycles, and saving patterns.",
    stack: ['Azure OpenAI', 'LangChain', 'SMSC API', 'Azure Document Intelligence', 'LSTM', 'ARIMA', 'Python', 'FastAPI', 'PostgreSQL', 'Power BI'],
    Prototype: FinanceGPTDemo,
  },
  {
    number: '02',
    category: 'Alpago 2026',
    name: 'Corporate Finance & Contract Payments Management Module',
    description:
      'A centralised Corporate Finance Module that governs enterprise-wide spending, built around a contract payments management system and integrated check monitoring engines. Month-end management reports are generated and distributed automatically, removing manual reconciliation and speeding up executive decisions. Underneath, optimised transactional database architecture with advanced triggers and C# data models keeps ledger tracking and waterfall allocation accurate.',
    stack: ['.NET C#', 'SQL Server', 'Python', 'React', 'JavaScript', 'Automated Workflows', 'Power BI'],
    Prototype: CorporateFinanceDemo,
  },
  {
    number: '03',
    category: 'Alpago 2025',
    name: 'Financial Transaction Intelligence & Reconciliation Platform',
    description:
      'Real-time SMSC transaction capture pipeline with normalisation and enrichment using Azure Document Intelligence applied to uploaded bank statements. Automated reconciliation engine with Chart of Accounts mapping generates live Balance Sheet, Trial Balance, Income Statement, and Cash Flow reports with zero manual input.',
    stack: ['Azure Document Intelligence', 'SMSC API', 'Python', 'SQL', 'ETL Pipelines', 'Power BI', 'scikit-learn'],
    Prototype: ReconciliationDemo,
    externalPrototype: { url: '/prototypes/fms-demo/index.html?page=reconciliation', label: 'Launch Full FMS Prototype' },
  },
  {
    number: '04',
    category: 'Alpago 2025',
    name: 'AI Meeting Intelligence & Task Automation System',
    description:
      'Integrates with Fireflies.ai to ingest meeting recordings; an NLP + LLM pipeline auto-extracts structured tasks, key decisions, owners, and deadlines from transcripts. Extended with custom CEO-level workflow automation: strategic trip planning, initiative tracking, calendar-aware task scheduling, and priority-ranked smart reminders.',
    stack: ['Fireflies API', 'Azure OpenAI', 'LangChain', 'n8n', 'Python', 'REST APIs', 'Notion/Jira Integration'],
    Prototype: MeetingIntelligenceDemo,
  },
  {
    number: '05',
    category: 'Business Intelligence',
    name: 'Sales & Logistics Insights',
    description:
      'Architected an end-to-end Power BI reporting solution featuring robust star schema data modeling and automated ETL pipelines. Developed complex DAX measures for YTD sales performance, forecasting, and profitability analysis. Integrated logistics optimization metrics—including dispatch strategies, safety stock management, and inventory tracking—to transform raw retail and distribution data into actionable, real-time strategic insights.',
    stack: ['Power BI', 'DAX', 'Microsoft SQL Server', 'ETL', 'Data Modeling'],
    Prototype: DashboardDemo,
  },
  {
    number: '06',
    category: 'AI Project',
    name: 'Conversational AI Text-to-Speech (TTS) Synthesis',
    description:
      'End-to-end NLP + Deep Learning pipeline using Tacotron 2 for high-fidelity speech synthesis and LLaMA for context-aware text generation from SQL-stored content. Deployed via Flask REST API with inference acceleration and model optimisation for low-latency production use.',
    stack: ['PyTorch', 'TensorFlow', 'LLaMA', 'Tacotron 2', 'MySQL', 'Flask'],
    Prototype: TTSDemo,
  },
  {
    number: '07',
    category: '2024',
    name: 'AI-Driven Construction Safety Compliance on Azure',
    description:
      'Generative AI system on Microsoft Azure for real-time safety and regulatory compliance monitoring on construction sites, combining computer vision (object detection) with IoT sensor data fusion. Automated incident flagging and compliance reporting, reducing manual safety audits significantly.',
    stack: ['Azure ML', 'Cognitive Services', 'IoT Hub', 'TensorFlow', 'PyTorch', 'Python'],
    Prototype: SafetyDemo,
  },
];

type Filter = 'all' | 'alpago' | 'independent';
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'alpago', label: 'At Alpago' },
  { id: 'independent', label: 'Independent' },
];
const matches = (p: ProjectData, f: Filter) =>
  f === 'all' ? true : f === 'alpago' ? p.category.startsWith('Alpago') : !p.category.startsWith('Alpago');

// forwardRef: AnimatePresence's popLayout mode measures each card through a ref.
const ProjectCard = forwardRef<HTMLElement, { project: ProjectData; featured: boolean; span: string; onOpen: () => void }>(({ project, featured, span, onOpen }, ref) => {
  // feed the cursor position to the .spotlight gradient
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={onOpen}
      onMouseMove={onMove}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.name} prototype`}
      className={`spotlight group flex cursor-pointer flex-col gap-4 overflow-hidden rounded-[28px] border border-[var(--ink-12)] bg-[var(--surface-1)] p-6 sm:p-7 shadow-[var(--card-elevation)] outline-none transition-colors hover:border-[var(--ink-30)] focus-visible:border-[var(--accent-2)] ${span} ${featured ? 'lg:p-9' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="font-display font-extrabold leading-none text-transparent"
          style={{ fontSize: featured ? 'clamp(3rem, 6vw, 5.5rem)' : 'clamp(2.2rem, 4vw, 3rem)', WebkitTextStroke: '1.5px var(--ink-25)' }}
        >
          {project.number}
        </span>
        <span className="mt-1 shrink-0 rounded-full border border-[var(--ink-15)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--ink-50)]">
          {project.category}
        </span>
      </div>

      <h3
        className={`font-display font-bold leading-tight tracking-tight text-[var(--ink-100)] ${
          featured ? 'text-2xl sm:text-4xl' : 'text-lg sm:text-xl'
        }`}
      >
        {project.name}
      </h3>

      <p className={`flex-1 leading-relaxed text-[var(--ink-55)] ${featured ? 'text-base sm:text-lg line-clamp-6' : 'text-sm line-clamp-3'}`}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, featured ? 6 : 3).map((tag) => (
          <span key={tag} className="rounded-full border border-[var(--ink-12)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--ink-45)]">
            {tag}
          </span>
        ))}
        {project.stack.length > (featured ? 6 : 3) && (
          <span className="rounded-full border border-[var(--ink-12)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--ink-35)]">
            +{project.stack.length - (featured ? 6 : 3)}
          </span>
        )}
      </div>

      <div className="mt-1 flex items-center justify-between border-t border-[var(--ink-10)] pt-4">
        <span className="text-sm font-semibold text-[var(--ink-100)]">Open prototype</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--ink-15)] text-[var(--ink-100)] transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight size={16} />
        </span>
      </div>
    </motion.article>
  );
});
ProjectCard.displayName = 'ProjectCard';

const ProjectsSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  const visible = PROJECTS.map((p, i) => ({ p, i })).filter(({ p }) => matches(p, filter));

  // The first card is featured (two columns wide). Stretch the last card so no grid row is left with a hole.
  const spanFor = (k: number) => {
    const n = visible.length;
    const cls: string[] = [];
    if (k === 0 && n > 1) cls.push('md:col-span-2');
    const slotsMd = n + (n > 1 ? 1 : 0);
    const slotsLg = slotsMd;
    const last = k === n - 1 && k !== 0;
    if (last && slotsMd % 2 === 1) cls.push('md:col-span-2');
    if (last && slotsLg % 3 === 2) cls.push('lg:col-span-2');
    if (last && slotsLg % 3 === 1) cls.push('lg:col-span-3');
    if (last && slotsLg % 3 === 0 && slotsMd % 2 === 1) cls.push('lg:col-span-1');
    return cls.join(' ');
  };
  const openProject = openIndex === null ? null : PROJECTS[openIndex];
  const close = () => setOpenIndex(null);
  const prev = () => setOpenIndex((i) => (i === null ? null : (i - 1 + PROJECTS.length) % PROJECTS.length));
  const next = () => setOpenIndex((i) => (i === null ? null : (i + 1) % PROJECTS.length));

  return (
    <section id="projects" className="relative w-full px-5 sm:px-8 py-24 sm:py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between lg:gap-6">
          <SectionHeader
            index="04"
            label="Selected work"
            title={
              <>
                Things I&apos;ve
                <br />
                <em className="text-gradient">shipped.</em>
              </>
            }
            intro="Every card opens a live, interactive prototype — click around."
          />
          <FadeIn y={16} className="-mt-4 mb-10 lg:mt-0 lg:mb-20">
            <div className="inline-flex rounded-full border border-[var(--ink-12)] bg-[var(--surface-1)] p-1" role="tablist" aria-label="Filter projects">
              {FILTERS.map((f) => {
                const count = PROJECTS.filter((p) => matches(p, f.id)).length;
                return (
                  <button
                    key={f.id}
                    role="tab"
                    aria-selected={filter === f.id}
                    onClick={() => setFilter(f.id)}
                    className={`relative rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${
                      filter === f.id ? 'text-white' : 'text-[var(--ink-55)] hover:text-[var(--ink-100)]'
                    }`}
                  >
                    {filter === f.id && (
                      <motion.span
                        layoutId="project-filter"
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'var(--accent-gradient)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">
                      {f.label} <span className="opacity-60">{count}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </FadeIn>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map(({ p, i }, k) => (
              <ProjectCard key={p.number} project={p} featured={k === 0} span={spanFor(k)} onOpen={() => setOpenIndex(i)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectDetailModal project={openProject} onClose={close} onPrev={prev} onNext={next} />
    </section>
  );
};

export default ProjectsSection;
