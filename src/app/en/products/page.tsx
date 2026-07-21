import Link from "next/link";
import type { Metadata } from "next";
import { productsEn } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products — Uplab Pharmaceuticals",
  description:
    "Uplab health products available in English — the international subset of the full Greek catalogue. Sold exclusively through pharmacies.",
  alternates: { canonical: "/en/products", languages: { el: "/proionta", en: "/en/products" } },
};

export default function EnProducts() {
  return (
    <div className="bg-porcelain pt-[calc(var(--nav-h)+2rem)]">
      <header className="mx-auto max-w-7xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <p className="caption-tag">Catalogue</p>
        <h1 className="display-lg mt-hair text-ink">Products</h1>
        <p className="mt-line max-w-[52ch] text-mist">
          {productsEn.length} products available in English — sold exclusively through pharmacies. The
          full Greek catalogue lists 76 products.
        </p>
      </header>

      <ul className="mx-auto mt-chapter grid max-w-7xl grid-cols-2 gap-x-line gap-y-verse px-[clamp(1.2rem,4vw,4.5rem)] pb-act md:grid-cols-3 xl:grid-cols-4">
        {productsEn.map((p) => (
          <li key={p.id}>
            <Link href={`/en/products/${p.slug}`} className="group block">
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={p.imageAlt || p.name} loading="lazy" className="aspect-square w-full rounded-[0.4rem] border border-ink/8 object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.05]" />
              ) : (
                <div className="flex aspect-square items-center justify-center rounded-[0.4rem] bg-bone font-display text-[2rem] italic text-sage">U</div>
              )}
              <h2 className="mt-breath font-display text-[1rem] leading-snug text-ink transition-colors duration-300 group-hover:text-slate">
                {p.name}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
