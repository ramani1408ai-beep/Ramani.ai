import FadeIn from './FadeIn';
import ContactButton from './ContactButton';
import AnimatedText from './AnimatedText';

const ABOUT_TEXT =
  "I'm an AI Engineer based in Dubai, specialising in production Generative AI, LLM agentic systems, and hybrid ML on Microsoft Azure. At Alpago Group, I build intelligent financial platforms — from conversational AI assistants to real-time transaction intelligence and vendor automation engines. B.Tech from NIT Delhi (ECE, 2024). Currently pursuing an MBA in AI for Business at BITS Pilani Dubai.";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 sm:px-8 md:px-10 py-20"
    >
      {/* Corner decorative 3D images */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9}
        className="pointer-events-none absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[60px] sm:w-[160px] md:w-[210px]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt=""
          className="w-full h-auto"
          loading="lazy"
          draggable={false}
        />
      </FadeIn>

      <FadeIn delay={0.25} x={-80} y={0} duration={0.9}
        className="pointer-events-none absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[55px] sm:w-[140px] md:w-[180px]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt=""
          className="w-full h-auto"
          loading="lazy"
          draggable={false}
        />
      </FadeIn>

      <FadeIn delay={0.15} x={80} y={0} duration={0.9}
        className="pointer-events-none absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[60px] sm:w-[160px] md:w-[210px]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt=""
          className="w-full h-auto"
          loading="lazy"
          draggable={false}
        />
      </FadeIn>

      <FadeIn delay={0.3} x={80} y={0} duration={0.9}
        className="pointer-events-none absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[65px] sm:w-[170px] md:w-[220px]"
      >
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt=""
          className="w-full h-auto"
          loading="lazy"
          draggable={false}
        />
      </FadeIn>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16 text-center">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-12 sm:gap-16 md:gap-20">
          {/* Portrait — Downtown Dubai, with the Alpago name lit up behind */}
          <FadeIn delay={0.1} y={30} className="w-full max-w-[340px] sm:max-w-[380px]">
            <figure className="relative overflow-hidden rounded-[32px] border border-[var(--ink-10)] shadow-2xl">
              <img
                src="/life/downtown-alpago.webp"
                alt="Ramani Dulipala in Downtown Dubai at night, with the Alpago sign lit behind her"
                className="aspect-[4/5] w-full object-cover object-top"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-5 pb-5 pt-16 text-left">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">Downtown Dubai</p>
                <p className="mt-1 text-sm sm:text-base font-medium text-white leading-snug">
                  Building AI for finance at Alpago Group.
                </p>
              </figcaption>
            </figure>
          </FadeIn>

          <AnimatedText
            text={ABOUT_TEXT}
            className="font-medium leading-relaxed text-[var(--ink-100)] max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />

          {/* By the numbers — real counts, not filler */}
          <FadeIn delay={0.1} className="w-full max-w-3xl">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: '6', label: 'AI & Finance Projects' },
                { value: '5', label: 'Core Tech Domains' },
                { value: '4', label: 'Certifications' },
                { value: '2', label: 'B.Tech · MBA (in progress)' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[var(--ink-10)] bg-[var(--ink-02)] px-4 py-5 text-center"
                >
                  <p className="text-2xl sm:text-3xl font-black text-[var(--ink-100)]">{stat.value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-[var(--ink-40)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Skills */}
          <FadeIn delay={0.15} className="w-full max-w-3xl">
            <div className="flex flex-col gap-5 sm:gap-6">
              {[
                {
                  label: 'AI / LLMs / GenAI',
                  items: ['GPT-4o', 'LLaMA', 'LangChain', 'RAG', 'Agentic AI', 'Azure OpenAI', 'Hugging Face'],
                },
                {
                  label: 'ML & Deep Learning',
                  items: ['PyTorch', 'TensorFlow', 'scikit-learn', 'LSTM', 'Transformers', 'ARIMA', 'Anomaly Detection'],
                },
                {
                  label: 'MLOps & Backend',
                  items: ['MLflow', 'Docker', 'Kubernetes', 'FastAPI', 'Flask', 'CI/CD', 'REST APIs'],
                },
                {
                  label: 'Cloud & Data',
                  items: ['Microsoft Azure', 'Azure Document Intelligence', 'Power BI', 'Python', 'SQL', 'PySpark', 'ETL'],
                },
              ].map((group) => (
                <div
                  key={group.label}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5"
                >
                  <span className="text-xs uppercase tracking-widest text-[var(--ink-40)] sm:w-44 sm:shrink-0 sm:text-right">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[var(--ink-15)] bg-[var(--ink-03)] px-3 py-1 text-sm text-[var(--ink-80)] hover:border-[var(--ink-40)] hover:text-[var(--ink-100)] transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
