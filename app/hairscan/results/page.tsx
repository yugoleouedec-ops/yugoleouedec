"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowLeft,
  Star,
  ExternalLink,
  Download,
  Lock,
  Check,
  Zap,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFlowStore } from "@/lib/store";
import { getThemeForType, themeColors } from "@/lib/theme";
import type { Product } from "@/lib/types";

/* ─── Labels ─── */
const TYPE_LABELS: Record<string, string> = {
  lisses: "Raides", ondules_2A: "Lisses 2A", ondules_2B: "Lisses 2B",
  ondules_2C: "Lisses 2C", boucles_3A: "Bouclés 3A", boucles_3B: "Bouclés 3B",
  boucles_3C: "Bouclés 3C", crepus_4A: "Crépus 4A", crepus_4B: "Crépus 4B",
  crepus_4C: "Crépus 4C", "semi-lisses": "Semi-lisses",
};
const POROSITY_LABELS: Record<string, string> = { faible: "Faible", moyenne: "Moyenne", haute: "Haute" };
const HEALTH_LABELS: Record<string, string> = { sain: "Sain", abime: "Abimé", "tres-abime": "Très abimé" };
const POROSITY_PCT: Record<string, number> = { faible: 30, moyenne: 60, haute: 90 };
const HEALTH_PCT: Record<string, number> = { sain: 95, abime: 50, "tres-abime": 20 };
const HEALTH_COLOR: Record<string, string> = { sain: "#4ADE80", abime: "#F59E0B", "tres-abime": "#DC2626" };

/* ─── Fade-in wrapper ─── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Animated progress bar ─── */
function StatBar({ label, value, pct, color, delay }: { label: string; value: string; pct: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <span className="text-[12px] font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</span>
      <span className="text-[18px] font-bold" style={{ color: themeColors.textPrimary }}>{value}</span>
      <div className="h-1.5 w-full rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: "0%" }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.5, ease: "easeOut", delay }}
        />
      </div>
    </div>
  );
}

/* ─── Swipe carousel (for rules & products) ─── */
function SwipeCarousel({ items, renderItem, dotColor }: {
  items: unknown[];
  renderItem: (item: unknown, index: number, isActive: boolean) => React.ReactNode;
  dotColor: string;
}) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(0);

  const go = useCallback((i: number) => {
    setDir(i > active ? 1 : -1);
    setActive(i);
  }, [active]);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-full flex items-center justify-center">
        <button
          onClick={() => active > 0 && go(active - 1)}
          className="absolute left-0 z-10 p-2 rounded-full"
          style={{ color: active > 0 ? "white" : "rgba(255,255,255,0.2)" }}
        >
          <ChevronLeft className="size-6" />
        </button>

        <div className="overflow-hidden w-full max-w-[400px] px-10">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              initial={{ opacity: 0, x: dir * 120 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -120 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x > 60 && active > 0) go(active - 1);
                else if (info.offset.x < -60 && active < items.length - 1) go(active + 1);
              }}
            >
              {renderItem(items[active], active, true)}
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => active < items.length - 1 && go(active + 1)}
          className="absolute right-0 z-10 p-2 rounded-full"
          style={{ color: active < items.length - 1 ? "white" : "rgba(255,255,255,0.2)" }}
        >
          <ChevronRight className="size-6" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-2">
        {items.map((_, i) => (
          <button key={i} onClick={() => go(i)} className="p-1">
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: i === active ? 10 : 8,
                height: i === active ? 10 : 8,
                backgroundColor: i === active ? dotColor : "rgba(255,255,255,0.3)",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Accordion item ─── */
function AccordionItem({ icon, title, children, checked, onCheck, accentColor }: {
  icon: string; title: string; children: React.ReactNode;
  checked: boolean; onCheck: () => void; accentColor: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl transition-colors"
      style={{ backgroundColor: open ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)" }}
    >
      {/* Header row: checkbox + icon/title + chevron */}
      <div className="flex w-full items-center gap-3 p-5">
        {/* Checkbox always visible */}
        <button
          onClick={(e) => { e.stopPropagation(); onCheck(); }}
          className="flex-shrink-0"
        >
          <motion.div
            className="flex size-7 items-center justify-center rounded-lg border-2 transition-colors"
            style={{
              borderColor: checked ? "#4ADE80" : "rgba(255,255,255,0.25)",
              backgroundColor: checked ? "#4ADE80" : "transparent",
            }}
            animate={checked ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.2 }}
          >
            {checked && <Check className="size-4 text-white" />}
          </motion.div>
        </button>

        {/* Title area (clickable to expand) */}
        <button
          className="flex flex-1 items-center justify-between min-w-0"
          onClick={() => setOpen(!open)}
        >
          <span className="flex items-center gap-3 min-w-0">
            <span className="text-2xl flex-shrink-0">{icon}</span>
            <span className={`text-base font-semibold text-left ${checked ? "line-through opacity-60" : "text-white"}`}>{title}</span>
          </span>
          <motion.div className="flex-shrink-0 ml-2" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="size-5 text-white/60" />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-0 pl-[72px]">
              <div className="border-t border-white/10 pt-4 flex flex-col gap-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Star rating ─── */
function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`size-4 ${s <= Math.round(rating) ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`} />
      ))}
      <span className="ml-1 text-sm font-medium text-white">{rating.toFixed(1)}</span>
    </span>
  );
}

