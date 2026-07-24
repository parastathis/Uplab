"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Brand loading screen shown on a hard page load: the Uplab logo fades in over
 * a dark field while a thin amber line fills, then the whole panel lifts away
 * to reveal the site. It lives in the root layout, so it only fires on real
 * loads — client-side route changes never remount it.
 */
export default function SiteLoader() {
  const [show, setShow] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const hold = reduce ? 500 : 1600;
    const t = setTimeout(() => setShow(false), hold);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="site-loader"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <div className="flex flex-col items-center gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              src="/brand/logo.png"
              alt="Uplab Pharmaceuticals"
              className="h-9 w-auto [filter:brightness(0)_invert(1)]"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            {!reduce && (
              <div className="h-px w-40 overflow-hidden bg-porcelain/15">
                <motion.div
                  className="h-full w-full origin-left bg-amber"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.15 }}
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
