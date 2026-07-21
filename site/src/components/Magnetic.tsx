'use client';

import { useRef, type ReactNode } from 'react';

/** Magnetic hover wrapper — the child drifts toward the cursor, settles back on leave. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
    el.style.transform = 'translate(0,0)';
    setTimeout(() => { if (el) el.style.transition = ''; }, 500);
  };

  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ display: 'inline-block' }}>
      {children}
    </span>
  );
}
