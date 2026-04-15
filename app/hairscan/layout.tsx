"use client";

import { themeColors } from "@/lib/theme";

export default function HairScanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="dark text-white"
      style={{
        backgroundColor: themeColors.bgPrimary,
        color: themeColors.textPrimary,
      }}
    >
      {children}
    </div>
  );
}
