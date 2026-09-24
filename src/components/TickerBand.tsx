const STACK_A = ['GPT-4o', 'LangChain', 'Azure OpenAI', 'RAG', 'Agentic AI', 'LLaMA', 'BERT', 'Hugging Face', 'Prompt Engineering', 'Fine-Tuning'];
const STACK_B = ['PyTorch', 'TensorFlow', 'FastAPI', '.NET C#', 'SQL Server', 'Power BI', 'MLflow', 'Docker', 'Kubernetes', 'Azure Document Intelligence', 'n8n', 'React'];

const Strip = ({ items, reverse, className, duration, background }: { items: string[]; reverse?: boolean; className: string; duration: string; background?: string }) => (
  <div className={`marquee overflow-hidden py-3.5 sm:py-4 ${className}`} style={background ? { background } : undefined}>
    <div className={`marquee-track ${reverse ? 'reverse' : ''}`} style={{ ['--marquee-duration' as string]: duration }}>
      {/* the list is rendered twice so the -50% translate loops seamlessly */}
      {[0, 1].map((copy) => (
        <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
          {items.map((item) => (
            <li key={item} className="flex items-center gap-3 px-5 sm:px-7 font-mono text-xs sm:text-sm font-medium uppercase tracking-widest whitespace-nowrap">
              <span className="text-[0.7em] opacity-70">▲</span>
              {item}
            </li>
          ))}
        </ul>
      ))}
    </div>
  </div>
);

/** Two crossing stock-ticker strips of the tech stack — a nod to the finance work. */
const TickerBand = () => (
  <section aria-label="Tech stack" className="relative overflow-hidden py-10 sm:py-14">
    <div className="-rotate-2 scale-105">
      <Strip items={STACK_A} className="text-white" duration="45s" background="var(--accent-gradient)" />
    </div>
    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 rotate-2 scale-105">
      <Strip items={STACK_B} reverse className="border-y border-[var(--band-ink-10)] bg-[var(--band-bg)] text-[var(--band-ink-100)]" duration="55s" />
    </div>
  </section>
);

export default TickerBand;