/* ─── Confetti ─── */
function Confetti() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-sm"
          style={{
            width: 8 + Math.random() * 6,
            height: 8 + Math.random() * 6,
            backgroundColor: ["#E8742F", "#C9A66B", "#F59E0B", "#4ADE80", "#FFFFFF"][i % 5],
            left: `${Math.random() * 100}%`,
            top: -20,
          }}
          animate={{
            y: [0, window?.innerHeight ? window.innerHeight + 100 : 900],
            x: [0, (Math.random() - 0.5) * 200],
            rotate: [0, Math.random() * 720],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: Math.random() * 0.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════ */

export default function ResultsPage() {
  const router = useRouter();
  const { hairType, analysisResult, photoBase64, reset } = useFlowStore();
  const [pdfLoading, setPdfLoading] = useState(false);
  const [gestesChecked, setGestesChecked] = useState([false, false, false]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showRdvBloc, setShowRdvBloc] = useState(false);
  const [allRulesSeen, setAllRulesSeen] = useState(false);

  const theme = getThemeForType(hairType);

  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const rdvRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!analysisResult) {
      router.replace("/hairscan");
    }
  }, [analysisResult, router]);

  // Confetti when all 3 gestes checked → then RDV CTA reveal
  useEffect(() => {
    if (gestesChecked.every(Boolean) && !showConfetti && !showRdvBloc) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      setTimeout(() => {
        setShowRdvBloc(true);
        setTimeout(() => rdvRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      }, 4000);
    }
  }, [gestesChecked, showConfetti, showRdvBloc]);

  if (!analysisResult) return null;

  const { profile, routine, products, coutTotal } = analysisResult;

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleGeste = (i: number) => {
    setGestesChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const handleRestart = () => { reset(); router.push("/hairscan"); };

  /* ─── Rules data ─── */
  const rules = [
    {
      icon: "🚫", num: "#1", title: "Jette ton shampooing cheap",
      why: "Les SULFATES dessèchent et rendent tes cheveux encore plus ternes et cassants.",
      solution: "Shampooing SANS sulfates (on te recommande un juste après)",
    },
    {
      icon: "🔥", num: "#2", title: "Arrête de cramer tes cheveux",
      why: "Lisseur à 200°C = cheveux encore PLUS raides + cassants.",
      solution: "Si tu dois sécher, DIFFUSEUR basse température : 4 sec chaud, 3 sec froid.",
    },
    {
      icon: "🪮", num: "#3", title: "Arrête de brosser comme un fou",
      why: "Trop brosser = cheveux ultra plats collés au crâne.",
      solution: "Brosse UNIQUEMENT quand mouillés (après shampooing). Sinon : juste les doigts.",
    },
  ];

  /* ─── PDF download ─── */
  const handleDownloadPDF = async () => {
    setPdfLoading(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      doc.setFontSize(24); doc.setFont("helvetica", "bold");
      doc.text("HAIRSCAN", 105, 25, { align: "center" });
      doc.setFontSize(12); doc.setFont("helvetica", "normal");
      doc.text("Ton analyse capillaire personnalisée", 105, 33, { align: "center" });
      doc.setFontSize(16); doc.setFont("helvetica", "bold");
      doc.text("Ton Profil", 20, 50);
      doc.setFontSize(12); doc.setFont("helvetica", "normal");
      doc.text(`Type : ${TYPE_LABELS[profile.typeConfirme] ?? profile.typeConfirme}`, 20, 62);
      doc.text(`Porosité : ${POROSITY_LABELS[profile.porosite]}`, 20, 70);
      doc.text(`État : ${HEALTH_LABELS[profile.etat]}`, 20, 78);
      doc.setFontSize(16); doc.setFont("helvetica", "bold");
      doc.text("Ta Routine", 20, 96);
      doc.setFontSize(12); doc.setFont("helvetica", "normal");
      doc.text(`Fréquence de lavage : ${routine.frequenceLavage}`, 20, 108);
      let y = 120;
      doc.setFont("helvetica", "bold"); doc.text("Conseils :", 20, y); y += 8;
      doc.setFont("helvetica", "normal");
      routine.conseils.forEach((c: string) => { const l = doc.splitTextToSize(`- ${c}`, 170); doc.text(l, 20, y); y += l.length * 6 + 2; });
      y += 6; doc.setFont("helvetica", "bold"); doc.text("Gestes à adopter :", 20, y); y += 8;
      doc.setFont("helvetica", "normal");
      routine.gestes.forEach((g: string) => { const l = doc.splitTextToSize(`- ${g}`, 170); doc.text(l, 20, y); y += l.length * 6 + 2; });
      doc.addPage();
      doc.setFontSize(16); doc.setFont("helvetica", "bold"); doc.text("Tes Produits Recommandés", 20, 25);
      y = 40;
      products.forEach((p: Product, i: number) => {
        doc.setFontSize(14); doc.setFont("helvetica", "bold"); doc.text(`${i + 1}. ${p.nom}`, 20, y); y += 8;
        doc.setFontSize(11); doc.setFont("helvetica", "normal");
        doc.text(`Marque : ${p.marque}`, 25, y); y += 6;
        doc.text(`Prix : ${p.prix.toFixed(2)}${p.devise}`, 25, y); y += 6;
        doc.text(`Note : ${p.noteUtilisateurs}/5 (${p.nombreAvis} avis)`, 25, y); y += 10;
      });
      y += 6; doc.setFontSize(14); doc.setFont("helvetica", "bold");
      doc.text(`Coût total : ${coutTotal.toFixed(2)}€`, 20, y);
      const now = new Date().toLocaleDateString("fr-FR");
      doc.setFontSize(9); doc.setFont("helvetica", "normal");
      doc.text(`HairScan - Généré le ${now}`, 105, 285, { align: "center" });
      doc.save("hairscan-routine.pdf");
    } catch { /* silent */ } finally { setPdfLoading(false); }
  };

  return (
    <div className="flex min-h-dvh flex-col" style={{ backgroundColor: themeColors.bgPrimary, color: themeColors.textPrimary }}>
      {showConfetti && <Confetti />}

      {/* ════════ SECTION 1 : PROFIL CAPILLAIRE ════════ */}
      <section
        className="relative min-h-dvh flex flex-col px-5 pt-4 pb-10"
        style={{ background: theme.gradient, backgroundSize: "200% 200%", animation: "gradient-shift 12s ease-in-out infinite" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={handleRestart} className="flex size-10 items-center justify-center rounded-full bg-white/10">
            <ArrowLeft className="size-5 text-white" />
          </button>
          <span className="text-sm font-bold tracking-wider text-white/50">HAIRSCAN</span>
          <div className="size-10" />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-8 max-w-md mx-auto w-full">
          {/* Title */}
          <Reveal>
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full" style={{ backgroundColor: `${theme.accentColor}30` }}>
                <Check className="size-8" style={{ color: theme.accentColor }} />
              </div>
              <h1 className="text-[32px] font-bold tracking-tight">Ton Profil Capillaire</h1>

              {/* Selfie / placeholder */}
              <div
                className="mx-auto mt-5 size-28 rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  backgroundColor: photoBase64 ? "transparent" : "rgba(255,255,255,0.18)",
                  border: `2px solid ${photoBase64 ? theme.accentColor : "rgba(255,255,255,0.22)"}`,
                  boxShadow: photoBase64 ? `0 6px 20px ${theme.accentColor}40` : "none",
                }}
              >
                {photoBase64 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photoBase64}
                    alt="Ton selfie"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid slice"
                    className="w-full h-full"
                    aria-hidden="true"
                  >
                    <circle cx="50" cy="40" r="18" fill="rgba(255,255,255,0.55)" />
                    <ellipse cx="50" cy="104" rx="32" ry="26" fill="rgba(255,255,255,0.55)" />
                  </svg>
                )}
              </div>
            </div>
          </Reveal>

          {/* Profile card */}
          <Reveal delay={0.2} className="w-full">
            <div className="rounded-2xl p-6 flex flex-col gap-5" style={{ backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.15)" }}>
              <StatBar label="TYPE" value={TYPE_LABELS[profile.typeConfirme] ?? profile.typeConfirme} pct={100} color="#4ADE80" delay={0.4} />
              <StatBar label="POROSITÉ" value={POROSITY_LABELS[profile.porosite]} pct={POROSITY_PCT[profile.porosite]} color={theme.accentColor} delay={0.6} />
              <StatBar label="ÉTAT" value={HEALTH_LABELS[profile.etat]} pct={HEALTH_PCT[profile.etat]} color={HEALTH_COLOR[profile.etat]} delay={0.8} />
            </div>
          </Reveal>

          {/* Wash frequency */}
          <Reveal delay={0.5}>
            <p className="text-center text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
              Lavage recommandé : <span className="font-semibold text-white">{routine.frequenceLavage}</span>
            </p>
          </Reveal>

          {/* CTA */}
          <Reveal delay={0.6} className="w-full">
            <button
              onClick={() => scrollTo(section2Ref)}
              className="w-full py-4 rounded-xl font-semibold text-base text-white transition-all duration-300 hover:scale-[1.02]"
              style={{ backgroundColor: theme.accentColor, boxShadow: `0 8px 24px ${theme.accentColor}4D` }}
            >
              VOIR MA ROUTINE ↓
            </button>
          </Reveal>
        </div>
      </section>

      {/* ════════ TES PRODUITS ════════ */}
      <section ref={section4Ref} className="px-5 py-16" style={{ backgroundColor: themeColors.bgPrimary }}>
        <Reveal className="text-center mb-8">
          <h2 className="text-[28px] font-bold">Tes Produits</h2>
          <p className="mt-1 text-base" style={{ color: "rgba(255,255,255,0.5)" }}>(Exactement ce qu&apos;il te faut)</p>
          <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>{'<-'} Swipe pour voir {'->'}</p>
        </Reveal>

        <SwipeCarousel
          items={products}
          dotColor={theme.accentColor}
          renderItem={(item) => {
            const p = item as Product;
            return (
              <div
                className="rounded-2xl p-6 flex flex-col gap-4"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <div className="w-full aspect-square max-w-[200px] mx-auto rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
                  {p.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.imageUrl}
                      alt={p.nom}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <span className="text-6xl">🧴</span>
                  )}
                </div>
                <div>
                  <p className="text-lg font-semibold">{p.nom}</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>{p.marque}</p>
                </div>
                <StarRating rating={p.noteUtilisateurs} />
                <div>
                  <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>Pourquoi ce produit ?</p>
                  <p className="text-sm mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>{p.descriptionCourte}</p>
                </div>
                <p className="text-2xl font-bold" style={{ color: theme.accentColor }}>
                  {p.prix.toFixed(2)}{p.devise}
                </p>
                <a href={p.lienAmazon} target="_blank" rel="noopener noreferrer">
                  <button
                    className="w-full py-3 rounded-xl font-semibold text-sm border-2 transition-all duration-300 hover:text-white"
                    style={{ borderColor: theme.accentColor, color: theme.accentColor }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.accentColor; e.currentTarget.style.color = "white"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = theme.accentColor; }}
                  >
                    VOIR SUR AMAZON →
                  </button>
                </a>
              </div>
            );
          }}
        />

        <Reveal delay={0.2} className="mt-8 flex flex-col items-center gap-4 max-w-md mx-auto w-full">
          <p className="text-lg font-semibold">Coût total : <span style={{ color: theme.accentColor }}>{coutTotal.toFixed(2)}€</span></p>
        </Reveal>
      </section>

      {/* ════════ LES 3 RÈGLES D'OR ════════ */}
      <section ref={section2Ref} className="px-5 py-16" style={{ backgroundColor: themeColors.bgPrimary }}>
        <Reveal className="text-center mb-8">
          <h2 className="text-[28px] font-bold">Les 3 Règles d&apos;Or</h2>
          <p className="mt-1 text-base" style={{ color: "rgba(255,255,255,0.5)" }}>(Pour pas niquer tes cheveux)</p>
          <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>← Swipe pour voir →</p>
        </Reveal>

        <SwipeCarousel
          items={rules}
          dotColor={theme.accentColor}
          renderItem={(item) => {
            const r = item as typeof rules[0];
            return (
              <div
                className="rounded-[20px] p-8 flex flex-col gap-4"
                style={{ backgroundColor: "rgba(255,255,255,0.12)", backdropFilter: "blur(14px)", border: "2px solid rgba(255,255,255,0.15)" }}
              >
                <span className="text-5xl">{r.icon}</span>
                <div>
                  <span className="text-sm font-bold tracking-wider" style={{ color: theme.accentColor }}>RÈGLE {r.num}</span>
                  <h3 className="text-xl font-bold mt-1">{r.title}</h3>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.7)" }}>Pourquoi ?</p>
                  <p className="text-sm leading-relaxed mt-1" style={{ color: "rgba(255,255,255,0.8)" }}>{r.why}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#4ADE80" }}>✅ Solution :</p>
                  <p className="text-sm leading-relaxed mt-1" style={{ color: "rgba(255,255,255,0.8)" }}>{r.solution}</p>
                </div>
              </div>
            );
          }}
        />

        <Reveal delay={0.2} className="mt-8 text-center flex flex-col items-center gap-4">
          <p className="text-sm font-medium" style={{ color: "#4ADE80" }}>✅ T&apos;as capté les 3 règles !</p>
          <button
            onClick={() => scrollTo(section3Ref)}
            className="w-full max-w-md py-4 rounded-xl font-semibold text-base text-white transition-all duration-300 hover:scale-[1.02]"
            style={{ backgroundColor: theme.accentColor, boxShadow: `0 8px 24px ${theme.accentColor}4D` }}
          >
            VOIR LES GESTES SECRETS ↓
          </button>
        </Reveal>
      </section>

      {/* ════════ SECTION 3 : GESTES SECRETS ════════ */}
      <section ref={section3Ref} className="px-5 py-16" style={{ backgroundColor: themeColors.bgPrimary }}>
        <Reveal className="text-center mb-8">
          <h2 className="text-[28px] font-bold">Les Gestes Secrets</h2>
          <p className="mt-1 text-base" style={{ color: "rgba(255,255,255,0.5)" }}>(Ceux que personne te dit)</p>
        </Reveal>

        <div className="flex flex-col gap-3 max-w-md mx-auto">
          <Reveal delay={0.1}>
            <AccordionItem
              icon="💧" title="Rinçage à l'eau froide"
              checked={gestesChecked[0]} onCheck={() => toggleGeste(0)} accentColor={theme.accentColor}
            >
              <p className="font-semibold text-white">Pourquoi ça marche ?</p>
              <p>L&apos;eau froide referme les cuticules = cheveux plus brillants + résistants.</p>
              <p className="font-semibold text-white mt-2">Quand le faire ?</p>
              <p>Dernière étape de ta douche (juste 10-15 secondes)</p>
              <p className="font-semibold text-white mt-2">Le résultat :</p>
              <p>Cheveux plus forts, moins cassants</p>
            </AccordionItem>
          </Reveal>

          <Reveal delay={0.2}>
            <AccordionItem
              icon="🌀" title="Séchage diffuseur"
              checked={gestesChecked[1]} onCheck={() => toggleGeste(1)} accentColor={theme.accentColor}
            >
              <p className="font-semibold text-white">La technique :</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Diffuseur à basse temp</li>
                <li>4 secondes chaud</li>
                <li>3 secondes froid</li>
                <li>Mouvements circulaires</li>
              </ol>
              <p className="font-semibold mt-2" style={{ color: theme.accentColor }}>Le cheat code pour du volume.</p>
            </AccordionItem>
          </Reveal>

          <Reveal delay={0.3}>
            <AccordionItem
              icon="🧴" title="Tamponne, scrunch (jamais frotter)"
              checked={gestesChecked[2]} onCheck={() => toggleGeste(2)} accentColor={theme.accentColor}
            >
              <p className="font-bold text-white">JAMAIS frotter avec la serviette.</p>
              <p className="font-semibold text-white mt-2">Pourquoi ?</p>
              <p>Ça casse les cheveux + crée frisottis.</p>
              <p className="font-semibold text-white mt-2">Fais ça :</p>
              <p>Tamponne doucement, scrunch (presse).</p>
            </AccordionItem>
          </Reveal>
        </div>

        {/* Locked gate - visible until all 3 checked */}
        <AnimatePresence>
          {!gestesChecked.every(Boolean) && (
            <motion.div
              className="mt-8 flex flex-col items-center gap-3 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full rounded-xl p-5 flex flex-col items-center gap-3 text-center" style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px dashed rgba(255,255,255,0.15)" }}>
                <Lock className="size-8" style={{ color: "rgba(255,255,255,0.3)" }} />
                <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Coche les 3 cases pour débloquer la suite
                </p>
                <div className="flex gap-2 mt-1">
                  {gestesChecked.map((c, i) => (
                    <div
                      key={i}
                      className="size-3 rounded-full transition-colors duration-300"
                      style={{ backgroundColor: c ? "#4ADE80" : "rgba(255,255,255,0.15)" }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Completion message */}
        <AnimatePresence>
          {gestesChecked.every(Boolean) && !showRdvBloc && (
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
            >
              <p className="text-lg font-bold">🎉 Bravo, t&apos;as unlock tous les gestes !</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ════════ Everything below gated behind 3 checkboxes ════════ */}
      {gestesChecked.every(Boolean) && (<>

      {/* ════════ SECTION 3.5 : CTA PRISE DE RENDEZ-VOUS ════════ */}
      <AnimatePresence>
        {showRdvBloc && (
          <motion.section
            ref={rdvRef}
            className="px-5 py-16"
            style={{ backgroundColor: themeColors.bgPrimary }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="max-w-md mx-auto flex flex-col items-center">
              {/* Unlock message */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-[24px] font-bold">✅ T&apos;as unlock tous les gestes !</p>
                <p className="mt-2 text-lg" style={{ color: "rgba(255,255,255,0.8)" }}>Le vrai changement commence maintenant.</p>
              </motion.div>

              {/* Separator */}
              <div className="w-full h-px my-6" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />

              {/* RDV card */}
              <motion.div
                className="w-full rounded-2xl p-6 flex flex-col gap-4"
                style={{
                  background: `linear-gradient(135deg, ${theme.accentColor}25, ${themeColors.accentGold}20)`,
                  backdropFilter: "blur(14px)",
                  border: `2px solid ${theme.accentColor}80`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-2xl font-bold leading-tight">Réserve ta coupe avec Yugo</p>
                <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
                  Une routine c&apos;est bien. Une coupe pensée pour ta morpho et tes cheveux, c&apos;est mieux. On en discute en salon.
                </p>

                <a
                  href="https://calendly.com/yugoleouedec/prise-de-rendez-vous"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <motion.button
                    className="w-full mt-2 py-4 rounded-xl font-bold text-lg text-white transition-all duration-300 hover:scale-[1.02]"
                    style={{ backgroundColor: theme.accentColor, boxShadow: `0 8px 24px ${theme.accentColor}4D` }}
                    animate={{
                      boxShadow: [
                        `0 0 0 0px ${theme.accentColor}00`,
                        `0 0 0 12px ${theme.accentColor}00`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                  >
                    PRENDRE RENDEZ-VOUS
                  </motion.button>
                </a>
              </motion.div>

              <p className="mt-4 text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                Ou continue avec la version gratuite{" "}
                <button
                  onClick={() => scrollTo(section4Ref)}
                  className="underline underline-offset-2 transition-colors"
                  style={{ color: theme.accentColor }}
                >
                  VOIR MES PRODUITS →
                </button>
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ════════ SECTION 5 : CTAs FINAUX ════════ */}
      <section className="px-5 pt-2 pb-16" style={{ backgroundColor: themeColors.bgPrimary }}>
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          {/* Final CTAs */}
          <Reveal delay={0.1} className="flex gap-3">
            <button
              onClick={handleRestart}
              className="flex-1 py-3 rounded-xl font-semibold text-sm border-2 transition-all duration-300 hover:scale-[1.02]"
              style={{ borderColor: themeColors.accentBeige, color: themeColors.accentBeige }}
            >
              REFAIRE L&apos;ANALYSE
            </button>
            <a
              href="https://calendly.com/yugoleouedec/prise-de-rendez-vous"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <button
                className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-[1.02]"
                style={{ backgroundColor: "#4ADE80" }}
              >
                RÉSERVER UNE COUPE
              </button>
            </a>
          </Reveal>

          {/* PDF download */}
          <Reveal delay={0.2}>
            <button
              onClick={handleDownloadPDF}
              disabled={pdfLoading}
              className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
            >
              <Download className="size-4" />
              {pdfLoading ? "Génération..." : "Télécharger ma routine (PDF)"}
            </button>
          </Reveal>
        </div>
      </section>

      </>)}
      {/* ════════ End gated content ════════ */}

    </div>
  );
}
