"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { themeColors } from "@/lib/theme";

interface QuestionOptionProps {
  emoji: string;
  label: string;
  selected: boolean;
  onToggle: () => void;
  accentColor?: string;
}

export function QuestionOption({
  emoji,
  label,
  selected,
  onToggle,
  accentColor = "#E8742F",
}: QuestionOptionProps) {
  return (
    <motion.button
      onClick={onToggle}
      className="flex w-full items-center justify-between rounded-xl border-2 px-4 py-3.5 text-left transition-colors"
      style={{
        borderColor: selected ? accentColor : themeColors.borderLight,
        backgroundColor: selected ? `${accentColor}15` : 'rgba(255,255,255,0.05)',
        color: themeColors.textPrimary,
      }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="flex items-center gap-3">
        <span className="text-xl">{emoji}</span>
        <span className="font-medium">{label}</span>
      </span>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        >
          <Check className="size-5" style={{ color: accentColor }} />
        </motion.div>
      )}
    </motion.button>
  );
}
