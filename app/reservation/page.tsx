"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HandDrawnArrow } from "@/components/hand-drawn-arrow";
import { HighlightedTitle } from "@/components/highlighted-title";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { TestimonialCarousel } from "@/components/ui/testimonial";
import { HandWrittenTitle } from "@/components/ui/hand-writing-text";
import ScrollFAQAccordion from "@/components/ui/scroll-faqaccordion";
import { CircledText } from "@/components/circled-text";
import { PricingCard } from "@/components/ui/animated-glassy-pricing";

export default function ReservationPage() {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Header />
      <main id="top" className="min-h-dvh pt-20 bg-[#F5F1E8] scroll-smooth">
        <div className="py-12 text-center">
          <h1 className="text-[2.6rem] font-extrabold tracking-[0.02em] sm:text-[3.25rem] lg:text-[3.9rem]">
            Bient&ocirc;t &agrave; <CircledText>ton tour</CircledText> !!!
          </h1>
        </div>
        <div
          className="calendly-inline-widget w-full"
          data-url="https://calendly.com/yugoleouedec/prise-de-rendez-vous"
          style={{ minWidth: "320px", height: "700px" }}
        />

        <section className="py-24 lg:py-32 bg-[#F5F1E8]">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
            <motion.h2
              className="text-center text-[2.6rem] font-extrabold tracking-[0.02em] sm:text-[3.25rem] lg:text-[3.9rem]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              Voil&agrave; ce qui <HighlightedTitle>t&rsquo;attend</HighlightedTitle> :
            </motion.h2>
            <HandDrawnArrow className="mt-4" />

            <div className="mt-20 flex justify-center">
              <PricingCard
                planName="Consultation"
                description="45 min"
                price="20&euro;"
                discountPrice="15,00€"
                discountLabel="avec Yugo Access"
                features={[
                  'Analyse de ton visage',
                  'Coupe Personnalis\u00e9e',
                  'Conseils Produits',
                  'Conseils Routines :)',
                ]}
                buttonText="R&eacute;server"
                buttonHref="#top"
                buttonVariant="primary"
              />
            </div>

            <div className="mt-32 flex flex-col items-center text-center">
              <motion.h2
                className="text-[2.6rem] font-extrabold tracking-[0.02em] sm:text-[3.25rem] lg:text-[3.9rem]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                Commence &agrave; faire attention &agrave; ton <HighlightedTitle>image</HighlightedTitle>...
              </motion.h2>
            </div>
            <div className="mt-20">
              <BeforeAfterSlider
                beforeImage="/images/Before.PNG"
                afterImage="/images/after.jpeg"
                beforeLabel="Avant"
                afterLabel="Apr&egrave;s"
              />
            </div>

            <div className="mt-32 flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <HandWrittenTitle title="D&#233;j&#224; +214 mecs ont franchi le cap." className="text-[2.21rem] font-extrabold tracking-[0.02em] sm:text-[2.76rem] lg:text-[3.315rem]" />
              </motion.div>
            </div>
            <div className="mt-24">
              <TestimonialCarousel
                testimonials={[
                  { id: 1, name: 'Thomas', avatar: '/images/avis/image00002.jpeg', description: '...' },
                  { id: 2, name: 'Youri', avatar: '/images/avis/image00003.jpeg', description: '...' },
                  { id: 3, name: 'Mathias', avatar: '/images/avis/image00006.jpeg', description: '...' },
                  { id: 4, name: 'Neo', avatar: '/images/avis/image00007.jpeg', description: '...' },
                  { id: 5, name: 'Sanson', avatar: '/images/avis/image00008.jpeg', description: '...' },
                  { id: 6, name: 'Romain', avatar: '/images/avis/image00009.jpeg', description: '...' },
                  { id: 7, name: 'Th&eacute;o', avatar: '/images/avis/image00010.jpeg', description: '...' },
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

        <section className="bg-[#F5F1E8]">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
            <ScrollFAQAccordion
              title="Tu veux Savoir..."
              profileImage="/images/profile/yugo.jpg"
              senderName="Yugo Le Ouedec"
              data={[
                { id: 1, question: "C'est o\u00f9 exactement ?", answer: "Houilles 78800, \u00e0 15 min de La D\u00e9fense \ud83d\udccd Adresse exacte envoy\u00e9e apr\u00e8s r\u00e9servation." },
                { id: 2, question: "Je peux annuler ?", answer: "Oui, gratuitement jusqu'\u00e0 24h avant le rendez-vous. Aucun frais, aucune justification \u2705" },
                { id: 3, question: "C'est quoi la diff\u00e9rence avec un barbier classique ?", answer: "Consultation incluse. Je prends le temps de comprendre TON type de cheveux, pas juste \u00abcomme d'habitude\u00bb \ud83d\udc87" },
                { id: 4, question: "Je paye quand ?", answer: "Sur place, apr\u00e8s la coupe. CB ou esp\u00e8ces accept\u00e9s \ud83d\udcb3" },
                { id: 5, question: "Si je suis pas satisfait je fais quoi ?", answer: "\u00c7a m'est jamais arriv\u00e9 \ud83d\ude05\n\n200+ personnes me font confiance tous les mois.\nDes dizaines de messages de remerciements.\nZ\u00e9ro d\u00e9ception \u00e0 ce jour.\ud83e\udd23\ud83e\udd23" },
              ]}
            />
          </div>
        </section>

        <section className="bg-[#F5F1E8] pt-4 pb-24 lg:pt-0 lg:pb-40">
          <div className="mx-auto max-w-[700px] px-6 text-center lg:px-10">
            <h2 className="text-[2rem] font-bold tracking-[0.02em] sm:text-[2.5rem]">
              C&rsquo;est ici les actu !
            </h2>
            <div className="mt-12 flex justify-center gap-5">
              {[
                {
                  href: "https://www.instagram.com/yugoleouedec/?hl=fr",
                  label: "Instagram",
                  icon: (
                    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  ),
                },
                {
                  href: "https://www.tiktok.com/@ton.barber_fav",
                  label: "TikTok",
                  icon: (
                    <svg className="size-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.37a8.16 8.16 0 0 0 4.77 1.52V7.45a4.83 4.83 0 0 1-1.01-.76Z" />
                    </svg>
                  ),
                },
                {
                  href: "https://www.youtube.com/@CutnTalkmedia",
                  label: "YouTube",
                  icon: (
                    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                      <path d="m10 15 5-3-5-3z" />
                    </svg>
                  ),
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
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
