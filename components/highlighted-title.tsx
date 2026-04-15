'use client';

import { useRef, ReactNode } from 'react';
import { motion, useInView, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

interface HighlightedTitleProps {
  children: ReactNode;
  className?: string;
  highlightColor?: string;
  delay?: number;
}

export function HighlightedTitle({
  children,
  className = '',
  highlightColor = '#EA580C',
  delay = 0.2,
}: HighlightedTitleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const controls = useAnimationControls();

  useEffect(() => {
    if (isInView) {
      // Entrée : rectangle apparaît de gauche à droite
      controls.set({ left: 0, right: '100%' });
      controls.start({
        right: '0%',
        transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
      });
    } else {
      // Sortie : rectangle disparaît de gauche à droite
      controls.start({
        left: '100%',
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      });
    }
  }, [isInView, controls, delay]);

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute top-0 bottom-0 -z-0"
        style={{ backgroundColor: highlightColor }}
        animate={controls}
      />
    </span>
  );
}
