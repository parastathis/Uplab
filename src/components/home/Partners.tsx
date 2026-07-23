import { Globe } from "@/components/ui/globe";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { partners } from "@/lib/data";

/** Countries the network spans. */
const COUNTRIES = ["Κροατία", "Πολωνία", "Τσεχία", "Σλοβενία", "Ιταλία", "Λετονία"];

/**
 * International network — the European houses Uplab represents exclusively,
 * marked on a live globe alongside the Athens HQ. Fits the company: Uplab both
 * produces in Greece and distributes innovative European formulations here.
 */
export default function Partners() {
  return (
    <section className="relative overflow-hidden bg-night py-act text-porcelain" aria-label="Διεθνές δίκτυο συνεργατών">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-chapter px-[clamp(1.2rem,4vw,4.5rem)] lg:grid-cols-[1fr_1fr]">
        <div>
          <Reveal>
            <p className="caption-tag !text-porcelain/60">Διεθνές δίκτυο</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display-lg mt-hair max-w-[16ch]">Από την Αθήνα, σε όλη την Ευρώπη.</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-line max-w-[48ch] text-porcelain/70">
              Με έδρα και μονάδα παραγωγής στην Αθήνα, αντιπροσωπεύουμε κατ’ αποκλειστικότητα
              μεγάλους ευρωπαϊκούς οίκους ανάπτυξης καινοτόμων σκευασμάτων — και τα φέρνουμε στο
              ελληνικό φαρμακείο.
            </p>
          </Reveal>

          {/* partner houses */}
          <Stagger className="mt-stanza grid grid-cols-2 gap-x-verse gap-y-breath sm:grid-cols-3" gap={0.05}>
            {partners.map((p) => (
              <StaggerItem
                as="span"
                key={p}
                className="font-display text-[1.02rem] italic text-porcelain/60 transition-colors duration-300 hover:text-amber-bright"
              >
                {p}
              </StaggerItem>
            ))}
          </Stagger>

          {/* countries */}
          <Reveal delay={0.1}>
            <ul className="mt-stanza flex flex-wrap items-center gap-x-line gap-y-breath border-t border-porcelain/12 pt-line">
              {COUNTRIES.map((c) => (
                <li key={c} className="flex items-center gap-[0.5em] text-[0.78rem] uppercase tracking-[0.14em] text-porcelain/55">
                  <span aria-hidden className="h-[5px] w-[5px] rounded-full bg-amber" />
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* globe — needs a relative, square, sized parent (the canvas is absolute inset-0) */}
        <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
          <Globe />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_62%,rgba(22,34,46,0.9))]"
          />
        </div>
      </div>
    </section>
  );
}
