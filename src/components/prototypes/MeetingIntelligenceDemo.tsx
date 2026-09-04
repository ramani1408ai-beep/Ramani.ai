import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ListChecks } from 'lucide-react';
import PrototypeShell from './PrototypeShell';

const TASKS = [
  { task: 'Finalise Q3 vendor contract terms', owner: 'Finance Team', due: 'Fri, Sep 11', priority: 'High' },
  { task: 'Share updated cash-flow deck with board', owner: 'Ramani', due: 'Mon, Sep 14', priority: 'High' },
  { task: 'Schedule follow-up with Emirates NBD', owner: 'Ops', due: 'Wed, Sep 16', priority: 'Medium' },
];

const MeetingIntelligenceDemo = () => {
  const [stage, setStage] = useState<'idle' | 'extracting' | 'done'>('idle');
  const [visibleCount, setVisibleCount] = useState(0);

  const run = () => {
    setStage('extracting');
    setTimeout(() => {
      setStage('done');
      TASKS.forEach((_, i) => setTimeout(() => setVisibleCount((c) => c + 1), i * 350));
    }, 700);
  };

  return (
    <PrototypeShell title="Meeting Intelligence">
      <div className="rounded-2xl border border-[var(--ink-10)] bg-[var(--surface-1)] p-4">
        <p className="mb-2 text-[10px] uppercase tracking-widest text-[var(--ink-40)]">Transcript snippet</p>
        <p className="text-sm italic leading-relaxed text-[var(--ink-65)]">
          "…so Finance needs to lock the vendor terms by end of week. Ramani, can you get the cash-flow deck to the board by Monday?
          And someone should follow up with NBD about the delayed clearance…"
        </p>
      </div>

      {stage === 'idle' && (
        <button
          onClick={run}
          className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-white transition hover:scale-[1.03]"
          style={{ background: 'linear-gradient(123deg,var(--accent-1) 7%,var(--accent-2) 37%,var(--accent-3) 72%,var(--accent-4) 100%)' }}
        >
          <ListChecks size={14} /> Extract Action Items
        </button>
      )}

      {stage === 'extracting' && (
        <div className="mt-4 flex items-center gap-2 text-sm text-[var(--ink-60)]">
          <Loader2 size={16} className="animate-spin" /> Parsing transcript with NLP…
        </div>
      )}

      {stage === 'done' && (
        <div className="mt-4 flex flex-col gap-2.5">
          <AnimatePresence>
            {TASKS.slice(0, visibleCount).map((t) => (
              <motion.div
                key={t.task}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-2 rounded-2xl border border-[var(--ink-10)] bg-[var(--surface-1)] p-3.5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm text-[var(--ink-100)]">{t.task}</p>
                  <p className="text-[11px] text-[var(--ink-40)]">{t.owner} · due {t.due}</p>
                </div>
                <span
                  className={`w-fit shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${
                    t.priority === 'High' ? 'bg-red-400/10 text-red-300 border border-red-400/25' : 'bg-amber-400/10 text-amber-300 border border-amber-400/25'
                  }`}
                >
                  {t.priority}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </PrototypeShell>
  );
};

export default MeetingIntelligenceDemo;
