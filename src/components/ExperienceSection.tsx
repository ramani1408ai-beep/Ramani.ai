import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import FadeIn from './FadeIn';
import SectionHeader from './SectionHeader';

const ROLES = [
  {
    company: 'Alpago Group',
    role: 'AI Engineer — Full-time',
    period: 'Sept 2025 – Present',
    place: 'Dubai, UAE',
    current: true,
    highlights: [
      { lead: 'Agentic AI Financial Intelligence Platform', text: 'directed and engineered under the direct sponsorship of the CEO — end-to-end financial reporting, statement parsing and dynamic cash-flow analysis.' },
      { lead: 'FinanceGPT', text: 'an autonomous LLM advising bot (RAG + LangChain + Azure OpenAI) that parses raw bank statements to forecast cash flows, flag budget overruns and advise executive management in real time.' },
      { lead: 'Corporate Finance Module', text: 'contract payments management and check monitoring engines, with automated workflows that generate and distribute consolidated reports every month-end.' },
      { lead: 'Transactional database architecture', text: 'advanced triggers and debugging routines in Python, SQL Server and .NET C# for flawless ledger entries and trial balance reporting.' },
      { lead: 'MLOps', text: 'MLflow tracking, Docker, Kubernetes and CI/CD for scalable, reproducible model delivery — plus Power BI dashboards on hybrid ML models.' },
    ],
  },
  {
    company: 'Neostats Analytics Solutions',
    role: 'Client Success Manager',
    period: 'Oct 2024 – Aug 2025',
    place: 'Dubai, UAE',
    current: false,
    highlights: [
      { lead: 'GenAI roadmaps', text: 'aligned with C-level objectives; authored technical proposals turning AI use-cases into measurable ROI across GCC clients.' },
      { lead: 'End-to-end delivery', text: 'led AI projects from scoping and resourcing to stakeholder management and on-time execution.' },
      { lead: 'Pipeline', text: 'generated qualified leads through custom AI demos; managed full-cycle sales forecasting and tracking.' },
      { lead: '2,000+ connections', text: 'maintained across the region; represented the company at industry events.' },
    ],
  },
];

const ExperienceSection = () => {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative w-full px-5 sm:px-8 py-24 sm:py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="02"
          label="Experience"
          title={
            <>
              From client rooms
              <br />
              to the <em className="text-gradient">CEO's desk.</em>
            </>
          }
          intro="Two roles, one thread: translating what the business needs into AI that actually ships."
        />

        <ol ref={listRef} className="relative">
          {/* track + scroll-driven fill */}
          <span className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--ink-12)] md:left-[calc(33%+7px)]" aria-hidden />
          <motion.span
            className="absolute left-[7px] top-2 bottom-2 w-px origin-top md:left-[calc(33%+7px)]"
            style={{ scaleY: line, background: 'var(--accent-gradient)' }}
            aria-hidden
          />

          {ROLES.map((r) => (
            <li key={r.company} className="relative grid grid-cols-1 gap-4 pb-16 last:pb-0 md:grid-cols-[33%_1fr] md:gap-0">
              {/* meta — sticky on desktop */}
              <div className="pl-10 md:pl-0 md:pr-12">
                <div className="md:sticky md:top-32 md:text-right">
                  <p className="font-mono text-xs text-[var(--ink-45)]">{r.period}</p>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink-100)]">{r.company}</h3>
                  <p className="mt-1 text-sm text-[var(--ink-55)]">{r.role}</p>
                  <p className="text-sm text-[var(--ink-40)]">{r.place}</p>
                  {r.current && (
                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-[var(--success)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Current
                    </span>
                  )}
                </div>
              </div>

              {/* node */}
              <span
                className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border-[3px] border-[var(--bg)] md:left-[33%]"
                style={{ background: 'var(--accent-gradient)', boxShadow: '0 0 0 1px var(--ink-20)' }}
                aria-hidden
              />

              <ul className="flex flex-col gap-3 pl-10 md:pl-12">
                {r.highlights.map((h, i) => (
                  <FadeIn key={h.lead} delay={i * 0.06} y={20} as="li">
                    <div className="rounded-2xl border border-[var(--ink-10)] bg-[var(--surface-1)] px-5 py-4 transition-colors hover:border-[var(--ink-20)]">
                      <p className="text-[15px] leading-relaxed text-[var(--ink-60)]">
                        <span className="font-semibold text-[var(--ink-100)]">{h.lead}</span> — {h.text}
                      </p>
                    </div>
                  </FadeIn>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ExperienceSection;
