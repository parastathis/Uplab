'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './BodyMap.module.css';
import { bodyRegions, categoryCount } from '@/lib/content';

/* Anchor of each region inside the 320x640 silhouette viewBox. */
const anchors: Record<string, { x: number; y: number; r: number }> = {
  head: { x: 160, y: 74, r: 46 },
  chest: { x: 160, y: 208, r: 52 },
  core: { x: 160, y: 300, r: 50 },
  pelvis: { x: 160, y: 368, r: 44 },
  arms: { x: 248, y: 262, r: 40 },
  legs: { x: 160, y: 520, r: 60 },
  skin: { x: 74, y: 262, r: 40 },
  family: { x: 160, y: 620, r: 40 },
};

const PARTICLES = 26;

/**
 * Chapter 4 — body-map product finder. Hover/tap a region: the honey
 * particles gather there and the matching health categories surface
 * with live product counts. Replaces a 27-item dropdown.
 */
export function BodyMap() {
  const svgWrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const homes = useRef<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const wrap = svgWrap.current;
    if (!wrap) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dots = Array.from(wrap.querySelectorAll<SVGCircleElement>(`.${styles.dot}`));

    if (!homes.current.length) {
      homes.current = dots.map((_, i) => ({
        x: 60 + Math.random() * 200,
        y: 60 + Math.random() * 520,
      }));
    }

    if (reduced) {
      dots.forEach((d, i) => {
        d.setAttribute('cx', String(homes.current[i].x));
        d.setAttribute('cy', String(homes.current[i].y));
      });
      return;
    }

    const tweens: gsap.core.Tween[] = [];
    if (!active) {
      dots.forEach((d, i) => {
        const h = homes.current[i];
        tweens.push(gsap.to(d, {
          attr: { cx: h.x + (Math.random() - 0.5) * 30, cy: h.y + (Math.random() - 0.5) * 30 },
          duration: 2.6 + Math.random() * 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        }));
        gsap.to(d, { opacity: 0.35 + Math.random() * 0.3, duration: 0.6, overwrite: 'auto' });
      });
    } else {
      const a = anchors[active];
      dots.forEach((d, i) => {
        const ang = (i / dots.length) * Math.PI * 2;
        const rad = a.r * (0.35 + Math.random() * 0.75);
        tweens.push(gsap.to(d, {
          attr: { cx: a.x + Math.cos(ang) * rad, cy: a.y + Math.sin(ang) * rad * 1.1 },
          duration: 0.8 + Math.random() * 0.5,
          ease: 'power3.out',
          overwrite: 'auto',
        }));
        gsap.to(d, { opacity: 0.75 + Math.random() * 0.25, duration: 0.5, overwrite: 'auto' });
      });
    }
    return () => tweens.forEach(t => t.kill());
  }, [active]);

  const region = bodyRegions.find(r => r.id === active) ?? null;
  const regionCats = region
    ? region.cats.map(c => ({ name: c, count: categoryCount(c) })).filter(c => c.count > 0)
    : [];

  return (
    <section className={`section ${styles.section}`} aria-label="Βρείτε προϊόν ανά περιοχή του σώματος">
      <div className="container">
        <div className={styles.head}>
          <p className="eyebrow">Ο πλοηγός της υγείας</p>
          <h2 className={styles.title}>Πού να σας βοηθήσουμε;</h2>
          <p className="lead">
            Αγγίξτε μια περιοχή του σώματος — οι κατηγορίες υγείας με τα προϊόντα
            της Uplab θα σας καθοδηγήσουν.
          </p>
        </div>

        <div className={styles.grid}>
          <div ref={svgWrap} className={styles.figureWrap}>
            <svg
              viewBox="0 0 320 660"
              className={styles.figure}
              role="img"
              aria-label="Ανθρώπινη φιγούρα — επιλέξτε περιοχή"
            >
              {/* porcelain silhouette — minimal, abstract */}
              <path
                className={styles.silhouette}
                d="M160 28
                   c 26 0 42 20 42 46 c 0 16 -6 30 -14 38
                   c 22 8 40 22 46 44 c 5 18 6 40 4 62
                   c 8 4 14 10 18 20 c 6 16 8 34 6 50 c -2 12 -12 14 -16 4
                   c -4 -10 -6 -22 -10 -30 c -2 22 -4 44 -8 62
                   c -4 20 -6 40 -4 60 c 2 26 6 52 4 78 c -2 30 -8 60 -10 90
                   c -1 16 -12 18 -16 2 c -6 -28 -8 -58 -8 -86 c 0 -24 -2 -48 -6 -70
                   c -2 -12 -14 -12 -16 0 c -4 22 -6 46 -6 70 c 0 28 -2 58 -8 86
                   c -4 16 -15 14 -16 -2 c -2 -30 -8 -60 -10 -90 c -2 -26 2 -52 4 -78
                   c 2 -20 0 -40 -4 -60 c -4 -18 -6 -40 -8 -62
                   c -4 8 -6 20 -10 30 c -4 10 -14 8 -16 -4 c -2 -16 0 -34 6 -50
                   c 4 -10 10 -16 18 -20 c -2 -22 -1 -44 4 -62 c 6 -22 24 -36 46 -44
                   c -8 -8 -14 -22 -14 -38 c 0 -26 16 -46 42 -46 Z"
              />

              {/* honey particles */}
              {Array.from({ length: PARTICLES }).map((_, i) => (
                <circle key={i} className={styles.dot} r={2.2 + (i % 4)} cx={160} cy={300} />
              ))}

              {/* region hotspots */}
              {bodyRegions.filter(r => r.id !== 'family' && r.id !== 'skin').map(r => {
                const a = anchors[r.id];
                return (
                  <circle
                    key={r.id}
                    className={`${styles.hotspot} ${active === r.id ? styles.hotOn : ''}`}
                    cx={a.x} cy={a.y} r={a.r}
                    tabIndex={0}
                    role="button"
                    aria-label={r.label}
                    onMouseEnter={() => setActive(r.id)}
                    onFocus={() => setActive(r.id)}
                    onClick={() => setActive(r.id)}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(r.id); } }}
                  />
                );
              })}
            </svg>

            {/* regions that aren't literal body points */}
            <div className={styles.extraChips}>
              {bodyRegions.filter(r => r.id === 'skin' || r.id === 'family').map(r => (
                <button
                  key={r.id}
                  className={`${styles.chip} ${active === r.id ? styles.chipOn : ''}`}
                  onMouseEnter={() => setActive(r.id)}
                  onClick={() => setActive(r.id)}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <aside className={styles.panel} aria-live="polite">
            {!region ? (
              <div className={styles.panelIdle}>
                <p className={styles.panelHint}>Επιλέξτε περιοχή</p>
                <ul className={styles.regionList}>
                  {bodyRegions.map(r => (
                    <li key={r.id}>
                      <button
                        className={styles.regionBtn}
                        onMouseEnter={() => setActive(r.id)}
                        onClick={() => setActive(r.id)}
                      >
                        {r.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className={styles.panelBody} key={region.id}>
                <p className={styles.panelKicker}>{region.label}</p>
                <ul className={styles.catList}>
                  {regionCats.map(c => (
                    <li key={c.name}>
                      <Link href={`/proionta?cat=${encodeURIComponent(c.name)}`} className={styles.catLink}>
                        <span>{c.name}</span>
                        <em>{c.count} {c.count === 1 ? 'προϊόν' : 'προϊόντα'}</em>
                      </Link>
                    </li>
                  ))}
                </ul>
                <button className={styles.back} onClick={() => setActive(null)}>← Όλες οι περιοχές</button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
