"use client";

import { useEffect, useRef } from "react";

/**
 * Seamless ping-pong video: the playhead is driven manually by rAF, forward to
 * the end then back to the start, on repeat — no hard loop cut and no reliance
 * on native negative playback (which browsers don't support). Both directions
 * are symmetric seeks, so the bounce is smooth. Pauses when off-screen and
 * holds the first frame under prefers-reduced-motion.
 */
export default function PingPongVideo({
  src,
  poster,
  className,
  rate = 1,
}: {
  src: string;
  poster?: string;
  className?: string;
  /** playhead speed multiplier */
  rate?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = 0;
    let dir: 1 | -1 = 1;
    v.pause();

    const step = (t: number) => {
      const dur = v.duration;
      if (!dur || Number.isNaN(dur)) {
        raf = requestAnimationFrame(step);
        return;
      }
      const dt = last ? Math.min((t - last) / 1000, 0.05) : 0;
      last = t;
      let nt = v.currentTime + dir * dt * rate;
      if (nt >= dur - 0.03) {
        nt = dur - 0.03;
        dir = -1;
      } else if (nt <= 0) {
        nt = 0;
        dir = 1;
      }
      try {
        v.currentTime = nt;
      } catch {
        /* seeking not ready yet */
      }
      raf = requestAnimationFrame(step);
    };

    const begin = () => {
      if (raf) return;
      last = 0;
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    if (v.readyState >= 2) begin();
    else v.addEventListener("loadeddata", begin, { once: true });

    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? begin() : stop()),
      { threshold: 0.05 }
    );
    io.observe(v);

    return () => {
      stop();
      io.disconnect();
      v.removeEventListener("loadeddata", begin);
    };
  }, [rate]);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="auto"
      aria-hidden
    />
  );
}
