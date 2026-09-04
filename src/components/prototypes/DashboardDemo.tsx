import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import PrototypeShell from './PrototypeShell';

const KPIS = [
  { label: 'YTD Sales', value: 4820000, prefix: 'AED ', suffix: '', spark: [40, 55, 48, 62, 70, 65, 80] },
  { label: 'Forecast Accuracy', value: 94, prefix: '', suffix: '%', spark: [70, 74, 78, 82, 88, 90, 94] },
  { label: 'Inventory Turns', value: 8.4, prefix: '', suffix: 'x', spark: [5, 6, 6.5, 7, 7.8, 8, 8.4] },
];

const CountUp = ({ target, prefix, suffix }: { target: number; prefix: string; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1000;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setVal(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  const display = target > 1000 ? Math.round(val).toLocaleString() : val.toFixed(1);
  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

const DashboardDemo = () => (
  <PrototypeShell title="Sales & Logistics Insights">
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {KPIS.map((k) => (
        <div key={k.label} className="rounded-2xl border border-[var(--ink-10)] bg-[var(--surface-1)] p-4">
          <p className="text-[10px] uppercase tracking-widest text-[var(--ink-40)]">{k.label}</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--ink-100)]">
            <CountUp target={k.value} prefix={k.prefix} suffix={k.suffix} />
          </p>
          <div className="mt-3 flex h-10 items-end gap-1">
            {k.spark.map((v, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${(v / Math.max(...k.spark)) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex-1 rounded-sm bg-gradient-to-t from-[var(--accent-3)] to-[var(--accent-2)]"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
    <p className="mt-4 text-[11px] text-[var(--ink-35)]">Built on a star-schema model with DAX measures in Power BI — dispatch, safety stock, and profitability rolled into one view.</p>
  </PrototypeShell>
);

export default DashboardDemo;
