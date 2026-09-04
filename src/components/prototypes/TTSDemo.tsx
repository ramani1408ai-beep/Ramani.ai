import { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import PrototypeShell from './PrototypeShell';

const BARS = Array.from({ length: 24 }, (_, i) => i);

const TTSDemo = () => {
  const [text, setText] = useState('Your account balance was updated after three transactions cleared this morning.');
  const [playing, setPlaying] = useState(false);

  const synthesize = () => {
    setPlaying(true);
    setTimeout(() => setPlaying(false), 2400);
  };

  return (
    <PrototypeShell title="Conversational TTS">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        className="w-full resize-none rounded-2xl border border-[var(--ink-15)] bg-[var(--surface-1)] px-4 py-3 text-sm text-[var(--ink-100)] outline-none focus:border-[var(--accent-2)]/60"
      />
      <button
        onClick={synthesize}
        disabled={playing}
        className="mt-3 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-white transition hover:scale-[1.03] disabled:opacity-60"
        style={{ background: 'linear-gradient(123deg,var(--accent-1) 7%,var(--accent-2) 37%,var(--accent-3) 72%,var(--accent-4) 100%)' }}
      >
        <Volume2 size={14} /> {playing ? 'Synthesising…' : 'Synthesize Speech'}
      </button>

      <div className="mt-4 flex h-16 items-end justify-center gap-[3px] rounded-2xl border border-[var(--ink-10)] bg-[var(--surface-1)] px-4 py-3">
        {BARS.map((i) => (
          <motion.span
            key={i}
            className="w-1.5 rounded-full bg-gradient-to-t from-[var(--accent-3)] to-[var(--accent-2)]"
            animate={playing ? { height: [6, 6 + ((i * 37) % 30), 6] } : { height: 4 }}
            transition={playing ? { duration: 0.5 + (i % 5) * 0.08, repeat: Infinity, repeatType: 'mirror' } : { duration: 0.3 }}
          />
        ))}
      </div>
      <p className="mt-3 text-[11px] text-[var(--ink-35)]">Waveform simulated for the demo — production pipeline runs Tacotron 2 + LLaMA via a Flask inference API.</p>
    </PrototypeShell>
  );
};

export default TTSDemo;
