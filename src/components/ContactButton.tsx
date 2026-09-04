interface ContactButtonProps {
  label?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const ContactButton = ({
  label = 'Contact Me',
  href = '#contact',
  onClick,
  className = '',
}: ContactButtonProps) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white whitespace-nowrap transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${className}`}
      style={{
        background:
          'linear-gradient(123deg, var(--accent-1) 7%, var(--accent-2) 37%, var(--accent-3) 72%, var(--accent-4) 100%)',
        boxShadow:
          '0px 4px 4px var(--accent-glow), 4px 4px 12px var(--accent-3) inset',
        outline: '2px solid var(--accent-outline)',
        outlineOffset: '-3px',
      }}
    >
      {label}
    </a>
  );
};

export default ContactButton;
