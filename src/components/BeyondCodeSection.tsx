import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';
import SectionHeader from './SectionHeader';

const MOMENTS = [
  {
    src: '/life/difc.webp',
    alt: 'Ramani standing beside a green Aston Martin outside a glass tower in DIFC',
    place: 'DIFC, Dubai',
    title: 'Engineered for performance',
    text: 'Same rule for cars and code: precision engineering, no wasted motion, and systems that hold up under real-world load.',
  },
  {
    src: '/life/blossom.webp',
    alt: 'Ramani smiling in front of a blossoming cherry tree',
    place: 'Weekend wander',
    title: 'Curiosity in full bloom',
    text: 'Every AI system I build starts with one question: what would make this effortless for the people who use it every day?',
  },
  {
    src: '/life/cricket.webp',
    alt: 'Ramani cheering with the Indian flag at a stadium',
    place: 'Match day',
    title: 'Loud in the stands, calm in production',
    text: 'All the energy for the team, all the focus for the release. Great products are a team sport.',
  },
  {
    src: '/life/cafe.webp',
    alt: 'Ramani smiling at a restaurant table',
    place: 'Over lunch',
    title: 'Where ideas get sketched',
    text: 'Plenty of agent architectures started as a napkin sketch over lunch — the best ideas come from real conversations, not just prompts.',
  },
  {
    src: '/life/late-night.webp',
    alt: 'Ramani looking down at her phone at night',
    place: 'After hours',
    title: 'When the city sleeps, pipelines run',
    text: 'Late-night evals, prompt tuning and one more test before deploy. Shipping reliable AI means caring about the details nobody sees.',
  },
  {
    src: '/life/beach-sunset.webp',
    alt: 'Ramani walking into the waves at sunset on a Dubai beach',
    place: 'Jumeirah Beach',
    title: 'Reset, then rebuild',
    text: 'Stepping away is part of the work. The answer to the next hard problem usually shows up somewhere around sunset.',
  },
];

const TILTS = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-1', 'rotate-1'];

const BeyondCodeSection = () => {
  const stripRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateEdges = () => {
    const el = stripRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
  };

  const scrollBy = (dir: 1 | -1) => {
    const el = stripRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 720), behavior: 'smooth' });
  };

  return (
    <section id="life" className="relative w-full overflow-hidden py-24 sm:py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            index="05"
            label="Life"
            title={
              <>
                Beyond the
                <br />
                <em className="text-gradient">code.</em>
              </>
            }
            intro="I design and ship AI that moves money, reads documents and answers questions for real people. Here's the life that keeps that work human."
          />
          <div className="mb-20 hidden gap-2 lg:flex">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                onClick={() => scrollBy(d)}
                disabled={d === -1 ? atStart : atEnd}
                aria-label={d === -1 ? 'Previous photos' : 'Next photos'}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--ink-15)] text-[var(--ink-100)] transition hover:bg-[var(--ink-05)] disabled:opacity-30"
              >
                {d === -1 ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* polaroid strip — native horizontal scroll with snap, works with touch, trackpad and the arrows */}
      <div
        ref={stripRef}
        onScroll={updateEdges}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 sm:gap-7 overflow-x-auto px-5 sm:px-8 pb-10 pt-4 lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))]"
      >
        {MOMENTS.map((m, i) => (
          <FadeIn key={m.src} delay={Math.min(i, 3) * 0.08} y={30} className="snap-center sm:snap-start shrink-0">
            <figure
              className={`group w-[78vw] max-w-[340px] sm:w-[320px] rounded-[22px] border border-[var(--ink-10)] bg-[var(--surface-1)] p-3 pb-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] transition-transform duration-500 hover:rotate-0 hover:-translate-y-2 ${TILTS[i % TILTS.length]}`}
            >
              <div className="overflow-hidden rounded-[14px]">
                <img
                  src={m.src}
                  alt={m.alt}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
              </div>
              <figcaption className="px-2 pt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--ink-40)]">{m.place}</p>
                <h3 className="mt-1.5 font-serif text-2xl italic leading-tight text-[var(--ink-100)]">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink-55)]">{m.text}</p>
              </figcaption>
            </figure>
          </FadeIn>
        ))}
      </div>

      <p className="px-5 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--ink-35)] lg:hidden">Swipe →</p>
    </section>
  );
};

export default BeyondCodeSection;
