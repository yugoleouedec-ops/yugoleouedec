"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Carousel } from "@/components/carousel";
import { Button } from "@/components/ui/button";
import { HAIR_TYPES } from "@/lib/constants";
import { useFlowStore } from "@/lib/store";
import { hairThemes, themeColors } from "@/lib/theme";

export default function HairScanPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const setHairType = useFlowStore((s) => s.setHairType);

  const currentType = HAIR_TYPES[activeIndex];
  const theme = hairThemes[currentType.id];

  const handleSelect = () => {
    setHairType(currentType.id);
    router.push("/hairscan/photo");
  };

  return (
    <motion.div
      className="flex min-h-dvh flex-col items-center justify-between px-5 py-8"
      style={{ background: theme.gradient, backgroundSize: '200% 200%' }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Header */}
      <div className="flex w-full items-center justify-between">
        <Link
          href="/hairscan"
          className="flex size-10 items-center justify-center rounded-full transition-colors"
          style={{ backgroundColor: themeColors.borderLight }}
        >
          <ArrowLeft className="size-5" style={{ color: themeColors.textPrimary }} />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: themeColors.textPrimary }}>HAIRSCAN</h1>
        <div className="size-10" />
      </div>

      {/* Main content */}
      <div className="flex w-full max-w-md flex-col items-center gap-8">
        <motion.h2
          className="text-center text-xl font-semibold"
          style={{ color: themeColors.textSecondary }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Quel est ton type de cheveux ?
        </motion.h2>

        <Carousel activeIndex={activeIndex} onChange={setActiveIndex} />
      </div>

      {/* CTA */}
      <motion.div className="w-full max-w-md" layout>
        <Button
          className="h-12 w-full text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
          style={{
            backgroundColor: theme.accentColor,
            boxShadow: `0 8px 24px ${theme.accentColor}4D`,
          }}
          onClick={handleSelect}
        >
          C&apos;est mon type
        </Button>
      </motion.div>
    </motion.div>
  );
}
