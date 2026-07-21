import ImageCompare from "@/components/ui/ImageCompare";
import { Reveal } from "@/components/ui/Reveal";

/** «Η Ισορροπία» made literal — drag between the natural source and the lab. */
export default function BalanceCompare() {
  return (
    <section className="bg-porcelain py-act" aria-label="Φύση και επιστήμη σε ισορροπία">
      <div className="mx-auto max-w-6xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <div className="flex flex-wrap items-end justify-between gap-line">
          <div>
            <Reveal>
              <p className="caption-tag">Η Ισορροπία</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display-lg mt-hair max-w-[15ch] text-ink">
                Φύση και επιστήμη, στο ίδιο σκεύασμα.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.12}>
            <p className="max-w-[30ch] text-[0.9rem] leading-relaxed text-mist">
              Σύρετε τη λαβή. Από τη φυσική πρώτη ύλη στο πιστοποιημένο εργαστήριο GMP — δύο κόσμοι,
              ένα σκεύασμα.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.16} blur className="mt-verse">
          <ImageCompare
            before="/media/honeycomb-still.png"
            after="/media/factory-still.png"
            beforeLabel="Φύση"
            afterLabel="Επιστήμη"
            alt="Από τη φύση στο εργαστήριο παραγωγής της Uplab"
          />
        </Reveal>
      </div>
    </section>
  );
}
