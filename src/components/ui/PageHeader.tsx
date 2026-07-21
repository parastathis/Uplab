"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Animated interior-page masthead. The kicker slides in, the title rises word-
 * agnostic behind a wipe, and a hairline rule draws itself left-to-right.
 * Amber stays out of it — the accent is reserved for intent (per the palette law).
 */
export default function PageHeader({
  kicker,
  title,
  lead,
  align = "left",
  tone = "ink",
  children,
}: {
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "ink" | "porcelain";
  children?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const titleCls = tone === "porcelain" ? "text-porcelain" : "text-ink";
  const kickerCls = tone === "porcelain" ? "caption-tag !text-porcelain/60" : "caption-tag";
  const leadCls = tone === "porcelain" ? "text-porcelain/70" : "text-mist";
  const ruleCls = tone === "porcelain" ? "bg-porcelain/25" : "bg-ink/15";
  const alignCls = align === "center" ? "mx-auto text-center items-center" : "";

  const item = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.75, ease: EASE, delay },
        };

  return (
    <header className={`flex flex-col ${alignCls}`}>
      <motion.p className={kickerCls} {...item(0)}>
        {kicker}
      </motion.p>
      <motion.h1 className={`display-lg mt-hair ${titleCls}`} {...item(0.08)}>
        {title}
      </motion.h1>
      <motion.div
        aria-hidden
        className={`mt-stanza h-px ${ruleCls} ${align === "center" ? "w-24" : "w-full max-w-[7rem]"}`}
        style={{ transformOrigin: "left" }}
        {...(reduce
          ? {}
          : {
              initial: { scaleX: 0, opacity: 0 },
              whileInView: { scaleX: 1, opacity: 1 },
              viewport: { once: true },
              transition: { duration: 0.9, ease: EASE, delay: 0.2 },
            })}
      />
      {lead && (
        <motion.p className={`mt-stanza max-w-[54ch] text-[1rem] leading-relaxed ${leadCls}`} {...item(0.16)}>
          {lead}
        </motion.p>
      )}
      {children && (
        <motion.div {...item(0.22)}>{children}</motion.div>
      )}
    </header>
  );
}
