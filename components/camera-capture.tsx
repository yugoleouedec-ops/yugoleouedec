"use client";

import { useState, useRef } from "react";
import { Camera, ImageIcon, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCamera } from "@/hooks/use-camera";
import { compressImage } from "@/lib/image-utils";

interface CameraCaptureProps {
  onCapture: (base64: string) => void;
}

export function CameraCapture({ onCapture }: CameraCaptureProps) {
  const { videoRef, error, isActive, start, stop, capture } = useCamera();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleCapture = () => {
    const photo = capture();
    if (photo) {
      stop();
      setPreview(photo);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) return;

    try {
      const compressed = await compressImage(file);
      setPreview(compressed);
    } catch {
      // Silently fail — user can retry
    }
  };

  const handleRetake = () => {
    setPreview(null);
    start();
  };

  const handleValidate = () => {
    if (preview) {
      onCapture(preview);
    }
  };

  // Preview state
  if (preview) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={preview}
            alt="Aperçu de la photo"
            className="h-auto max-h-[360px] w-full object-cover"
          />
        </div>
        <div className="flex w-full gap-3">
          <Button
            variant="outline"
            className="h-11 flex-1"
            onClick={handleRetake}
          >
            <RotateCcw className="mr-2 size-4" />
            Reprendre
          </Button>
          <Button className="h-11 flex-1" onClick={handleValidate}>
            <Check className="mr-2 size-4" />
            Valider
          </Button>
        </div>
      </div>
    );
  }

  // Camera active state
  if (isActive) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="overflow-hidden rounded-2xl">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-auto max-h-[360px] w-full object-cover"
          />
        </div>
        <Button className="h-11 w-full" onClick={handleCapture}>
          <Camera className="mr-2 size-4" />
          Capturer
        </Button>
      </div>
    );
  }

  // Default state — show buttons
  return (
    <div className="flex flex-col gap-3">
      {error && (
        <p className="rounded-lg bg-destructive/10 p-3 text-center text-sm text-destructive">
          {error}
        </p>
      )}

      <Button className="h-12 w-full text-base" onClick={start}>
        <Camera className="mr-2 size-5" />
        Prendre photo
      </Button>

      <Button
        variant="outline"
        className="h-12 w-full text-base"
        onClick={() => fileInputRef.current?.click()}
      >
        <ImageIcon className="mr-2 size-5" />
        Choisir galerie
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
}
