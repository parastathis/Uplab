import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import styles from './product.module.css';
import { products, productBySlug } from '@/lib/content';
import { Magnetic } from '@/components/Magnetic';

export function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.excerpt.slice(0, 155),
    alternates: { canonical: `/proionta/${encodeURIComponent(p.slug)}` },
    openGraph: p.image ? { images: [p.image] } : undefined,
  };
}

export default async function ProductPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const p = productBySlug(slug);
  if (!p) notFound();

  const related = products
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
        { '@type': 'ListItem', position: 1, name: 'Αρχική', item: 'https://uplab.gr/' },
        { '@type': 'ListItem', position: 2, name: 'Προϊόντα', item: 'https://uplab.gr/proionta' },
        { '@type': 'ListItem', position: 3, name: p.name },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `Τι είναι το ${p.name};`,
          acceptedAnswer: { '@type': 'Answer', text: p.excerpt },
        },
        {
          '@type': 'Question',
          name: `Πού θα βρω το ${p.name};`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Τα προϊόντα Uplab διατίθενται αποκλειστικά μέσω φαρμακείων — σε 2.075 σημεία πώλησης σε όλη την Ελλάδα.',
          },
        },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className={styles.page}>
        <div className={`container ${styles.grid}`}>
          <div className={styles.mediaCol}>
            <nav className={styles.crumbs} aria-label="Breadcrumb">
              <Link href="/">Αρχική</Link> / <Link href="/proionta">Προϊόντα</Link> / <span>{p.name}</span>
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
                <Link key={c} href={`/proionta?cat=${encodeURIComponent(c)}`} className={styles.tag}>{c}</Link>
              ))}
              {p.eofTags.map(t => (
                <Link key={t} href={`/proionta?eof=${encodeURIComponent(t)}`} className={`${styles.tag} ${styles.eof}`}>{t}</Link>
              ))}
            </div>
            <h1 className={styles.h1}>{p.name}</h1>

            {/* opening paragraph = self-contained factual answer (AI-citable) */}
            <p className={styles.lead}>{p.excerpt}</p>

            {p.description && p.description !== p.excerpt && (
              <details className={styles.acc} open>
                <summary>Περισσότερες πληροφορίες</summary>
                <div className={styles.accBody}>
                  {p.description.split('\n').filter(Boolean).map((line, i) => <p key={i}>{line}</p>)}
                </div>
              </details>
            )}

            <details className={styles.acc}>
              <summary>Πού θα το βρω;</summary>
              <div className={styles.accBody}>
                <p>
                  Τα προϊόντα Uplab διατίθενται αποκλειστικά μέσω φαρμακείων —
                  σε 2.075 σημεία πώλησης σε όλη την Ελλάδα. Ρωτήστε τον φαρμακοποιό σας.
                </p>
              </div>
            </details>
          </div>
        </div>

        {related.length > 0 && (
          <aside className={`container ${styles.related}`} aria-label="Σχετικά προϊόντα">
            <h2 className={styles.relatedTitle}>Σχετικά προϊόντα</h2>
            <div className={styles.relatedGrid}>
              {related.map(r => (
                <Link key={r.id} href={`/proionta/${encodeURIComponent(r.slug)}`} className={styles.relCard}>
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

        {/* sticky consumer CTA — every product page */}
        <div className={`${styles.sticky} glass`}>
          <p><strong>{p.name}</strong> — διαθέσιμο στο φαρμακείο</p>
          <Magnetic>
            <Link href="/simeia-polisis" className="btn btn-honey">Πού θα το βρω;</Link>
          </Magnetic>
        </div>
      </article>
    </>
  );
}
