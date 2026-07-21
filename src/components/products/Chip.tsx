"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Editorial filter tab — no pill. Text with an italic count; an underline draws
 * on hover and turns amber when active (amber = intent, per the palette law).
 */
export default function Chip({
  href,
  label,
  active,
  count,
}: {
  href: string;
  label: string;
  active: boolean;
  count?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      whileHover={reduce ? undefined : { y: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      className="inline-block"
    >
      <Link href={href} scroll={false} className={`filter-tab ${active ? "is-active" : ""}`}>
        {label}
        {typeof count === "number" && <span className="filter-tab__count">{count}</span>}
      </Link>
    </motion.span>
  );
}
