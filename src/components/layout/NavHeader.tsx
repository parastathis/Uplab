"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Sliding-pill navigation (21st.dev @abdulali254/nav-header pattern),
 * re-skinned: frosted porcelain glass bar, ink cursor pill,
 * mix-blend-difference flips label color as the pill slides beneath it.
 */

type PillPos = { left: number; width: number; opacity: number };

const LINKS: { label: string; href: string }[] = [
  { label: "Αρχική", href: "/" },
  { label: "Προϊόντα", href: "/proionta" },
  { label: "Η εταιρεία", href: "/etaireia" },
  { label: "Νέα", href: "/nea" },
  { label: "Σημεία πώλησης", href: "/simeia-polisis" },
  { label: "Συνεργασία B2B", href: "/synergasia" },
  { label: "Επικοινωνία", href: "/epikoinonia" },
];

function Tab({
  children,
  href,
  setPos,
}: {
  children: string;
  href: string;
  setPos: (p: PillPos) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { offsetLeft, offsetWidth } = ref.current;
        setPos({ left: offsetLeft, width: offsetWidth, opacity: 1 });
      }}
      className="relative z-10 mix-blend-difference"
    >
      <Link
        href={href}
        className="block px-[1.1em] py-[0.55em] text-[0.82rem] tracking-wide text-porcelain"
        style={{ fontWeight: 470 }}
      >
        {children}
      </Link>
    </li>
  );
}

export default function NavHeader() {
  const [pos, setPos] = useState<PillPos>({ left: 0, width: 0, opacity: 0 });

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[clamp(1rem,3.5vw,3.2rem)] py-hair">
      <Link href="/" className="group flex items-baseline gap-1" aria-label="Uplab Pharmaceuticals — Αρχική">
        <span className="font-display text-[1.35rem] font-bold text-ink transition-colors duration-500 group-hover:text-slate">
          UPLAB
        </span>
        <span className="caption-tag hidden sm:inline">Pharmaceuticals</span>
      </Link>

      <nav aria-label="Κύρια πλοήγηση" className="hidden lg:block">
        <ul
          onMouseLeave={() => setPos((p) => ({ ...p, opacity: 0 }))}
          className="relative flex items-center rounded-full border border-ink/10 bg-porcelain/60 p-1 backdrop-blur-xl"
        >
          {LINKS.map((l) => (
            <Tab key={l.href} href={l.href} setPos={setPos}>
              {l.label}
            </Tab>
          ))}
          <motion.li
            animate={pos}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="absolute z-0 h-[calc(100%-0.5rem)] rounded-full bg-ink"
            aria-hidden
          />
        </ul>
      </nav>

      <Link
        href="/simeia-polisis"
        className="hidden rounded-full bg-ink px-[1.3em] py-[0.6em] text-[0.8rem] text-porcelain transition-colors duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-night lg:block"
        style={{ fontWeight: 560 }}
      >
        Βρείτε φαρμακείο
      </Link>

      {/* Mobile: single anchor to nav-worthy pages; full drawer lands with the page shell */}
      <Link
        href="/proionta"
        className="rounded-full border border-ink/15 bg-porcelain/70 px-4 py-2 text-[0.8rem] backdrop-blur-xl lg:hidden"
      >
        Μενού
      </Link>
    </header>
  );
}
