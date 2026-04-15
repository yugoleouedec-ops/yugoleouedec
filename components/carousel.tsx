"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HAIR_TYPES } from "@/lib/constants";
import { HairTypeCard } from "./hair-type-card";

interface CarouselProps {
  activeIndex: number;
  onChange: (index: number) => void;
}

export function Carousel({ activeIndex, onChange }: CarouselProps) {
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      onChange(index);
    },
    [activeIndex, onChange]
  );

  const prev = () => {
    if (activeIndex > 0) goTo(activeIndex - 1);
  };

  const next = () => {
    if (activeIndex < HAIR_TYPES.length - 1) goTo(activeIndex + 1);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Cards area */}
      <div className="relative flex w-full items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={prev}
          disabled={activeIndex === 0}
          className="absolute left-0 z-10"
          aria-label="Type précédent"
        >
          <ChevronLeft className="size-6" />
        </Button>

        <div className="overflow-hidden px-12">
          <motion.div
            className="flex justify-center"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x > 60 && activeIndex > 0) {
                goTo(activeIndex - 1);
              } else if (
                info.offset.x < -60 &&
                activeIndex < HAIR_TYPES.length - 1
              ) {
                goTo(activeIndex + 1);
              }
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -100 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <HairTypeCard
                  type={HAIR_TYPES[activeIndex]}
                  isActive={true}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={next}
          disabled={activeIndex === HAIR_TYPES.length - 1}
          className="absolute right-0 z-10"
          aria-label="Type suivant"
        >
          <ChevronRight className="size-6" />
        </Button>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-2">
        {HAIR_TYPES.map((type, i) => (
          <button
            key={type.id}
            onClick={() => goTo(i)}
            className="rounded-full p-1 transition-colors"
            aria-label={`Sélectionner ${type.label}`}
          >
            <div
              className="size-2.5 rounded-full transition-all duration-300"
              style={{
                backgroundColor:
                  i === activeIndex
                    ? HAIR_TYPES[activeIndex].color
                    : "rgba(255, 255, 255, 0.35)",
                transform: i === activeIndex ? "scale(1.4)" : "scale(1)",
                width: i === activeIndex ? 10 : 8,
                height: i === activeIndex ? 10 : 8,
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
