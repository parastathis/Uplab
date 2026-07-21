"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ScrollProgress from "@/components/ui/ScrollProgress";
import MobileMenu from "@/components/layout/MobileMenu";

/**
 * Editorial nav: uppercase links with an amber underline that draws on
 * hover/active, plus a squared "available" CTA carrying a pulsing dot. The bar
 * floats light over the dark hero, then condenses into a frosted ink bar once
 * the page is scrolled (or on any inner, light page).
 */

const LINKS: { label: string; href: string }[] = [
  { label: "Προϊόντα", href: "/proionta" },
  { label: "Η εταιρεία", href: "/etaireia" },
  { label: "Νέα", href: "/nea" },
  { label: "Gallery", href: "/gallery" },
  { label: "Σημεία πώλησης", href: "/simeia-polisis" },
  { label: "Επικοινωνία", href: "/epikoinonia" },
];

export default function NavHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onHome = pathname === "/" || pathname === "/en";
  const light = onHome && !scrolled; // floating over the dark hero

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <ScrollProgress />
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[clamp(1rem,3.5vw,3.2rem)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          light ? "nav-theme-light py-[1.1rem]" : "py-[0.7rem]"
        } ${scrolled ? "border-b border-ink/8 bg-porcelain/80 backdrop-blur-xl" : "border-b border-transparent"}`}
      >
        <Link href="/" className="group flex items-baseline gap-[0.15em]" aria-label="Uplab Pharmaceuticals — Αρχική">
          <span
            className={`font-display text-[1.4rem] font-bold tracking-tight transition-colors duration-500 ${
              light ? "text-porcelain" : "text-ink"
            }`}
          >
            UPLAB
          </span>
          <span className="text-[1.4rem] font-bold leading-none text-amber">.</span>
        </Link>

        <nav aria-label="Κύρια πλοήγηση" className="hidden lg:flex items-center gap-[clamp(1.4rem,2.4vw,2.4rem)]">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`nav-link ${isActive(l.href) ? "is-active" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/synergasia"
          className={`hidden lg:inline-flex items-center gap-[0.6em] rounded-[3px] border px-[1.2em] py-[0.65em] text-[0.72rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
            light
              ? "border-porcelain/30 text-porcelain hover:border-amber-bright hover:text-amber-bright"
              : "border-ink/25 text-ink hover:border-amber hover:text-amber-deep"
          }`}
        >
          <span className="nav-pulse" aria-hidden />
          Συνεργασία B2B
        </Link>

        <MobileMenu light={light} />
      </header>
    </>
  );
}
