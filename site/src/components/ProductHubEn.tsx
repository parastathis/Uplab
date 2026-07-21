'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './ProductHub.module.css';
import { productsEn, healthCategoriesEn } from '@/lib/content';

/** English product hub — the live site's EN catalogue is a 30-product subset; kept as-is. */
export function ProductHubEn() {
  const params = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState('');
  const cat = params.get('cat') ?? '';

  const setCat = (value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set('cat', value); else next.delete('cat');
    router.replace(`/en/products${next.size ? `?${next}` : ''}`, { scroll: false });
  };

  const hits = useMemo(() => {
    const term = q.trim().toLowerCase();
    return productsEn.filter(p =>
      (!cat || p.categories.includes(cat)) &&
      (!term || p.name.toLowerCase().includes(term) || p.excerpt.toLowerCase().includes(term)),
    );
  }, [q, cat]);

  return (
    <>
      <section className={styles.pageHead}>
        <div className="container">
          <p className="eyebrow">Our portfolio</p>
          <h1 className={styles.h1}>Products</h1>
          <p className="lead">
            The English catalogue covers {productsEn.length} products — the full range
            of 76 is available in the <Link href="/proionta" lang="el">Greek catalogue</Link>.
            All products are distributed exclusively through pharmacies.
          </p>
        </div>
      </section>

      <section className={`section ${styles.body}`}>
        <div className="container">
          <div className={styles.filters}>
            <input
              type="search"
              className={styles.search}
              placeholder="Search products…"
              aria-label="Search products"
              value={q}
              onChange={e => setQ(e.target.value)}
            />
            <select
              className={styles.select}
              aria-label="Health category"
              value={cat}
              onChange={e => setCat(e.target.value)}
            >
              <option value="">All health categories</option>
              {healthCategoriesEn.map(c => (
                <option key={c.name} value={c.name}>{c.name} ({c.count})</option>
              ))}
            </select>
          </div>

          <p className={styles.count} aria-live="polite">
            {hits.length} of {productsEn.length} products
            {(cat || q) && (
              <button
                className={styles.clear}
                onClick={() => { setQ(''); router.replace('/en/products', { scroll: false }); }}
              >
                Clear filters ✕
              </button>
            )}
          </p>

          <div className={styles.grid}>
            {hits.map(p => (
              <Link key={p.id} href={`/en/products/${encodeURIComponent(p.slug)}`} className={styles.card}>
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
