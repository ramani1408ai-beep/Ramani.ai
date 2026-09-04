import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PrototypeShell from './PrototypeShell';

type Reply = { text: string; bars?: { label: string; value: number; tone?: 'up' | 'down' | 'warn' }[] };

const PROMPTS: Record<string, Reply> = {
  "What's my cash flow forecast for next month?": {
    text: 'Projected cash flow for next month: +AED 148,200 (↑12% MoM) — driven by three vendor payments clearing earlier than usual.',
    bars: [
      { label: 'This month', value: 62, tone: 'up' },
      { label: 'Next month (forecast)', value: 78, tone: 'up' },
      { label: '3-month trend', value: 71, tone: 'up' },
    ],
  },
  'Any budget overruns this quarter?': {
    text: '⚠️ Marketing is trending 18% over budget this quarter — AED 42,000 over the AED 230,000 allocation. Everything else is within range.',
    bars: [
      { label: 'Marketing', value: 118, tone: 'warn' },
      { label: 'Operations', value: 84, tone: 'up' },
      { label: 'R&D', value: 67, tone: 'up' },
    ],
  },
  'What are my top spending categories?': {
    text: 'Your top 3 spending categories this month: Payroll (44%), Vendor Contracts (26%), and Cloud Infrastructure (11%).',
    bars: [
      { label: 'Payroll', value: 44 },
      { label: 'Vendor Contracts', value: 26 },
      { label: 'Cloud Infra', value: 11 },
    ],
  },
};

const FinanceGPTDemo = () => {
  const [thread, setThread] = useState<{ role: 'user' | 'bot'; text: string; bars?: Reply['bars'] }[]>([
    { role: 'bot', text: 'Ask me anything about your finances — try a prompt below.' },
  ]);
  const [asked, setAsked] = useState<string[]>([]);
  const [thinking, setThinking] = useState(false);

  const ask = (prompt: string) => {
    const reply = PROMPTS[prompt];
    setThread((t) => [...t, { role: 'user', text: prompt }]);
    setAsked((a) => [...a, prompt]);
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setThread((t) => [...t, { role: 'bot', text: reply.text, bars: reply.bars }]);
    }, 700);
  };

  const remaining = Object.keys(PROMPTS).filter((p) => !asked.includes(p));

  return (
    <PrototypeShell title="FinanceGPT">
      <div className="flex flex-col gap-3 max-h-72 overflow-y-auto pr-1">
        {thread.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[90%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              m.role === 'bot' ? 'self-start rounded-tl-sm bg-[var(--surface-1)] text-[var(--ink-85)]' : 'self-end rounded-tr-sm bg-[var(--accent-2)]/20 text-[var(--ink-100)]'
            }`}
          >
            {m.text}
            {m.bars && (
              <div className="mt-3 flex flex-col gap-2">
                {m.bars.map((b) => (
                  <div key={b.label} className="flex items-center gap-2">
                    <span className="w-32 shrink-0 text-[10px] uppercase tracking-wider text-[var(--ink-45)]">{b.label}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--ink-10)]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(b.value, 100)}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`h-full rounded-full ${b.tone === 'warn' ? 'bg-red-400' : 'bg-emerald-400'}`}
                      />
                    </div>
                    <span className="w-10 shrink-0 text-right text-[10px] text-[var(--ink-60)]">{b.value}%</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
        <AnimatePresence>
          {thinking && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="self-start flex items-center gap-1 rounded-2xl rounded-tl-sm bg-[var(--surface-1)] px-4 py-3">
              {[0, 1, 2].map((i) => (
                <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-[var(--ink-50)]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {remaining.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {remaining.map((p) => (
            <button
              key={p}
              onClick={() => ask(p)}
              disabled={thinking}
              className="rounded-full border border-[var(--ink-15)] bg-[var(--ink-04)] px-3 py-1.5 text-xs text-[var(--ink-75)] transition hover:border-[var(--accent-2)]/50 hover:text-[var(--ink-100)] disabled:opacity-40"
            >
              {p}
            </button>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-[11px] text-[var(--ink-35)]">That's the full demo script — production FinanceGPT handles open-ended questions via RAG over live transaction data.</p>
      )}
    </PrototypeShell>
  );
};

export default FinanceGPTDemo;
