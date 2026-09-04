interface LiveProjectButtonProps {
  label?: string;
  href?: string;
  className?: string;
}

const LiveProjectButton = ({
  label = 'Live Project',
  href = '#',
  className = '',
}: LiveProjectButtonProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center rounded-full border-2 border-[var(--ink-100)] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[var(--ink-100)] whitespace-nowrap transition-colors duration-200 hover:bg-[var(--ink-10)] ${className}`}
    >
      {label}
    </a>
  );
};

export default LiveProjectButton;
