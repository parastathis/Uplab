'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './NewProducts.module.css';
import { newProducts } from '@/lib/content';

gsap.registerPlugin(ScrollTrigger);

/** Chapter 5 — pinned horizontal gallery; cards tilt in 3D toward the cursor. */
export function NewProducts() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current || !track.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduced || coarse) return; // native horizontal scroll instead

    const ctx = gsap.context(() => {
      const distance = () =>
        track.current!.scrollWidth - (window.innerWidth || document.documentElement.clientWidth);
      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const tilt = (e: React.MouseEvent<HTMLElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -10;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 12;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
  };
  const untilt = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = '';
  };

  return (
    <section ref={root} className={styles.section} aria-label="Νέα προϊόντα">
      <div className={styles.inner}>
        <div className={`container ${styles.head}`}>
          <p className="eyebrow">Νέες κυκλοφορίες</p>
          <h2 className={styles.title}>Νέα προϊόντα</h2>
        </div>

        <div ref={track} className={styles.track}>
          {newProducts.map((p, i) => (
            <Link
              key={p.id}
              href={`/proionta/${encodeURIComponent(p.slug)}`}
              className={styles.card}
              onMouseMove={tilt}
              onMouseLeave={untilt}
              style={{ zIndex: newProducts.length - i }}
            >
              <span className={styles.badge}>Νέο</span>
              <span className={styles.media}>
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={p.imageAlt || p.name} loading="lazy" />
                ) : (
                  <span className={styles.noimg}>{p.name}</span>
                )}
              </span>
              <span className={styles.body}>
                <span className={styles.name}>{p.name}</span>
                <span className={styles.cats}>{p.categories.join(' · ')}</span>
              </span>
            </Link>
          ))}
          <div className={styles.endCap}>
            <p>76 προϊόντα<br />σας περιμένουν</p>
            <span className="btn btn-line">Όλα τα προϊόντα →</span>
          </div>
        </div>
      </div>
    </section>
  );
}
