import Link from 'next/link';
import styles from './Finale.module.css';
import { catalog } from '@/lib/content';
import { Magnetic } from './Magnetic';

/** Chapter 8 — split finale: consumers left, pharmacy/B2B right, catalog under both. */
export function Finale() {
  return (
    <section className={styles.section} aria-label="Για καταναλωτές και επαγγελματίες">
      <div className={styles.split}>
        <div className={`${styles.half} ${styles.consumer}`}>
          <div className={styles.halfInner}>
            <p className={styles.kicker}>Για εσάς</p>
            <h2 className={styles.title}>Τα προϊόντα μας βρίσκονται στο φαρμακείο της γειτονιάς σας</h2>
            <p className={styles.text}>2.075 σημεία πώλησης σε όλη την Ελλάδα.</p>
            <Magnetic>
              <Link href="/simeia-polisis" className="btn btn-honey">Σημεία πώλησης</Link>
            </Magnetic>
          </div>
        </div>

        <div className={`${styles.half} ${styles.b2b}`} id="b2b">
          <div className={styles.halfInner}>
            <p className={styles.kicker}>Για φαρμακεία &amp; φαρμακαποθήκες</p>
            <h2 className={styles.title}>Ας χτίσουμε μαζί το δίκτυο της υγείας</h2>
            <p className={styles.text}>
              Διακινούμε αποκλειστικά μέσω φαρμακείων — γίνετε μέρος του δικτύου μας.
            </p>
            <Magnetic>
              <Link href="/epikoinonia#b2b" className="btn btn-porcelain">Συνεργαστείτε μαζί μας</Link>
            </Magnetic>
          </div>
        </div>
      </div>

      <div className={styles.catalogBar}>
        <p>{catalog.title}</p>
        <a className="btn btn-line" href={catalog.pdf} target="_blank" rel="noopener">
          Κατεβάστε τον κατάλογο (PDF)
        </a>
      </div>
    </section>
  );
}
