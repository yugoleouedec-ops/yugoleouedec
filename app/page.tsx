"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Send, ShieldAlert, CircleSlash, HelpCircle, ChevronDown } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { PremiumCard } from "@/components/premium-card";
import { VideoReviewsStack } from "@/components/video-reviews-stack";
import { HighlightedTitle } from "@/components/highlighted-title";
import { HandDrawnArrow } from "@/components/hand-drawn-arrow";
import { StickyScrollCards } from "@/components/ui/sticky-scroll-cards";
import { TestimonialCarousel } from "@/components/ui/testimonial";
import { HandWrittenTitle } from "@/components/ui/hand-writing-text";
import { PricingSection } from "@/components/ui/animated-glassy-pricing";
import { LocationMap } from "@/components/ui/expand-map";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";

/* ─── Animated underline wrapper ─── */
function AnimatedUnderline({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <span ref={ref} className="relative inline-block">
      {children}
      <motion.span
        className="absolute bottom-0 left-0 h-[4px] bg-[#EA580C]"
        initial={{ width: "0%" }}
        animate={isInView ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      />
    </span>
  );
}

/* ─── Fade-in wrapper ─── */
function FadeIn({
  children,
  className,
  id,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/* ─── SVG icons ─── */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.37a8.16 8.16 0 0 0 4.77 1.52V7.45a4.83 4.83 0 0 1-1.01-.76Z" />
    </svg>
  );
}

/* ─── Testimonials data ─── */
const testimonials = [
  {
    text: "J\u2019ai enfin compris mon type de cheveux et les bons produits \u00e0 utiliser. Mes cheveux n\u2019ont jamais \u00e9t\u00e9 aussi bien\u00a0!",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Thomas R.",
    role: "Cheveux ondul\u00e9s",
  },
  {
    text: "Le scan est hyper rapide et les recommandations sont vraiment personnalis\u00e9es. Je recommande \u00e0 100\u00a0%.",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "Mehdi K.",
    role: "Cheveux boucl\u00e9s",
  },
  {
    text: "Gr\u00e2ce aux conseils de Yugo et \u00e0 HairScan, j\u2019ai adopt\u00e9 une routine qui fonctionne enfin pour moi.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "Lucas B.",
    role: "Cheveux lisses",
  },
  {
    text: "Apr\u00e8s des ann\u00e9es \u00e0 utiliser les mauvais produits, HairScan m\u2019a ouvert les yeux. Le PDF de routine est top\u00a0!",
    image: "/images/avatars/avatar4.jpg",
    name: "Antoine D.",
    role: "Cheveux cr\u00e9pus",
  },
  {
    text: "J\u2019\u00e9tais sceptique au d\u00e9but mais le diagnostic est vraiment pr\u00e9cis. Ma copine m\u2019a m\u00eame dit que mes cheveux sont plus beaux.",
    image: "/images/avatars/avatar5.jpg",
    name: "Romain P.",
    role: "Cheveux ondul\u00e9s",
  },
  {
    text: "Le contenu de Yugo sur Instagram m\u2019a convaincu d\u2019essayer. R\u00e9sultat\u00a0: routine simple, cheveux au top.",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
    name: "Karim S.",
    role: "Cheveux semi-lisses",
  },
  {
    text: "Super outil, tr\u00e8s intuitif. En 2 minutes j\u2019avais ma routine compl\u00e8te avec les liens produits.",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
    name: "Hugo M.",
    role: "Cheveux lisses",
  },
  {
    text: "Enfin quelqu\u2019un qui parle soin capillaire pour les hommes sans prise de t\u00eate. Merci Yugo\u00a0!",
    image: "https://randomuser.me/api/portraits/men/71.jpg",
    name: "Nassim A.",
    role: "Cheveux boucl\u00e9s",
  },
  {
    text: "Les recommandations produits sont pertinentes et dans mon budget. J\u2019ai tout command\u00e9 direct.",
    image: "https://randomuser.me/api/portraits/men/29.jpg",
    name: "Julien T.",
    role: "Cheveux ondul\u00e9s",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

/* ─── Page ─── */
export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [heroMuted, setHeroMuted] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const heroLoopCount = useRef(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroInset = useTransform(heroProgress, [0, 0.6], [0, 24]);
  const heroRadius = useTransform(heroProgress, [0, 0.6], [0, 24]);

  /* Force autoplay on mount — needed for iOS/mobile browsers */
  useEffect(() => {
    const v = heroVideoRef.current;
    if (v) {
      v.muted = true;
      v.play().catch(() => {});
    }
  }, []);

  return (
    <div className="bg-[#F5F1E8] text-[#1A1A1A]">
      <Header />

      {/* ══════════════════ HERO ══════════════════ */}
      <section ref={heroRef} className="relative h-[100dvh] bg-[#F5F1E8]">
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={{
            top: heroInset,
            left: heroInset,
            right: heroInset,
            bottom: heroInset,
            borderRadius: heroRadius,
          }}
        >
          {/* Video background */}
          <video
            ref={heroVideoRef}
            src="/videos/hero.mp4"
            autoPlay
            muted={heroMuted}
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            onEnded={() => {
              heroLoopCount.current += 1;
              if (heroVideoRef.current) {
                if (heroLoopCount.current >= 1) {
                  heroVideoRef.current.muted = true;
                  setHeroMuted(true);
                }
                heroVideoRef.current.currentTime = 0;
                heroVideoRef.current.play().catch(() => {});
              }
            }}
          />
          {/* Mute toggle */}
          <button
            onClick={() => {
              setHeroMuted((m) => !m);
              if (heroVideoRef.current) heroVideoRef.current.muted = !heroVideoRef.current.muted;
            }}
            className="absolute bottom-6 right-6 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white transition-colors hover:bg-black/60"
            aria-label={heroMuted ? "Activer le son" : "Couper le son"}
          >
            {heroMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            )}
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="size-6 text-white/70" />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ YUGO'S CIRCLE ══════════════════ */}
      <section className="bg-[#F5F1E8] py-15 px-5 md:py-20">
        <PremiumCard />
      </section>

      {/* ══════════════════ AVIS VIDÉO ══════════════════ */}
      <section className="bg-[#F5F1E8] pt-8 pb-20 px-5 lg:pt-10 lg:pb-28">
        <div className="mx-auto max-w-[1200px]">
          <FadeIn>
            <div className="flex flex-col items-center text-center">
              <h2 className="whitespace-nowrap text-[1.97rem] font-extrabold tracking-[0.02em] sm:text-[2.45rem] lg:text-[2.95rem]">
                <HighlightedTitle>Une vraie Satisfaction.</HighlightedTitle>
              </h2>
            </div>
          </FadeIn>
          <div className="mt-20 lg:mt-28">
            <VideoReviewsStack />
          </div>
        </div>
      </section>

      {/* ══════════════════ ERREURS / CONVERSION ══════════════════ */}
      <section className="bg-[#F5F1E8] pt-16 pb-0 lg:pt-24 lg:pb-0">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <FadeIn>
            <div className="flex flex-col items-center text-center">
              <h2 className="text-[2.6rem] font-extrabold tracking-[0.02em] sm:text-[3.25rem] lg:text-[3.9rem]">
                Tu{' '}
                <AnimatedUnderline>gal&egrave;res</AnimatedUnderline>
                {' '}encore avec...
              </h2>
            </div>
          </FadeIn>

          <div className="mt-14 flex flex-col gap-10 max-w-[700px] mx-auto">
            {/* Erreur 1 */}
            <div className="flex flex-col sm:flex-row gap-6 items-start rounded-[36px] bg-[#F5F1E8] p-6 sm:p-8" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
              <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-red-500/10">
                <ShieldAlert className="size-7 text-red-400" />
              </div>
              <div>
                <h3 className="text-[1.56rem] font-extrabold font-heading text-[#1A1A1A]">
                  Avoir Z&eacute;ro Volume, Z&eacute;ro Style
                </h3>
                <p className="mt-3 text-[#404040] leading-relaxed">
                  Cheveux plats, coll&eacute;s au cr&acirc;ne.
                  Tu passes ta main dedans, y&rsquo;a rien.
                  <br /><br />
                  Pendant que d&rsquo;autres ont du volume naturel,
                  toi tu gal&egrave;res juste pour pas ressembler
                  &agrave; un mec qui sort du lit.
                </p>
                <a href="https://yugoleouedec.gumroad.com/l/yvcdf?_gl=1*x6xusc*_ga*Nzg0MjY4NDEyLjE3NzI1NTMwODI.*_ga_6LJN6D94N6*czE3NzUwNzY4MTIkbzEwJGcxJHQxNzc1MDc2ODIxJGo1MSRsMCRoMA.." target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center text-sm font-semibold text-[#EA580C] hover:text-[#b8531e] transition-colors">
                  Guide du Mec aux Cheveux Lisses &rarr;
                </a>
              </div>
            </div>

            {/* Erreur 2 */}
            <div className="flex flex-col sm:flex-row gap-6 items-start rounded-[36px] bg-[#F5F1E8] p-6 sm:p-8" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
              <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-500/10">
                <CircleSlash className="size-7 text-orange-400" />
              </div>
              <div>
                <h3 className="text-[1.56rem] font-extrabold font-heading text-[#1A1A1A]">
                  Gaspiller ton Argent
                </h3>
                <p className="mt-3 text-[#404040] leading-relaxed">
                  &ldquo;Volume intense&rdquo;, &ldquo;Tenue 24h&rdquo;.
                  Tu y crois. Tu commandes.
                  <br /><br />
                  R&eacute;sultat&nbsp;: &ccedil;a change rien.
                  <br /><br />
                  Tu rach&egrave;tes un autre produit.
                  Puis un autre.
                </p>
                <Link href="/hairscan" className="mt-5 inline-flex items-center text-sm font-semibold text-[#EA580C] hover:text-[#b8531e] transition-colors">
                  Faire mon HairScan &rarr;
                </Link>
              </div>
            </div>

            {/* Erreur 3 */}
            <div className="flex flex-col sm:flex-row gap-6 items-start rounded-[36px] bg-[#F5F1E8] p-6 sm:p-8" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}>
              <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-yellow-500/10">
                <HelpCircle className="size-7 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-[1.56rem] font-extrabold font-heading text-[#1A1A1A]">
                  &Ecirc;tre Jamais Satisfait de ta Coupe
                </h3>
                <p className="mt-3 text-[#404040] leading-relaxed">
                  5 minutes apr&egrave;s &ecirc;tre sorti du salon,
                  tu regrettes d&eacute;j&agrave;.
                  <br /><br />
                  C&rsquo;est pas ce que tu voulais.
                  Mais t&rsquo;as pas su l&rsquo;expliquer.
                  <br /><br />
                  Et lui, il a pas pris le temps
                  de comprendre ce qui t&rsquo;irait vraiment.
                </p>
                <a href="https://calendly.com/yugoleouedec/prise-de-rendez-vous" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center text-sm font-semibold text-[#EA580C] hover:text-[#b8531e] transition-colors">
                  R&eacute;server ma coupe &rarr;
                </a>
              </div>
            </div>
          </div>

          <HandDrawnArrow className="my-16" />
        </div>
      </section>

      {/* ══════════════════ ZOOM PARALLAX ══════════════════ */}
      <section className="bg-[#F5F1E8]">
        <div className="py-20 text-center">
          <h2 className="text-[2.6rem] font-extrabold tracking-[0.02em] text-black sm:text-[3.25rem] lg:text-[3.9rem]">
            T&rsquo;Auras <HighlightedTitle>Acc&egrave;s</HighlightedTitle> &agrave;...
          </h2>
        </div>
        <StickyScrollCards
          cards={[
            { imageUrl: '/images/gallery/gallery-1.jpg', alt: 'Galerie 1', title: 'Consultation + Coupe', subtitle: 'On Analyse, On écoute, On transforme' },
            { imageUrl: '/images/gallery/gallery-2.jpg', alt: 'Galerie 2', title: 'HAIRSCAN (Nouveau)', subtitle: 'Ta Routine sur-mesure Adaptée à Tes Problèmes' },
            { imageUrl: '/images/gallery/gallery-3.jpg', alt: 'Galerie 3', title: 'Manuel complet', subtitle: 'Maîtrise tes cheveux lisses en 16 pages' },
          ]}
        />
      </section>


      {/* ══════════════════ PRICING ══════════════════ */}
      <section className="bg-[#F5F1E8] py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <PricingSection
            title={<>Comment tu veux <HighlightedTitle>Avancer</HighlightedTitle> ?</>}
            subtitle=""
            plans={[
              {
                planName: 'Solo',
                description: 'Meilleur solution pour tester.',
                price: '0\u20ac',
                features: [
                  'Guide complet',
                  'HairScan 1 fois',
                ],
                buttonText: 'Commencer Maintenant',
                buttonHref: '/reservation',
                buttonVariant: 'secondary',
              },
              {
                planName: 'YUGO ACCES',
                description: 'La solution la plus intelligente. Tout est inclus : coupe, produits, fidélité. Tu économises et tu progresses vraiment.',
                price: '30€/mois',
                features: [
                  '1 Sea Salt Spray Sapience livré chez toi',
                  'Carte fidélité activée',
                  '1 coupe incluse / mois',
                  'Crédit 5€ produits (cumulable)',
                  'Priorité réservation',
                  'Récompenses fidélité progressives',
                  'Accès groupe privé',
                ],
                buttonText: 'BIENTÔT DISPONIBLE...',
                buttonDisabled: true,
                isPopular: true,
                buttonVariant: 'primary',
              },
              {
                planName: 'VIP ACCESS',
                description: "L'expérience barbier ultime. Conçu pour les entrepreneurs et ceux dont l'image est leur business.",
                price: '150€/mois',
                features: [],
                featureSections: [
                  {
                    title: 'Coupes & soins illimités',
                    items: [
                      'Coupes illimitées (viens quand tu veux)',
                      'Créneaux réservés VIP, priorité 24/7',
                      'Soin cuir chevelu mensuel',
                      'Masque restructurant + massage crânien',
                    ],
                  },
                  {
                    title: 'Service conciergerie',
                    items: [
                      'Déplacement à domicile 1x/mois (Paris)',
                      'Coaching style personnel trimestriel',
                      'Conseils vestimentaires + photos profil',
                    ],
                  },
                  {
                    title: 'Accès backstage',
                    items: [
                      'Invitation tournages & shootings',
                      'Early access produits avant lancement',
                      'Influence sur les choix de gamme',
                    ],
                  },
                  {
                    title: 'Avantages exclusifs',
                    items: [
                      'Kit VIP annuel offert (10 produits)',
                      'Ligne directe WhatsApp 7j/7',
                      'Réseau premium (max 20 membres)',
                      'Events trimestriels networking',
                      'Garantie résultat photo',
                    ],
                  },
                ],
                bottomNote: 'Valeur totale : 550€+/mois — Engagement minimum 6 mois',
                buttonText: 'BIENTÔT DISPONIBLE...',
                buttonDisabled: true,
                buttonVariant: 'primary',
              },
            ]}
          />
        </div>
      </section>

      {/* ══════════════════ TÉMOIGNAGES SLIDER ══════════════════ */}
      <section className="bg-[#F5F1E8] pt-8 pb-24 lg:pt-12 lg:pb-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <FadeIn>
            <div className="flex flex-col items-center text-center mb-16">
              <HandWrittenTitle title="D&#233;j&#224; +214 mecs ont franchi le cap." className="text-[2.21rem] font-extrabold tracking-[0.02em] sm:text-[2.76rem] lg:text-[3.315rem]" />
            </div>
          </FadeIn>
          <div className="mt-20 lg:mt-28">
            <TestimonialCarousel
              testimonials={[
                { id: 1, name: 'Thomas', avatar: '/images/avis/image00002.jpeg', description: '...' },
                { id: 2, name: 'Youri', avatar: '/images/avis/image00003.jpeg', description: '...' },
                { id: 3, name: 'Mathias', avatar: '/images/avis/image00006.jpeg', description: '...' },
                { id: 4, name: 'Neo', avatar: '/images/avis/image00007.jpeg', description: '...' },
                { id: 5, name: 'Sanson', avatar: '/images/avis/image00008.jpeg', description: '...' },
                { id: 6, name: 'Romain', avatar: '/images/avis/image00009.jpeg', description: '...' },
                { id: 7, name: 'Théo', avatar: '/images/avis/image00010.jpeg', description: '...' },
                { id: 8, name: 'Yanis', avatar: '/images/avis/image00011.jpeg', description: '...' },
                { id: 9, name: 'Eliott', avatar: '/images/avis/image00012.jpeg', description: '...' },
                { id: 10, name: 'Quentin', avatar: '/images/avis/image00013.jpeg', description: '...' },
              ]}
              showArrows={true}
              className="max-w-2xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════ AVANT / APRÈS ══════════════════ */}
      <section className="bg-[#F5F1E8] pt-8 pb-24 lg:pt-12 lg:pb-40">
        <div className="mx-auto max-w-[600px] px-6 lg:px-10">
          <FadeIn>
            <div className="flex flex-col items-center text-center mb-24 lg:mb-32">
              <h2 className="text-[2.6rem] font-extrabold tracking-[0.02em] sm:text-[3.25rem] lg:text-[3.9rem]">
                Commence &agrave; faire attention &agrave; ton <HighlightedTitle>image</HighlightedTitle>...
              </h2>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <BeforeAfterSlider
              beforeImage="/images/Before.PNG"
              afterImage="/images/after.jpeg"
              beforeLabel="Avant"
              afterLabel="Apr&egrave;s"
            />
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-30 flex justify-center">
              <Link
                href="/reservation"
                className="animate-glow-pulse inline-flex items-center gap-2 rounded-full bg-[#EA580C] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#C2410C]"
              >
                Voir les Cr&eacute;naux Dispos &rarr;
              </Link>
            </div>
          </FadeIn>

          {/* ── CTA Blocs côte à côte ── */}
          <FadeIn delay={0.4}>
            <h2 className="mt-30 text-center text-[2.6rem] font-extrabold tracking-[0.02em] sm:text-[3.25rem] lg:text-[3.9rem]">
              Commence par...
            </h2>
            <div className="mt-30 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[900px] mx-auto">
              {/* Bloc HairScan */}
              <Link
                href="/hairscan"
                className="group relative aspect-[5/4] overflow-hidden rounded-3xl bg-[#1A1A1A]"
              >
                <img
                  src="/images/cta/cta-hairscan.png"
                  alt="HairScan"
                  className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="relative flex h-full flex-col justify-between p-6">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
                      HairScan <span className="text-base font-semibold text-white/70">(Gratuit)</span>
                    </h3>
                    <p className="mt-1 text-sm text-white/70 leading-relaxed">D&eacute;couvre en 2min ta nouvelle Routine adapt&eacute;e &agrave; ton type de cheveux, selon ton objectif.</p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#1A1A1A] transition-colors group-hover:bg-[#EA580C] group-hover:text-white">
                    Essayer &rarr;
                  </span>
                </div>
              </Link>

              {/* Bloc Guide Gratuit */}
              <a
                href="https://yugoleouedec.gumroad.com/l/yvcdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[5/4] overflow-hidden rounded-3xl bg-[#1A1A1A]"
              >
                <img
                  src="/images/cta/cta-guide.png"
                  alt="Guide Gratuit"
                  className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="relative flex h-full flex-col justify-between p-6">
                  <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
                    Guide Gratuit<br /><span className="text-base font-semibold text-white/70">(D&eacute;j&agrave; +396 t&eacute;l&eacute;chargements)</span>
                  </h3>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[#1A1A1A] transition-colors group-hover:bg-[#EA580C] group-hover:text-white">
                    Recevoir
                  </span>
                </div>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>


      {/* ══════════════════ LOCALISATION ══════════════════ */}
      <section className="bg-[#F5F1E8] py-24 lg:py-40">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <FadeIn>
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="text-[2.6rem] font-extrabold tracking-[0.02em] sm:text-[3.25rem] lg:text-[3.9rem]">
                <AnimatedUnderline>T&rsquo;es toujours l&agrave;</AnimatedUnderline>
                {' '}<span className="inline-block animate-pop">?</span>
              </h2>
            </div>
          </FadeIn>
          <div className="flex justify-center">
            <LocationMap
              location="Houilles, 2 bis avenue Schoelcher"
              coordinates="48.9265° N, 2.1882° E"
            />
          </div>
          <ul className="mt-8 flex flex-col items-center gap-1 text-[#404040] text-[1.125rem]">
            <li>&bull; R&eacute;servation uniquement le week-end</li>
            <li>&bull; Places Limit&eacute;es</li>
            <li>&bull; Houilles 78800 (15 min D&eacute;fense)</li>
          </ul>
        </div>
      </section>

      {/* ══════════════════ RÉSEAUX SOCIAUX ══════════════════ */}
      <section id="contact" className="bg-[#F5F1E8] pt-4 pb-24 lg:pt-0 lg:pb-40">
        <div className="mx-auto max-w-[700px] px-6 text-center lg:px-10">
          <FadeIn>
            <h2 className="text-[2rem] font-bold tracking-[0.02em] sm:text-[2.5rem]">
              <HighlightedTitle>C&rsquo;est ici les actu !</HighlightedTitle>
            </h2>

            {/* Social buttons */}
            <div className="mt-12 flex justify-center gap-5">
              {[
                {
                  href: "https://www.instagram.com/yugoleouedec/?hl=fr",
                  label: "Instagram",
                  icon: <InstagramIcon className="size-6" />,
                },
                {
                  href: "https://www.tiktok.com/@ton.barber_fav",
                  label: "TikTok",
                  icon: <TikTokIcon className="size-6" />,
                },
                {
                  href: "https://www.youtube.com/@CutnTalkmedia",
                  label: "YouTube",
                  icon: <YoutubeIcon className="size-6" />,
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex size-16 items-center justify-center rounded-full border border-[#1A1A1A]/10 bg-white text-[#1A1A1A] transition-all hover:scale-[1.05] hover:border-[#cf5f23]/30 hover:text-[#cf5f23]"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-20">
              <h3 className="text-lg font-semibold text-[#1A1A1A]">
                Newsletter
              </h3>
              <p className="mt-2 text-sm text-[#404040]/60">
                Re&ccedil;ois mes conseils capillaires directement dans ta
                bo&icirc;te mail.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEmail("");
                }}
                className="mt-6 flex gap-3"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton@email.com"
                  required
                  className="h-14 flex-1 rounded-full border border-[#1A1A1A]/10 bg-white px-6 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/30 outline-none transition-colors focus:border-[#cf5f23] focus:ring-1 focus:ring-[#cf5f23]"
                />
                <button
                  type="submit"
                  className="inline-flex h-14 items-center rounded-full bg-[#cf5f23] px-6 font-semibold text-white transition-all hover:scale-[1.02] hover:bg-[#b8531e] sm:px-8"
                >
                  <Send className="mr-2 size-4" />
                  S&apos;abonner
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
