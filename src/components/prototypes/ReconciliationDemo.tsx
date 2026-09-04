import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Check, Eye } from 'lucide-react';
import PrototypeShell from './PrototypeShell';

type Stage = 'idle' | 'matching' | 'matched' | 'accepted';

const ReconciliationDemo = () => {
  const [stage, setStage] = useState<Stage>('idle');

  const run = () => {
    setStage('matching');
    setTimeout(() => setStage('matched'), 900);
  };

  return (
    <PrototypeShell title="Reconciliation Platform">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
        {/* Incoming transaction */}
        <div className="flex-1 rounded-2xl border border-[var(--ink-10)] bg-[var(--surface-1)] p-4">
          <p className="mb-2 text-[10px] uppercase tracking-widest text-[var(--ink-40)]">Bank Transaction</p>
          <p className="text-xl font-semibold text-[var(--ink-100)]">AED 12,450.00</p>
          <p className="mt-1 text-sm text-[var(--ink-60)]">EMIRATES NBD · 04 SEP 2026</p>
          <p className="mt-0.5 text-xs text-[var(--ink-35)]">REF #NBD-88213-CX</p>
        </div>

        {/* Arrow */}
        <div className="hidden sm:flex items-center justify-center text-[var(--ink-25)]">→</div>

        {/* AI analysis */}
        <div className="flex-1 rounded-2xl border border-[var(--ink-10)] bg-[var(--surface-1)] p-4 flex flex-col justify-center">
          {stage === 'idle' && (
            <button
              onClick={run}
              className="mx-auto inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-white transition hover:scale-[1.03]"
              style={{ background: 'linear-gradient(123deg,var(--accent-1) 7%,var(--accent-2) 37%,var(--accent-3) 72%,var(--accent-4) 100%)' }}
            >
              Run AI Match
            </button>
          )}

          {stage === 'matching' && (
            <div className="flex items-center justify-center gap-2 text-sm text-[var(--ink-60)]">
              <Loader2 size={16} className="animate-spin" /> Analysing transaction…
            </div>
          )}

          <AnimatePresence>
            {(stage === 'matched' || stage === 'accepted') && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--ink-40)]">Suggested Account</p>
                  <p className="text-sm font-medium text-[var(--ink-100)]">Business Expenses</p>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-[10px] text-[var(--ink-45)]">
                    <span>Confidence</span>
                    <span>96%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[var(--ink-10)]">
                    <motion.div initial={{ width: 0 }} animate={{ width: '96%' }} transition={{ duration: 0.9, ease: 'easeOut' }} className="h-full rounded-full bg-emerald-400" />
                  </div>
                </div>

                {stage === 'matched' ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStage('accepted')}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-emerald-400/15 border border-emerald-400/30 px-4 py-2 text-xs font-medium uppercase tracking-wider text-emerald-300 transition hover:bg-emerald-400/25"
                    >
                      <Check size={13} /> Accept Match
                    </button>
                    <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-[var(--ink-20)] px-4 py-2 text-xs font-medium uppercase tracking-wider text-[var(--ink-70)] transition hover:bg-[var(--ink-10)]">
                      <Eye size={13} /> Review
                    </button>
                  </div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 border border-emerald-400/25 px-4 py-2 text-xs font-medium uppercase tracking-wider text-emerald-300 w-fit">
                    <Check size={13} /> Matched ✓
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <p className="mt-4 text-[11px] text-[var(--ink-35)]">Production version applies this across full statement uploads via Azure Document Intelligence + Chart-of-Accounts mapping.</p>
    </PrototypeShell>
  );
};

export default ReconciliationDemo;
