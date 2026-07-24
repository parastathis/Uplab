"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { partners } from "@/lib/data";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

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

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const panels = el.querySelectorAll<HTMLElement>("[data-pillar]");

    // ── mobile: no scroll-jack. Each pillar fades + slides up smoothly the
    //    moment it enters the viewport on native scroll ──
    const isDesktop =
      window.innerWidth >= 1024 && window.matchMedia("(pointer: fine)").matches;
    if (!isDesktop) {
      panels.forEach((p) => {
        p.style.opacity = "0";
        p.style.transform = "translateY(32px)";
        p.style.transition =
          "opacity 0.8s var(--ease-lab), transform 0.8s var(--ease-lab)";
      });
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            const t = e.target as HTMLElement;
            t.style.opacity = "1";
            t.style.transform = "none";
            io.unobserve(t);
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
      );
      panels.forEach((p) => io.observe(p));
      return () => io.disconnect();
    }

    // ── desktop: one pinned timeline swaps the three pillars in/out ──
    const ctx = gsap.context(() => {
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${vh * 2.6}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
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
    <section
      ref={ref}
      className="relative bg-night py-act lg:h-[100dvh] lg:overflow-hidden lg:py-0"
      aria-label="Παράγουμε, επιλέγουμε, διακινούμε"
    >
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-40 lg:opacity-55"
        src="/media/factory.mp4"
        poster="/media/factory-still.png"
        muted
        loop
        playsInline
        autoPlay
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/60 to-night/30 lg:via-night/45 lg:to-transparent" aria-hidden />

      <div className="relative z-10 flex px-[clamp(1.2rem,4vw,4.5rem)] lg:h-full lg:items-end lg:pb-chapter">
        <div className="relative w-full max-w-3xl lg:min-h-[42vh]">
          {PILLARS.map((p) => (
            <article
              key={p.no}
              data-pillar
              className="mb-verse last:mb-0 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mb-0"
            >
              <span className="caption-tag !text-porcelain/60">{p.no}</span>
              <h2 className="display-black mt-hair text-[clamp(1.5rem,6vw,5.6rem)] text-porcelain">{p.title}</h2>
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
