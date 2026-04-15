"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const GUIDE_URL = "https://yugoleouedec.gumroad.com/l/yvcdf";
const DEADLINE_DAYS = 14;

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: DEADLINE_DAYS, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const stored = localStorage.getItem("guide-promo-deadline");
    let deadline: number;
    if (stored) {
      deadline = parseInt(stored, 10);
    } else {
      deadline = Date.now() + DEADLINE_DAYS * 24 * 60 * 60 * 1000;
      localStorage.setItem("guide-promo-deadline", deadline.toString());
    }

    const tick = () => {
      const diff = Math.max(0, deadline - Date.now());
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex items-center gap-1 font-mono text-xs tabular-nums">
      <span className="bg-white/20 rounded px-1 py-0.5">{timeLeft.days}j</span>
      <span>:</span>
      <span className="bg-white/20 rounded px-1 py-0.5">{pad(timeLeft.hours)}h</span>
      <span>:</span>
      <span className="bg-white/20 rounded px-1 py-0.5">{pad(timeLeft.minutes)}m</span>
      <span>:</span>
      <span className="bg-white/20 rounded px-1 py-0.5">{pad(timeLeft.seconds)}s</span>
    </div>
  );
}

/* ─── Announcement Bar ─── */
export function AnnouncementBar() {
  return (
    <div className="w-full bg-[#1A1A1A] text-white">
      <div className="flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm">
        <span className="shrink-0">⏳</span>
        <span className="truncate font-medium">
          Guide cheveux fins <span className="font-bold">GRATUIT</span> — plus que {DEADLINE_DAYS} jours
        </span>
        <a
          href={GUIDE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full bg-[#EA580C] px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-[#c44a0a]"
        >
          Télécharger
        </a>
      </div>
    </div>
  );
}

/* ─── Bottom Sheet Popup ─── */
export function GuideBottomSheet() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const trigger = useCallback(() => {
    if (dismissed) return;
    const alreadyShown = sessionStorage.getItem("guide-popup-shown");
    if (alreadyShown) return;
    setShow(true);
    sessionStorage.setItem("guide-popup-shown", "true");
  }, [dismissed]);

  useEffect(() => {
    if (dismissed) return;

    // Timer: 45 seconds
    const timer = setTimeout(() => trigger(), 45000);

    // Scroll: 60%
    const handleScroll = () => {
      const scrollPercent =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent >= 0.6) {
        trigger();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dismissed, trigger]);

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
          />

          {/* Bottom Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[70] rounded-t-3xl bg-white px-6 pb-8 pt-4 shadow-2xl"
            style={{ maxHeight: "50vh" }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
          >
            {/* Handle */}
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#1A1A1A]/20" />

            {/* Close */}
            <button
              onClick={handleDismiss}
              className="absolute right-4 top-4 rounded-full p-1 text-[#404040]/60 hover:bg-[#1A1A1A]/10 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="text-center">
              <p className="text-3xl mb-1">🎁</p>
              <h3 className="text-xl font-extrabold text-[#1A1A1A] tracking-tight">
                Ton guide cheveux fins est prêt
              </h3>
              <p className="mt-1 text-sm text-[#404040]/70">
                +396 téléchargements — 100% gratuit, 0 spam.
              </p>

              {/* Countdown */}
              <div className="mt-4 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] px-4 py-2 text-white">
                  <span className="text-xs font-medium">Expire dans</span>
                  <CountdownTimer />
                </div>
              </div>

              {/* CTA */}
              <a
                href={GUIDE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-block w-full rounded-2xl bg-[#EA580C] px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-[#c44a0a]"
              >
                Télécharger gratuitement →
              </a>
              <button
                onClick={handleDismiss}
                className="mt-2 text-xs text-[#404040]/50 hover:text-[#404040]/80 transition-colors"
              >
                Non merci, pas maintenant
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
