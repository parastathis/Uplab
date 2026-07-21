"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { newProducts } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

/** Horizontal gallery, scroll-driven, 3D-tilt cards with real products. */
export default function NewProducts() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const track = trackRef.current;
    if (!el || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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
    <section ref={ref} className="relative h-[100dvh] overflow-hidden bg-porcelain" aria-label="Νέα προϊόντα">
      <div className="flex h-full flex-col justify-center">
        <div className="px-[clamp(1.2rem,4vw,4.5rem)]">
          <p className="caption-tag">Μόλις κυκλοφόρησαν</p>
          <h2 className="display-lg mt-hair text-ink">Νέα προϊόντα</h2>
        </div>

        <div ref={trackRef} className="mt-verse flex w-max gap-[1.7rem] px-[clamp(1.2rem,4vw,4.5rem)] will-change-transform">
          {newProducts.map((p, i) => (
            <Link
              key={p.id}
              href={`/proionta/${p.slug}`}
              onMouseMove={tilt}
              onMouseLeave={untilt}
              className={`group relative flex w-[min(19rem,72vw)] shrink-0 flex-col overflow-hidden border border-ink/10 bg-paper transition-transform duration-200 ease-out ${
                i % 3 === 1 ? "mt-stanza" : i % 3 === 2 ? "-mt-breath" : ""
              }`}
              style={{ borderRadius: "0.4rem 1.9rem 0.4rem 0.4rem" }}
            >
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image}
                  alt={p.imageAlt || p.name}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.045]"
                />
              )}
              <div className="flex flex-col gap-hair p-line">
                <h3 className="font-display text-[1.06rem] text-ink">
                  {p.name}
                </h3>
                <p className="text-[0.78rem] text-mist">{p.categories.join(" · ")}</p>
              </div>
              <span
                className="absolute right-line top-line rounded-full bg-ink px-[0.8em] py-[0.3em] text-[0.68rem] tracking-wider text-porcelain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              >
                ΝΕΟ
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
