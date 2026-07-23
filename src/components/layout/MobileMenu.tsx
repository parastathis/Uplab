"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { healthCategories, eofCategories, families } from "@/lib/data";
import { getLenis } from "@/lib/lenis";

const EASE = [0.22, 1, 0.36, 1] as const;

// Same order as the desktop nav (Προϊόντα is rendered first, expandable).
const LINKS = [
  { label: "Η εταιρεία", href: "/etaireia" },
  { label: "Νέα", href: "/nea" },
  { label: "Σημεία πώλησης", href: "/simeia-polisis" },
  { label: "Επικοινωνία", href: "/epikoinonia" },
  { label: "Συνεργασία B2B", href: "/synergasia" },
];

const health = healthCategories.filter((c) => c.count > 0);

/** Full-screen menu mirroring the desktop nav — Προϊόντα expands to the same sub-categories. */
export default function MobileMenu({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState(false);
  const [prods, setProds] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const lock = () => {
    const l = getLenis();
    if (l) l.stop();
    else document.body.style.overflow = "hidden";
  };
  const unlock = () => {
    const l = getLenis();
    if (l) l.start();
    document.body.style.overflow = "";
  };
  const openMenu = () => {
    lock();
    setOpen(true);
  };
  const closeMenu = () => {
    unlock();
    setOpen(false);
    setProds(false);
  };

  useEffect(() => {
    closeMenu();
    return unlock;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => (open ? closeMenu() : openMenu())}
        aria-expanded={open}
        aria-label={open ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
        className={`relative z-[70] flex items-center gap-2 rounded-[3px] border px-4 py-2 text-[0.72rem] uppercase tracking-[0.14em] backdrop-blur-xl transition-colors ${
          open || light ? "border-porcelain/30 text-porcelain" : "border-ink/15 bg-porcelain/60 text-ink"
        }`}
      >
        <span className="relative flex h-[10px] w-4 flex-col justify-between">
          <motion.span
            className={`block h-[1.5px] w-full ${open || light ? "bg-porcelain" : "bg-ink"}`}
            animate={open ? { rotate: 45, y: 4.2 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          />
          <motion.span
            className={`block h-[1.5px] w-full ${open || light ? "bg-porcelain" : "bg-ink"}`}
            animate={open ? { rotate: -45, y: -4.2 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          />
        </span>
        Μενού
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[65] flex flex-col overflow-y-auto bg-night text-porcelain"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 100% 0%)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at 100% 0%)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav
              aria-label="Κύρια πλοήγηση"
              className="flex flex-1 flex-col gap-1 px-[clamp(1.5rem,7vw,3rem)] pb-verse pt-[calc(var(--nav-h)+2rem)]"
            >
              {/* Προϊόντα — expandable */}
              <div>
                <button
                  type="button"
                  onClick={() => setProds((v) => !v)}
                  aria-expanded={prods}
                  className="flex w-full items-center justify-between gap-4 py-1 font-display text-[clamp(1.8rem,8vw,3rem)] leading-tight text-porcelain"
                >
                  Προϊόντα
                  <span className={`text-[1.4rem] transition-transform duration-300 ${prods ? "rotate-45" : ""}`} aria-hidden>
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {prods && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <Link
                        href="/proionta"
                        onClick={closeMenu}
                        className="mt-breath block text-[0.95rem] text-amber-bright"
                      >
                        Όλα τα προϊόντα →
                      </Link>
                      <p className="caption-tag mt-line !text-porcelain/45">Ανά ανάγκη υγείας</p>
                      <ul className="mt-breath grid grid-cols-2 gap-x-line gap-y-[0.2rem]">
                        {health.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/proionta?katigoria=${encodeURIComponent(c.slug)}`}
                              onClick={closeMenu}
                              className="block py-[0.15rem] text-[0.85rem] text-porcelain/70"
                            >
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <p className="caption-tag mt-line !text-porcelain/45">Κατηγορία ΕΟΦ</p>
                      <ul className="mt-breath flex flex-wrap gap-x-line gap-y-[0.2rem]">
                        {eofCategories.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={`/proionta?eof=${encodeURIComponent(c.slug)}`}
                              onClick={closeMenu}
                              className="text-[0.85rem] text-porcelain/70"
                            >
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <p className="caption-tag mt-line !text-porcelain/45">Σειρές</p>
                      <ul className="mt-breath flex flex-wrap gap-x-line gap-y-[0.2rem]">
                        {families.map((f) => (
                          <li key={f.slug}>
                            <Link
                              href={`/proionta?seira=${f.slug}`}
                              onClick={closeMenu}
                              className="logo-type text-[1rem] text-porcelain/80"
                            >
                              {f.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {LINKS.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={closeMenu}
                    className={`py-1 font-display text-[clamp(1.8rem,8vw,3rem)] leading-tight transition-colors ${
                      active ? "text-amber-bright" : "text-porcelain hover:text-amber-bright"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-porcelain/15 px-[clamp(1.5rem,7vw,3rem)] py-verse">
              <a href="tel:+302102844333" className="text-[0.9rem] text-porcelain/70 hover:text-porcelain">
                +30 210 28 44 333
              </a>
              <span className="mx-2 text-porcelain/30">·</span>
              <a href="mailto:info@uplab.gr" className="text-[0.9rem] text-porcelain/70 hover:text-porcelain">
                info@uplab.gr
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
