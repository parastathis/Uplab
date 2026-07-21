"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * Scroll-driven text fill (bundui «text-gradient-scroll» pattern). Each word
 * rises from a muted state to full ink as the paragraph passes through the
 * viewport, so a statement "reads itself in" as you scroll. Amber stays out of
 * it — per the palette law the accent is reserved for intent, not emphasis.
 * With prefers-reduced-motion the text renders fully lit, no scrubbing.
 */

const MUTED = "rgb(89, 104, 113)"; // --color-mist
const LIT = "rgb(28, 43, 58)"; // --color-ink

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  const color = useTransform(progress, range, [MUTED, LIT]);
  return (
    <span className="relative mr-[0.28em] inline-block">
      <motion.span style={{ opacity, color }}>{children}</motion.span>
    </span>
  );
}

export default function GradientScrollText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });

  const words = text.split(" ");

  if (reduce) {
    return <p className={`text-ink ${className}`}>{text}</p>;
  }

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}
