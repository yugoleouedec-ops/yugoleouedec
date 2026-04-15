'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const staggerItem = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], delay: i * 0.12 },
  }),
};

export function PremiumCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: '-60px' });
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={cardRef} className="mx-auto max-w-[400px] text-center">
      {/* Signature image */}
      {/* TODO: Ajouter signature.jpg dans public/images/ */}
      <motion.div
        className="relative flex h-[134px] items-center justify-center"
        variants={staggerItem}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={0}
      >
        <Image
          src="/images/signature.png"
          alt="Signature Yugo"
          width={202}
          height={134}
          className="object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </motion.div>

      {/* Title */}
      <motion.h2
        className="mt-5 text-center text-[48px] font-extrabold tracking-[-0.02em] text-black sm:text-[54px]"
        variants={staggerItem}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={1}
      >
        Yugo&apos;s Circle
      </motion.h2>

      {/* Animated underline */}
      <motion.div
        style={{ scaleX, transformOrigin: '50% 50%' }}
        className="mx-auto mt-2 h-[3px] w-full bg-[#EA580C]"
      />

      {/* Subtitle */}
      <motion.p
        className="mx-auto mt-4 max-w-[400px] text-center text-[22px] font-semibold leading-snug text-[#737373] sm:text-[24px]"
        variants={staggerItem}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={2}
      >
        Une coupe n&apos;est pas une d&eacute;pense. C&apos;est un investissement sur toi-m&ecirc;me.
      </motion.p>

      {/* Avatars + Stars + social proof */}
      <motion.div
        className="mt-6 flex flex-col items-center gap-3"
        variants={staggerItem}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={3}
      >
        {/* Avatar icons */}
        {/* TODO: Ajouter avatar1.jpg à avatar5.jpg dans public/images/avatars/ */}
        <div className="flex items-center justify-center">
          {[1, 2, 3, 4, 5].map((n, i) => (
            <Image
              key={n}
              src={`/images/avatars/avatar${n}.jpg`}
              alt={`Client ${n}`}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border-2 border-white object-cover"
              style={{ marginLeft: i === 0 ? 0 : '-10px' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ))}
        </div>

        {/* Stars */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#FBBF24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>

        {/* Social proof text */}
        <span className="text-sm font-semibold text-[#4d4d4d]">
          Rejoins +534 mecs qui ont d&eacute;j&agrave; franchi le cap
        </span>
      </motion.div>

      {/* CTA Button */}
      <motion.a
        href="/reservation"
        className="mx-auto mt-6 block rounded-full bg-[#EA580C] px-7 py-3 text-white text-center transition-transform hover:scale-105 sm:px-8 sm:py-3.5"
        variants={staggerItem}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={4}
      >
        <span className="text-base font-semibold">
          R&Eacute;SERVER MA PLACE
          <span className="ml-2 line-through opacity-70">&euro;30</span>
          <span className="ml-1 font-bold" style={{ textShadow: '0 0 8px rgba(255,255,255,0.6), 0 0 16px rgba(255,255,255,0.3)' }}>&euro;20</span>
        </span>
      </motion.a>

      {/* Separator */}
      <motion.div
        className="mx-auto mt-16 h-px w-4/5 bg-[#D4D4D4]"
        variants={staggerItem}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={5}
      />
    </div>
  );
}
