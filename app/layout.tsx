import type { Metadata, Viewport } from "next";

import "./globals.css";
import { cn } from "@/lib/utils";
import { GuideBottomSheet } from "@/components/guide-promo";

export const metadata: Metadata = {
  title: "Yugo Le Ouedec \u2014 Expert Capillaire & Cr\u00e9ateur de Contenu",
  description:
    "Expert capillaire et cr\u00e9ateur de contenu. D\u00e9couvre HairScan, l\u2019outil IA qui analyse tes cheveux et te recommande une routine personnalis\u00e9e.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className="antialiased">
      <body
        className={cn(
          "min-h-dvh bg-[#F5F1E8] text-[#1A1A1A]",
          "font-sans",
        )}
      >
        {children}
        <GuideBottomSheet />
      </body>
    </html>
  );
}
