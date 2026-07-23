import type { Metadata } from "next";
import { eofCategories, families, healthCategories, products } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters from "@/components/products/ProductFilters";
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

      <div className="mx-auto mt-verse grid max-w-7xl gap-chapter px-[clamp(1.2rem,4vw,4.5rem)] pb-act lg:grid-cols-[minmax(0,1fr)_15rem]">
        {/* products — left */}
        <div className="order-2 lg:order-1">
          <ProductGrid products={shown} filterKey={filterKey} variant="panel" />
        </div>

        {/* filter rail — right on desktop, collapsible on mobile */}
        <aside
          className="order-1 lg:order-2 lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)] lg:h-max lg:self-start"
        >
          <ProductFilters
            activeCat={activeCat?.slug}
            activeEof={activeEof?.slug}
            activeFam={activeFam?.slug}
          />
        </aside>
      </div>
    </div>
  );
}
