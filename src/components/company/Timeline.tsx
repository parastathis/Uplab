"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Scroll-scrubbed vertical timeline (manuarora700 «timeline» pattern). A beam
 * grows down the rail as the section scrolls, dots mark each stage, and the
 * stage title sticks on the left while its copy scrolls on the right.
 *
 * Content is the real UPLAB value chain drawn verbatim-in-spirit from the
 * «Η εταιρεία» tabs — no invented dates or facts. The beam is the single amber
 * touch here, standing in for scroll-progress (intent), per the palette law.
 */

type Entry = { label: string; title: string; body: string };

const ENTRIES: Entry[] = [
  {
    label: "01 — Παραγωγή",
    title: "Σχεδιάζουμε & παράγουμε",
    body: "Πίσω από το brand UPLAB βρίσκεται ένα σύγχρονο εργοστάσιο παραγωγής φαρμάκων, που λειτουργεί σύμφωνα με τις Αρχές Ορθής Παρασκευαστικής Πρακτικής (GMP), διαθέτοντας όλες τις απαιτούμενες πιστοποιήσεις.",
  },
  {
    label: "02 — Ποιότητα",
    title: "Διασφαλίζουμε την ποιότητα",
    body: "Ιατροτεχνολογικά προϊόντα όλων των κλάσεων, καλλυντικά και συμπληρώματα για ειδικούς ιατρικούς σκοπούς. Όλα τα σκευάσματα είναι γνωστοποιημένα στον ΕΟΦ και τα καλλυντικά στο CPNP.",
  },
  {
    label: "03 — Άνθρωποι",
    title: "Επενδύουμε στους ανθρώπους",
    body: "Κοινό όραμα, επιστημονικό υπόβαθρο, ομαδικό πνεύμα. Φροντίζουμε για τη συνεχή ενημέρωση των ανθρώπων μας και προσφέρουμε ίσες ευκαιρίες εκπαίδευσης και ανάπτυξης.",
  },
  {
    label: "04 — Διακίνηση",
    title: "Διακινούμε πανελλαδικά",
    body: "Διακινούμε τα προϊόντα μας αποκλειστικά στα φαρμακεία και στις φαρμακαποθήκες όλης της χώρας, αντιπροσωπεύοντας κατ’ αποκλειστικότητα μεγάλες ευρωπαϊκές εταιρίες.",
  },
];

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 20%", "end 75%"],
  });
  const beam = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.05, 1], [0, 1, 1]);

  return (
    <section aria-label="Η διαδρομή μας" className="border-t border-ink/10 bg-paper py-act">
      <div className="mx-auto max-w-6xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <p className="caption-tag">Πώς δουλεύουμε</p>
        <h2 className="display-md mt-hair max-w-[22ch] text-ink">
          Από τη μονάδα παραγωγής στο ράφι του φαρμακείου.
        </h2>

        <div ref={ref} className="relative mt-chapter">
          {/* rail — static track + growing amber beam */}
          <div
            aria-hidden
            className="absolute left-[7px] top-0 h-full w-px bg-ink/12 md:left-[calc(15rem+7px)]"
          >
            {!reduce && (
              <motion.div
                style={{ height: beam, opacity: beamOpacity }}
                className="absolute left-0 top-0 w-px bg-gradient-to-b from-amber via-amber/70 to-transparent"
              />
            )}
          </div>

          <ol className="space-y-verse">
            {ENTRIES.map((e) => (
              <li key={e.label} className="relative flex flex-col gap-breath md:flex-row md:gap-0">
                {/* dot + sticky label */}
                <div className="flex items-center gap-line md:sticky md:top-[calc(var(--nav-h)+2.5rem)] md:h-max md:w-60 md:shrink-0 md:self-start">
                  <span
                    aria-hidden
                    className="relative z-10 grid h-[15px] w-[15px] place-items-center rounded-full border border-ink/25 bg-paper"
                  >
                    <span className="h-[6px] w-[6px] rounded-full bg-amber" />
                  </span>
                  <span className="caption-tag">{e.label}</span>
                </div>

                {/* content */}
                <div className="ml-[calc(15px+1.35rem)] max-w-[52ch] md:ml-0 md:pl-line">
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="font-display text-[1.5rem] leading-tight text-ink">{e.title}</h3>
                    <p className="mt-breath text-[1rem] leading-[1.8] text-ink/75">{e.body}</p>
                  </motion.div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
