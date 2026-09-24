import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Check, AlertTriangle, Clock, Send } from 'lucide-react';
import PrototypeShell from './PrototypeShell';

type Stage = 'idle' | 'scanning' | 'scanned' | 'reporting' | 'reported';
type Status = 'cleared' | 'due' | 'bounced' | 'scheduled';

const PAYMENTS: { contract: string; instalment: string; cheque: string; due: string; amount: string; status: Status }[] = [
  { contract: 'Facilities Maintenance', instalment: '4 / 12', cheque: 'CHQ-10482', due: '02 Sep', amount: 'AED 18,500', status: 'cleared' },
  { contract: 'Office Lease — Tower B', instalment: '2 / 4', cheque: 'CHQ-10483', due: '15 Sep', amount: 'AED 96,000', status: 'bounced' },
  { contract: 'IT Managed Services', instalment: '7 / 12', cheque: 'CHQ-10484', due: '27 Sep', amount: 'AED 24,750', status: 'due' },
  { contract: 'Fleet Leasing', instalment: '3 / 6', cheque: 'CHQ-10485', due: '10 Oct', amount: 'AED 31,200', status: 'scheduled' },
];

const STATUS_STYLE: Record<Status, { label: string; cls: string; Icon: typeof Check }> = {
  cleared: { label: 'Cleared', cls: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300', Icon: Check },
  due: { label: 'Due in 3 days', cls: 'border-amber-400/30 bg-amber-400/10 text-amber-300', Icon: Clock },
  bounced: { label: 'Bounced — flagged', cls: 'border-rose-400/35 bg-rose-400/10 text-rose-300', Icon: AlertTriangle },
  scheduled: { label: 'Scheduled', cls: 'border-[var(--ink-15)] bg-[var(--ink-05)] text-[var(--ink-60)]', Icon: Clock },
};

const gradientBtn = 'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-white transition hover:scale-[1.03]';
const gradient = { background: 'linear-gradient(123deg,var(--accent-1) 7%,var(--accent-2) 37%,var(--accent-3) 72%,var(--accent-4) 100%)' };

const CorporateFinanceDemo = () => {
  const [stage, setStage] = useState<Stage>('idle');
  const scanned = stage !== 'idle' && stage !== 'scanning';

  const runMonitor = () => {
    setStage('scanning');
    setTimeout(() => setStage('scanned'), 900);
  };
  const runReport = () => {
    setStage('reporting');
    setTimeout(() => setStage('reported'), 1000);
  };

  return (
    <PrototypeShell title="Corporate Finance Module">
      <div className="overflow-hidden rounded-2xl border border-[var(--ink-10)] bg-[var(--surface-1)]">
        <div className="flex items-center justify-between border-b border-[var(--ink-10)] px-4 py-3">
          <p className="text-[10px] uppercase tracking-widest text-[var(--ink-40)]">Contract payments · September</p>
          <p className="text-[10px] uppercase tracking-widest text-[var(--ink-35)]">4 cheques</p>
        </div>
        <ul>
          {PAYMENTS.map((p) => {
            const s = STATUS_STYLE[p.status];
            return (
              <li key={p.cheque} className="flex flex-col gap-2 border-b border-[var(--ink-05)] px-4 py-3 last:border-b-0 sm:flex-row sm:items-center sm:gap-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[var(--ink-100)]">{p.contract}</p>
                  <p className="text-[11px] text-[var(--ink-40)]">
                    Instalment {p.instalment} · {p.cheque} · due {p.due}
                  </p>
                </div>
                <p className="text-sm font-semibold tabular-nums text-[var(--ink-85)] sm:w-28 sm:text-right">{p.amount}</p>
                <div className="sm:w-40 sm:flex sm:justify-end">
                  {stage === 'scanning' ? (
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-[var(--ink-45)]">
                      <Loader2 size={12} className="animate-spin" /> Checking…
                    </span>
                  ) : scanned ? (
                    <motion.span
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${s.cls}`}
                    >
                      <s.Icon size={11} strokeWidth={2.5} /> {s.label}
                    </motion.span>
                  ) : (
                    <span className="text-[11px] text-[var(--ink-30)]">Not checked</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {stage === 'idle' && (
          <button onClick={runMonitor} className={gradientBtn} style={gradient}>
            Run Check Monitor
          </button>
        )}
        {stage === 'scanned' && (
          <>
            <p className="text-xs text-rose-300">1 bounced cheque flagged for treasury follow-up.</p>
            <button onClick={runReport} className={gradientBtn} style={gradient}>
              Generate Month-End Report
            </button>
          </>
        )}
        {stage === 'reporting' && (
          <span className="inline-flex items-center gap-2 text-sm text-[var(--ink-60)]">
            <Loader2 size={16} className="animate-spin" /> Consolidating ledger & building report…
          </span>
        )}
      </div>

      <AnimatePresence>
        {stage === 'reported' && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-2 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: 'Paid this month', value: 'AED 18.5K' },
                { label: 'Due next 30 days', value: 'AED 56.0K' },
                { label: 'Flagged cheques', value: '1' },
                { label: 'Contracts on track', value: '3 / 4' },
              ].map((t) => (
                <div key={t.label} className="rounded-2xl border border-[var(--ink-10)] bg-[var(--surface-1)] px-3 py-3">
                  <p className="text-lg font-semibold text-[var(--ink-100)]">{t.value}</p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-widest text-[var(--ink-40)]">{t.label}</p>
                </div>
              ))}
            </div>
            <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-xs font-medium uppercase tracking-wider text-emerald-300">
              <Send size={12} /> Report sent to management ✓
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-4 text-[11px] text-[var(--ink-35)]">
        Production version runs across every enterprise contract, with SQL Server triggers keeping the ledger and trial balance in sync automatically.
      </p>
    </PrototypeShell>
  );
};

export default CorporateFinanceDemo;
