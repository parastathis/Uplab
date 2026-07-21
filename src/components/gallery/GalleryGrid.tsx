"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getLenis } from "@/lib/lenis";

const EASE = [0.22, 1, 0.36, 1] as const;

export type GalleryImage = { src: string; label: string };

/** Masonry gallery with staggered reveal, hover zoom, and a lightbox. */
export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    const l = getLenis();
    l?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      getLenis()?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, images.length]);

  return (
    <>
      <div className="mx-auto max-w-7xl gap-line px-[clamp(1.2rem,4vw,4.5rem)] pb-act [column-fill:_balance] columns-1 sm:columns-2 lg:columns-3">
        {images.map((img, i) => (
          <motion.button
            key={img.src + i}
            onClick={() => setOpen(i)}
            initial={reduce ? false : { opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.7, ease: EASE, delay: (i % 3) * 0.06 }}
            className="group mb-line block w-full overflow-hidden rounded-[6px] border border-ink/8 bg-white"
          >
            <span className="relative block overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.label}
                loading="lazy"
                className="w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]"
              />
              <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
              <span className="pointer-events-none absolute bottom-0 left-0 right-0 translate-y-full bg-gradient-to-t from-ink/80 to-transparent p-line text-left text-[0.8rem] text-porcelain transition-transform duration-500 group-hover:translate-y-0">
                {img.label}
              </span>
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink-black/92 p-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <button
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-porcelain/25 text-porcelain transition-colors hover:bg-porcelain hover:text-ink"
              aria-label="Κλείσιμο"
              onClick={() => setOpen(null)}
            >
              ✕
            </button>
            <button
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-2xl text-porcelain/70 transition-colors hover:text-porcelain sm:left-8"
              aria-label="Προηγούμενο"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length));
              }}
            >
              ←
            </button>
            <motion.img
              key={open}
              // eslint-disable-next-line @next/next/no-img-element
              src={images[open].src}
              alt={images[open].label}
              className="max-h-[85vh] max-w-[92vw] rounded-[6px] object-contain shadow-2xl"
              initial={reduce ? false : { scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-2xl text-porcelain/70 transition-colors hover:text-porcelain sm:right-8"
              aria-label="Επόμενο"
              onClick={(e) => {
                e.stopPropagation();
                setOpen((i) => (i === null ? i : (i + 1) % images.length));
              }}
            >
              →
            </button>
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.8rem] tracking-wide text-porcelain/70">
              {images[open].label} · {open + 1}/{images.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
