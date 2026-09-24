import FadeIn from './FadeIn';

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

const BeyondCodeSection = () => {
  return (
    <section
      id="life"
      className="relative w-full px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn y={40}>
        <h2
          className="hero-heading text-center font-black uppercase leading-none tracking-tight mb-5"
          style={{ fontSize: 'clamp(2.6rem, 10vw, 140px)' }}
        >
          Beyond the code
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={20}>
        <p className="mx-auto mb-14 sm:mb-20 max-w-xl text-center text-sm sm:text-base font-light leading-relaxed text-[var(--ink-60)]">
          I design and ship AI that moves money, reads documents and answers questions for real people.
          Here's the life that keeps that work human.
        </p>
      </FadeIn>

      <div className="mx-auto max-w-6xl columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {MOMENTS.map((m, i) => (
          <FadeIn key={m.src} delay={(i % 3) * 0.1} y={30} className="mb-5 break-inside-avoid">
            <figure className="group overflow-hidden rounded-[28px] border border-[var(--ink-10)] bg-[var(--surface-1)]">
              <div className="overflow-hidden">
                <img
                  src={m.src}
                  alt={m.alt}
                  loading="lazy"
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="px-5 py-5 sm:px-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--ink-40)]">{m.place}</p>
                <h3 className="mt-2 text-base sm:text-lg font-semibold leading-snug text-[var(--ink-100)]">{m.title}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-[var(--ink-60)]">{m.text}</p>
              </figcaption>
            </figure>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

export default BeyondCodeSection;
