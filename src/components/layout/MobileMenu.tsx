"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getLenis } from "@/lib/lenis";

const EASE = [0.22, 1, 0.36, 1] as const;

const LINKS: { label: string; href: string }[] = [
  { label: "Αρχική", href: "/" },
  { label: "Προϊόντα", href: "/proionta" },
  { label: "Η εταιρεία", href: "/etaireia" },
  { label: "Νέα", href: "/nea" },
  { label: "Gallery", href: "/gallery" },
  { label: "Σημεία πώλησης", href: "/simeia-polisis" },
  { label: "Συνεργασία B2B", href: "/synergasia" },
  { label: "Επικοινωνία", href: "/epikoinonia" },
];

/** Full-screen animated drawer for narrow viewports. */
export default function MobileMenu({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  // Lock scroll via Lenis (which owns scrolling); fall back to body overflow
  // only when Lenis is absent (reduced motion). Never leaves a stuck inline
  // lock, and doesn't fight React/framer over body.style.
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
  };

  // close + unlock on route change; unlock on unmount as a safety net
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
          open
            ? "border-porcelain/30 text-porcelain"
            : light
              ? "border-porcelain/30 text-porcelain"
              : "border-ink/15 bg-porcelain/60 text-ink"
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
            className="fixed inset-0 z-[65] flex flex-col bg-night text-porcelain"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 100% 0%)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at 100% 0%)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav
              aria-label="Κύρια πλοήγηση"
              className="flex flex-1 flex-col justify-center gap-2 px-[clamp(1.5rem,7vw,3rem)]"
            >
              {LINKS.map((l, i) => {
                const active = pathname === l.href;
                return (
                  <motion.div
                    key={l.href}
                    initial={reduce ? false : { opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.15 + i * 0.06 }}
                  >
                    <Link
                      href={l.href}
                      onClick={closeMenu}
                      className={`group flex items-baseline gap-4 py-1 font-display text-[clamp(2rem,9vw,3.4rem)] leading-tight transition-colors ${
                        active ? "text-amber-bright" : "text-porcelain hover:text-amber-bright"
                      }`}
                    >
                      <span className="caption-tag !text-porcelain/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {l.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            <motion.div
              className="border-t border-porcelain/15 px-[clamp(1.5rem,7vw,3rem)] py-verse"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a href="tel:+302102844333" className="text-[0.9rem] text-porcelain/70 hover:text-porcelain">
                +30 210 28 44 333
              </a>
              <span className="mx-2 text-porcelain/30">·</span>
              <a href="mailto:info@uplab.gr" className="text-[0.9rem] text-porcelain/70 hover:text-porcelain">
                info@uplab.gr
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
