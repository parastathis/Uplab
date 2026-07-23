import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { healthCategories, products } from "@/lib/data";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import Magnetic from "@/components/ui/Magnetic";

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
          <Link href="/" className="link-underline hover:text-slate">Αρχική</Link>
          <span aria-hidden> / </span>
          <Link href="/proionta" className="link-underline hover:text-slate">Προϊόντα</Link>
          {product.categories[0] && (
            <>
              <span aria-hidden> / </span>
              <Link
                href={`/proionta?katigoria=${encodeURIComponent(healthCategories.find((c) => c.name === product.categories[0])?.slug ?? "")}`}
                className="link-underline hover:text-slate"
              >
                {product.categories[0]}
              </Link>
            </>
          )}
        </nav>

        {/* asymmetric split — image column deliberately narrower */}
        <div className="mt-verse grid grid-cols-1 gap-chapter lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Reveal
              blur
              className="group sticky top-[calc(var(--nav-h)+1rem)] overflow-hidden border border-ink/8 bg-white"
              style={{ borderRadius: "0.4rem 2.2rem 0.4rem 0.4rem" }}
            >
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.image}
                  alt={product.imageAlt || product.name}
                  className="w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.05]"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center bg-bone font-display text-[3rem] italic text-sage">U</div>
              )}
            </Reveal>
          </div>

          <div className="pb-act">
            <Stagger as="div" className="flex flex-wrap gap-breath" gap={0.07}>
              {product.eofTags.map((t) => (
                <StaggerItem
                  as="span"
                  key={t}
                  className="rounded-[2px] border border-sage/40 bg-sage/15 px-[0.8em] py-[0.35em] text-[0.68rem] uppercase tracking-[0.1em] text-sage-ink"
                >
                  {t}
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal as="h2" delay={0.05}>
              <span className="display-lg mt-line block text-ink">{product.name}</span>
            </Reveal>

            {/* opening paragraph: self-contained factual answer (for humans and LLMs) */}
            <Reveal delay={0.1}>
              <p className="mt-stanza max-w-[58ch] font-display text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-ink/85">
                {excerptBlocks[0]}
              </p>
            </Reveal>
            {excerptBlocks.slice(1).map((b, i) => (
              <Reveal key={i} delay={0.12 + i * 0.04}>
                <p className="mt-line max-w-[58ch] text-[0.95rem] leading-relaxed text-mist">{b}</p>
              </Reveal>
            ))}

            <hr className="my-chapter border-ink/10" />

            <Stagger className="space-y-line" gap={0.08}>
              {descBlocks.map((b, i) => (
                <StaggerItem key={i}>
                  <p className="max-w-[62ch] text-[0.95rem] leading-relaxed text-ink/75">{b}</p>
                </StaggerItem>
              ))}
            </Stagger>

            {related.length > 0 && (
              <section className="mt-act" aria-label="Σχετικά προϊόντα">
                <Reveal>
                  <h2 className="caption-tag">Σχετικά προϊόντα</h2>
                </Reveal>
                <Stagger as="ul" className="mt-line grid grid-cols-2 gap-line sm:grid-cols-4" gap={0.08}>
                  {related.map((r) => (
                    <li key={r.id}>
                      <TiltCard href={`/proionta/${r.slug}`} className="group" tilt={6}>
                        {r.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={r.image} alt="" loading="lazy" className="aspect-square w-full rounded-[0.4rem] border border-ink/8 object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                        ) : (
                          <div className="flex aspect-square items-center justify-center rounded-[0.4rem] bg-bone font-display italic text-sage/60">U</div>
                        )}
                        <p className="mt-breath text-[0.8rem] leading-snug text-ink group-hover:text-slate">{r.name}</p>
                      </TiltCard>
                    </li>
                  ))}
                </Stagger>
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
          <Magnetic strength={0.4}>
            <Link
              href="/simeia-polisis"
              className="btn-solid shrink-0"
              style={{ fontWeight: 560 }}
            >
              Πού θα το βρω;
            </Link>
          </Magnetic>
        </div>
      </div>
    </article>
  );
}
