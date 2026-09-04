import { useEffect } from 'react';
import { X, Download, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

const ResumeModal = ({ open, onClose }: ResumeModalProps) => {
  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-10"
      style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-3xl flex-col rounded-[32px] border border-[var(--ink-20)] bg-[var(--surface-3)] overflow-hidden"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--ink-10)]">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium uppercase tracking-widest text-[var(--ink-50)]">Resume</span>
            <span className="text-sm font-medium text-[var(--ink-100)]">Ramani Dulipala — AI Engineer</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              download="Ramani_Dulipala_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--ink-20)] bg-[var(--ink-5)] px-4 py-2 text-xs font-medium uppercase tracking-widest text-[var(--ink-100)] transition hover:bg-[var(--ink-10)] hover:border-[var(--ink-40)]"
            >
              <Download size={13} strokeWidth={2} />
              Download PDF
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--ink-20)] bg-[var(--ink-5)] px-4 py-2 text-xs font-medium uppercase tracking-widest text-[var(--ink-100)] transition hover:bg-[var(--ink-10)] hover:border-[var(--ink-40)]"
            >
              <ExternalLink size={13} strokeWidth={2} />
              Open
            </a>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ink-20)] bg-[var(--ink-5)] text-[var(--ink-70)] transition hover:bg-[var(--ink-10)] hover:text-[var(--ink-100)]"
            >
              <X size={16} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Resume PDF preview */}
        <div className="flex-1 overflow-hidden p-2 sm:p-3">
          <iframe
            src="/resume.pdf#toolbar=0"
            title="Ramani Dulipala Resume"
            className="h-full min-h-[60vh] w-full rounded-2xl border border-[var(--ink-10)] bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
