"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

type Item = { id: number; title: string; slug: string; date: string; excerpt: string };

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("el-GR", { day: "numeric", month: "long", year: "numeric" });

/**
 * "Display cards" for Τα νέα μας — a fanned deck that fans wider and lifts the
 * hovered card forward. The three latest items sit stacked; hover any to read.
 */
export default function NewsDisplayCards({ items }: { items: Item[] }) {
  const reduce = useReducedMotion();
  const deck = items.slice(0, 3);

  return (
    <div className="group relative mx-auto flex h-[26rem] w-full max-w-xl items-center justify-center">
      {deck.map((n, i) => {
        // fanned resting transform per card
        const rest = { x: (i - 1) * 26, y: (i - 1) * -18, rotate: (i - 1) * -4, scale: 1 - (2 - i) * 0.03 };
        return (
          <motion.div
            key={n.id}
            className="absolute w-[22rem]"
            style={{ zIndex: i }}
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: rest.y, x: rest.x, rotate: rest.rotate, scale: rest.scale }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}
            whileHover={reduce ? undefined : { y: rest.y - 14, scale: 1.04, rotate: 0, zIndex: 10 }}
          >
            <Link
              href={`/nea/${encodeURIComponent(n.slug)}`}
              className="block rounded-[8px] border border-ink/10 bg-paper/95 p-line shadow-[0_20px_50px_-30px_rgba(27,42,58,0.55)] backdrop-blur-sm transition-colors duration-300 hover:border-amber/50"
            >
              <div className="flex items-center justify-between">
                <span className="caption-tag">Νέα</span>
                <time dateTime={n.date} className="text-[0.72rem] text-mist">
                  {fmtDate(n.date)}
                </time>
              </div>
              <h3 className="mt-line line-clamp-2 min-h-[3.4rem] font-display text-[1.25rem] leading-snug text-ink">
                {n.title}
              </h3>
              <p className="mt-breath line-clamp-2 text-[0.85rem] leading-relaxed text-mist">{n.excerpt}</p>
              <span className="btn-line mt-line text-[0.8rem] text-ink">
                Διαβάστε
                <span className="btn-arrow" aria-hidden>→</span>
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
