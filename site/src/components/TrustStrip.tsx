'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './TrustStrip.module.css';

/* Real numbers from the crawl. Founding year deliberately absent —
   it is not stated anywhere on uplab.gr (see content gaps). */
const stats = [
  { value: 76, label: 'προϊόντα υγείας' },
  { value: 27, label: 'κατηγορίες υγείας' },
  { value: 10, label: 'αποκλειστικοί συνεργάτες' },
  { value: 2075, label: 'σημεία πώλησης' },
];

export function TrustStrip() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const nums = Array.from(root.current.querySelectorAll<HTMLElement>(`.${styles.num}`));
    if (reduced) {
      nums.forEach(el => { el.textContent = Number(el.dataset.value).toLocaleString('el-GR'); });
      return;
    }

    const tweens: gsap.core.Tween[] = [];
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        io.unobserve(el);
        const end = Number(el.dataset.value);
        const obj = { v: 0 };
        tweens.push(gsap.to(obj, {
          v: end,
          duration: 1.8,
          ease: 'power3.out',
          onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString('el-GR'); },
        }));
      });
    }, { threshold: 0.4 });
    nums.forEach(el => io.observe(el));

    return () => { io.disconnect(); tweens.forEach(t => t.kill()); };
  }, []);

  return (
    <section ref={root} className={styles.strip} aria-label="Η Uplab σε αριθμούς">
      <div className={`container ${styles.grid}`}>
        {stats.map(s => (
          <div key={s.label} className={styles.stat}>
            <span className={styles.num} data-value={s.value}>0</span>
            <span className={styles.label}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
