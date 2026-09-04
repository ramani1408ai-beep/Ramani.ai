import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { ReactNode, ElementType } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

const FadeIn = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  as = 'div',
  className,
  style,
}: FadeInProps) => {
  // motion.create() supports dynamic element types in framer-motion v12.
  // IMPORTANT: memoize this — calling motion.create() fresh on every render
  // creates a brand-new component *type* each time, which makes React tear
  // down and remount the entire subtree on every re-render (e.g. losing
  // focus/state in any input nested inside a FadeIn while the parent
  // re-renders, such as typing in the contact form).
  const MotionComponent = useMemo(() => motion.create(as), [as]);

  return (
    <MotionComponent
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={style}
    >
      {children}
    </MotionComponent>
  );
};

export default FadeIn;
