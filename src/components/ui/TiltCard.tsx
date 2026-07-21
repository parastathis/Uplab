"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A link card that is both a <Stagger> item (cascades in) and tilts in 3D
 * toward the cursor. Used across product grids and related-product rails.
 */
export default function TiltCard({
  href,
  children,
  className = "",
  style,
  tilt = 8,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  tilt?: number;
}) {
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -tilt;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * tilt;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
  };
  const reset = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  const variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
  };

  return (
    <motion.div variants={reduce ? undefined : variants}>
      <Link
        href={href}
        onMouseMove={onMove}
        onMouseLeave={reset}
        className={`block transition-transform duration-200 ease-out will-change-transform ${className}`}
        style={style}
      >
        {children}
      </Link>
    </motion.div>
  );
}
