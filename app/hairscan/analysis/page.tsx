"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useFlowStore } from "@/lib/store";
import { getMockAnalysis } from "@/lib/mock-data";
import { LOADER_MESSAGES } from "@/lib/constants";
import { getThemeForType, themeColors } from "@/lib/theme";
import { useShaderBackground } from "@/components/ui/animated-shader-hero";

const TOTAL_DURATION = 5000;
const MESSAGE_INTERVAL = TOTAL_DURATION / LOADER_MESSAGES.length;

export default function AnalysisPage() {
  const router = useRouter();
  const { hairType, problems, goal, budget, setAnalysisResult } =
    useFlowStore();

  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [done, setDone] = useState(false);

  const theme = getThemeForType(hairType);
  const canvasRef = useShaderBackground();

  // Redirect if missing data
  useEffect(() => {
    if (!hairType || !goal || !budget) {
      router.replace("/hairscan");
    }
  }, [hairType, goal, budget, router]);

  // Progress bar animation
  useEffect(() => {
    if (!hairType || !goal || !budget) return;

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / TOTAL_DURATION) * 100, 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(timer);
    }, 50);

    return () => clearInterval(timer);
  }, [hairType, goal, budget]);

  // Message cycling
  useEffect(() => {
    if (!hairType || !goal || !budget) return;

    const timer = setInterval(() => {
      setMessageIndex((prev) =>
        prev < LOADER_MESSAGES.length - 1 ? prev + 1 : prev
      );
    }, MESSAGE_INTERVAL);

    return () => clearInterval(timer);
  }, [hairType, goal, budget]);

  // Run analysis and redirect after duration
  useEffect(() => {
    if (!hairType || !goal || !budget || done) return;

    const timeout = setTimeout(() => {
      const result = getMockAnalysis(hairType, problems, goal, budget);
      setAnalysisResult(result);
      setDone(true);
      router.push("/hairscan/results");
    }, TOTAL_DURATION);

    return () => clearTimeout(timeout);
  }, [hairType, problems, goal, budget, setAnalysisResult, router, done]);

  return (
    <div className="relative w-full h-dvh overflow-hidden bg-black">
      {/* Shader background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-contain touch-none"
        style={{ background: "black" }}
      />

      {/* Content overlay */}
      {/* Title at top */}
      <div className="absolute top-[100px] left-0 right-0 z-10 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
          Hair Scan
        </h1>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5">

        {/* Status message */}
        <div className="mb-8 h-12 text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              className="text-lg font-medium"
              style={{ color: themeColors.textPrimary }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {LOADER_MESSAGES[messageIndex]}
            </motion.p>
          </AnimatePresence>
          <p className="mt-1 text-sm" style={{ color: themeColors.textMuted }}>
            Je scanne ta photo et cr&eacute;e ta routine sur-mesure
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-[180px]">
          <div className="h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${theme.accentColor}, ${theme.accentHover})`,
              }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="mt-2 text-center text-sm" style={{ color: themeColors.textMuted }}>
            {Math.round(progress)}%
          </p>
        </div>
      </div>

      {/* Bottom credit */}
      <p className="absolute bottom-[20px] left-0 right-0 z-10 text-center text-sm font-medium tracking-wider" style={{ color: '#E8DFC8' }}>
        Yugo Le Ouedec
      </p>
    </div>
  );
}
