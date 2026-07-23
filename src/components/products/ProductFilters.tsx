"use client";

import { useState } from "react";
import Link from "next/link";
import { healthCategories, eofCategories, families } from "@/lib/data";

const health = healthCategories.filter((c) => c.count > 0);

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

/**
 * Category filter rail. On desktop it's an always-open sticky sidebar; on mobile
 * it collapses behind a «Φίλτρα» toggle so products stay near the top.
 */
export default function ProductFilters({
  activeCat,
  activeEof,
  activeFam,
}: {
  activeCat?: string;
  activeEof?: string;
  activeFam?: string;
}) {
  const [open, setOpen] = useState(false);
  const none = !activeCat && !activeEof && !activeFam;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between border-y border-ink/12 py-line text-left lg:hidden"
      >
        <span className="caption-tag">Φίλτρα κατηγοριών</span>
        <span className={`text-[1.3rem] leading-none text-mist transition-transform duration-300 ${open ? "rotate-45" : ""}`} aria-hidden>
          +
        </span>
      </button>

      <nav className={`${open ? "mt-line block" : "hidden"} lg:mt-0 lg:block`} aria-label="Φίλτρα προϊόντων">
        <p className="caption-tag hidden lg:block">Ανά ανάγκη υγείας</p>
        <ul className="mt-breath space-y-[0.1rem]">
          <FilterLink href="/proionta" label="Όλα τα προϊόντα" active={none} />
          {health.map((c) => (
            <FilterLink
              key={c.slug}
              href={`/proionta?katigoria=${encodeURIComponent(c.slug)}`}
              label={c.name}
              count={c.count}
              active={activeCat === c.slug}
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
              active={activeEof === c.slug}
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
              active={activeFam === f.slug}
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
