import PartnersGlobe from "@/components/ui/PartnersGlobe";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { partners } from "@/lib/data";

/** International network — the European houses Uplab represents, on a live globe. */
export default function Partners() {
  return (
    <section className="relative overflow-hidden bg-night py-act text-porcelain" aria-label="Διεθνές δίκτυο συνεργατών">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-chapter px-[clamp(1.2rem,4vw,4.5rem)] lg:grid-cols-[1fr_1fr]">
        <div>
          <Reveal>
            <p className="caption-tag !text-porcelain/60">Διεθνές δίκτυο</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display-lg mt-hair max-w-[16ch]">Αντιπροσωπεύουμε την Ευρώπη, στο ελληνικό φαρμακείο.</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-line max-w-[46ch] text-porcelain/70">
              Κατ’ αποκλειστικότητα αντιπρόσωποι μεγάλων ευρωπαϊκών οίκων ανάπτυξης καινοτόμων
              σκευασμάτων — από την Κροατία και την Πολωνία ως τη Σλοβενία, την Ιταλία και τη Λετονία.
            </p>
          </Reveal>
          <Stagger className="mt-stanza flex flex-wrap gap-x-verse gap-y-line" gap={0.05}>
            {partners.map((p) => (
              <StaggerItem
                as="span"
                key={p}
                className="font-display text-[1.05rem] italic text-porcelain/55 transition-colors duration-300 hover:text-amber-bright"
              >
                {p}
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="flex items-center justify-center">
          <PartnersGlobe />
        </div>
      </div>
    </section>
  );
}
