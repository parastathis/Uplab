'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './ProductHub.module.css';
import { products, healthCategories, eofCategories, families } from '@/lib/content';

/** Product hub — health categories and ΕΟΦ regulatory classes filter separately, never merged. */
export function ProductHub() {
  const params = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState('');

  const cat = params.get('cat') ?? '';
  const eof = params.get('eof') ?? '';
  const family = params.get('family') ?? '';

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value); else next.delete(key);
    router.replace(`/proionta${next.size ? `?${next}` : ''}`, { scroll: false });
  };

  const hits = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter(p =>
      (!cat || p.categories.includes(cat)) &&
      (!eof || p.eofTags.includes(eof)) &&
      (!family || p.family.includes(family)) &&
      (!term || p.name.toLowerCase().includes(term) || p.excerpt.toLowerCase().includes(term)),
    );
  }, [q, cat, eof, family]);

  return (
    <>
      <section className={styles.pageHead}>
        <div className="container">
          <p className="eyebrow">Το χαρτοφυλάκιό μας</p>
          <h1 className={styles.h1}>Προϊόντα</h1>
          <p className="lead">
            76 προϊόντα υγείας σε 27 κατηγορίες — αποκλειστικά μέσω φαρμακείων
            και φαρμακαποθηκών, σε όλη την Ελλάδα.
          </p>
        </div>
      </section>

      <section className={`section ${styles.body}`}>
        <div className="container">
          <div className={styles.filters}>
            <input
              type="search"
              className={styles.search}
              placeholder="Αναζήτηση προϊόντος…"
              aria-label="Αναζήτηση προϊόντος"
              value={q}
              onChange={e => setQ(e.target.value)}
            />
            <select
              className={styles.select}
              aria-label="Κατηγορία υγείας"
              value={cat}
              onChange={e => setParam('cat', e.target.value)}
            >
              <option value="">Όλες οι κατηγορίες υγείας</option>
              {healthCategories.map(c => (
                <option key={c.name} value={c.name}>{c.name} ({c.count})</option>
              ))}
            </select>
            <select
              className={styles.select}
              aria-label="Κατηγορία ΕΟΦ"
              value={eof}
              onChange={e => setParam('eof', e.target.value)}
            >
              <option value="">Όλες οι κατηγορίες ΕΟΦ</option>
              {eofCategories.map(c => (
                <option key={c.name} value={c.name}>{c.name} ({c.count})</option>
              ))}
            </select>
            <div className={styles.famChips} role="group" aria-label="Οικογένειες προϊόντων">
              {families.map(f => (
                <button
                  key={f}
                  className={`${styles.chip} ${family === f ? styles.chipOn : ''}`}
                  onClick={() => setParam('family', family === f ? '' : f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <p className={styles.count} aria-live="polite">
            {hits.length} από {products.length} προϊόντα
            {(cat || eof || family || q) && (
              <button
                className={styles.clear}
                onClick={() => { setQ(''); router.replace('/proionta', { scroll: false }); }}
              >
                Καθαρισμός φίλτρων ✕
              </button>
            )}
          </p>

          <div className={styles.grid}>
            {hits.map(p => (
              <Link key={p.id} href={`/proionta/${encodeURIComponent(p.slug)}`} className={styles.card}>
                <span className={styles.media}>
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={p.imageAlt || p.name} loading="lazy" />
                  ) : (
                    <span className={styles.noimg}>{p.name}</span>
                  )}
                </span>
                <span className={styles.cardBody}>
                  <span className={styles.name}>{p.name}</span>
                  <span className={styles.tags}>
                    {p.categories.map(c => <em key={c}>{c}</em>)}
                    {p.eofTags.map(t => <em key={t} className={styles.eofTag}>{t}</em>)}
                  </span>
                  <span className={styles.excerpt}>{p.excerpt}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
