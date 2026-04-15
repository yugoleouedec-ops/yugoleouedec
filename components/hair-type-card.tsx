"use client";

import { motion } from "framer-motion";
import type { HairTypeOption } from "@/lib/constants";
import { hairThemes, themeColors } from "@/lib/theme";
import type { HairType } from "@/lib/types";

interface HairTypeCardProps {
  type: HairTypeOption;
  isActive: boolean;
}

export function HairTypeCard({ type, isActive }: HairTypeCardProps) {
  const theme = hairThemes[type.id as HairType];

  return (
    <motion.div
      className="relative w-[280px] shrink-0 overflow-hidden rounded-3xl"
      style={{
        borderWidth: 2,
        borderColor: isActive ? theme.accentColor : 'transparent',
        boxShadow: isActive ? `0 0 30px ${theme.accentColor}33` : 'none',
      }}
      animate={{
        scale: isActive ? 1 : 0.88,
        opacity: isActive ? 1 : 0.5,
        filter: isActive ? 'grayscale(0%)' : 'grayscale(30%)',
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Hair image or fallback icon */}
      {type.image ? (
        <div className="relative aspect-[3/4]">
          <img
            src={type.image}
            alt={type.label}
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
            <h2 className="mb-1 text-2xl font-bold" style={{ color: themeColors.textPrimary }}>{type.label}</h2>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {type.description}
            </p>
          </div>
        </div>
      ) : (
        <div
          className="flex aspect-[3/4] flex-col items-center justify-center p-8"
          style={{ background: isActive ? theme.gradient : 'rgba(255,255,255,0.05)' }}
        >
          <div
            className="mb-6 flex size-28 items-center justify-center rounded-full"
            style={{
              background: `linear-gradient(135deg, ${theme.accentColor}66, ${theme.accentColor})`,
            }}
          >
            <HairIcon type={type.id} />
          </div>
          <h2 className="mb-2 text-2xl font-bold" style={{ color: themeColors.textPrimary }}>{type.label}</h2>
          <p className="text-center text-sm" style={{ color: themeColors.textMuted }}>
            {type.description}
          </p>
        </div>
      )}
    </motion.div>
  );
}

function HairIcon({ type }: { type: string }) {
  const paths: Record<string, React.ReactNode> = {
    lisses: (
      <svg viewBox="0 0 48 48" className="size-14 text-white">
        <path
          d="M12 8 L12 40 M18 8 L18 40 M24 8 L24 40 M30 8 L30 40 M36 8 L36 40"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
    ondules: (
      <svg viewBox="0 0 48 48" className="size-14 text-white">
        <path
          d="M10 8 Q16 16 10 24 Q4 32 10 40"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M24 8 Q30 16 24 24 Q18 32 24 40"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M38 8 Q44 16 38 24 Q32 32 38 40"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
    boucles: (
      <svg viewBox="0 0 48 48" className="size-14 text-white">
        <path
          d="M12 8 Q20 12 16 20 Q12 28 20 32 Q28 36 24 44"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M28 4 Q36 8 32 16 Q28 24 36 28 Q44 32 40 40"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
    crepus: (
      <svg viewBox="0 0 48 48" className="size-14 text-white">
        <path
          d="M10 10 Q14 8 16 12 Q18 16 14 18 Q10 20 12 24 Q14 28 10 30 Q6 32 8 36 Q10 40 14 38"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M28 6 Q32 4 34 8 Q36 12 32 14 Q28 16 30 20 Q32 24 28 26 Q24 28 26 32 Q28 36 32 34"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
    "semi-lisses": (
      <svg viewBox="0 0 48 48" className="size-14 text-white">
        <path
          d="M12 8 L12 28 Q12 36 16 40"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M24 8 L24 28 Q24 36 28 40"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M36 8 L36 28 Q36 36 40 40"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
  };

  return paths[type] ?? null;
}
