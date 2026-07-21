import Link from "next/link";
import type { Metadata } from "next";
import { productsEn, trust } from "@/lib/data";

export const metadata: Metadata = {
  title: "Uplab Pharmaceuticals — Nature & Science in Balance",
  description:
    "Behind the UPLAB brand stands a modern GMP pharmaceutical production facility. Health products available exclusively through pharmacies in Greece.",
  alternates: { canonical: "/en", languages: { el: "/", en: "/en" } },
};

export default function EnHome() {
  const featured = productsEn.slice(0, 8);
  return (
    <div className="bg-porcelain">
      <section className="relative flex h-[72dvh] items-end overflow-hidden bg-sky" aria-label="Uplab Pharmaceuticals">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/hero-still.png" alt="" className="absolute inset-0 h-full w-full object-cover" aria-hidden />
        <div className="relative z-10 w-full px-[clamp(1.2rem,4vw,4.5rem)] pb-verse">
          <h1 className="display-xl text-porcelain">UPLAB</h1>
          <p className="mt-breath max-w-[38ch] font-display italic text-porcelain/85">
            The absolute natural balance between people and their environment — elements connected,
            both ways, with health.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-2 gap-verse px-[clamp(1.2rem,4vw,4.5rem)] py-chapter md:grid-cols-4" aria-label="Uplab in numbers">
        {[
          { n: String(trust.products), l: "health products (GR catalogue)" },
          { n: String(trust.categories), l: "health categories" },
          { n: String(trust.partners), l: "exclusive European partners" },
          { n: "2,075+", l: "pharmacy sale points" },
        ].map((s) => (
          <div key={s.l}>
            <p className="display-lg text-ink">{s.n}</p>
            <p className="mt-hair max-w-[16ch] text-[0.85rem] text-mist">{s.l}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-[clamp(1.2rem,4vw,4.5rem)] pb-act" aria-label="Featured products">
        <div className="flex items-baseline justify-between">
          <h2 className="display-md text-ink">Products</h2>
          <Link href="/en/products" className="text-[0.85rem] text-ink underline decoration-ink/30 hover:decoration-current">
            All products →
          </Link>
        </div>
        <ul className="mt-verse grid grid-cols-2 gap-x-line gap-y-verse md:grid-cols-4">
          {featured.map((p) => (
            <li key={p.id}>
              <Link href={`/en/products/${p.slug}`} className="group block">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={p.imageAlt || p.name} loading="lazy" className="aspect-square w-full rounded-[0.4rem] border border-ink/8 object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                ) : (
                  <div className="flex aspect-square items-center justify-center rounded-[0.4rem] bg-bone font-display italic text-sage/60">U</div>
                )}
                <h3 className="mt-breath text-[0.9rem] text-ink group-hover:text-slate">{p.name}</h3>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
