import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import styles from '../../../proionta/[slug]/product.module.css';
import { productsEn, productEnBySlug } from '@/lib/content';
import { Magnetic } from '@/components/Magnetic';

export function generateStaticParams() {
  return productsEn.map(p => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const p = productEnBySlug(slug);
  if (!p) return {};
  return {
    title: `${p.name} (EN)`,
    description: p.excerpt.slice(0, 155),
    alternates: { canonical: `/en/products/${encodeURIComponent(p.slug)}` },
    openGraph: p.image ? { images: [p.image] } : undefined,
  };
}

export default async function EnProductPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const p = productEnBySlug(slug);
  if (!p) notFound();

  const related = productsEn
    .filter(r => r.id !== p.id && r.categories.some(c => p.categories.includes(c)))
    .slice(0, 4);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.name,
      description: p.excerpt,
      image: p.image ?? undefined,
      category: p.categories.join(', '),
      brand: { '@type': 'Brand', name: 'Uplab Pharmaceuticals' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://uplab.gr/en' },
        { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://uplab.gr/en/products' },
        { '@type': 'ListItem', position: 3, name: p.name },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className={styles.page} lang="en">
        <div className={`container ${styles.grid}`}>
          <div className={styles.mediaCol}>
            <nav className={styles.crumbs} aria-label="Breadcrumb">
              <Link href="/en">Home</Link> / <Link href="/en/products">Products</Link> / <span>{p.name}</span>
            </nav>
            <div className={styles.media}>
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={p.imageAlt || p.name} />
              ) : (
                <span className={styles.noimg}>{p.name}</span>
              )}
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.tags}>
              {p.categories.map(c => (
                <Link key={c} href={`/en/products?cat=${encodeURIComponent(c)}`} className={styles.tag}>{c}</Link>
              ))}
            </div>
            <h1 className={styles.h1}>{p.name}</h1>

            <p className={styles.lead}>{p.excerpt}</p>

            {p.description && p.description !== p.excerpt && (
              <details className={styles.acc} open>
                <summary>More information</summary>
                <div className={styles.accBody}>
                  {p.description.split('\n').filter(Boolean).map((line, i) => <p key={i}>{line}</p>)}
                </div>
              </details>
            )}

            <details className={styles.acc}>
              <summary>Where can I find it?</summary>
              <div className={styles.accBody}>
                <p>
                  Uplab products are distributed exclusively through pharmacies —
                  available in 2,075 points of sale across Greece. Ask your pharmacist.
                </p>
              </div>
            </details>
          </div>
        </div>

        {related.length > 0 && (
          <aside className={`container ${styles.related}`} aria-label="Related products">
            <h2 className={styles.relatedTitle}>Related products</h2>
            <div className={styles.relatedGrid}>
              {related.map(r => (
                <Link key={r.id} href={`/en/products/${encodeURIComponent(r.slug)}`} className={styles.relCard}>
                  <span className={styles.relMedia}>
                    {r.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.image} alt="" loading="lazy" />
                    )}
                  </span>
                  <span className={styles.relName}>{r.name}</span>
                </Link>
              ))}
            </div>
          </aside>
        )}

        <div className={`${styles.sticky} glass`}>
          <p><strong>{p.name}</strong> — available at pharmacies</p>
          <Magnetic>
            <Link href="/simeia-polisis" className="btn btn-honey">Where to find it</Link>
          </Magnetic>
        </div>
      </article>
    </>
  );
}
