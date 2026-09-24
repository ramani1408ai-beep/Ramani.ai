import type { ReactNode } from 'react';
import FadeIn from './FadeIn';

interface SectionHeaderProps {
  index: string;
  label: string;
  /** Main title. Wrap the accent word in <em> for the serif-italic treatment. */
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'default' | 'band';
}

/** Editorial section opener: "(02) — Services" eyebrow, big display title, optional intro. */
const SectionHeader = ({ index, label, title, intro, align = 'left', tone = 'default' }: SectionHeaderProps) => {
  const ink = tone === 'band' ? 'text-[var(--band-ink-100)]' : 'text-[var(--ink-100)]';
  const muted = tone === 'band' ? 'text-[var(--band-ink-50)]' : 'text-[var(--ink-50)]';
  const rule = tone === 'band' ? 'bg-[var(--band-ink-15)]' : 'bg-[var(--ink-15)]';
  const centered = align === 'center';

  return (
    <div className={`mb-12 sm:mb-16 md:mb-20 flex flex-col gap-5 ${centered ? 'items-center text-center' : ''}`}>
      <FadeIn y={16}>
        <div className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] ${muted}`}>
          <span>({index})</span>
          <span className={`h-px w-10 ${rule}`} />
          <span>{label}</span>
        </div>
      </FadeIn>
      <FadeIn delay={0.05} y={30}>
        <h2
          className={`font-display font-bold leading-[0.95] tracking-tight [&_em]:font-serif [&_em]:font-normal [&_em]:italic [&_em]:tracking-normal ${ink}`}
          style={{ fontSize: 'clamp(2.4rem, 7vw, 6.5rem)' }}
        >
          {title}
        </h2>
      </FadeIn>
      {intro && (
        <FadeIn delay={0.1} y={20}>
          <p className={`max-w-xl text-base sm:text-lg leading-relaxed ${muted}`}>{intro}</p>
        </FadeIn>
      )}
    </div>
  );
};

export default SectionHeader;
