import { Reveal } from "@/components/ui/Reveal";

/**
 * Location map for the Metamorfosi HQ. Uses Google Maps' keyless embed so the
 * exact address geocodes itself (no hand-guessed coordinates). The frame is
 * graded to the porcelain/ink palette and lifts to full colour on hover; a
 * «directions» line-CTA opens turn-by-turn in a new tab.
 */

const QUERY = "Uplab Pharmaceuticals, 10ο χλμ Ε.Ο. Αθηνών-Λαμίας, Μεταμόρφωση 144 51";
const EMBED = `https://www.google.com/maps?q=${encodeURIComponent(QUERY)}&z=15&output=embed`;
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(QUERY)}`;

export default function ContactMap() {
  return (
    <section aria-label="Τοποθεσία" className="border-t border-ink/10 bg-bone py-act">
      <div className="mx-auto max-w-6xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <Reveal>
          <p className="caption-tag">Βρείτε μας</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="display-md mt-hair text-ink">Μεταμόρφωση, Αττική</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-line max-w-[46ch] text-mist">
            Το εργοστάσιο και τα κεντρικά μας γραφεία βρίσκονται στο 10ο χλμ της Ε.Ο. Αθηνών-Λαμίας.
          </p>
        </Reveal>

        <Reveal delay={0.14}>
          <figure className="group mt-stanza overflow-hidden rounded-[4px] border border-ink/15 bg-porcelain shadow-[0_30px_60px_-40px_rgba(28,43,58,0.55)]">
            <div className="relative aspect-[16/10] w-full sm:aspect-[16/7]">
              <iframe
                title="Χάρτης — Uplab Pharmaceuticals, Μεταμόρφωση"
                src={EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[0.35] contrast-[1.05] sepia-[0.12] transition-[filter] duration-700 ease-out group-hover:grayscale-0 group-hover:sepia-0"
                allowFullScreen
              />
            </div>
            <figcaption className="flex flex-col gap-breath border-t border-ink/12 px-line py-breath text-[0.9rem] sm:flex-row sm:items-center sm:justify-between">
              <span className="text-ink/75">
                10ο χλμ Ε.Ο. Αθηνών-Λαμίας, Μεταμόρφωση, Αττική 144 51
              </span>
              <a
                href={DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line group/dir shrink-0 text-ink"
              >
                Οδηγίες πρόσβασης
                <span className="btn-arrow" aria-hidden>
                  →
                </span>
              </a>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
