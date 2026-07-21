"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VISION =
  "Η απόλυτη φυσική ισορροπία ανθρώπου και περιβάλλοντος. Στοιχεία συνδεδεμένα, αμφίδρομα με την υγεία.";

/**
 * Full-viewport hero: the camera orbits the hand holding the capsule,
 * scrubbed 1:1 by scroll. UPLAB tracks in letter-by-letter over the sky.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // — video scrub: lerp toward target, seek only when meaningfully ahead —
      const scrub = { target: 0, current: 0, lastSeek: -1 };
      const onTick = () => {
        scrub.current += (scrub.target - scrub.current) * 0.12;
        if (Math.abs(scrub.current - scrub.lastSeek) > 1 / 30 && video.readyState >= 2) {
          scrub.lastSeek = scrub.current;
          video.currentTime = scrub.current;
        }
      };
      gsap.ticker.add(onTick);

      const vh = window.innerHeight || document.documentElement.clientHeight || 800;

      // one master scrubbed timeline owns the pin — letter/copy tweens live
      // inside it (separate triggers on a pinned element never progress)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${vh * 3}`,
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            const dur = video.duration || 6;
            scrub.target = self.progress * (dur - 0.05);
          },
        },
      });

      tl.fromTo(
        section.querySelectorAll("[data-letter]"),
        { yPercent: 118, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.055, ease: "power3.out", duration: 0.3 },
        0
      )
        .fromTo(
          section.querySelectorAll("[data-hero-copy]"),
          { y: 42, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, ease: "power2.out", duration: 0.22 },
          0.32
        )
        .to({}, { duration: 0.46 }); // dead time: the orbit alone carries the rest

      return () => gsap.ticker.remove(onTick);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-label="Uplab Pharmaceuticals" className="relative h-[100dvh] w-full overflow-hidden bg-sky">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        poster="/media/hero-still.png"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      >
        <source src="/media/hero-orbit.mp4" type="video/mp4" />
      </video>

      {/* ink veil for legibility at the top edge */}
      <div className="absolute inset-x-0 top-0 h-[30vh] bg-gradient-to-b from-ink/35 to-transparent" aria-hidden />

      <div className="relative z-10 flex h-full flex-col justify-between px-[clamp(1.2rem,4vw,4.5rem)] pb-verse pt-[calc(var(--nav-h)+2rem)]">
        <h1 className="display-xl mt-[4vh] flex overflow-hidden text-porcelain" aria-label="UPLAB">
          {"UPLAB".split("").map((ch, i) => (
            <span key={i} data-letter aria-hidden className="inline-block will-change-transform">
              {ch}
            </span>
          ))}
        </h1>

        <div className="mb-[6vh] flex flex-wrap items-end justify-between gap-stanza">
          <p
            data-hero-copy
            className="max-w-[26ch] font-display text-[clamp(1.05rem,1.9vw,1.5rem)] italic leading-snug text-porcelain/90"
          >
            {VISION}
          </p>
          <Link
            data-hero-copy
            href="/simeia-polisis"
            className="group inline-flex items-center gap-breath rounded-full bg-amber px-[1.6em] py-[0.75em] text-[0.85rem] text-ink-black transition-colors duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-amber-bright"
            style={{ fontWeight: 560 }}
          >
            Βρείτε φαρμακείο
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
