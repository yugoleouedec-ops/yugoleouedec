'use client';

import { useRef, ReactNode, useEffect } from 'react';
import { useInView } from 'framer-motion';

const CIRCLE_PATH =
  'M20,40 C20,10 180,2 190,35 C200,68 25,78 15,45 C8,20 175,-5 195,38';
const PATH_LENGTH = 600;

interface CircledTextProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

export function CircledText({
  children,
  color = '#EA580C',
  className = '',
}: CircledTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    if (isInView) {
      path.style.transition = 'none';
      path.style.strokeDashoffset = `${PATH_LENGTH}`;
      path.getBoundingClientRect();
      path.style.transition = 'stroke-dashoffset 1.2s ease-in-out';
      path.style.strokeDashoffset = '0';
    } else {
      path.style.transition = 'none';
      path.style.strokeDashoffset = `${PATH_LENGTH}`;
    }
  }, [isInView]);

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <svg
        className="absolute -inset-x-3 -inset-y-2 w-[calc(100%+24px)] h-[calc(100%+16px)] z-0 pointer-events-none"
        viewBox="0 0 210 80"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d={CIRCLE_PATH}
          stroke={color}
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: PATH_LENGTH,
            strokeDashoffset: PATH_LENGTH,
          }}
        />
      </svg>
    </span>
  );
}
