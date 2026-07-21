'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import styles from './Nav.module.css';
import { healthCategories, eofCategories } from '@/lib/content';

const links = [
  { href: '/proionta', label: 'Προϊόντα', mega: true },
  { href: '/etaireia', label: 'Η εταιρεία' },
  { href: '/nea', label: 'Νέα' },
  { href: '/simeia-polisis', label: 'Σημεία πώλησης' },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMegaOpen(false); setMobileOpen(false); }, [pathname]);

  const openMega = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setMegaOpen(true); };
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setMegaOpen(false), 180); };

  return (
    <header className={`${styles.nav} ${scrolled || megaOpen ? styles.scrolled : ''} glass`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <span className={styles.brandWord}>uplab</span>
          <span className={styles.brandDot}>.</span>
          <span className={styles.brandSub}>Pharmaceuticals</span>
        </Link>

        <nav className={`${styles.links} ${mobileOpen ? styles.open : ''}`} aria-label="Κύριο μενού">
          {links.map(l => (
            <div
              key={l.href}
              className={styles.linkWrap}
              onMouseEnter={l.mega ? openMega : undefined}
              onMouseLeave={l.mega ? scheduleClose : undefined}
            >
              <Link
                href={l.href}
                className={`${styles.link} ${pathname.startsWith(l.href) ? styles.active : ''}`}
                aria-current={pathname.startsWith(l.href) ? 'page' : undefined}
              >
                {l.label}
              </Link>
            </div>
          ))}
          <Link href="/epikoinonia" className={`btn btn-honey ${styles.cta}`}>Επικοινωνία</Link>
          <Link href="/en" className={styles.lang} lang="en" aria-label="English version">EN</Link>
        </nav>

        <button
          className={styles.burger}
          aria-label="Μενού"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* frosted mega-menu */}
      <div
        className={`${styles.mega} glass ${megaOpen ? styles.megaOpen : ''}`}
        onMouseEnter={openMega}
        onMouseLeave={scheduleClose}
        aria-hidden={!megaOpen}
      >
        <div className={`container ${styles.megaGrid}`}>
          <div>
            <p className={styles.megaTitle}>Κατηγορίες υγείας</p>
            <ul className={styles.megaCats}>
              {healthCategories.slice(0, 14).map(c => (
                <li key={c.name}>
                  <Link href={`/proionta?cat=${encodeURIComponent(c.name)}`} tabIndex={megaOpen ? 0 : -1}>
                    {c.name} <em>{c.count}</em>
                  </Link>
                </li>
              ))}
            </ul>
            <Link className={styles.megaAll} href="/proionta" tabIndex={megaOpen ? 0 : -1}>
              Όλες οι κατηγορίες →
            </Link>
          </div>
          <div>
            <p className={styles.megaTitle}>Κατηγορίες ΕΟΦ</p>
            <ul className={styles.megaCats}>
              {eofCategories.map(c => (
                <li key={c.name}>
                  <Link href={`/proionta?eof=${encodeURIComponent(c.name)}`} tabIndex={megaOpen ? 0 : -1}>
                    {c.name} <em>{c.count}</em>
                  </Link>
                </li>
              ))}
            </ul>
            <p className={styles.megaTitle} style={{ marginTop: '1.6rem' }}>Οικογένειες</p>
            <ul className={styles.megaCats}>
              <li><Link href="/proionta?family=Kidzlab" tabIndex={megaOpen ? 0 : -1}>Kidzlab</Link></li>
              <li><Link href="/proionta?family=Femlab" tabIndex={megaOpen ? 0 : -1}>Femlab</Link></li>
            </ul>
          </div>
          <div className={styles.megaSide}>
            <p className={styles.megaTitle}>Για επαγγελματίες</p>
            <p className={styles.megaText}>Διακινούμε αποκλειστικά μέσω φαρμακείων και φαρμακαποθηκών.</p>
            <Link className="btn btn-line" href="/epikoinonia#b2b" tabIndex={megaOpen ? 0 : -1}>
              Συνεργαστείτε μαζί μας
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
