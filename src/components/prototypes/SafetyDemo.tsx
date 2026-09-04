import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanEye, Loader2 } from 'lucide-react';
import PrototypeShell from './PrototypeShell';

const DETECTIONS = [
  { label: 'Hard Hat', ok: true, box: { top: '8%', left: '12%', width: '20%', height: '22%' } },
  { label: 'Hi-Vis Vest', ok: true, box: { top: '28%', left: '10%', width: '26%', height: '30%' } },
  { label: 'Safety Boots', ok: false, box: { top: '60%', left: '48%', width: '18%', height: '18%' } },
];

const SafetyDemo = () => {
  const [stage, setStage] = useState<'idle' | 'scanning' | 'done'>('idle');

  const run = () => {
    setStage('scanning');
    setTimeout(() => setStage('done'), 900);
  };

  return (
    <PrototypeShell title="Construction Safety Compliance">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative h-48 flex-1 overflow-hidden rounded-2xl border border-[var(--ink-10)] bg-gradient-to-br from-[var(--surface-2)] to-[var(--surface-2)]">
          {/* simple site silhouette */}
          <div className="absolute bottom-0 left-[8%] h-24 w-10 rounded-t-md bg-[var(--ink-10)]" />
          <div className="absolute bottom-0 left-[45%] h-32 w-16 rounded-t-md bg-[var(--ink-10)]" />
          <div className="absolute bottom-0 right-[10%] h-16 w-8 rounded-t-md bg-[var(--ink-10)]" />

          <AnimatePresence>
            {stage === 'done' &&
              DETECTIONS.map((d, i) => (
                <motion.div
                  key={d.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className={`absolute rounded-md border-2 ${d.ok ? 'border-emerald-400' : 'border-red-400'}`}
                  style={d.box}
                >
                  <span
                    className={`absolute -top-5 left-0 whitespace-nowrap rounded px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wide ${
                      d.ok ? 'bg-emerald-400 text-black' : 'bg-red-400 text-black'
                    }`}
                  >
                    {d.label} {d.ok ? '✓' : '✕'}
                  </span>
                </motion.div>
              ))}
          </AnimatePresence>

          {stage === 'scanning' && (
            <motion.div
              className="absolute inset-x-0 h-0.5 bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,211,153,0.6)]"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 0.9, ease: 'linear' }}
            />
          )}
        </div>

        <div className="flex flex-1 flex-col justify-center gap-3">
          {stage === 'idle' && (
            <button
              onClick={run}
              className="inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-white transition hover:scale-[1.03]"
              style={{ background: 'linear-gradient(123deg,var(--accent-1) 7%,var(--accent-2) 37%,var(--accent-3) 72%,var(--accent-4) 100%)' }}
            >
              <ScanEye size={14} /> Run Detection
            </button>
          )}
          {stage === 'scanning' && (
            <div className="flex items-center gap-2 text-sm text-[var(--ink-60)]">
              <Loader2 size={16} className="animate-spin" /> Running computer vision pass…
            </div>
          )}
          {stage === 'done' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-2">
              <p className="text-sm text-[var(--ink-100)]">PPE Compliance Score</p>
              <div className="h-2 overflow-hidden rounded-full bg-[var(--ink-10)]">
                <motion.div initial={{ width: 0 }} animate={{ width: '82%' }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-amber-400" />
              </div>
              <p className="text-xs text-[var(--ink-50)]">82% — safety boots not detected, incident auto-flagged for site supervisor review.</p>
            </motion.div>
          )}
        </div>
      </div>
    </PrototypeShell>
  );
};

export default SafetyDemo;
