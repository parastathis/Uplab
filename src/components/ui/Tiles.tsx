"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Interactive tile-grid background (21st.dev @lukacho/tiles pattern),
 * re-skinned to the Uplab tonal system. Flashes stay neutral — amber is
 * reserved for intent, never decoration.
 */

const FLASH_COLORS = [
  "rgba(223, 215, 198, 0.65)", // parchment
  "rgba(143, 156, 139, 0.40)", // sage
  "rgba(39, 75, 120, 0.28)", // sky
  "rgba(67, 86, 106, 0.22)", // slate
];

const SIZES = {
  sm: "clamp(28px, 3vw, 44px)",
  md: "clamp(44px, 4.6vw, 68px)",
  lg: "clamp(64px, 6.4vw, 96px)",
} as const;

function Tile({ flash }: { flash: string }) {
  return (
    <motion.div
      className="border-[0.5px] border-ink/[0.04]"
      initial={false}
      whileHover={{ backgroundColor: flash, transition: { duration: 0 } }}
      animate={{
        backgroundColor: "rgba(223, 215, 198, 0)",
        transition: { duration: 2.4, ease: [0.23, 1, 0.32, 1] },
      }}
    />
  );
}

export default function Tiles({
  rows = 40,
  cols = 24,
  tileSize = "md",
  className = "",
}: {
  rows?: number;
  cols?: number;
  tileSize?: keyof typeof SIZES;
  className?: string;
}) {
  const flashes = useMemo(
    () =>
      Array.from({ length: rows * cols }, (_, i) => FLASH_COLORS[(i * 7) % FLASH_COLORS.length]),
    [rows, cols]
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-auto absolute inset-0 z-0 grid overflow-hidden ${className}`}
      style={{
        gridTemplateRows: `repeat(${rows}, ${SIZES[tileSize]})`,
        gridTemplateColumns: `repeat(${cols}, ${SIZES[tileSize]})`,
        justifyContent: "center",
      }}
    >
      {flashes.map((flash, i) => (
        <Tile key={i} flash={flash} />
      ))}
    </div>
  );
}
