'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';
import { Magnetic } from './Magnetic';

gsap.registerPlugin(ScrollTrigger);

const WORD = 'UPLAB';

/**
 * Chapter 1 — pinned hero. The orbit clip is scrubbed by scroll position
 * (video.currentTime driven through a lerped proxy), while UPLAB tracks in
 * letter-by-letter and the vision statement fades through.
 * Reduced motion / mobile fallback: static poster + gentle autoplay loop.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const video = videoRef.current;
    if (!root.current || !video) return;

    if (reduced) return; // poster only — CSS handles it

    if (coarse) {
      // mobile: light parallax + looping video instead of frame-scrubbing
      video.loop = true;
      video.play().catch(() => {});
      const st = gsap.to(`.${styles.sky}`, {
        yPercent: 12, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      return () => { st.scrollTrigger?.kill(); st.kill(); };
    }

    // scrub proxy → video.currentTime, lerped so decode keeps up.
    // Compare against the last *seeked* value, not the video clock —
    // seeks snap to keyframes and would otherwise re-seek forever.
    const proxy = { t: 0 };
    let target = 0;
    let lastSeek = -1;
    let tickerFn: ((t: number) => void) | null = null;
    const onReady = () => {
      const dur = video.duration || 6;
      tickerFn = () => {
        proxy.t += (target - proxy.t) * 0.12;
        if (Math.abs(proxy.t - lastSeek) > 0.034) {
          lastSeek = proxy.t;
          video.currentTime = Math.min(proxy.t, dur - 0.05);
        }
      };
      gsap.ticker.add(tickerFn);
    };
    if (video.readyState >= 1) onReady();
    else video.addEventListener('loadedmetadata', onReady, { once: true });

    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray<HTMLElement>(`.${styles.letter}`);

      // act I — letters track in on load (not scrubbed; the page must never open empty)
      gsap.fromTo(letters,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.09, duration: 1.1, ease: 'power3.out', delay: 0.25 });

      // acts II-IV — scrubbed by scroll while the section is pinned
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${(window.innerHeight || document.documentElement.clientHeight || 800) * 2.8}`,
          pin: true,
          scrub: 0.6,
          onUpdate: self => { target = self.progress * (video.duration || 6); },
        },
      });

      tl.to(`.${styles.word}`, { letterSpacing: '0.14em', duration: 0.4, ease: 'power2.inOut' }, 0.02)
        // act II — vision statement through
        .fromTo(`.${styles.vision}`,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.26)
        // act III — word recedes, invitation to scroll on
        .to(`.${styles.word}`, { opacity: 0.12, scale: 0.94, duration: 0.3, ease: 'power2.inOut' }, 0.55)
        .to(`.${styles.vision}`, { opacity: 0, y: -30, duration: 0.2, ease: 'power2.in' }, 0.78)
        .fromTo(`.${styles.outro}`,
          { opacity: 0 },
          { opacity: 1, duration: 0.15, ease: 'power2.out' }, 0.85);
    }, root);

    return () => {
      if (tickerFn) gsap.ticker.remove(tickerFn);
      video.removeEventListener('loadedmetadata', onReady);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={root} className={styles.hero} aria-label="Uplab — Η Ισορροπία">
      <div className={styles.sky}>
        <video
          ref={videoRef}
          className={styles.video}
          src="/media/clip-1-hero-orbit.mp4"
          poster="/media/hero-honey-capsule.png"
          muted
          playsInline
          preload="auto"
        />
        <div className={styles.veil} aria-hidden />
      </div>

      <div className={styles.stage}>
        <p className={styles.kicker}>Φύση × Επιστήμη</p>
        <h1 className={styles.word} aria-label="UPLAB">
          {WORD.split('').map((ch, i) => (
            <span className={styles.letterMask} key={i}>
              <span className={styles.letter}>{ch}</span>
            </span>
          ))}
        </h1>

        {/* real vision statement from the crawl — semantic copy stays in DOM */}
        <p className={styles.vision}>
          Η απόλυτη φυσική ισορροπία ανθρώπου και περιβάλλοντος.
          Στοιχεία συνδεδεμένα, αμφίδρομα με την υγεία.
          <em> Αυτό είναι το όραμά μας.</em>
        </p>

        <p className={styles.outro}>
          Συνεχίστε — παράγουμε, επιλέγουμε, διακινούμε.
        </p>
      </div>

      {/* persistent slim CTA */}
      <div className={styles.ctaBar}>
        <Magnetic>
          <Link href="/simeia-polisis" className={`btn btn-honey ${styles.slimCta}`}>
            Βρείτε φαρμακείο
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Magnetic>
        <div className={styles.scrollHint} aria-hidden>
          <span className={styles.scrollLine} />
          <span>scroll</span>
        </div>
      </div>
    </section>
  );
}
