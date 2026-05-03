'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

interface Review {
  id: number;
  videoUrl: string;
  clientName: string;
  subtitle: string;
  title: string;
}

const reviews: Review[] = [
  { id: 1, videoUrl: '/videos/avis-1.mov', clientName: 'Louis C.', subtitle: 'Client depuis 6 mois', title: '"C\'est ma meilleure d\u00e9cision"' },
  { id: 2, videoUrl: '/videos/avis-2.mov', clientName: 'Leo A.', subtitle: 'Client depuis 2 ans', title: '"Pas seulement une coupe"' },
  { id: 3, videoUrl: '/videos/avis-3.mov', clientName: 'Matteo D.', subtitle: 'Chang\u00e9 d\u00e8s le premier RDV', title: '"Il prend le temps..."' },
  { id: 4, videoUrl: '/videos/avis-4.mov', clientName: 'Alexandre M.', subtitle: 'Client depuis 1 an', title: '"Un vrai changement"' },
];

const SWIPE_THRESHOLD = 40;
const ROTATIONS = [0, -3, 3, 2];

export function VideoReviewsStack() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const handleSwipe = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, []);

  const getVisibleCards = () => {
    const cards: { review: Review; stackIndex: number }[] = [];
    for (let i = 0; i < 3; i++) {
      const reviewIndex = (currentIndex + i) % reviews.length;
      cards.push({ review: reviews[reviewIndex], stackIndex: i });
    }
    return cards.reverse();
  };

  return (
    <div className="mx-auto w-full max-w-[400px] max-md:w-[90vw]">
      {/* Video stack */}
      <div className="relative h-[600px] w-full max-md:h-[70vh] max-md:max-h-[600px]">
        {getVisibleCards().map(({ review, stackIndex }) => (
          <VideoCard
            key={review.id}
            review={review}
            stackIndex={stackIndex}
            onSwipe={handleSwipe}
            total={reviews.length}
            current={(currentIndex % reviews.length) + 1}
            isMuted={isMuted}
            onToggleMute={() => setIsMuted((m) => !m)}
          />
        ))}

        {/* Desktop arrows */}
        <button
          onClick={handleSwipe}
          className="absolute left-[-56px] top-1/2 z-40 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/20 p-3 backdrop-blur-sm transition-opacity hover:bg-white/40 md:flex"
        >
          <ChevronLeft className="size-5 text-[#1A1A1A]" />
        </button>
        <button
          onClick={handleSwipe}
          className="absolute right-[-56px] top-1/2 z-40 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/20 p-3 backdrop-blur-sm transition-opacity hover:bg-white/40 md:flex"
        >
          <ChevronRight className="size-5 text-[#1A1A1A]" />
        </button>
      </div>

      {/* Title below videos — synced with swipe */}
      <div className="mt-16 h-16 text-center md:h-20">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            className="font-heading text-[1.875rem] font-extrabold text-[#404040] sm:text-[2.25rem] lg:text-[2.625rem]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {reviews[currentIndex % reviews.length].title}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function VideoCard({
  review,
  stackIndex,
  onSwipe,
  total,
  current,
  isMuted,
  onToggleMute,
}: {
  review: Review;
  stackIndex: number;
  onSwipe: () => void;
  total: number;
  current: number;
  isMuted: boolean;
  onToggleMute: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const cardOpacity = useTransform(x, [-200, -100, 0, 100, 200], [0.6, 1, 1, 1, 0.6]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const swiping = useRef(false);

  const isTop = stackIndex === 0;
  const zIndex = 30 - stackIndex * 10;
  const scale = 1 - stackIndex * 0.05;
  const yOffset = stackIndex * 12;
  const rotation = ROTATIONS[stackIndex] ?? 0;

  useEffect(() => {
    if (!videoRef.current) return;
    if (isTop) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isTop]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isTop ? isMuted : true;
    }
  }, [isMuted, isTop]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (swiping.current) return;

    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD || Math.abs(info.velocity.x) > 400) {
      swiping.current = true;
      const direction = info.offset.x > 0 ? 1 : -1;
      animate(x, direction * 400, {
        duration: 0.2,
        ease: [0.32, 0.72, 0, 1],
        onComplete: () => {
          onSwipe();
          x.set(0);
          swiping.current = false;
        },
      });
    } else {
      animate(x, 0, { type: 'spring', stiffness: 500, damping: 30 });
    }
  };

  return (
    <motion.div
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.5}
      dragMomentum={false}
      onDragEnd={isTop ? handleDragEnd : undefined}
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : rotation,
        scale,
        zIndex,
        opacity: isTop ? cardOpacity : 1,
        touchAction: isTop ? 'pan-y' : 'auto',
        willChange: isTop ? 'transform' : 'auto',
      }}
      animate={{ y: yOffset, rotate: isTop ? undefined : rotation, scale }}
      transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
      className="absolute left-0 top-0 h-full w-full cursor-grab active:cursor-grabbing"
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-2xl bg-black"
        style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}
      >
        {videoError ? (
          <div className="flex h-full w-full flex-col items-center justify-center bg-[#1A1A1A]">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#737373" strokeWidth="1.5">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <p className="mt-3 text-sm text-[#737373]">Vid&eacute;o en cours d&apos;ajout</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            src={review.videoUrl}
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted={isTop ? isMuted : true}
            playsInline
            preload="auto"
            onLoadedData={() => {
              if (!isTop && videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
              }
            }}
            onError={() => setVideoError(true)}
          />
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5">
          <h3 className="text-lg font-bold text-white">{review.clientName}</h3>
          <p className="text-sm text-white/80">{review.subtitle}</p>
        </div>

        {isTop && (
          <div className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-sm">
            <span className="text-sm font-medium text-white">{current}/{total}</span>
          </div>
        )}

        {isTop && !videoError && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleMute();
            }}
            className="absolute right-4 top-4 rounded-full bg-black/50 p-2.5 backdrop-blur-sm transition-colors hover:bg-black/70"
          >
            {isMuted ? (
              <VolumeX className="size-4 text-white" />
            ) : (
              <Volume2 className="size-4 text-white" />
            )}
          </button>
        )}
      </div>
    </motion.div>
  );
}
