"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tiles from "@/components/ui/Tiles";
import { trust } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { n: trust.products, label: "προϊόντα υγείας", suffix: "" },
  { n: trust.categories, label: "κατηγορίες υγείας", suffix: "" },
  { n: trust.partners, label: "αποκλειστικοί ευρωπαϊκοί συνεργάτες", suffix: "" },
  { n: trust.pharmacies, label: "σημεία πώλησης σε φαρμακεία", suffix: "+" },
];

const fmt = (v: number) => new Intl.NumberFormat("el-GR").format(Math.round(v));

export default function TrustStrip() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-count]").forEach((numEl) => {
        const target = Number(numEl.dataset.count);
        if (reduced) {
          numEl.textContent = fmt(target);
          return;
        }
        const state = { v: 0 };
        gsap.to(state, {
          v: target,
          duration: 1.9,
          ease: "power3.out",
          scrollTrigger: { trigger: numEl, start: "top 82%" },
          onUpdate: () => (numEl.textContent = fmt(state.v)),
        });
      });

      gsap.fromTo(
        el.querySelectorAll("[data-stat]"),
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.11,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 78%" },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden bg-porcelain py-act" aria-label="Η Uplab σε αριθμούς">
      <Tiles rows={16} cols={44} tileSize="md" />
      <div className="pointer-events-none relative z-10 mx-auto max-w-6xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <p className="caption-tag mb-chapter">Η Uplab σήμερα</p>
        {/* deliberately uneven grid — the pharmacy count gets the widest column */}
        <div className="grid grid-cols-2 gap-x-verse gap-y-chapter md:grid-cols-[1fr_1fr_1.2fr_1.6fr]">
          {STATS.map((s) => (
            <div key={s.label} data-stat className="flex flex-col gap-hair">
              <span className="display-lg text-ink">
                <span data-count={s.n}>0</span>
                {s.suffix}
              </span>
              <span className="max-w-[16ch] text-[0.9rem] leading-snug text-mist">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
