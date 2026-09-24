import { ArrowUpRight, Bot, LineChart, FileScan, Landmark, Rocket } from 'lucide-react';
import FadeIn from './FadeIn';
import SectionHeader from './SectionHeader';

const SERVICES = [
  {
    number: '01',
    Icon: Bot,
    title: 'Agentic LLM Systems',
    description:
      'End-to-end AI agents with LangChain and Azure OpenAI — multi-step pipelines, tool-calling, RAG over your business data, and memory management. Delivered as a production-ready backend with FastAPI.',
    tags: ['LangChain', 'Azure OpenAI', 'RAG', 'FastAPI'],
  },
  {
    number: '02',
    Icon: LineChart,
    title: 'Hybrid ML & Forecasting',
    description:
      'Custom ML models that fuse LSTM, Transformer, and collaborative filtering to learn behaviour over time — covering classification, anomaly detection, cash-flow forecasting, and personalised recommendations.',
    tags: ['LSTM', 'Transformer', 'ARIMA', 'scikit-learn', 'PyTorch'],
  },
  {
    number: '03',
    Icon: FileScan,
    title: 'Document Intelligence Automation',
    description:
      'Automated pipelines that parse PDFs and documents with Azure Document Intelligence, classify and extract structured data, score vendors, and eliminate manual data entry entirely.',
    tags: ['Azure Document Intelligence', 'LLM Scoring', 'ETL', 'Python'],
  },
  {
    number: '04',
    Icon: Landmark,
    title: 'Financial AI Platforms',
    description:
      'Intelligent finance systems — real-time SMSC transaction capture, automated reconciliation, Chart of Accounts mapping, and live P&L, Balance Sheet, and Cash Flow reports with zero manual input.',
    tags: ['SMSC API', 'Power BI', 'SQL', 'Azure'],
  },
  {
    number: '05',
    Icon: Rocket,
    title: 'MLOps & Production Deployment',
    description:
      'Reproducible ML delivery pipelines — MLflow experiment tracking, Docker containerisation, Kubernetes orchestration, and CI/CD. Models that ship fast, scale reliably, and stay maintainable.',
    tags: ['MLflow', 'Docker', 'Kubernetes', 'CI/CD'],
  },
];

const CtaCard = ({ className = '' }: { className?: string }) => (
  <div className={`relative overflow-hidden rounded-[28px] ${className}`}>
    {/* golden hour over the DIFC skyline — where the building happens */}
    <img src="/life/office-golden-hour.webp" alt="" className="absolute inset-0 h-full w-full object-cover object-[center_40%]" loading="lazy" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/10" />
    <div className="relative flex min-h-[300px] flex-col justify-end gap-4 p-7">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/60">Ready to collaborate?</p>
      <p className="font-display text-2xl font-bold leading-tight text-white">Let's turn your AI idea into a production system.</p>
      <p className="text-sm text-white/70">From the first prompt to the final deploy — designed, built and shipped from Dubai.</p>
      <a
        href="#contact"
        className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.03]"
      >
        Start a project <ArrowUpRight size={16} />
      </a>
    </div>
  </div>
);

const ServicesSection = () => (
  <section
    id="services"
    className="relative w-full rounded-[40px] sm:rounded-[56px] bg-[var(--band-bg)] px-5 sm:px-8 py-24 sm:py-28 md:py-36"
  >
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      {/* left: pinned heading + CTA on desktop */}
      <div>
        <div className="lg:sticky lg:top-28">
          <SectionHeader
            tone="band"
            index="03"
            label="Services"
            title={
              <>
                What I can
                <br />
                <em>build for you.</em>
              </>
            }
            intro="Available for freelance · Remote & GCC · Fast turnaround"
          />
          <CtaCard className="hidden lg:block" />
        </div>
      </div>

      {/* right: cards that stack as you scroll */}
      <div className="flex flex-col gap-5">
        {SERVICES.map(({ number, Icon, title, description, tags }, i) => (
          <div key={number} className="sticky" style={{ top: `calc(6.5rem + ${i * 1.1}rem)` }}>
            <FadeIn y={30}>
              <article className="group rounded-[28px] border border-[var(--band-ink-15)] bg-[var(--band-bg)] p-6 sm:p-8 shadow-[0_-12px_40px_-12px_rgba(0,0,0,0.25)]">
                <div className="flex items-start justify-between gap-4">
                  <span
                    className="font-display font-extrabold leading-none text-transparent"
                    style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', WebkitTextStroke: '1.5px var(--band-ink-40)' }}
                  >
                    {number}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl text-white transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110" style={{ background: 'var(--accent-gradient)' }}>
                    <Icon size={22} strokeWidth={1.75} />
                  </span>
                </div>
                <h3 className="mt-6 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--band-ink-100)]">{title}</h3>
                <p className="mt-3 text-[15px] sm:text-base leading-relaxed text-[var(--band-ink-60)]">{description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-[var(--band-ink-15)] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--band-ink-50)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </FadeIn>
          </div>
        ))}
        <CtaCard className="mt-4 lg:hidden" />
      </div>
    </div>
  </section>
);

export default ServicesSection;
