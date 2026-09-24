import FadeIn from './FadeIn';

const SERVICES = [
  {
    number: '01',
    title: 'Agentic LLM Systems',
    description:
      'End-to-end AI agents with LangChain and Azure OpenAI — multi-step pipelines, tool-calling, RAG over your business data, and memory management. Delivered as a production-ready backend with FastAPI.',
    tags: ['LangChain', 'Azure OpenAI', 'RAG', 'FastAPI'],
  },
  {
    number: '02',
    title: 'Hybrid ML & Forecasting',
    description:
      'Custom ML models that fuse LSTM, Transformer, and collaborative filtering to learn behaviour over time — covering classification, anomaly detection, cash-flow forecasting, and personalised recommendations.',
    tags: ['LSTM', 'Transformer', 'ARIMA', 'scikit-learn', 'PyTorch'],
  },
  {
    number: '03',
    title: 'Document Intelligence Automation',
    description:
      'Automated pipelines that parse PDFs and documents with Azure Document Intelligence, classify and extract structured data, score vendors, and eliminate manual data entry entirely.',
    tags: ['Azure Document Intelligence', 'LLM Scoring', 'ETL', 'Python'],
  },
  {
    number: '04',
    title: 'Financial AI Platforms',
    description:
      'Intelligent finance systems — real-time SMSC transaction capture, automated reconciliation, Chart of Accounts mapping, and live P&L, Balance Sheet, and Cash Flow reports with zero manual input.',
    tags: ['SMSC API', 'Power BI', 'SQL', 'Azure'],
  },
  {
    number: '05',
    title: 'MLOps & Production Deployment',
    description:
      'Reproducible ML delivery pipelines — MLflow experiment tracking, Docker containerisation, Kubernetes orchestration, and CI/CD. Models that ship fast, scale reliably, and stay maintainable.',
    tags: ['MLflow', 'Docker', 'Kubernetes', 'CI/CD'],
  },
];

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative w-full bg-[var(--band-bg)] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="text-center font-black uppercase text-[var(--band-ink-100)] mb-5 leading-none"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={20}>
        <p className="text-center text-sm font-light uppercase tracking-widest text-[var(--band-ink-50)] mb-16 sm:mb-20 md:mb-28">
          Available for freelance · Remote & GCC · Fast turnaround
        </p>
      </FadeIn>

      <div className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="group flex flex-row items-start gap-6 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: '1px solid var(--band-ink-15)',
                ...(i === SERVICES.length - 1 ? { borderBottom: '1px solid var(--band-ink-15)' } : {}),
              }}
            >
              <div className="shrink-0 font-black text-[var(--band-ink-100)] leading-none" style={{ fontSize: 'clamp(3rem,10vw,140px)' }}>
                {service.number}
              </div>

              <div className="flex flex-col gap-3 sm:gap-4 pt-2 sm:pt-3 md:pt-4">
                <h3
                  className="font-medium uppercase text-[var(--band-ink-100)] leading-tight relative inline-block w-fit"
                  style={{ fontSize: 'clamp(1rem,2.2vw,2.1rem)' }}
                >
                  {service.title}
                  <span className="absolute left-0 -bottom-1 h-px w-0 bg-[var(--band-ink-60)] transition-all duration-500 group-hover:w-full" />
                </h3>
                <p
                  className="font-light leading-relaxed text-[var(--band-ink-60)] max-w-2xl"
                  style={{ fontSize: 'clamp(0.85rem,1.6vw,1.25rem)' }}
                >
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--band-ink-15)] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[var(--band-ink-50)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Freelance CTA banner */}
      <FadeIn delay={0.3} y={30}>
        <div className="relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-[40px] px-8 py-14 sm:px-12 sm:py-20 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Golden hour over the DIFC skyline — where the building happens */}
          <img
            src="/life/office-golden-hour.webp"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/10" />
          <div className="relative">
            <p className="text-xs uppercase tracking-widest text-white/60 mb-2">Ready to collaborate?</p>
            <p className="text-xl sm:text-2xl font-medium text-white max-w-md leading-snug">
              Let's turn your AI idea into a production system.
            </p>
            <p className="mt-3 text-sm font-light text-white/70 max-w-sm leading-relaxed">
              From the first prompt to the final deploy — designed, built and shipped from Dubai.
            </p>
          </div>
          <a
            href="#contact"
            className="relative shrink-0 inline-flex items-center rounded-full px-8 py-3.5 text-sm font-medium uppercase tracking-widest text-white transition hover:scale-[1.03]"
            style={{
              background: 'linear-gradient(123deg,var(--accent-1) 7%,var(--accent-2) 37%,var(--accent-3) 72%,var(--accent-4) 100%)',
              boxShadow: '0px 4px 4px var(--accent-glow),4px 4px 12px var(--accent-3) inset',
              outline: '2px solid #ffffff',
              outlineOffset: '-3px',
            }}
          >
            Start a Project →
          </a>
        </div>
      </FadeIn>
    </section>
  );
};

export default ServicesSection;
