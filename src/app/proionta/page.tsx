import type { Metadata } from "next";
import { eofCategories, families, healthCategories, products } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import Chip from "@/components/products/Chip";
import ProductGrid from "@/components/products/ProductGrid";
import AnimatedNumber from "@/components/ui/AnimatedNumber";

export const metadata: Metadata = {
  title: "Προϊόντα",
  description:
    "Όλα τα προϊόντα υγείας της Uplab Pharmaceuticals — 27 κατηγορίες υγείας, διαθέσιμα αποκλειστικά μέσω φαρμακείων.",
};

/** Product hub: filterable via links (fully crawlable), animated on the client. */
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ katigoria?: string; eof?: string; seira?: string }>;
}) {
  const { katigoria, eof, seira } = await searchParams;

  const activeCat = katigoria ? healthCategories.find((c) => c.slug === katigoria) : null;
  const activeEof = eof ? eofCategories.find((c) => c.slug === eof) : null;
  const activeFam = seira ? families.find((f) => f.slug === seira) : null;

  const shown = products.filter((p) => {
    if (activeCat && !p.categories.includes(activeCat.name)) return false;
    if (activeEof && !p.eofTags.includes(activeEof.name)) return false;
    if (activeFam && !p.family.some((f) => f.toLowerCase() === activeFam.slug)) return false;
    return true;
  });

  const filterKey = `${katigoria ?? ""}|${eof ?? ""}|${seira ?? ""}`;

  return (
    <div className="bg-porcelain pt-[calc(var(--nav-h)+2rem)]">
      <div className="mx-auto max-w-7xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <PageHeader
          kicker="Κατάλογος"
          title={activeCat?.name ?? activeFam?.name ?? activeEof?.name ?? "Όλα τα προϊόντα"}
          lead={
            <>
              <AnimatedNumber value={shown.length} className="font-display text-ink" /> προϊόντα ·
              διαθέσιμα αποκλειστικά μέσω φαρμακείων σε όλη την Ελλάδα.
            </>
          }
        />
      </div>

      <div className="mx-auto mt-verse max-w-7xl px-[clamp(1.2rem,4vw,4.5rem)]">
        {/* two DISTINCT filter groups — never merged */}
        <Reveal as="section" aria-label="Κατηγορίες υγείας">
          <h2 className="caption-tag">Ανά ανάγκη υγείας</h2>
          <div className="mt-breath flex flex-wrap gap-breath">
            <Chip href="/proionta" label="Όλα" active={!activeCat && !activeEof && !activeFam} />
            {healthCategories
              .filter((c) => c.count > 0)
              .map((c) => (
                <Chip
                  key={c.slug}
                  href={`/proionta?katigoria=${encodeURIComponent(c.slug)}`}
                  label={c.name}
                  active={activeCat?.slug === c.slug}
                  count={c.count}
                />
              ))}
          </div>
        </Reveal>

        <Reveal as="section" delay={0.05} className="mt-stanza" aria-label="Κατηγορίες ΕΟΦ">
          <h2 className="caption-tag !text-sage-ink">Κανονιστική κατηγορία ΕΟΦ</h2>
          <div className="mt-breath flex flex-wrap gap-breath">
            {eofCategories.map((c) => (
              <Chip
                key={c.slug}
                href={`/proionta?eof=${encodeURIComponent(c.slug)}`}
                label={c.name}
                active={activeEof?.slug === c.slug}
                count={c.count}
              />
            ))}
          </div>
        </Reveal>

        <Reveal as="section" delay={0.1} className="mt-stanza" aria-label="Σειρές">
          <h2 className="caption-tag">Σειρές</h2>
          <div className="mt-breath flex flex-wrap gap-breath">
            {families.map((f) => (
              <Chip
                key={f.slug}
                href={`/proionta?seira=${f.slug}`}
                label={f.name}
                active={activeFam?.slug === f.slug}
                count={f.count}
              />
            ))}
          </div>
        </Reveal>
      </div>

      <ProductGrid products={shown} filterKey={filterKey} />
    </div>
  );
}
