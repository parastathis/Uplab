"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Draggable before/after comparison. Drag the handle (or use ←/→ when focused)
 * to wipe between the two images. On first scroll into view the divider does a
 * one-time sweep to signal it's interactive.
 */
export default function ImageCompare({
  before,
  after,
  beforeLabel,
  afterLabel,
  alt = "",
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => dragging.current && setFromClientX(e.clientX);
    const up = () => (dragging.current = false);
    const tmove = (e: TouchEvent) => dragging.current && setFromClientX(e.touches[0].clientX);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", tmove, { passive: true });
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", tmove);
      window.removeEventListener("touchend", up);
    };
  }, [setFromClientX]);

  // one-time hint sweep on enter
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        let t = 0;
        const seq = [50, 62, 38, 50];
        const step = () => {
          if (t < seq.length) {
            setPos(seq[t]);
            t++;
            setTimeout(step, 260);
          }
        };
        setTimeout(step, 500);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="group relative aspect-[16/10] w-full select-none overflow-hidden rounded-[6px] border border-ink/10"
      onMouseDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        dragging.current = true;
        setFromClientX(e.touches[0].clientX);
      }}
    >
      {/* after (base) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt={alt} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      {afterLabel && (
        <span className="absolute bottom-4 right-4 rounded-[3px] bg-ink/70 px-3 py-1 text-[0.7rem] uppercase tracking-[0.16em] text-porcelain backdrop-blur">
          {afterLabel}
        </span>
      )}

      {/* before (clipped via clip-path so it stays aligned with the base) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before} alt={alt} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        {beforeLabel && (
          <span className="absolute bottom-4 left-4 rounded-[3px] bg-ink/70 px-3 py-1 text-[0.7rem] uppercase tracking-[0.16em] text-porcelain backdrop-blur">
            {beforeLabel}
          </span>
        )}
      </div>

      {/* divider + handle */}
      <div
        className="absolute inset-y-0 z-10 w-px bg-porcelain/90 shadow-[0_0_0_1px_rgba(27,42,58,0.15)]"
        style={{ left: `${pos}%`, transition: dragging.current ? "none" : "left 0.35s cubic-bezier(0.23,1,0.32,1)" }}
      >
        <button
          aria-label="Σύγκριση φύσης και επιστήμης"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
            if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
          }}
          className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-porcelain text-ink shadow-[0_6px_20px_-6px_rgba(27,42,58,0.5)] transition-transform duration-300 group-hover:scale-110"
        >
          <span className="text-[0.9rem] tracking-[-0.1em]" aria-hidden>
            ←→
          </span>
        </button>
      </div>
    </div>
  );
}
