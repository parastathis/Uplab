"use client";

import { Stagger } from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import type { Product } from "@/lib/data";

/**
 * Uniform product grid. Every card is identical in size — a square image plus a
 * fixed-height text block (title clamped to 2 lines, categories to 1) — so the
 * copy never dictates the layout. Symmetric grid, no staggered offsets.
 */
export default function ProductGrid({
  products,
  filterKey,
  hrefBase = "/proionta",
}: {
  products: Product[];
  filterKey: string;
  hrefBase?: string;
}) {
  if (products.length === 0) {
    return (
      <p className="mx-auto mt-chapter max-w-7xl px-[clamp(1.2rem,4vw,4.5rem)] pb-act text-mist">
        Δεν βρέθηκαν προϊόντα σε αυτόν τον συνδυασμό φίλτρων.
      </p>
    );
  }

  return (
    <Stagger
      key={filterKey}
      as="ul"
      gap={0.04}
      className="mx-auto mt-chapter grid max-w-7xl grid-cols-2 gap-x-line gap-y-verse px-[clamp(1.2rem,4vw,4.5rem)] pb-act md:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((p) => (
        <li key={p.id} className="h-full">
          <TiltCard href={`${hrefBase}/${p.slug}`} className="group flex h-full flex-col" tilt={6}>
            <div className="overflow-hidden rounded-[4px] border border-ink/8 bg-white transition-shadow duration-500 group-hover:shadow-[0_18px_40px_-24px_rgba(27,42,58,0.5)]">
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image}
                  alt={p.imageAlt || p.name}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.06]"
                />
              ) : (
                <div className="flex aspect-square items-center justify-center bg-bone font-display text-[2rem] italic text-sage">
                  U
                </div>
              )}
            </div>
            {/* fixed-height text block — copy never changes the card size */}
            <div className="flex min-h-[4.6rem] flex-col gap-[0.3rem] pt-breath">
              <h3 className="line-clamp-2 font-display text-[1rem] leading-snug text-ink transition-colors duration-300 group-hover:text-slate">
                {p.name}
              </h3>
              <p className="line-clamp-1 text-[0.75rem] text-mist">{p.categories.join(" · ")}</p>
            </div>
          </TiltCard>
        </li>
      ))}
    </Stagger>
  );
}
