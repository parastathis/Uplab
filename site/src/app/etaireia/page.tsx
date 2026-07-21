import type { Metadata } from 'next';
import styles from './etaireia.module.css';
import { companyTabs, vision, certifications, qualityPolicy, jobs, partners } from '@/lib/content';
import { CompanyTabs } from '@/components/CompanyTabs';

export const metadata: Metadata = {
  title: 'Η εταιρεία',
  description:
    'Πίσω από το brand UPLAB βρίσκεται ένα σύγχρονο εργοστάσιο παραγωγής φαρμάκων που λειτουργεί σύμφωνα με τις Αρχές Ορθής Παρασκευαστικής Πρακτικής (GMP).',
  alternates: { canonical: '/etaireia' },
};

export default function EtaireiaPage() {
  return (
    <>
      <section className={styles.pageHead}>
        <div className="container">
          <p className="eyebrow">Ποιοι είμαστε</p>
          <h1 className={styles.h1}>Η εταιρεία</h1>
          <p className="lead">{vision}</p>
        </div>
      </section>

      <section className={`section ${styles.factory}`}>
        <div className={`container ${styles.split}`}>
          <div className={styles.mediaBox}>
            <video
              src="/media/clip-2-factory.mp4"
              poster="/media/factory-gmp-line.png"
              muted loop playsInline autoPlay
            />
          </div>
          <div className={styles.splitText}>
            <p className="eyebrow">Το εργοστάσιο</p>
            <h2 className={styles.h2}>Σύγχρονη παραγωγή, αυστηρά πρότυπα</h2>
            <p>{companyTabs['Ποιοι είμαστε']}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Η ταυτότητά μας</p>
          <h2 className={styles.h2} style={{ marginBlock: '.6rem 2rem' }}>Πέντε πλευρές, μία ισορροπία</h2>
          <CompanyTabs tabs={companyTabs} />
        </div>
      </section>

      <section className={`section ${styles.certs}`} id="pistopoiiseis">
        <div className="container">
          <p className="eyebrow">Διαφάνεια</p>
          <h2 className={styles.h2} style={{ marginBlock: '.6rem .8rem' }}>Πιστοποιήσεις</h2>
          <p className="lead" style={{ marginBottom: '2.2rem' }}>
            Το εργοστάσιο και οι διαδικασίες μας καλύπτονται από τις απαιτούμενες πιστοποιήσεις.
          </p>
          <div className={styles.certGrid}>
            {certifications.images.map((src: string, i: number) => (
              <figure key={src} className={styles.certCard}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={certifications.sections[i]} loading="lazy" />
                <figcaption>{certifications.sections[i]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="poiotita">
        <div className={`container ${styles.quality}`}>
          <div>
            <p className="eyebrow">Δέσμευση</p>
            <h2 className={styles.h2} style={{ marginBlock: '.6rem 1.2rem' }}>Πολιτική ποιότητας</h2>
            <div className={styles.qualityText}>
              {qualityPolicy.text.split('\n').filter(Boolean).map((line: string, i: number) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
          <aside className={styles.partnerAside}>
            <p className={styles.asideTitle}>Οι συνεργάτες μας</p>
            <ul>
              {partners.map(p => <li key={p}>{p}</li>)}
            </ul>
          </aside>
        </div>
      </section>

      <section className={`section ${styles.jobsBand}`} id="theseis">
        <div className="container">
          <p className="eyebrow">Καριέρα</p>
          <h2 className={styles.h2} style={{ marginBlock: '.6rem 1.4rem' }}>{jobs.title}</h2>
          <div className={styles.jobsBody}>
            {jobs.text.split('\n').filter(Boolean).map((line: string, i: number) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <a className="btn btn-honey" href="mailto:info@uplab.gr?subject=Βιογραφικό" style={{ marginTop: '1.6rem' }}>
            Αποστολή βιογραφικού
          </a>
        </div>
      </section>
    </>
  );
}
