import Link from 'next/link';
import styles from './NewsStrip.module.css';
import { news } from '@/lib/content';

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString('el-GR', { day: 'numeric', month: 'long', year: 'numeric' });

/** Chapter 7 — editorial strip from the real news timeline. */
export function NewsStrip() {
  const top = news.slice(0, 4);
  return (
    <section className={`section ${styles.section}`} aria-label="Τα νέα μας">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className="eyebrow">Ενημέρωση</p>
            <h2 className={styles.title}>Τα νέα μας</h2>
          </div>
          <Link href="/nea" className="btn btn-line">Όλα τα νέα</Link>
        </div>

        <div className={styles.list}>
          {top.map((n, i) => (
            <Link key={n.id} href={`/nea#${n.id}`} className={`${styles.row} rv`}>
              <span className={styles.index}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.rowBody}>
                <time className={styles.date} dateTime={n.date}>{fmt(n.date)}</time>
                <span className={styles.rowTitle} dangerouslySetInnerHTML={{ __html: n.title }} />
                <span className={styles.excerpt}>{n.excerpt}</span>
              </span>
              <span className={styles.arrow} aria-hidden>→</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
