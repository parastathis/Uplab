import type { Metadata } from 'next';
import styles from './epikoinonia.module.css';
import { contact } from '@/lib/content';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Επικοινωνία',
  description:
    'Επικοινωνήστε με την Uplab Pharmaceuticals: 10ο χλμ Ε.Ο. Αθηνών-Λαμίας, Μεταμόρφωση. Τ: +30 210 28 44 333, info@uplab.gr.',
  alternates: { canonical: '/epikoinonia' },
};

export default function EpikoinoniaPage() {
  return (
    <>
      <section className={styles.pageHead}>
        <div className="container">
          <p className="eyebrow">Είμαστε εδώ</p>
          <h1 className={styles.h1}>Επικοινωνία</h1>
          <p className="lead">
            Για καταναλωτές, φαρμακεία, φαρμακαποθήκες και επαγγελματίες υγείας.
          </p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.grid}`}>
          <div className={styles.details}>
            <div className={styles.item}>
              <p className={styles.itemKicker}>Διεύθυνση</p>
              <p>10ο χλμ Ε.Ο. Αθηνών-Λαμίας<br />Μεταμόρφωση, Αττική 14452</p>
            </div>
            <div className={styles.item}>
              <p className={styles.itemKicker}>Τηλέφωνο</p>
              <a href="tel:+302102844333">+30 210 28 44 333</a>
            </div>
            <div className={styles.item}>
              <p className={styles.itemKicker}>Fax</p>
              <p>+30 210 28 13 466</p>
            </div>
            <div className={styles.item}>
              <p className={styles.itemKicker}>Email</p>
              <a href="mailto:info@uplab.gr">info@uplab.gr</a>
            </div>
            <div className={styles.item}>
              <p className={styles.itemKicker}>Social</p>
              <div className={styles.socialRow}>
                <a href={contact.social.facebook} target="_blank" rel="noopener">Facebook</a>
                <a href={contact.social.instagram} target="_blank" rel="noopener">Instagram</a>
                <a href={contact.social.linkedin} target="_blank" rel="noopener">LinkedIn</a>
                <a href={contact.social.twitter} target="_blank" rel="noopener">X</a>
              </div>
            </div>
          </div>

          <div className={styles.formCol}>
            <div className={styles.formCard} id="b2b">
              <h2 className={styles.formTitle}>Στείλτε μας μήνυμα</h2>
              <p className={styles.formSub}>
                Φαρμακείο ή φαρμακαποθήκη; Σημειώστε το στο μήνυμά σας —
                η ομάδα B2B θα σας απαντήσει άμεσα.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
