"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Hover-expand gallery (n38693842 «gallery-animation» pattern): a row of panels
 * where hovering one smoothly expands it and shrinks the rest. Real (uplab.gr)
 * + generated documentary photography. Falls back to a simple grid on mobile.
 */

type Shot = { src: string; label: string };

const SHOTS: Shot[] = [
  { src: "/media/gallery/who-we-are.jpg", label: "Έλεγχος ποιότητας στο μικροσκόπιο" },
  { src: "/media/gallery/gen-production.png", label: "Γραμμή παραγωγής GMP" },
  { src: "/media/gallery/gen-hands-capsule.png", label: "Το σκεύασμα στο χέρι" },
  { src: "/media/gallery/pharmacy-scaled.jpg", label: "Φαρμακευτική παρασκευή" },
  { src: "/media/gallery/gen-botanical.png", label: "Φυσικές πρώτες ύλες" },
  { src: "/media/gallery/our_people-scaled.jpg", label: "Οι άνθρωποί μας" },
  { src: "/media/gallery/gen-quality.png", label: "Διασφάλιση ποιότητας" },
  { src: "/media/gallery/human_healthcare.jpg", label: "Φροντίδα με τεκμηρίωση" },
];

export default function GalleryAccordion() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-porcelain py-act" aria-label="Το οπτικό αρχείο">
      <div className="mx-auto max-w-6xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <div className="flex flex-wrap items-end justify-between gap-line">
          <div>
            <Reveal>
              <p className="caption-tag">Gallery</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display-lg mt-hair text-ink">Το οπτικό αρχείο.</h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-[32ch] text-[0.9rem] leading-relaxed text-mist">
              Περάστε τον δείκτη πάνω από μια εικόνα — ανοίγει με ομαλή κίνηση.
            </p>
          </Reveal>
        </div>

        {/* hover-expand accordion (md+) */}
        <Reveal delay={0.14} className="mt-chapter hidden gap-3 md:flex md:h-[60vh] md:max-h-[620px]">
          {SHOTS.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-label={s.label}
              className="group relative h-full min-w-0 overflow-hidden rounded-[8px] border border-ink/8 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ flexGrow: active === i ? 5 : 1, flexBasis: 0 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={s.label}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span
                className={`pointer-events-none absolute inset-0 transition-colors duration-500 ${
                  active === i ? "bg-ink/0" : "bg-ink/20"
                }`}
              />
              <span
                className={`pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/85 to-transparent p-line text-left text-[0.85rem] text-porcelain transition-all duration-500 ${
                  active === i ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                }`}
              >
                {s.label}
              </span>
            </button>
          ))}
        </Reveal>

        {/* mobile grid fallback */}
        <div className="mt-chapter grid grid-cols-2 gap-line md:hidden">
          {SHOTS.map((s) => (
            <div key={s.src} className="relative overflow-hidden rounded-[6px] border border-ink/8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt={s.label} loading="lazy" className="aspect-[4/5] w-full object-cover" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-breath text-[0.72rem] text-porcelain">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
