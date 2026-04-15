'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface StickyCard {
  imageUrl: string;
  alt?: string;
  title?: string;
  subtitle?: string;
}

interface StickyScrollCardsProps {
  cards: StickyCard[];
}

function StickyCardItem({ card, index, total }: { card: StickyCard; index: number; total: number }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(popRef, { once: true, margin: '-80px' });
  const [opacity, setOpacity] = useState(1);
  const stickyTop = 160 + index * 20;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      if (rect.top < stickyTop && index < total - 1) {
        const scrolledPast = stickyTop - rect.top;
        const fadeDistance = 300;
        const progress = Math.min(scrolledPast / fadeDistance, 1);
        setOpacity(1 - progress * 0.9);
      } else {
        setOpacity(1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [index, total, stickyTop]);

  return (
    <div ref={wrapperRef} className="mb-10">
      <motion.div
        ref={popRef}
        className="sticky"
        style={{
          top: `${stickyTop - 40}px`,
          opacity,
        }}
        initial={{ opacity: 0, scale: 0.92, y: 40 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.92, y: 40 }}
        transition={{
          duration: 0.5,
          ease: [0.34, 1.56, 0.64, 1],
          delay: 0.1,
        }}
      >
        {/* Pastille bleue — dépasse de moitié au-dessus de l'image */}
        <div className="relative z-10 flex justify-center">
          <img
            src="/images/badges/pastille.png"
            alt="Pastille"
            className="h-20 w-20 object-contain"
            style={{ marginBottom: '-40px' }}
          />
        </div>
        <div
          className="overflow-hidden rounded-3xl"
          style={{
            boxShadow: `0 10px 40px rgba(0,0,0,${0.15 * opacity})`,
          }}
        >
        <div className="relative">
          <img
            src={card.imageUrl}
            alt={card.alt || `Image ${index + 1}`}
            loading="lazy"
            className="w-full object-cover aspect-[4/5]"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/1200x800/F5F1E8/999?text=Image';
            }}
          />
          {/* Title */}
          {card.title && (
            <h3 className="absolute top-10 left-0 right-0 z-10 text-center text-2xl font-extrabold text-[#FFFFFF] sm:text-3xl lg:text-4xl px-6">
              {card.title}
            </h3>
          )}
          {/* Subtitle */}
          {card.subtitle && (
            <p className="absolute bottom-10 left-0 right-0 z-10 text-center text-[1.34rem] font-semibold text-[#FFFFFF] sm:text-[1.49rem] lg:text-[1.79rem] px-6">
              {card.subtitle}
            </p>
          )}
          {/* Gradient overlay — dark at top & bottom, clear in the middle */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.90) 100%)',
            }}
          />
        </div>
        </div>
      </motion.div>
    </div>
  );
}

export function StickyScrollCards({ cards }: StickyScrollCardsProps) {
  return (
    <div className="w-full px-[5%]">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center pb-24 md:pb-48">
          <div className="w-full">
            {cards.map((card, index) => (
              <StickyCardItem
                key={index}
                card={card}
                index={index}
                total={cards.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
