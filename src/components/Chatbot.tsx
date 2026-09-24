import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, CheckCircle2, Mail } from 'lucide-react';
import { INTENTS, GREETING, matchIntent } from '../data/chatbotKnowledge';
import { sendEnquiry, isEmailConfigured, CONTACT_EMAIL } from '../lib/email';

type Message =
  | { id: string; role: 'bot' | 'user'; kind: 'text'; text: string }
  | { id: string; role: 'bot'; kind: 'lead-form'; question: string; resolved: boolean };

let uid = 0;
const nextId = () => `m${++uid}`;

const formatAnswer = (text: string) =>
  text.split('\n').map((line, i) => (
    <p key={i} className={line.startsWith('- ') ? 'pl-3 -indent-3 before:content-["•_"]' : ''}>
      {line.startsWith('- ') ? line.slice(2) : line}
    </p>
  ));

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: nextId(), role: 'bot', kind: 'text', text: GREETING },
  ]);
  const [input, setInput] = useState('');
  const [usedIntents, setUsedIntents] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasPulsed, setHasPulsed] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  // One-time gentle attention pulse a few seconds after load
  useEffect(() => {
    const t = setTimeout(() => setHasPulsed(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const suggestions = INTENTS.filter((i) => !usedIntents.includes(i.id)).slice(0, 4);

  const pushBot = (text: string) => setMessages((m) => [...m, { id: nextId(), role: 'bot', kind: 'text', text }]);
  const pushUser = (text: string) => setMessages((m) => [...m, { id: nextId(), role: 'user', kind: 'text', text }]);

  const handleAsk = (question: string) => {
    if (!question.trim()) return;
    pushUser(question);
    setInput('');

    const intent = matchIntent(question);
    if (intent) {
      setUsedIntents((u) => [...u, intent.id]);
      setTimeout(() => pushBot(intent.answer), 350);
    } else {
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          { id: nextId(), role: 'bot', kind: 'text', text: "I don't have that answer on file — but I can send it straight to Ramani. He'll get back to you personally." },
          { id: nextId(), role: 'bot', kind: 'lead-form', question, resolved: false },
        ]);
      }, 350);
    }
  };

  const handleChip = (id: string) => {
    const intent = INTENTS.find((i) => i.id === id);
    if (intent) handleAsk(intent.suggestion);
  };

  const resolveLeadForm = (msgId: string) => {
    setMessages((m) => m.map((msg) => (msg.id === msgId && msg.kind === 'lead-form' ? { ...msg, resolved: true } : msg)));
  };

  return (
    <>
      {/* Launcher button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Ask about Ramani'}
        className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-[998] flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full text-white shadow-2xl"
        style={{
          background: 'linear-gradient(123deg,var(--accent-1) 7%,var(--accent-2) 37%,var(--accent-3) 72%,var(--accent-4) 100%)',
          boxShadow: '0px 4px 20px var(--accent-glow)',
        }}
        animate={!open && !hasPulsed ? { scale: [1, 1.08, 1] } : { scale: 1 }}
        transition={{ duration: 1.2, repeat: !open && !hasPulsed ? Infinity : 0, repeatDelay: 1.2 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} strokeWidth={2} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={24} strokeWidth={2} />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400" />
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed z-[997] flex flex-col overflow-hidden border border-[var(--ink-15)] bg-[var(--surface-3)]
                       inset-0 sm:inset-auto sm:bottom-24 sm:right-7 sm:h-[600px] sm:max-h-[80vh] sm:w-[400px] sm:rounded-[28px] sm:shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[var(--ink-10)] px-5 py-4 shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'linear-gradient(123deg,var(--accent-1) 7%,var(--accent-2) 37%,var(--accent-3) 72%,var(--accent-4) 100%)' }}>
                <Sparkles size={17} className="text-white" strokeWidth={2} />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-[var(--ink-100)] truncate">Ask about Ramani</span>
                <span className="flex items-center gap-1.5 text-[11px] text-[var(--ink-45)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Answers instantly · replies via email for the rest
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--ink-50)] hover:bg-[var(--ink-10)] hover:text-[var(--ink-100)] transition sm:hidden"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((msg) => {
                if (msg.kind === 'lead-form') {
                  return <LeadForm key={msg.id} question={msg.question} resolved={msg.resolved} onResolved={() => resolveLeadForm(msg.id)} />;
                }
                const isBot = msg.role === 'bot';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      isBot
                        ? 'self-start rounded-tl-sm bg-[var(--surface-2)] text-[var(--ink-90)]'
                        : 'self-end rounded-tr-sm text-white'
                    }`}
                    style={!isBot ? { background: 'linear-gradient(123deg,var(--accent-1) 7%,var(--accent-2) 37%,var(--accent-3) 72%,var(--accent-4) 100%)' } : undefined}
                  >
                    {formatAnswer(msg.text)}
                  </motion.div>
                );
              })}
            </div>

            {/* Suggestion chips */}
            {suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 px-4 pb-3 shrink-0">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleChip(s.id)}
                    className="rounded-full border border-[var(--ink-15)] bg-[var(--ink-04)] px-3 py-1.5 text-xs text-[var(--ink-75)] transition hover:border-[var(--accent-2)]/50 hover:text-[var(--ink-100)]"
                  >
                    {s.suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAsk(input);
              }}
              className="flex items-center gap-2 border-t border-[var(--ink-10)] px-3 py-3 shrink-0"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a question…"
                className="flex-1 rounded-full border border-[var(--ink-15)] bg-[var(--surface-1)] px-4 py-2.5 text-sm text-[var(--ink-100)] placeholder-[var(--ink-30)] outline-none transition focus:border-[var(--accent-2)]/60"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition disabled:opacity-40"
                style={{ background: 'linear-gradient(123deg,var(--accent-1) 7%,var(--accent-2) 37%,var(--accent-3) 72%,var(--accent-4) 100%)' }}
              >
                <Send size={15} strokeWidth={2.25} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ── Inline lead-capture form shown when a question isn't in the KB ──
const LeadForm = ({ question, resolved, onResolved }: { question: string; resolved: boolean; onResolved: () => void }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error' | 'unconfigured'>('idle');

  if (resolved || status === 'sent') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="self-start flex items-center gap-2 rounded-2xl rounded-tl-sm border border-emerald-400/20 bg-emerald-400/5 px-4 py-2.5 text-sm text-emerald-300 max-w-[85%]">
        <CheckCircle2 size={15} className="shrink-0" />
        Sent — Ramani will get back to you soon.
      </motion.div>
    );
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEmailConfigured) {
      setStatus('unconfigured');
      return;
    }
    setStatus('sending');
    const result = await sendEnquiry({
      subject: `Portfolio Chatbot — question from ${name || 'a visitor'}`,
      name: name || 'Portfolio Visitor',
      email,
      message: question,
    });
    if (result.ok) {
      setStatus('sent');
      onResolved();
    } else {
      setStatus(result.reason === 'not_configured' ? 'unconfigured' : 'error');
    }
  };

  if (status === 'unconfigured') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="self-start flex items-start gap-2 rounded-2xl rounded-tl-sm border border-amber-400/20 bg-amber-400/5 px-4 py-2.5 text-sm text-amber-300 max-w-[85%]">
        <Mail size={15} className="shrink-0 mt-0.5" />
        Live sending isn't wired up yet — email {CONTACT_EMAIL} directly for now.
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSend}
      className="self-start flex w-[85%] flex-col gap-2 rounded-2xl rounded-tl-sm border border-[var(--ink-15)] bg-[var(--surface-2)] p-3.5"
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name (optional)"
        className="rounded-xl border border-[var(--ink-15)] bg-[var(--surface-1)] px-3 py-2 text-xs text-[var(--ink-100)] placeholder-[var(--ink-30)] outline-none focus:border-[var(--accent-2)]/60"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        required
        placeholder="you@email.com (so Ramani can reply)"
        className="rounded-xl border border-[var(--ink-15)] bg-[var(--surface-1)] px-3 py-2 text-xs text-[var(--ink-100)] placeholder-[var(--ink-30)] outline-none focus:border-[var(--accent-2)]/60"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs font-medium uppercase tracking-widest text-white transition disabled:opacity-60"
        style={{ background: 'linear-gradient(123deg,var(--accent-1) 7%,var(--accent-2) 37%,var(--accent-3) 72%,var(--accent-4) 100%)' }}
      >
        {status === 'sending' ? 'Sending…' : 'Send to Ramani'}
      </button>
      {status === 'error' && <p className="text-[11px] text-red-300">Couldn't send — email {CONTACT_EMAIL} directly.</p>}
    </motion.form>
  );
};

export default Chatbot;
