'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Pillars.module.css';
import { partners } from '@/lib/content';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    n: '01',
    title: 'ΠΑΡΑΓΟΥΜΕ',
    text: 'Σύγχρονο εργοστάσιο παραγωγής φαρμάκων, σύμφωνα με τις ισχύουσες Αρχές Ορθής Παρασκευαστικής Πρακτικής (GMP), με όλες τις απαιτούμενες πιστοποιήσεις.',
  },
  {
    n: '02',
    title: 'ΕΠΙΛΕΓΟΥΜΕ',
    text: 'Αντιπροσωπεύουμε κατ’ αποκλειστικότητα μεγάλους ευρωπαϊκούς οίκους, διευρύνοντας συνεχώς το δίκτυο των συνεργατών μας.',
    wall: true,
  },
  {
    n: '03',
    title: 'ΔΙΑΚΙΝΟΥΜΕ',
    text: 'Πανελλαδική διακίνηση μέσα από ένα πολυμελές και σύγχρονο δίκτυο — αποκλειστικά στα φαρμακεία και στις φαρμακαποθήκες.',
  },
];

/** Chapter 3 — pinned over the factory clip; the three verbs surface in sequence. */
export function Pillars() {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const video = videoRef.current;

    if (reduced) return;
    video?.play().catch(() => {});

    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (coarse) return; // mobile: normal flow, videos loop, no pinning

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(`.${styles.pillar}`);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${(window.innerHeight || document.documentElement.clientHeight || 800) * 2.6}`,
          pin: true,
          scrub: 0.7,
        },
      });

      panels.forEach((panel, i) => {
        const at = i * 0.32;
        tl.fromTo(panel,
          { opacity: 0, yPercent: 18 },
          { opacity: 1, yPercent: 0, duration: 0.16, ease: 'power3.out' }, at);
        if (i < panels.length - 1) {
          tl.to(panel, { opacity: 0, yPercent: -14, duration: 0.12, ease: 'power2.in' }, at + 0.22);
        }
      });

      tl.fromTo(`.${styles.wall} span`,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, stagger: 0.014, duration: 0.08, ease: 'power2.out' }, 0.40);
      tl.to(`.${styles.wall}`, { opacity: 0, duration: 0.1, ease: 'power2.in' }, 0.54);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className={styles.section} aria-label="Παράγουμε, επιλέγουμε, διακινούμε">
      <div className={styles.media}>
        <video
          ref={videoRef}
          src="/media/clip-2-factory.mp4"
          poster="/media/factory-gmp-line.png"
          muted loop playsInline preload="metadata"
        />
        <div className={styles.tint} aria-hidden />
      </div>

      <div className={`container ${styles.stage}`}>
        {pillars.map(p => (
          <article key={p.n} className={styles.pillar}>
            <span className={styles.num}>{p.n}</span>
            <h2 className={styles.title}>{p.title}</h2>
            <p className={styles.text}>{p.text}</p>
            {p.wall && (
              <div className={styles.wall} aria-label="Αποκλειστικοί συνεργάτες">
                {partners.map(name => <span key={name}>{name}</span>)}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
