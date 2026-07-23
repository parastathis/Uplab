"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { newProducts } from "@/lib/data";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

/**
 * New products gallery. Desktop: scroll-driven horizontal pin with 3D-tilt
 * cards. Mobile/touch: a plain native horizontal swipe (no scroll-jacking) —
 * users swipe sideways through snap-aligned cards.
 */
export default function NewProducts() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    const track = trackRef.current;
    if (!el || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // desktop only — mobile uses native horizontal scroll
    if (window.innerWidth < 1024 || window.matchMedia("(pointer: coarse)").matches) return;

    const ctx = gsap.context(() => {
      const dist = () => track.scrollWidth - el.clientWidth;
      gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const tilt = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -9;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 11;
    card.style.transform = `perspective(820px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
  };
  const untilt = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "perspective(820px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <section
      ref={ref}
      className="relative bg-porcelain py-act lg:h-[100dvh] lg:overflow-hidden lg:py-0"
      aria-label="Νέα προϊόντα"
    >
      <div className="flex flex-col lg:h-full lg:justify-center">
        <div className="flex items-baseline justify-between px-[clamp(1.2rem,4vw,4.5rem)]">
          <div>
            <p className="caption-tag">Μόλις κυκλοφόρησαν</p>
            <h2 className="display-lg mt-hair text-ink">Νέα προϊόντα</h2>
          </div>
          <span className="caption-tag hidden text-mist sm:block lg:hidden" aria-hidden>
            Σύρετε →
          </span>
        </div>

        {/* scroll container: native swipe on mobile, GSAP-driven on desktop */}
        <div className="mt-verse overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible">
          <div
            ref={trackRef}
            className="flex w-max snap-x snap-mandatory gap-[1.2rem] px-[clamp(1.2rem,4vw,4.5rem)] will-change-transform lg:snap-none"
          >
            {newProducts.map((p) => (
              <Link
                key={p.id}
                href={`/proionta/${p.slug}`}
                onMouseMove={tilt}
                onMouseLeave={untilt}
                className="group relative flex w-[72vw] max-w-[19rem] shrink-0 snap-start flex-col overflow-hidden rounded-[4px] border border-ink/10 bg-paper transition-transform duration-200 ease-out sm:w-[19rem]"
              >
                {p.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt={p.imageAlt || p.name}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.05]"
                  />
                )}
                <div className="flex min-h-[5rem] flex-col gap-hair border-t border-ink/8 p-line">
                  <h3 className="subhead line-clamp-1 text-[1.06rem] text-ink">{p.name}</h3>
                  <p className="line-clamp-1 text-[0.78rem] text-mist">{p.categories.join(" · ")}</p>
                </div>
                <span
                  className="absolute right-line top-line rounded-[3px] bg-ink px-[0.7em] py-[0.3em] text-[0.62rem] tracking-[0.18em] text-porcelain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                >
                  ΝΕΟ
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
