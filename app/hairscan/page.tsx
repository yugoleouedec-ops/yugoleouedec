"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import Hero from "@/components/ui/animated-shader-hero";

export default function HairScanWelcome() {
  const router = useRouter();

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
            text: "Commencer mon HairScan",
            onClick: () => router.push("/hairscan/type"),
          },
        }}
      />
    </>
  );
}
