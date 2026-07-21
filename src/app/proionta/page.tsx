import Link from "next/link";
import type { Metadata } from "next";
import { eofCategories, families, healthCategories, products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Προϊόντα",
  description:
    "Όλα τα προϊόντα υγείας της Uplab Pharmaceuticals — 27 κατηγορίες υγείας, διαθέσιμα αποκλειστικά μέσω φαρμακείων.",
};

/** Product hub: filterable via links (fully crawlable, zero client JS). */
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

  const chip = (href: string, label: string, active: boolean, count?: number) => (
    <Link
      key={href + label}
      href={href}
      className={`inline-flex items-baseline gap-[0.4em] rounded-full border px-[1em] py-[0.45em] text-[0.82rem] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        active
          ? "border-amber bg-amber text-ink-black"
          : "border-ink/12 bg-porcelain text-ink hover:border-ink hover:text-ink"
      }`}
    >
      {label}
      {typeof count === "number" && <span className="text-[0.7rem] opacity-60">{count}</span>}
    </Link>
  );

  return (
    <div className="bg-porcelain pt-[calc(var(--nav-h)+2rem)]">
      <header className="mx-auto max-w-7xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <p className="caption-tag">Κατάλογος</p>
        <h1 className="display-lg mt-hair max-w-[16ch] text-ink">
          {activeCat?.name ?? activeFam?.name ?? activeEof?.name ?? "Όλα τα προϊόντα"}
        </h1>
        <p className="mt-line max-w-[52ch] text-mist">
          {shown.length} προϊόντα · διαθέσιμα αποκλειστικά μέσω φαρμακείων σε όλη την Ελλάδα.
        </p>
      </header>

      <div className="mx-auto mt-verse max-w-7xl px-[clamp(1.2rem,4vw,4.5rem)]">
        {/* two DISTINCT filter groups — never merged */}
        <section aria-label="Κατηγορίες υγείας">
          <h2 className="caption-tag">Ανά ανάγκη υγείας</h2>
          <div className="mt-breath flex flex-wrap gap-breath">
            {chip("/proionta", "Όλα", !activeCat && !activeEof && !activeFam)}
            {healthCategories
              .filter((c) => c.count > 0)
              .map((c) =>
                chip(`/proionta?katigoria=${encodeURIComponent(c.slug)}`, c.name, activeCat?.slug === c.slug, c.count)
              )}
          </div>
        </section>

        <section aria-label="Κατηγορίες ΕΟΦ" className="mt-stanza">
          <h2 className="caption-tag !text-sage-ink">Κανονιστική κατηγορία ΕΟΦ</h2>
          <div className="mt-breath flex flex-wrap gap-breath">
            {eofCategories.map((c) =>
              chip(`/proionta?eof=${encodeURIComponent(c.slug)}`, c.name, activeEof?.slug === c.slug, c.count)
            )}
          </div>
        </section>

        <section aria-label="Σειρές" className="mt-stanza">
          <h2 className="caption-tag">Σειρές</h2>
          <div className="mt-breath flex flex-wrap gap-breath">
            {families.map((f) => chip(`/proionta?seira=${f.slug}`, f.name, activeFam?.slug === f.slug, f.count))}
          </div>
        </section>
      </div>

      <ul className="mx-auto mt-chapter grid max-w-7xl grid-cols-2 gap-x-line gap-y-verse px-[clamp(1.2rem,4vw,4.5rem)] pb-act md:grid-cols-3 xl:grid-cols-4">
        {shown.map((p, i) => (
          <li key={p.id} className={i % 4 === 1 ? "md:translate-y-line" : i % 4 === 3 ? "md:-translate-y-breath" : ""}>
            <Link href={`/proionta/${p.slug}`} className="group block">
              <div
                className="overflow-hidden border border-ink/8 bg-white"
                style={{ borderRadius: i % 5 === 0 ? "0.4rem 1.6rem 0.4rem 0.4rem" : "0.4rem" }}
              >
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={p.image}
                    alt={p.imageAlt || p.name}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.05]"
                  />
                ) : (
                  <div className="flex aspect-square items-center justify-center bg-bone font-display text-[2rem] italic text-sage">
                    U
                  </div>
                )}
              </div>
              <h3
                className="mt-breath font-display text-[1rem] leading-snug text-ink transition-colors duration-300 group-hover:text-slate"
              >
                {p.name}
              </h3>
              <p className="mt-[0.2rem] text-[0.75rem] text-mist">{p.categories.join(" · ")}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
