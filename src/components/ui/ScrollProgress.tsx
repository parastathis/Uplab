"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Hairline amber progress bar pinned to the top edge, tracking page scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-amber"
    />
  );
}
