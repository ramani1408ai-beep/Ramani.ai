import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import type { ProjectData } from './ProjectsSection';

interface ProjectDetailModalProps {
  project: ProjectData | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const ProjectDetailModal = ({ project, onClose, onPrev, onNext }: ProjectDetailModalProps) => {
  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!project) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose, onPrev, onNext]);

  const Prototype = project?.Prototype;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 md:p-10"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(14px)' }}
          onClick={onClose}
        >
          {/* Prev / Next arrows — desktop */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous project"
            className="hidden sm:flex absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-[var(--ink-20)] bg-[var(--surface-1)] text-[var(--ink-80)] transition hover:border-[var(--accent-2)]/50 hover:text-[var(--ink-100)]"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next project"
            className="hidden sm:flex absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-[var(--ink-20)] bg-[var(--surface-1)] text-[var(--ink-80)] transition hover:border-[var(--accent-2)]/50 hover:text-[var(--ink-100)]"
          >
            <ChevronRight size={18} />
          </button>

          <motion.div
            key={project.number}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-[28px] sm:rounded-[36px] border border-[var(--ink-12)] bg-[var(--surface-3)] shadow-[var(--card-elevation)]"
            style={{ maxHeight: '90vh' }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[var(--ink-10)] px-6 py-5 sm:px-9 sm:py-6">
              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs font-light uppercase tracking-widest text-[var(--ink-45)]">
                  {project.number} · {project.category}
                </span>
                <h3 className="mt-1 text-lg sm:text-2xl font-medium uppercase leading-tight text-[var(--ink-100)]">{project.name}</h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--ink-20)] bg-[var(--ink-05)] text-[var(--ink-70)] transition hover:bg-[var(--ink-10)] hover:text-[var(--ink-100)]"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-9 sm:py-8">
              <p className="text-sm sm:text-base leading-relaxed text-[var(--ink-65)]">{project.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--ink-15)] px-3 py-1 text-[11px] uppercase tracking-wider text-[var(--ink-50)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {project.externalPrototype && (
                <a
                  href={project.externalPrototype.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-[22px] border border-[var(--accent-2)]/30 bg-[var(--accent-2)]/[0.06] px-5 py-4 sm:px-6 transition hover:border-[var(--accent-2)]/55 hover:bg-[var(--accent-2)]/[0.1]"
                >
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-widest text-[var(--accent-2)]">Full click-through demo</p>
                    <p className="mt-1 text-sm text-[var(--ink-70)]">
                      This isn't a simulation — it's the actual FMS product prototype (AI Copilot, capture automation, live reconciliation, reporting) with real demo data.
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-white transition group-hover:scale-[1.03]" style={{ background: 'var(--accent-gradient)', boxShadow: 'var(--accent-shadow)' }}>
                    {project.externalPrototype.label}
                    <ExternalLink size={13} strokeWidth={2.25} />
                  </span>
                </a>
              )}

              {Prototype ? (
                <div className="mt-2">
                  <Prototype key={project.number} />
                </div>
              ) : (
                <p className="mt-6 text-sm text-[var(--ink-40)]">Interactive prototype coming soon.</p>
              )}
            </div>

            {/* Mobile prev/next */}
            <div className="flex sm:hidden shrink-0 items-center justify-between border-t border-[var(--ink-10)] px-6 py-3">
              <button onClick={onPrev} className="flex items-center gap-1 text-xs uppercase tracking-widest text-[var(--ink-60)]">
                <ChevronLeft size={14} /> Prev
              </button>
              <button onClick={onNext} className="flex items-center gap-1 text-xs uppercase tracking-widest text-[var(--ink-60)]">
                Next <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
