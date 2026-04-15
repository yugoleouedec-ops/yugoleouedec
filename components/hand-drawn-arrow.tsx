'use client';

import { useRef, useEffect, useState } from 'react';

const PATH = 'M30,5 C18,20 42,35 28,55 Q22,68 30,80 C34,88 30,92 30,100 L30,112 M24,104 L30,112 L36,104';
const PATH_LENGTH = 250;

interface HandDrawnArrowProps {
  color?: string;
  className?: string;
}

export function HandDrawnArrow({ color = '#FF6B35', className = '' }: HandDrawnArrowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = ref.current;
    const path = pathRef.current;
    if (!el || !path) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset sans transition, puis animer
          path.style.transition = 'none';
          path.style.strokeDashoffset = `${PATH_LENGTH}`;
          // Force reflow
          path.getBoundingClientRect();
          // Animer
          path.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
          path.style.strokeDashoffset = '0';
        } else {
          // Reset instantané
          path.style.transition = 'none';
          path.style.strokeDashoffset = `${PATH_LENGTH}`;
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`flex justify-center ${className}`}>
      <svg width="90" height="180" viewBox="0 0 60 120" fill="none">
        <path
          ref={pathRef}
          d={PATH}
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
    </div>
  );
}
