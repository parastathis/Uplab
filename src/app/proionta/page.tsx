import type { Metadata } from "next";
import Link from "next/link";
import { eofCategories, families, healthCategories, products } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import ProductGrid from "@/components/products/ProductGrid";
import AnimatedNumber from "@/components/ui/AnimatedNumber";

/** One filter row in the sidebar rail. */
function FilterLink({
  href,
  label,
  count,
  active,
}: {
  href: string;
  label: string;
  count?: number;
  active: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "true" : undefined}
        className={`group flex items-baseline justify-between gap-2 border-l-2 py-[0.28rem] pl-line text-[0.9rem] transition-colors duration-300 ${
          active ? "border-amber text-ink" : "border-transparent text-mist hover:border-ink/20 hover:text-ink"
        }`}
      >
        <span>{label}</span>
        {typeof count === "number" && (
          <span className="font-display text-[0.78rem] italic text-mist">{count}</span>
        )}
      </Link>
    </li>
  );
}

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

        {/* filter rail — right, sticky */}
        <aside
          className="order-1 lg:order-2 lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)] lg:h-max lg:self-start"
          aria-label="Φίλτρα προϊόντων"
        >
          <nav>
            <p className="caption-tag">Ανά ανάγκη υγείας</p>
            <ul className="mt-breath space-y-[0.1rem]">
              <FilterLink href="/proionta" label="Όλα τα προϊόντα" active={!activeCat && !activeEof && !activeFam} />
              {healthCategories
                .filter((c) => c.count > 0)
                .map((c) => (
                  <FilterLink
                    key={c.slug}
                    href={`/proionta?katigoria=${encodeURIComponent(c.slug)}`}
                    label={c.name}
                    count={c.count}
                    active={activeCat?.slug === c.slug}
                  />
                ))}
            </ul>

            <p className="caption-tag mt-stanza !text-sage-ink">Κατηγορία ΕΟΦ</p>
            <ul className="mt-breath space-y-[0.1rem]">
              {eofCategories.map((c) => (
                <FilterLink
                  key={c.slug}
                  href={`/proionta?eof=${encodeURIComponent(c.slug)}`}
                  label={c.name}
                  count={c.count}
                  active={activeEof?.slug === c.slug}
                />
              ))}
            </ul>

            <p className="caption-tag mt-stanza">Σειρές</p>
            <ul className="mt-breath space-y-[0.1rem]">
              {families.map((f) => (
                <FilterLink
                  key={f.slug}
                  href={`/proionta?seira=${f.slug}`}
                  label={f.name}
                  count={f.count}
                  active={activeFam?.slug === f.slug}
                />
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
}
