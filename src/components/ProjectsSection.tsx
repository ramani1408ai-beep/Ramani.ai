import { useState } from 'react';
import type { ComponentType } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import FadeIn from './FadeIn';
import ProjectDetailModal from './ProjectDetailModal';
import FinanceGPTDemo from './prototypes/FinanceGPTDemo';
import ReconciliationDemo from './prototypes/ReconciliationDemo';
import MeetingIntelligenceDemo from './prototypes/MeetingIntelligenceDemo';
import DashboardDemo from './prototypes/DashboardDemo';
import TTSDemo from './prototypes/TTSDemo';
import SafetyDemo from './prototypes/SafetyDemo';

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
    category: 'Alpago 2025',
    name: 'Financial Transaction Intelligence & Reconciliation Platform',
    description:
      'Real-time SMSC transaction capture pipeline with normalisation and enrichment using Azure Document Intelligence applied to uploaded bank statements. Automated reconciliation engine with Chart of Accounts mapping generates live Balance Sheet, Trial Balance, Income Statement, and Cash Flow reports with zero manual input.',
    stack: ['Azure Document Intelligence', 'SMSC API', 'Python', 'SQL', 'ETL Pipelines', 'Power BI', 'scikit-learn'],
    Prototype: ReconciliationDemo,
    externalPrototype: { url: '/prototypes/fms-demo/index.html?page=reconciliation', label: 'Launch Full FMS Prototype' },
  },
  {
    number: '03',
    category: 'Alpago 2025',
    name: 'AI Meeting Intelligence & Task Automation System',
    description:
      'Integrates with Fireflies.ai to ingest meeting recordings; an NLP + LLM pipeline auto-extracts structured tasks, key decisions, owners, and deadlines from transcripts. Extended with custom CEO-level workflow automation: strategic trip planning, initiative tracking, calendar-aware task scheduling, and priority-ranked smart reminders.',
    stack: ['Fireflies API', 'Azure OpenAI', 'LangChain', 'n8n', 'Python', 'REST APIs', 'Notion/Jira Integration'],
    Prototype: MeetingIntelligenceDemo,
  },
  {
    number: '04',
    category: 'Business Intelligence',
    name: 'Sales & Logistics Insights',
    description:
      'Architected an end-to-end Power BI reporting solution featuring robust star schema data modeling and automated ETL pipelines. Developed complex DAX measures for YTD sales performance, forecasting, and profitability analysis. Integrated logistics optimization metrics—including dispatch strategies, safety stock management, and inventory tracking—to transform raw retail and distribution data into actionable, real-time strategic insights.',
    stack: ['Power BI', 'DAX', 'Microsoft SQL Server', 'ETL', 'Data Modeling'],
    Prototype: DashboardDemo,
  },
  {
    number: '05',
    category: 'AI Project',
    name: 'Conversational AI Text-to-Speech (TTS) Synthesis',
    description:
      'End-to-end NLP + Deep Learning pipeline using Tacotron 2 for high-fidelity speech synthesis and LLaMA for context-aware text generation from SQL-stored content. Deployed via Flask REST API with inference acceleration and model optimisation for low-latency production use.',
    stack: ['PyTorch', 'TensorFlow', 'LLaMA', 'Tacotron 2', 'MySQL', 'Flask'],
    Prototype: TTSDemo,
  },
  {
    number: '06',
    category: '2024',
    name: 'AI-Driven Construction Safety Compliance on Azure',
    description:
      'Generative AI system on Microsoft Azure for real-time safety and regulatory compliance monitoring on construction sites, combining computer vision (object detection) with IoT sensor data fusion. Automated incident flagging and compliance reporting, reducing manual safety audits significantly.',
    stack: ['Azure ML', 'Cognitive Services', 'IoT Hub', 'TensorFlow', 'PyTorch', 'Python'],
    Prototype: SafetyDemo,
  },
];

const ProjectCard = ({ project, index, onOpen }: { project: ProjectData; index: number; onOpen: () => void }) => (
  <FadeIn delay={index * 0.08} y={30}>
    <motion.article
      onClick={onOpen}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group flex h-full cursor-pointer flex-col gap-4 rounded-[28px] border border-[var(--ink-12)] bg-[var(--surface-1)] p-6 sm:p-7 shadow-[var(--card-elevation)] transition-colors hover:border-[var(--accent-2)]/45"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-black leading-none text-[var(--ink-15)]" style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)' }}>
          {project.number}
        </span>
        <span className="mt-1 shrink-0 rounded-full border border-[var(--ink-15)] px-2.5 py-1 text-[9px] font-medium uppercase tracking-widest text-[var(--ink-45)]">
          {project.category}
        </span>
      </div>

      <h3 className="text-base sm:text-lg font-medium uppercase leading-snug text-[var(--ink-100)]">{project.name}</h3>

      <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-[var(--ink-55)]">{project.description}</p>

      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full border border-[var(--ink-12)] px-2.5 py-1 text-[10px] uppercase tracking-wider text-[var(--ink-45)]">
            {tag}
          </span>
        ))}
        {project.stack.length > 3 && (
          <span className="rounded-full border border-[var(--ink-12)] px-2.5 py-1 text-[10px] uppercase tracking-wider text-[var(--ink-35)]">
            +{project.stack.length - 3}
          </span>
        )}
      </div>

      <div className="mt-1 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[var(--accent-2)]">
        View Prototype
        <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </motion.article>
  </FadeIn>
);

const ProjectsSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const openProject = openIndex === null ? null : PROJECTS[openIndex];
  const close = () => setOpenIndex(null);
  const prev = () => setOpenIndex((i) => (i === null ? null : (i - 1 + PROJECTS.length) % PROJECTS.length));
  const next = () => setOpenIndex((i) => (i === null ? null : (i + 1) % PROJECTS.length));

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] bg-[var(--bg)] px-4 sm:px-6 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-24"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase tracking-tight leading-none mb-4"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Projects
        </h2>
      </FadeIn>
      <FadeIn delay={0.1} y={20}>
        <p className="mb-14 sm:mb-16 md:mb-20 text-center font-light uppercase tracking-widest text-[var(--ink-40)]" style={{ fontSize: 'clamp(0.75rem,1.2vw,1rem)' }}>
          Click any card to open its interactive prototype
        </p>
      </FadeIn>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} onOpen={() => setOpenIndex(i)} />
        ))}
      </div>

      <ProjectDetailModal project={openProject} onClose={close} onPrev={prev} onNext={next} />
    </section>
  );
};

export default ProjectsSection;
