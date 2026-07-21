"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { partners } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    no: "01",
    title: "ΠΑΡΑΓΟΥΜΕ",
    text: "Σε σύγχρονες εγκαταστάσεις παραγωγής φαρμάκων, με πρότυπα ποιότητας GMP.",
  },
  {
    no: "02",
    title: "ΕΠΙΛΕΓΟΥΜΕ",
    text: "Αποκλειστικές συνεργασίες με ευρωπαϊκούς οίκους ανάπτυξης καινοτόμων σκευασμάτων.",
  },
  {
    no: "03",
    title: "ΔΙΑΚΙΝΟΥΜΕ",
    text: "Αποκλειστικά μέσω φαρμακείων — 2.075 σημεία πώλησης σε όλη την Ελλάδα.",
  },
];

/** Pinned chapter: the factory clip runs behind while the three pillars swap. */
export default function Pillars() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;
      const panels = el.querySelectorAll("[data-pillar]");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${vh * 2.6}`,
          pin: true,
          scrub: true,
        },
      });

      panels.forEach((panel, i) => {
        const at = i / panels.length;
        if (i > 0) tl.fromTo(panel, { yPercent: 24, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.16, ease: "power2.out" }, at);
        if (i < panels.length - 1)
          tl.to(panel, { yPercent: -18, opacity: 0, duration: 0.14, ease: "power2.in" }, at + 0.19);
      });
      tl.to({}, { duration: 0.12 });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-[100dvh] overflow-hidden bg-night" aria-label="Παράγουμε, επιλέγουμε, διακινούμε">
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-55"
        src="/media/factory.mp4"
        poster="/media/factory-still.png"
        muted
        loop
        playsInline
        autoPlay
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-night/85 via-night/45 to-transparent" aria-hidden />

      <div className="relative z-10 flex h-full items-end px-[clamp(1.2rem,4vw,4.5rem)] pb-chapter">
        <div className="relative min-h-[42vh] w-full max-w-3xl">
          {PILLARS.map((p, i) => (
            <article
              key={p.no}
              data-pillar
              className="absolute inset-x-0 bottom-0"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <span className="caption-tag !text-porcelain/60">{p.no}</span>
              <h2 className="display-black mt-hair text-[clamp(2.5rem,6.6vw,5.6rem)] text-porcelain">{p.title}</h2>
              <p className="mt-line max-w-[42ch] text-[clamp(0.95rem,1.4vw,1.15rem)] leading-relaxed text-porcelain/75">
                {p.text}
              </p>
              {p.no === "02" && (
                <ul className="mt-stanza flex max-w-xl flex-wrap gap-x-line gap-y-breath" aria-label="Συνεργάτες">
                  {partners.map((name) => (
                    <li
                      key={name}
                      className="font-display text-[0.95rem] italic text-porcelain/60 transition-colors duration-500 hover:text-porcelain"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
