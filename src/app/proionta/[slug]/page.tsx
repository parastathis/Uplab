import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { healthCategories, products } from "@/lib/data";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.excerpt.split("\n")[0].slice(0, 158),
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.id !== product.id && p.categories.some((c) => product.categories.includes(c)))
    .slice(0, 4);

  const descBlocks = product.description.split("\n").filter(Boolean);
  const excerptBlocks = product.excerpt.split("\n").filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: excerptBlocks[0],
    image: product.image ?? undefined,
    brand: { "@type": "Brand", name: "Uplab Pharmaceuticals" },
    category: product.categories.join(", "),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Αρχική", item: "https://uplab.gr/" },
      { "@type": "ListItem", position: 2, name: "Προϊόντα", item: "https://uplab.gr/proionta" },
      { "@type": "ListItem", position: 3, name: product.name },
    ],
  };

  return (
    <article className="bg-porcelain pt-[calc(var(--nav-h)+2rem)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="mx-auto max-w-6xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <nav aria-label="Breadcrumb" className="text-[0.78rem] text-mist">
          <Link href="/" className="hover:text-slate">Αρχική</Link>
          <span aria-hidden> / </span>
          <Link href="/proionta" className="hover:text-slate">Προϊόντα</Link>
          {product.categories[0] && (
            <>
              <span aria-hidden> / </span>
              <Link
                href={`/proionta?katigoria=${encodeURIComponent(healthCategories.find((c) => c.name === product.categories[0])?.slug ?? "")}`}
                className="hover:text-slate"
              >
                {product.categories[0]}
              </Link>
            </>
          )}
        </nav>

        {/* asymmetric split — image column deliberately narrower */}
        <div className="mt-verse grid grid-cols-1 gap-chapter lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="sticky top-[calc(var(--nav-h)+1rem)] overflow-hidden border border-ink/8 bg-white" style={{ borderRadius: "0.4rem 2.2rem 0.4rem 0.4rem" }}>
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.image} alt={product.imageAlt || product.name} className="w-full object-cover" />
              ) : (
                <div className="flex aspect-square items-center justify-center bg-bone font-display text-[3rem] italic text-sage">U</div>
              )}
            </div>
          </div>

          <div className="pb-act">
            <div className="flex flex-wrap gap-breath">
              {product.eofTags.map((t) => (
                <span key={t} className="rounded-full bg-sage/25 px-[0.9em] py-[0.35em] text-[0.72rem] tracking-wide text-sage-ink">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="display-lg mt-line text-ink">{product.name}</h1>

            {/* opening paragraph: self-contained factual answer (for humans and LLMs) */}
            <p className="mt-stanza max-w-[58ch] font-display text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-ink/85">
              {excerptBlocks[0]}
            </p>
            {excerptBlocks.slice(1).map((b, i) => (
              <p key={i} className="mt-line max-w-[58ch] text-[0.95rem] leading-relaxed text-mist">{b}</p>
            ))}

            <hr className="my-chapter border-ink/10" />

            <div className="space-y-line">
              {descBlocks.map((b, i) => (
                <p key={i} className="max-w-[62ch] text-[0.95rem] leading-relaxed text-ink/75">{b}</p>
              ))}
            </div>

            {related.length > 0 && (
              <section className="mt-act" aria-label="Σχετικά προϊόντα">
                <h2 className="caption-tag">Σχετικά προϊόντα</h2>
                <ul className="mt-line grid grid-cols-2 gap-line sm:grid-cols-4">
                  {related.map((r) => (
                    <li key={r.id}>
                      <Link href={`/proionta/${r.slug}`} className="group block">
                        {r.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={r.image} alt="" loading="lazy" className="aspect-square w-full rounded-[0.4rem] border border-ink/8 object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                        ) : (
                          <div className="flex aspect-square items-center justify-center rounded-[0.4rem] bg-bone font-display italic text-sage/60">U</div>
                        )}
                        <p className="mt-breath text-[0.8rem] leading-snug text-ink group-hover:text-slate">{r.name}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* sticky consumer CTA */}
      <div className="sticky bottom-0 z-30 border-t border-ink/10 bg-porcelain/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-line px-[clamp(1.2rem,4vw,4.5rem)] py-breath">
          <p className="text-[0.85rem] text-mist">
            Διατίθεται αποκλειστικά <span className="text-ink">μέσω φαρμακείων</span>
          </p>
          <Link
            href="/simeia-polisis"
            className="shrink-0 rounded-full bg-amber px-[1.5em] py-[0.65em] text-[0.85rem] text-ink-black transition-colors duration-300 hover:bg-amber-bright"
            style={{ fontWeight: 560 }}
          >
            Πού θα το βρω;
          </Link>
        </div>
      </div>
    </article>
  );
}
