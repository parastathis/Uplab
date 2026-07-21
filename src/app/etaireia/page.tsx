import type { Metadata } from "next";
import { companyTabs, partners } from "@/lib/data";

export const metadata: Metadata = {
  title: "Η εταιρεία",
  description:
    "Πίσω από το brand UPLAB βρίσκεται ένα σύγχρονο εργοστάσιο παραγωγής φαρμάκων με πρότυπα GMP — ποιοι είμαστε, η φιλοσοφία μας, τα πρότυπα ποιότητας, οι άνθρωποι και οι συνεργάτες μας.",
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/\s+/g, "-").replace(/[^\p{L}\p{N}-]/gu, "");

/** Η εταιρεία — the 5 real tabs rendered as an editorial long-read with anchor nav. */
export default function CompanyPage() {
  const tabs = Object.entries(companyTabs) as [string, string][];

  return (
    <div className="bg-porcelain pt-[calc(var(--nav-h)+2rem)]">
      <header className="mx-auto max-w-6xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <p className="caption-tag">Η εταιρεία</p>
        <h1 className="display-lg mt-hair max-w-[18ch] text-ink">
          Φύση και επιστήμη, σε ισορροπία.
        </h1>
      </header>

      <div className="mx-auto mt-chapter grid max-w-6xl grid-cols-1 gap-chapter px-[clamp(1.2rem,4vw,4.5rem)] pb-act lg:grid-cols-[15rem_1fr]">
        <nav aria-label="Ενότητες" className="lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)] lg:self-start">
          <ol className="space-y-breath border-l border-ink/12 pl-line text-[0.85rem]">
            {tabs.map(([name]) => (
              <li key={name}>
                <a href={`#${slugify(name)}`} className="text-mist transition-colors hover:text-slate">
                  {name}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-[64ch]">
          {tabs.map(([name, text], i) => (
            <section key={name} id={slugify(name)} className={i > 0 ? "mt-act" : ""} aria-label={name}>
              <span className="caption-tag">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="display-md mt-hair text-ink">{name}</h2>
              <p className="mt-line text-[1rem] leading-[1.85] text-ink/80">{text}</p>
              {name === "Οι συνεργάτες μας" && (
                <ul className="mt-stanza flex flex-wrap gap-x-line gap-y-breath" aria-label="Αποκλειστικοί συνεργάτες">
                  {partners.map((p) => (
                    <li
                      key={p}
                      className="font-display text-[1.05rem] italic text-ink/55 transition-colors duration-500 hover:text-slate"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
