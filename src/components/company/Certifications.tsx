import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

/**
 * Real, current (2024) certifications scraped from uplab.gr — ISO 9001:2015,
 * ISO 13485, and the Greek ministerial authorization — plus the Best-in-Pharmacy
 * 2022 Gold award. Each card opens the full certificate in a new tab.
 */

type Cert = { img: string; standard: string; title: string; meta: string };

const CERTS: Cert[] = [
  {
    img: "/media/certs/iso-9001-2015.jpg",
    standard: "ΕΛΟΤ EN ISO 9001:2015",
    title: "Σύστημα Διαχείρισης Ποιότητας",
    meta: "EUROCERT · αρ. 00.12.0619 · ισχύς έως 01/11/2026",
  },
  {
    img: "/media/certs/iso-13485-p1.jpg",
    standard: "ISO 13485",
    title: "Ιατροτεχνολογικά προϊόντα",
    meta: "Σύστημα διαχείρισης ποιότητας ιατροτεχνολογικών προϊόντων",
  },
  {
    img: "/media/certs/ya-1348-2024.jpg",
    standard: "ΥΑ 1348/19580/2024",
    title: "Βεβαίωση υπουργικής απόφασης",
    meta: "Ισχύουσα άδεια παραγωγής & διακίνησης",
  },
];

export default function Certifications() {
  return (
    <section className="border-t border-ink/10 bg-porcelain py-act" aria-label="Πιστοποιήσεις">
      <div className="mx-auto max-w-6xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <Reveal>
          <p className="caption-tag">Πιστοποιήσεις</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="display-md mt-hair max-w-[24ch] text-ink">
            Πιστοποιημένη ποιότητα, σε κάθε βήμα.
          </h2>
        </Reveal>

        <Stagger as="ul" className="mt-chapter grid grid-cols-1 gap-line sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {CERTS.map((c) => (
            <StaggerItem as="li" key={c.img}>
              <a
                href={c.img}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden rounded-[6px] border border-ink/12 bg-white transition-shadow duration-500 hover:shadow-[0_24px_50px_-32px_rgba(28,43,58,0.55)]"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-bone">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt={`Πιστοποιητικό ${c.standard}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/5" />
                </div>
                <div className="flex flex-1 flex-col border-t border-ink/10 p-line">
                  <p className="subhead text-[1.05rem] text-ink">{c.standard}</p>
                  <p className="mt-hair text-[0.9rem] text-slate">{c.title}</p>
                  <p className="mt-breath text-[0.78rem] leading-relaxed text-mist">{c.meta}</p>
                </div>
              </a>
            </StaggerItem>
          ))}
        </Stagger>

        {/* award */}
        <Reveal delay={0.1}>
          <div className="mt-chapter flex flex-wrap items-center gap-line border-t border-ink/10 pt-verse">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/certs/award-best-in-pharmacy-2022-gold.webp"
              alt="Χρυσό βραβείο Best in Pharmacy Awards 2022"
              className="h-24 w-auto"
              loading="lazy"
            />
            <div>
              <p className="subhead text-[1.1rem] text-ink">Best in Pharmacy Awards 2022 — Χρυσό βραβείο</p>
              <p className="mt-hair max-w-[46ch] text-[0.9rem] text-mist">
                Διάκριση για το Berroxin® Immuno — αναγνώριση της καινοτομίας και της αποτελεσματικότητας.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
