import type { Metadata } from 'next';
import styles from './nea.module.css';
import { news } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Νέα',
  description:
    'Νέα και ανακοινώσεις της Uplab Pharmaceuticals: νέα προϊόντα, συσκευασίες, βραβεύσεις και συμμετοχές σε εκθέσεις.',
  alternates: { canonical: '/nea' },
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString('el-GR', { day: 'numeric', month: 'long', year: 'numeric' });

export default function NeaPage() {
  const jsonLd = news.map(n => ({
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: n.title.replace(/<[^>]+>/g, ''),
    datePublished: n.date,
    description: n.excerpt,
    publisher: { '@type': 'Organization', name: 'Uplab Pharmaceuticals' },
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className={styles.pageHead}>
        <div className="container">
          <p className="eyebrow">Ενημέρωση</p>
          <h1 className={styles.h1}>Τα νέα μας</h1>
          <p className="lead">
            Νέα προϊόντα, συσκευασίες, βραβεύσεις και συμμετοχές σε εκθέσεις.
          </p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.timeline}`}>
          {news.map(n => (
            <article key={n.id} id={String(n.id)} className={`${styles.entry} rv`}>
              <time className={styles.date} dateTime={n.date}>{fmt(n.date)}</time>
              <div className={styles.card}>
                <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: n.title }} />
                <details className={styles.more}>
                  <summary>{n.excerpt}</summary>
                  <div className={styles.body}>
                    {n.body.split('\n').filter(Boolean).map((line, i) => <p key={i}>{line}</p>)}
                  </div>
                </details>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
