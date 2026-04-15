"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { ShinyButton } from "@/components/ui/shiny-button";

function MenuToggle({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      className="relative flex size-10 items-center justify-center md:hidden"
      onClick={onClick}
      aria-label="Menu"
    >
      <div className="flex h-4 w-5 flex-col justify-between">
        <motion.span
          className="block h-[1.5px] w-full origin-left bg-current"
          animate={open ? { rotate: 45, y: -1 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.span
          className="block h-[1.5px] w-full bg-current"
          animate={open ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block h-[1.5px] w-full origin-left bg-current"
          animate={open ? { rotate: -45, y: 1 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </button>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setPastHero(latest > window.innerHeight - 100);
  });

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isDark = pastHero && !menuOpen;

  return (
    <motion.header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-colors duration-500",
        isDark ? "bg-[#F5F1E8]/90 backdrop-blur-2xl shadow-sm" : "bg-transparent",
        menuOpen && "!bg-[#1A1A1A]",
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:px-10 lg:h-20">
        {/* Logo signature */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className="relative h-10 w-24 lg:h-12 lg:w-28"
        >
          <Image
            src="/images/signature.png"
            alt="Yugo"
            fill
            className={cn(
              "object-contain transition-all duration-500",
              menuOpen ? "brightness-0 invert" : isDark ? "brightness-0" : "brightness-0 invert",
            )}
            priority
          />
        </Link>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link href="/reservation">
            <ShinyButton>Réserver ma coupe</ShinyButton>
          </Link>
        </div>

        {/* Mobile CTA + toggle */}
        <div className="flex items-center gap-3 md:hidden">
          {!menuOpen && (
            <Link href="/reservation">
              <ShinyButton className="!px-7 !py-3 !text-sm">Réserver</ShinyButton>
            </Link>
          )}
          <div className={cn(
            "transition-colors duration-500",
            menuOpen ? "text-[#F5F1E8]" : isDark ? "text-[#1A1A1A]" : "text-white",
          )}>
            <MenuToggle open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
          </div>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 top-16 z-40 flex flex-col bg-[#1A1A1A] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-6 px-10">
              {[
                { href: "/reservation", label: "Réservation" },
                { href: "/hairscan", label: "HairScan" },
                { href: "/shop", label: "Shop" },
              ].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl font-semibold text-[#F5F1E8] transition-colors hover:text-[#cf5f23]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="border-t border-[#F5F1E8]/10 px-10 py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-xs text-[#F5F1E8]/20">
                &copy; 2026 Yugo Le Ouedec &mdash; Expert Capillaire
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
