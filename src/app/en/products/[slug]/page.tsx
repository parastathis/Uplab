import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { productsEn } from "@/lib/data";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";

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

  const excerptBlocks = product.excerpt.split("\n").filter(Boolean);
  const descBlocks = product.description.split("\n").filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: excerptBlocks[0],
    image: product.image ?? undefined,
    brand: { "@type": "Brand", name: "Uplab Pharmaceuticals" },
  };

  return (
    <article className="bg-porcelain pt-[calc(var(--nav-h)+2rem)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-6xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <nav aria-label="Breadcrumb" className="text-[0.78rem] text-mist">
          <Link href="/en" className="link-underline hover:text-slate">Home</Link>
          <span aria-hidden> / </span>
          <Link href="/en/products" className="link-underline hover:text-slate">Products</Link>
        </nav>

        <div className="mt-verse grid grid-cols-1 gap-chapter lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Reveal
              blur
              className="group sticky top-[calc(var(--nav-h)+1rem)] overflow-hidden border border-ink/8 bg-white"
              style={{ borderRadius: "0.4rem 2.2rem 0.4rem 0.4rem" }}
            >
              {product.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.image} alt={product.imageAlt || product.name} className="w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.05]" />
              ) : (
                <div className="flex aspect-square items-center justify-center bg-bone font-display text-[3rem] italic text-sage">U</div>
              )}
            </Reveal>
          </div>
          <div className="pb-act">
            <Reveal>
              <h1 className="display-lg text-ink">{product.name}</h1>
            </Reveal>
            <div className="mt-stanza space-y-line">
              {excerptBlocks.map((b, i) => (
                <Reveal key={i} delay={0.06 + i * 0.04}>
                  <p className={i === 0 ? "max-w-[58ch] font-display text-[clamp(1rem,1.5vw,1.2rem)] leading-relaxed text-ink/85" : "max-w-[58ch] text-[0.95rem] leading-relaxed text-mist"}>
                    {b}
                  </p>
                </Reveal>
              ))}
            </div>
            <hr className="my-chapter border-ink/10" />
            <Stagger className="space-y-line" gap={0.08}>
              {descBlocks.map((b, i) => (
                <StaggerItem key={i}>
                  <p className="max-w-[62ch] text-[0.95rem] leading-relaxed text-ink/75">{b}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-30 border-t border-ink/10 bg-porcelain/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-line px-[clamp(1.2rem,4vw,4.5rem)] py-breath">
          <p className="text-[0.85rem] text-mist">
            Available exclusively <span className="text-ink">through pharmacies</span>
          </p>
          <Magnetic strength={0.4}>
            <Link href="/simeia-polisis" className="btn-solid shrink-0">
              Where to find it
            </Link>
          </Magnetic>
        </div>
      </div>
    </article>
  );
}
