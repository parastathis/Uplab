"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Scroll-reveal primitives shared across every interior page.
 * — <Reveal>        one element that fades + rises (optionally de-blurs) on enter
 * — <Stagger>       a container whose <StaggerItem> children cascade in
 * All respect prefers-reduced-motion by rendering the plain tag with no motion.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/* eslint-disable @typescript-eslint/no-explicit-any */
const MOTION: Record<string, any> = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  nav: motion.nav,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  dl: motion.dl,
  p: motion.p,
  span: motion.span,
  h2: motion.h2,
  h3: motion.h3,
  figure: motion.figure,
};

type Common = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  id?: string;
  role?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export function Reveal({
  children,
  className,
  style,
  as = "div",
  delay = 0,
  y = 30,
  blur = false,
  duration = 0.8,
  once = true,
  ...rest
}: Common & {
  delay?: number;
  y?: number;
  blur?: boolean;
  duration?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Plain = as as ElementType;
    return (
      <Plain className={className} style={style} {...rest}>
        {children}
      </Plain>
    );
  }

  const MotionTag = MOTION[as as string] ?? motion.div;
  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: blur ? "blur(10px)" : "none" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-8% 0px -8% 0px" }}
      transition={{ duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function Stagger({
  children,
  className,
  style,
  as = "div",
  gap = 0.09,
  delay = 0.05,
  once = true,
  ...rest
}: Common & { gap?: number; delay?: number; once?: boolean }) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Plain = as as ElementType;
    return (
      <Plain className={className} style={style} {...rest}>
        {children}
      </Plain>
    );
  }

  const MotionTag = MOTION[as as string] ?? motion.div;
  return (
    <MotionTag
      {...rest}
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-6% 0px -6% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  style,
  as = "div",
  y = 26,
  ...rest
}: Common & { y?: number }) {
  const reduce = useReducedMotion();

  if (reduce) {
    const Plain = as as ElementType;
    return (
      <Plain className={className} style={style} {...rest}>
        {children}
      </Plain>
    );
  }

  const MotionTag = MOTION[as as string] ?? motion.div;
  return (
    <MotionTag
      {...rest}
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      }}
    >
      {children}
    </MotionTag>
  );
}
