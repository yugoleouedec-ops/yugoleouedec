import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] px-6 py-12 lg:px-10">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 text-center">
        <Link
          href="/"
          className="text-lg font-bold tracking-[0.02em] text-[#F5F1E8]"
        >
          Yugo
        </Link>
        <div className="flex gap-8">
          <Link
            href="/mentions-legales"
            className="text-sm text-[#F5F1E8]/40 transition-colors hover:text-[#F5F1E8]/70"
          >
            Mentions l&eacute;gales
          </Link>
          <Link
            href="/#contact"
            className="text-sm text-[#F5F1E8]/40 transition-colors hover:text-[#F5F1E8]/70"
          >
            Contact
          </Link>
        </div>
        <p className="text-sm text-[#F5F1E8]/30">
          &copy; 2026 Yugo Le Ouedec
        </p>
      </div>
    </footer>
  );
}
