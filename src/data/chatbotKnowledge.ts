// Knowledge base for the portfolio chatbot. Every canned answer here is
// drawn straight from Ramani's resume/portfolio content — nothing invented.

export interface Intent {
  id: string;
  /** Shown as a suggestion chip. */
  suggestion: string;
  /** Keywords used to match free-typed questions to this intent. */
  keywords: string[];
  /** Answer, supports \n for line breaks and "- " for bullet lines. */
  answer: string;
}

export const INTENTS: Intent[] = [
  {
    id: 'projects',
    suggestion: 'What projects has Ramani built?',
    keywords: ['project', 'built', 'built what', 'portfolio', 'work on', 'app', 'system'],
    answer:
      "Ramani's flagship work is FinanceGPT — an agentic AI advisor (LangChain + Azure OpenAI + RAG) that reads bank statements and forecasts cash flow. Alongside it:\n" +
      '- Financial Transaction Intelligence & Reconciliation Platform\n' +
      '- AI Meeting Intelligence & Task Automation (Fireflies.ai + LLM)\n' +
      '- Sales & Logistics Power BI reporting suite\n' +
      '- Conversational TTS synthesis pipeline (Tacotron 2 + LLaMA)\n' +
      '- AI-driven construction safety compliance on Azure\n\n' +
      'Scroll to the Projects section and open "Launch Prototype" on any card to try a live mini-demo.',
  },
  {
    id: 'backend',
    suggestion: "Show me his backend experience.",
    keywords: ['backend', 'back-end', 'server', 'api', 'database', 'sql', 'fastapi', '.net', 'c#'],
    answer:
      'On the backend Ramani works mainly in Python (FastAPI, Flask) and .NET C#, with SQL Server and MySQL for data. At Alpago he designed transactional database architectures with advanced triggers, built REST APIs for financial workflows, and shipped MLOps pipelines (Docker, Kubernetes, MLflow, CI/CD) to get models into production reliably.',
  },
  {
    id: 'hardest',
    suggestion: 'What was the most technically difficult project?',
    keywords: ['difficult', 'hardest', 'challenging', 'hard problem', 'toughest'],
    answer:
      "Probably FinanceGPT's reconciliation engine. The hard part wasn't the LLM — it was fusing raw, inconsistent bank-statement PDFs (via Azure Document Intelligence) with a live transactional ledger and getting automated Chart-of-Accounts matching accurate enough that executives could trust the numbers with zero manual review.",
  },
  {
    id: 'tech',
    suggestion: 'What technologies does he use?',
    keywords: ['technology', 'technologies', 'tech stack', 'stack', 'tools', 'skills', 'languages'],
    answer:
      'AI/GenAI: GPT-4o, LLaMA, LangChain, RAG, Agentic AI, Azure OpenAI, Hugging Face.\n' +
      'ML/DL: PyTorch, TensorFlow, scikit-learn, LSTM, Transformers, ARIMA.\n' +
      'Backend: FastAPI, Flask, .NET C#, React, SQL Server, MySQL.\n' +
      'Cloud/MLOps: Microsoft Azure, Power BI, MLflow, Docker, Kubernetes, CI/CD.',
  },
  {
    id: 'ai-work',
    suggestion: 'Tell me about his AI work.',
    keywords: ['ai work', 'artificial intelligence', 'genai', 'llm', 'agentic', 'machine learning', 'ml work'],
    answer:
      "Ramani builds production Agentic AI — not demos. FinanceGPT is a persistent, multi-turn assistant with tool-calling that queries live trial balances and runs ARIMA + LLM cash-flow forecasts. He also built an AI meeting-intelligence system that extracts tasks/owners/deadlines from transcripts, and a construction-safety system fusing computer vision with IoT sensor data.",
  },
  {
    id: 'hire',
    suggestion: 'Why should I hire him?',
    keywords: ['hire', 'why should', 'why you', 'why him', 'strength', 'value'],
    answer:
      "Because he ships end-to-end: data pipeline, model, API, and the dashboard a non-technical exec actually reads. He's currently building an agentic financial platform directly under a CEO at Alpago Group — meaning his AI work has to hold up against real money and real scrutiny, not just a notebook demo.",
  },
  {
    id: 'experience',
    suggestion: "What's his work experience?",
    keywords: ['experience', 'career', 'job', 'employer', 'company', 'alpago', 'neostats'],
    answer:
      'AI Engineer at Alpago Group, Dubai (Sept 2025 – Present) — building an agentic AI financial intelligence platform under the CEO. Before that, Client Success Manager at Neostats Analytics Solutions (Oct 2024 – Aug 2025), aligning GenAI roadmaps with C-level clients across the GCC.',
  },
  {
    id: 'education',
    suggestion: 'What is his education?',
    keywords: ['education', 'degree', 'university', 'college', 'nit', 'bits', 'mba', 'study'],
    answer:
      'B.Tech in Electronics & Communication Engineering, NIT Delhi (2020–2024). Currently pursuing an MBA in AI for Business at BITS Pilani, Dubai (2026–2028).',
  },
  {
    id: 'certifications',
    suggestion: 'Any certifications?',
    keywords: ['certification', 'certified', 'certificate'],
    answer:
      'Microsoft Fabric Analytics Engineer, Microsoft Security Operations Analyst (SC-200), NVIDIA Prompt Engineering with LLaMA-2, and NVIDIA Deploying RAG Pipelines for Production at Scale.',
  },
  {
    id: 'availability',
    suggestion: 'Is he available for freelance or hire?',
    keywords: ['available', 'freelance', 'hire him', 'open to work', 'contract', 'remote'],
    answer:
      "Yes — Ramani is open to freelance projects, AI consulting, and remote contracts across the GCC and globally, alongside his full-time role. Best next step: use the contact form below or ask me to pass along your details.",
  },
  {
    id: 'contact',
    suggestion: 'How can I contact him?',
    keywords: ['contact', 'email', 'reach', 'instagram', 'linkedin', 'get in touch'],
    answer:
      "Email: ramani1408.ai@gmail.com · LinkedIn: linkedin.com/in/ramani1408 · Instagram: @_raman.ai · Based in Dubai, UAE. Or just tell me what you need and I'll pass it straight to him.",
  },
];

export const GREETING =
  "Hi, I'm Ramani's portfolio assistant. Ask me about his projects, stack, or experience — or pick a suggestion below.";

/** Very small keyword matcher — returns the best-matching intent, if any. */
export function matchIntent(question: string): Intent | null {
  const q = question.toLowerCase();
  let best: { intent: Intent; score: number } | null = null;
  for (const intent of INTENTS) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (q.includes(kw)) score += kw.length; // longer/more-specific keyword wins
    }
    if (score > 0 && (!best || score > best.score)) best = { intent, score };
  }
  return best?.intent ?? null;
}
