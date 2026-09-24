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
      "Ramani's flagship work is FinanceGPT — an agentic AI financial advisor built for Alpago's CEO (LangChain + Azure OpenAI GPT-4o + RAG) that parses bank statements, forecasts cash flow and answers live questions about trial balances. Alongside it:\n" +
      '- Corporate Finance & Contract Payments Management Module (.NET C#, SQL Server, React)\n' +
      '- AI Meeting Intelligence & Task Automation (Fireflies.ai + LLM + n8n)\n' +
      '- Financial Transaction Intelligence & Reconciliation Platform\n' +
      '- Sales & Logistics Power BI reporting suite\n' +
      '- Conversational TTS synthesis pipeline (Tacotron 2 + LLaMA)\n' +
      '- AI-driven construction safety compliance on Azure\n\n' +
      'Scroll to the Projects section and open "Launch Prototype" on any card to try a live mini-demo.',
  },
  {
    id: 'corporate-finance',
    suggestion: 'What is the Corporate Finance Module?',
    keywords: ['corporate finance', 'contract', 'payments', 'cheque', 'check monitoring', 'month-end', 'month end', 'waterfall'],
    answer:
      "A centralised Corporate Finance Module Ramani architected at Alpago (2026) to govern enterprise-wide spending. It includes a contract payments management system and integrated check monitoring engines, automatically generates and distributes month-end management reports (no more manual reconciliation), and runs on optimised transactional database architecture with advanced triggers and C# data models for accurate ledger tracking and waterfall allocation.\n\n" +
      'Stack: .NET C#, SQL Server, Python, React, JavaScript, automated workflows, Power BI.',
  },
  {
    id: 'backend',
    suggestion: "Show me Ramani's backend experience.",
    keywords: ['backend', 'back-end', 'server', 'api', 'database', 'sql', 'fastapi', '.net', 'c#', 'trigger'],
    answer:
      'On the backend Ramani works mainly in Python (FastAPI, Flask) and .NET C#, with SQL Server and MySQL for data. At Alpago that means transactional database architectures with advanced triggers and debugging routines for flawless ledger entries and trial balance reporting, check monitoring engines and contract payment workflows, REST APIs for financial systems, and MLOps pipelines (Docker, Kubernetes, MLflow, CI/CD) to get models into production reliably.',
  },
  {
    id: 'hardest',
    suggestion: 'What was the most technically difficult project?',
    keywords: ['difficult', 'hardest', 'challenging', 'hard problem', 'toughest', 'hardest project', 'difficult project', 'challenging project'],
    answer:
      "Probably FinanceGPT's statement-to-cash-flow pipeline. The hard part wasn't the LLM — it was turning raw, inconsistent bank-statement PDFs (via Azure Document Intelligence) into structured data, reconciling it against a live transactional ledger, and making the resulting liquidity insights and forecasts accurate enough that executive management could trust them without manual review.",
  },
  {
    id: 'tech',
    suggestion: 'What technologies does Ramani use?',
    keywords: ['technology', 'technologies', 'tech stack', 'stack', 'tools', 'skills', 'programming languages', 'coding languages'],
    answer:
      'AI/GenAI: GPT-4o, LLaMA, BERT, LangChain, RAG, Prompt Engineering, Fine-Tuning, Agentic AI, Azure OpenAI, Hugging Face Transformers.\n' +
      'ML/DL: scikit-learn, PyTorch, TensorFlow, LSTM, Transformers, Hybrid ML, Anomaly Detection, ARIMA forecasting.\n' +
      'Software: .NET C#, React, JavaScript, FastAPI, Flask, REST APIs.\n' +
      'Data: Python, SQL Server, MySQL, ETL pipelines, n8n, Azure Document Intelligence, database triggers.\n' +
      'Cloud/BI/MLOps: Microsoft Azure, Azure Cognitive Services, Power BI, DAX, MLflow, Docker, Kubernetes, CI/CD.',
  },
  {
    id: 'ai-work',
    suggestion: "Tell me about Ramani's AI work.",
    keywords: ['ai work', 'artificial intelligence', 'genai', 'llm', 'agentic', 'machine learning', 'ml work'],
    answer:
      "Ramani builds production Agentic AI — not demos. FinanceGPT is a persistent, multi-turn assistant with function-calling that lets management query live trial balances, ARIMA + LLM cash-flow forecasts and anomaly alerts. Ramani also built an AI meeting-intelligence system that extracts tasks, owners and deadlines from Fireflies.ai transcripts and pushes a prioritised action board to Slack and email, plus a construction-safety system fusing computer vision with IoT sensor data.",
  },
  {
    id: 'hire',
    suggestion: 'Why should I hire Ramani?',
    keywords: ['hire', 'why should', 'why you', 'why ramani', 'strength', 'value'],
    answer:
      "Because Ramani ships end-to-end: data pipeline, model, API, database, and the dashboard a non-technical exec actually reads. At Alpago Group, Ramani works directly under the CEO building an agentic financial platform — AI that has to hold up against real money and real scrutiny, not just a notebook demo. Add a client-facing background from Neostats (turning GenAI use-cases into measurable ROI for C-level clients) and you get an engineer who speaks both code and business.",
  },
  {
    id: 'experience',
    suggestion: "What's Ramani's work experience?",
    keywords: ['experience', 'career', 'job', 'employer', 'company', 'alpago', 'neostats', 'worked', 'work before', 'previous', 'background'],
    answer:
      'AI Engineer at Alpago Group, Dubai (Sept 2025 – Present), working directly under the CEO:\n' +
      '- Agentic AI Financial Intelligence Platform — automated reporting, statement parsing and cash-flow analysis\n' +
      '- FinanceGPT, an LLM advising bot for executive management\n' +
      '- Corporate Finance Module with contract payments, check monitoring and automated month-end reports\n' +
      '- MLOps pipelines and Power BI dashboards on hybrid ML models\n\n' +
      'Before that, Client Success Manager at Neostats Analytics Solutions, Dubai (Oct 2024 – Aug 2025): aligned GenAI roadmaps with C-level objectives, led end-to-end AI project delivery and built custom AI demos for GCC clients.',
  },
  {
    id: 'education',
    suggestion: "What is Ramani's education?",
    keywords: ['education', 'degree', 'university', 'college', 'nit', 'bits', 'mba', 'study'],
    answer:
      'B.Tech in Electronics & Communication Engineering, NIT Delhi (2020–2024). Currently pursuing an MBA in AI for Business at BITS Pilani, Dubai Campus (2026–2028).',
  },
  {
    id: 'certifications',
    suggestion: 'Any certifications?',
    keywords: ['certification', 'certified', 'certificate'],
    answer:
      'Microsoft Fabric Analytics Engineer, Microsoft Security Operations Analyst (SC-200), NVIDIA Prompt Engineering with LLaMA-2, and NVIDIA Deploying RAG Pipelines for Production at Scale.',
  },
  {
    id: 'languages',
    suggestion: 'What languages does Ramani speak?',
    keywords: ['speak', 'spoken', 'language', 'languages', 'arabic', 'hindi', 'telugu', 'english'],
    answer: 'English (fluent), Telugu (native), Hindi (fluent) and Arabic (basic).',
  },
  {
    id: 'availability',
    suggestion: 'Is Ramani available for freelance or hire?',
    keywords: ['available', 'freelance', 'hire ramani', 'open to work', 'contract work', 'remote'],
    answer:
      "Yes — Ramani is open to freelance projects, AI consulting, and remote contracts across the GCC and globally, alongside the full-time role at Alpago. Best next step: use the contact form below or ask me to pass along your details.",
  },
  {
    id: 'contact',
    suggestion: 'How can I contact Ramani?',
    keywords: ['contact', 'email', 'reach', 'instagram', 'linkedin', 'get in touch'],
    answer:
      "Email: ramani1408.ai@gmail.com · LinkedIn: linkedin.com/in/ramani1408 · Instagram: @_raman.ai · Based in Dubai, UAE. Or just tell me what you need and I'll pass it straight along.",
  },
];

export const GREETING =
  "Hi, I'm Ramani's portfolio assistant. Ask me about Ramani's projects, stack, or experience — or pick a suggestion below.";

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
