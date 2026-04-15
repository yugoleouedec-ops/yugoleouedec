"use client";

import { useRouter } from "next/navigation";
import { Sun, User, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { FlowLayout } from "@/components/flow-layout";
import { CameraCapture } from "@/components/camera-capture";
import { useFlowStore } from "@/lib/store";
import { HAIR_TYPES } from "@/lib/constants";
import { getThemeForType, themeColors } from "@/lib/theme";

export default function PhotoPage() {
  const router = useRouter();
  const { hairType, setPhoto, skipPhoto } = useFlowStore();

  const theme = getThemeForType(hairType);

  const handleCapture = (base64: string) => {
    setPhoto(base64);
    router.push("/hairscan/questions");
  };

  const handleSkip = () => {
    skipPhoto();
    router.push("/hairscan/questions");
  };

  return (
    <FlowLayout step={2} backHref="/hairscan" accentColor={theme.accentColor} gradient={theme.gradient}>
      <motion.div
        className="flex flex-1 flex-col gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="mb-2 text-xl font-semibold" style={{ color: themeColors.textPrimary }}>
            Parfait ! Maintenant, montre-moi tes cheveux
          </h1>
          <p className="text-sm" style={{ color: themeColors.textMuted }}>
            Pour une analyse plus pr&eacute;cise :
          </p>
        </div>

        {/* Tips */}
        <div className="flex justify-around rounded-xl p-4" style={{ backgroundColor: themeColors.borderLight }}>
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex size-10 items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <Sun className="size-5" style={{ color: themeColors.textMuted }} />
            </div>
            <span className="text-xs" style={{ color: themeColors.textMuted }}>Lumi&egrave;re naturelle</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex size-10 items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <User className="size-5" style={{ color: themeColors.textMuted }} />
            </div>
            <span className="text-xs" style={{ color: themeColors.textMuted }}>Profil ou face</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex size-10 items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <Eye className="size-5" style={{ color: themeColors.textMuted }} />
            </div>
            <span className="text-xs" style={{ color: themeColors.textMuted }}>Cheveux visibles</span>
          </div>
        </div>

        {/* Camera / Upload */}
        <CameraCapture onCapture={handleCapture} />

        {/* Skip */}
        <button
          onClick={handleSkip}
          className="mt-auto text-center text-sm underline-offset-4 hover:underline"
          style={{ color: themeColors.textMuted }}
        >
          Passer cette &eacute;tape &rarr;
        </button>
      </motion.div>
    </FlowLayout>
  );
}
