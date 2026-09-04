import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const PrototypeShell = ({ title, children }: { title: string; children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    className="overflow-hidden"
  >
    <div className="mt-6 rounded-[28px] border border-[var(--ink-12)] bg-[var(--surface-4)] p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-emerald-300">
          <Zap size={10} strokeWidth={2.5} /> Interactive Prototype
        </span>
        <span className="text-[10px] uppercase tracking-widest text-[var(--ink-35)]">{title} · simulated demo</span>
      </div>
      {children}
    </div>
  </motion.div>
);

export default PrototypeShell;
