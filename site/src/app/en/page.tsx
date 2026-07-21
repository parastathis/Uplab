import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './en.module.css';
import { healthCategoriesEn, productsEn, catalog } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Uplab Pharmaceuticals — Nature and science in balance',
  description:
    'Behind the UPLAB brand stands a modern pharmaceutical production plant operating under GMP. Health products distributed exclusively through pharmacies across Greece.',
  alternates: {
    canonical: '/en',
    languages: { el: '/', en: '/en' },
  },
  openGraph: { locale: 'en_US' },
};

export default function EnHome() {
  const featured = productsEn.filter(p => p.image).slice(0, 8);
  return (
    <>
      <section className={styles.hero}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.heroBg} src="/media/hero-honey-capsule.png" alt="" aria-hidden />
        <div className={`container ${styles.heroInner}`}>
          <p className="eyebrow">Nature × Science</p>
          <h1 className={styles.h1}>Nature and science, <em>in perfect balance</em>.</h1>
          <p className="lead">
            Behind the UPLAB brand stands a modern pharmaceutical production plant,
            operating under current Good Manufacturing Practice (GMP). We design,
            select and produce innovative health products, distributed exclusively
            through pharmacies and pharmaceutical wholesalers across Greece.
          </p>
          <div className={styles.ctas}>
            <Link href="/en/products" className="btn btn-honey">Browse products</Link>
            <a className="btn btn-line" href={catalog.pdf} target="_blank" rel="noopener">
              Product catalogue (PDF)
            </a>
            <Link href="/" className={styles.langLink} lang="el">Ελληνικά →</Link>
          </div>
        </div>
      </section>

      <section className={`section ${styles.cats}`}>
        <div className="container">
          <p className="eyebrow">Health categories</p>
          <h2 className={styles.h2}>Solutions for every need</h2>
          <div className={styles.chipCloud}>
            {healthCategoriesEn.map(c => (
              <Link
                key={c.name}
                href={`/en/products?cat=${encodeURIComponent(c.name)}`}
                className={styles.chip}
              >
                {c.name} <em>{c.count}</em>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Featured</p>
          <h2 className={styles.h2}>From our English catalogue</h2>
          <p className={styles.note}>
            The English catalogue covers {productsEn.length} of our products;
            the full range of 76 is available in <Link href="/proionta">Greek</Link>.
          </p>
          <div className={styles.grid}>
            {featured.map(p => (
              <Link key={p.id} href={`/en/products/${encodeURIComponent(p.slug)}`} className={styles.card}>
                <span className={styles.media}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image!} alt={p.imageAlt || p.name} loading="lazy" />
                </span>
                <span className={styles.name}>{p.name}</span>
                <span className={styles.tags}>{p.categories.join(' · ')}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finale}>
        <div className="container">
          <h2 className={styles.finaleTitle}>
            Uplab products are available in 2,075 pharmacies across Greece
          </h2>
          <div className={styles.ctas}>
            <Link href="/simeia-polisis" className="btn btn-porcelain">Points of sale</Link>
            <Link href="/epikoinonia" className="btn btn-line" style={{ borderColor: 'rgba(248,246,242,.4)', color: 'var(--porcelain)' }}>
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
