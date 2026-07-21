import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './simeia.module.css';
import { storeLocator } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Σημεία πώλησης',
  description:
    'Τα προϊόντα Uplab διατίθενται αποκλειστικά μέσω φαρμακείων — σε 2.075 σημεία πώλησης σε όλη την Ελλάδα.',
  alternates: { canonical: '/simeia-polisis' },
};

export default function SimeiaPage() {
  return (
    <>
      <section className={styles.pageHead}>
        <div className="container">
          <p className="eyebrow">Δίκτυο διάθεσης</p>
          <h1 className={styles.h1}>Σημεία πώλησης</h1>
          <p className="lead">
            Τα προϊόντα Uplab διατίθενται αποκλειστικά μέσω φαρμακείων —
            σε <strong>{storeLocator.totalStores.toLocaleString('el-GR')} σημεία πώλησης</strong> σε
            όλη την Ελλάδα. Ρωτήστε τον φαρμακοποιό σας.
          </p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.grid}`}>
          <div className={styles.mapBox}>
            <iframe
              className={styles.map}
              title="Χάρτης — Uplab Pharmaceuticals, Μεταμόρφωση"
              src="https://www.google.com/maps?q=Uplab+Pharmaceuticals+%CE%9C%CE%B5%CF%84%CE%B1%CE%BC%CF%8C%CF%81%CF%86%CF%89%CF%83%CE%B7&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <aside className={styles.hqCard}>
            <p className={styles.hqKicker}>Έδρα</p>
            <h2 className={styles.hqName}>{storeLocator.hq.name}</h2>
            <p className={styles.hqAddr}>{storeLocator.hq.address}</p>
            <a href={`tel:${storeLocator.hq.phone.replace(/\s/g, '')}`} className={styles.hqPhone}>
              {storeLocator.hq.phone}
            </a>
            <div className={styles.hqActions}>
              <a
                className="btn btn-honey"
                href="https://maps.google.com/?q=Uplab+Pharmaceuticals+Μεταμόρφωση"
                target="_blank" rel="noopener"
              >
                Οδηγίες πλοήγησης
              </a>
              <Link className="btn btn-line" href="/epikoinonia">Επικοινωνία</Link>
            </div>
            <p className={styles.note}>
              Αναζητάτε το πλησιέστερο φαρμακείο με προϊόντα Uplab;
              Καλέστε μας ή στείλτε μήνυμα — θα σας κατευθύνουμε άμεσα.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
