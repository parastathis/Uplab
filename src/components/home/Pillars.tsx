"use client";

import { useEffect, useRef } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);

  // Keep the factory clip actually playing in the background — some phones block
  // muted autoplay (low-power/data-saver), so nudge play() on load + when the
  // tab becomes visible again. It stays muted, so this never needs a gesture.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const play = () => v.play().catch(() => {});
    play();
    v.addEventListener("loadeddata", play);
    const onVis = () => {
      if (!document.hidden) play();
    };
    document.addEventListener("visibilitychange", onVis);
    // (re)start when the section scrolls into view — some browsers won't kick
    // off an off-screen autoplay, so the clip would sit on its poster otherwise.
    const io = new IntersectionObserver(([e]) => e.isIntersecting && play(), {
      threshold: 0.05,
    });
    io.observe(v);
    return () => {
      v.removeEventListener("loadeddata", play);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // reduced motion → no pin; the pillars stay in a plain stacked, all-visible
    // layout (motion-reduce: classes in the markup below).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // ── the pinned "swap" scroll story runs on every device (desktop + mobile):
    //    the three pillars stack and cross-fade as you scroll through the pin.
    //    On mobile Lenis is off, so ScrollTrigger drives it from native scroll. ──
    const ctx = gsap.context(() => {
      const vh = window.innerHeight || document.documentElement.clientHeight || 800;
      const panels = el.querySelectorAll("[data-pillar]");

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
      className="relative overflow-hidden bg-night motion-safe:h-[100svh] motion-safe:lg:h-[100dvh] motion-reduce:py-act"
      aria-label="Παράγουμε, επιλέγουμε, διακινούμε"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-45 lg:opacity-55"
        src="/media/factory.mp4"
        poster="/media/factory-still.png"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/55 to-night/30 lg:via-night/45 lg:to-transparent" aria-hidden />

      <div className="relative z-10 flex px-[clamp(1.2rem,4vw,4.5rem)] motion-safe:h-full motion-safe:items-end motion-safe:pb-chapter">
        <div className="relative w-full max-w-3xl motion-safe:min-h-[42vh]">
          {PILLARS.map((p) => (
            <article
              key={p.no}
              data-pillar
              className="motion-reduce:mb-verse motion-reduce:last:mb-0 motion-safe:absolute motion-safe:inset-x-0 motion-safe:bottom-0"
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
