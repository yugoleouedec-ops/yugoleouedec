"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { themeColors } from "@/lib/theme";

interface FlowLayoutProps {
  children: React.ReactNode;
  step: number;
  totalSteps?: number;
  onBack?: () => void;
  backHref?: string;
  accentColor?: string;
  gradient?: string;
  className?: string;
}

export function FlowLayout({
  children,
  step,
  totalSteps = 5,
  onBack,
  backHref,
  accentColor = "#E8742F",
  gradient,
  className,
}: FlowLayoutProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <div
      className={cn("flex min-h-dvh flex-col transition-all duration-300", className)}
      style={gradient ? {
        background: gradient,
        backgroundSize: '200% 200%',
        animation: 'gradient-shift 12s ease-in-out infinite',
      } : undefined}
    >
      {/* Progress bar */}
      <div className="h-1 w-full" style={{ backgroundColor: themeColors.borderLight }}>
        <motion.div
          className="h-full"
          style={{ backgroundColor: accentColor }}
          initial={{ width: 0 }}
          animate={{ width: `${(step / totalSteps) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={handleBack}
          aria-label="Retour"
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <span className="text-sm font-bold tracking-wider" style={{ color: themeColors.textMuted }}>
          HAIRSCAN
        </span>
        <span className="text-sm" style={{ color: themeColors.textMuted }}>
          {step}/{totalSteps}
        </span>
      </header>

      {/* Content */}
      <main className="flex flex-1 flex-col px-5 pb-8">{children}</main>
    </div>
  );
}
