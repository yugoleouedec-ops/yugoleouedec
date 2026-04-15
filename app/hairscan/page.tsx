"use client";

import { Header } from "@/components/header";
import Hero from "@/components/ui/animated-shader-hero";

export default function HairScanWelcome() {
  return (
    <>
      <Header />
      <Hero
        headline={{
          line1: "Hair Scan",
          line2: "",
        }}
        subtitle="Découvre ta routine personnalisée en 2 minutes."
        checklist={["Analyse IA", "Recommandations produits", "Adaptés à tes cheveux"]}
        buttons={{
          primary: {
            text: "BIENTÔT DISPONIBLE...",
            disabled: true,
          },
        }}
      />
    </>
  );
}
