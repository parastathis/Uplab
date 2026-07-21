import Link from 'next/link';
import styles from './Footer.module.css';
import { contact, espa, catalog } from '@/lib/content';

const socials = [
  { label: 'Facebook', href: contact.social.facebook, d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { label: 'Instagram', href: contact.social.instagram, d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
  { label: 'LinkedIn', href: contact.social.linkedin, d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { label: 'X / Twitter', href: contact.social.twitter, d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <p className={styles.brand}>uplab<span>.</span></p>
            <p className={styles.tagline}>
              Η απόλυτη φυσική ισορροπία ανθρώπου και περιβάλλοντος —
              αυτό είναι το όραμά μας.
            </p>
            <div className={styles.socials}>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" aria-label={s.label}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d={s.d} /></svg>
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Υποσέλιδο — πλοήγηση">
            <p className={styles.colTitle}>Πλοήγηση</p>
            <Link href="/proionta">Προϊόντα</Link>
            <Link href="/etaireia">Η εταιρεία</Link>
            <Link href="/nea">Νέα</Link>
            <Link href="/simeia-polisis">Σημεία πώλησης</Link>
            <Link href="/epikoinonia">Επικοινωνία</Link>
          </nav>

          <nav aria-label="Υποσέλιδο — εταιρεία">
            <p className={styles.colTitle}>Η εταιρεία</p>
            <Link href="/etaireia#pistopoiiseis">Πιστοποιήσεις</Link>
            <Link href="/etaireia#poiotita">Πολιτική Ποιότητας</Link>
            <Link href="/etaireia#theseis">Θέσεις εργασίας</Link>
            <a href={catalog.pdf} target="_blank" rel="noopener">Κατάλογος προϊόντων (PDF)</a>
          </nav>

          <div>
            <p className={styles.colTitle}>Επικοινωνία</p>
            <p className={styles.addr}>
              10ο χλμ Ε.Ο. Αθηνών-Λαμίας<br />Μεταμόρφωση, Αττική 14452
            </p>
            <a href="tel:+302102844333">+30 210 28 44 333</a>
            <a href="mailto:info@uplab.gr">info@uplab.gr</a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 UPLAB ΕΠΕ — Uplab Pharmaceuticals</p>
          <div className={styles.legal}>
            <Link href="/politiki-aporritou">Πολιτική Απορρήτου</Link>
            <Link href="/politiki-cookies">Πολιτική Cookies</Link>
          </div>
          {/* ΕΣΠΑ — legal requirement, discreet fixed placement */}
          <a className={styles.espa} href={espa.link} target="_blank" rel="noopener" aria-label="ΕΣΠΑ — Επιχειρησιακό Πρόγραμμα Ανταγωνιστικότητα">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={espa.banner} alt="ΕΣΠΑ 2014-2020" height={40} loading="lazy" />
          </a>
        </div>
      </div>
    </footer>
  );
}
