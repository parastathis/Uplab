"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";

const fmt = (v: number) => new Intl.NumberFormat("el-GR").format(Math.round(v));

/** Count-up on first scroll into view. Formats with Greek thousands separators. */
export default function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  duration = 1.9,
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || done) return;
    if (reduce) {
      setDone(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setDone(true);
        const state = { v: 0 };
        gsap.to(state, {
          v: value,
          duration,
          ease: "power3.out",
          onUpdate: () => {
            if (ref.current) ref.current.textContent = `${prefix}${fmt(state.v)}${suffix}`;
          },
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, suffix, prefix, duration, reduce, done]);

  return (
    <span ref={ref} className={className}>
      {reduce ? `${prefix}${fmt(value)}${suffix}` : `${prefix}0${suffix}`}
    </span>
  );
}
