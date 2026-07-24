"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { healthCategories, eofCategories, families } from "@/lib/data";
import ScrollProgress from "@/components/ui/ScrollProgress";
import MobileMenu from "@/components/layout/MobileMenu";

/**
 * Original-style nav: the real Uplab logo, primary links, and a Προϊόντα
 * mega-menu that drops open on hover revealing the product sub-categories
 * (health needs, ΕΟΦ class, series). The bar floats light over the dark hero,
 * then condenses into a frosted bar once scrolled (or on any inner page).
 */

const LINKS = [
  { label: "Η εταιρεία", href: "/etaireia" },
  { label: "Νέα", href: "/nea" },
  { label: "Σημεία πώλησης", href: "/simeia-polisis" },
  { label: "Επικοινωνία", href: "/epikoinonia" },
];

const health = healthCategories.filter((c) => c.count > 0);

export default function NavHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMega(false), [pathname]);

  const onHome = pathname === "/" || pathname === "/en";
  const light = onHome && !scrolled && !mega;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <ScrollProgress />
      <header
        onMouseLeave={() => setMega(false)}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          light ? "nav-theme-light" : ""
        } ${scrolled || mega ? "border-b border-ink/8 bg-porcelain/85 backdrop-blur-xl" : "border-b border-transparent"}`}
      >
        <div className={`flex items-center justify-between px-[clamp(1rem,3.5vw,3.2rem)] ${light ? "py-[1.1rem]" : "py-[0.7rem]"}`}>
          <Link href="/" className="flex items-center gap-[0.15em]" aria-label="Uplab Pharmaceuticals — Αρχική">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo.png"
              alt="Uplab Pharmaceuticals"
              className={`h-7 w-auto transition-[filter] duration-500 ${light ? "[filter:brightness(0)_invert(1)]" : ""}`}
            />
          </Link>

          <nav aria-label="Κύρια πλοήγηση" className="hidden items-center gap-[clamp(1.4rem,2.4vw,2.4rem)] lg:flex">
            <Link
              href="/"
              onMouseEnter={() => setMega(false)}
              aria-current={pathname === "/" ? "page" : undefined}
              className={`nav-link ${pathname === "/" ? "is-active" : ""}`}
            >
              Αρχική
            </Link>
            <button
              type="button"
              onMouseEnter={() => setMega(true)}
              onFocus={() => setMega(true)}
              aria-expanded={mega}
              className={`nav-link ${pathname.startsWith("/proionta") ? "is-active" : ""} ${mega ? "is-active" : ""}`}
            >
              Προϊόντα
            </button>
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onMouseEnter={() => setMega(false)}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`nav-link ${isActive(l.href) ? "is-active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/synergasia"
            onMouseEnter={() => setMega(false)}
            className={`hidden items-center gap-[0.6em] rounded-[3px] border px-[1.2em] py-[0.65em] text-[0.72rem] uppercase tracking-[0.14em] transition-colors duration-300 lg:inline-flex ${
              light
                ? "border-porcelain/30 text-porcelain hover:border-amber-bright hover:text-amber-bright"
                : "border-ink/25 text-ink hover:border-amber hover:text-amber-deep"
            }`}
          >
            <span className="nav-pulse" aria-hidden />
            Συνεργασία B2B
          </Link>

          <MobileMenu light={light} />
        </div>

        {/* Προϊόντα mega-menu */}
        <AnimatePresence>
          {mega && (
            <motion.div
              key="mega"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setMega(true)}
              className="hidden border-t border-ink/8 bg-porcelain/95 backdrop-blur-xl lg:block"
            >
              <div className="mx-auto grid max-w-6xl grid-cols-[2fr_1fr] gap-chapter px-[clamp(1rem,3.5vw,3.2rem)] py-verse">
                <div>
                  <div className="flex items-baseline justify-between">
                    <p className="caption-tag">Ανά ανάγκη υγείας</p>
                    <Link href="/proionta" className="link-underline text-[0.8rem] text-slate hover:text-ink">
                      Όλα τα προϊόντα →
                    </Link>
                  </div>
                  <ul className="mt-line grid grid-cols-3 gap-x-line gap-y-[0.3rem]">
                    {health.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/proionta?katigoria=${encodeURIComponent(c.slug)}`}
                          className="group flex items-baseline justify-between gap-2 py-[0.15rem] text-[0.85rem] text-mist transition-colors hover:text-ink"
                        >
                          <span>{c.name}</span>
                          <span className="font-display text-[0.72rem] italic text-mist/70">{c.count}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-l border-ink/10 pl-chapter">
                  <p className="caption-tag !text-sage-ink">Κατηγορία ΕΟΦ</p>
                  <ul className="mt-line space-y-[0.25rem]">
                    {eofCategories.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/proionta?eof=${encodeURIComponent(c.slug)}`}
                          className="text-[0.85rem] text-mist transition-colors hover:text-ink"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="caption-tag mt-stanza">Σειρές</p>
                  <ul className="mt-line flex flex-wrap gap-x-line gap-y-[0.25rem]">
                    {families.map((f) => (
                      <li key={f.slug}>
                        <Link
                          href={`/proionta?seira=${f.slug}`}
                          className="logo-type text-[1rem] text-ink/70 transition-colors hover:text-amber-deep"
                        >
                          {f.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
