import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { productsEn } from "@/lib/data";

export function generateStaticParams() {
  return productsEn.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = productsEn.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.name} — Uplab Pharmaceuticals`, description: p.excerpt.split("\n")[0].slice(0, 158) };
}

export default async function EnProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productsEn.find((p) => p.slug === slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.excerpt.split("\n")[0],
    image: product.image ?? undefined,
    brand: { "@type": "Brand", name: "Uplab Pharmaceuticals" },
  };

  return (
    <article className="bg-porcelain pt-[calc(var(--nav-h)+2rem)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <nav aria-label="Breadcrumb" className="text-[0.78rem] text-mist">
          <Link href="/en" className="hover:text-slate">Home</Link>
          <span aria-hidden> / </span>
          <Link href="/en/products" className="hover:text-slate">Products</Link>
        </nav>

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
            <h1 className="display-lg text-ink">{product.name}</h1>
            <div className="mt-stanza space-y-line">
              {product.excerpt.split("\n").filter(Boolean).map((b, i) => (
                <p key={i} className={i === 0 ? "max-w-[58ch] font-display text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-ink/85" : "max-w-[58ch] text-[0.95rem] leading-relaxed text-mist"}>
                  {b}
                </p>
              ))}
            </div>
            <hr className="my-chapter border-ink/10" />
            <div className="space-y-line">
              {product.description.split("\n").filter(Boolean).map((b, i) => (
                <p key={i} className="max-w-[62ch] text-[0.95rem] leading-relaxed text-ink/75">{b}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-30 border-t border-ink/10 bg-porcelain/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-line px-[clamp(1.2rem,4vw,4.5rem)] py-breath">
          <p className="text-[0.85rem] text-mist">
            Available exclusively <span className="text-ink">through pharmacies</span>
          </p>
          <Link href="/simeia-polisis" className="shrink-0 rounded-full bg-amber px-[1.5em] py-[0.65em] text-[0.85rem] text-ink-black transition-colors duration-300 hover:bg-amber-bright" style={{ fontWeight: 560 }}>
            Where to find it
          </Link>
        </div>
      </div>
    </article>
  );
}
