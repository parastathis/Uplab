"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Tiles from "@/components/ui/Tiles";
import PingPongVideo from "@/components/ui/PingPongVideo";

/** Closing split for both audiences + FAQ accordion, sitting on the tiles field. */

const FAQ = [
  {
    q: "Πού μπορώ να αγοράσω προϊόντα Uplab;",
    a: "Τα προϊόντα Uplab διατίθενται αποκλειστικά μέσω φαρμακείων — σε περισσότερα από 2.075 σημεία πώλησης σε όλη την Ελλάδα. Χρησιμοποιήστε τα Σημεία πώλησης για να βρείτε το κοντινότερο φαρμακείο.",
  },
  {
    q: "Είμαι φαρμακοποιός — πώς συνεργάζομαι με την Uplab;",
    a: "Η Uplab συνεργάζεται με φαρμακεία και φαρμακαποθήκες σε όλη τη χώρα. Επικοινωνήστε μαζί μας στο +30 210 28 44 333 ή μέσω της φόρμας επικοινωνίας για να μιλήσετε με τον υπεύθυνο της περιοχής σας.",
  },
  {
    q: "Τα προϊόντα παράγονται στην Ελλάδα;",
    a: "Η Uplab παράγει σε σύγχρονες εγκαταστάσεις παραγωγής φαρμάκων και επιπλέον επιλέγει αποκλειστικές συνεργασίες με ευρωπαϊκούς οίκους ανάπτυξης καινοτόμων σκευασμάτων.",
  },
  {
    q: "Σε ποιες κατηγορίες ανήκουν τα προϊόντα;",
    a: "Ο κατάλογος καλύπτει 27 κατηγορίες υγείας, ενώ κανονιστικά τα προϊόντα εντάσσονται στις κατηγορίες ΕΟΦ: Βιοκτόνα, Ιατροτεχνολογικά, Καλλυντικά και Συμπληρώματα διατροφής.",
  },
];

export default function Finale() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden bg-porcelain py-act" aria-label="Συνεργασία και σημεία πώλησης">
      <Tiles rows={22} cols={44} tileSize="md" />

      <div className="pointer-events-none relative z-10 mx-auto max-w-6xl px-[clamp(1.2rem,4vw,4.5rem)]">
        {/* dual audience split — asymmetric on purpose */}
        <div className="grid grid-cols-1 gap-line md:grid-cols-[1.35fr_1fr]">
          <Link
            href="/simeia-polisis"
            className="pointer-events-auto group relative flex flex-col justify-between overflow-hidden bg-night p-stanza text-porcelain transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5"
            style={{ borderRadius: "0.5rem 3rem 0.5rem 0.5rem", minHeight: "16rem" }}
          >
            <PingPongVideo
              src="/media/family.mp4"
              poster="/media/family-still.png"
              className="absolute inset-0 h-full w-full object-cover opacity-35 transition-opacity duration-700 group-hover:opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/30" aria-hidden />
            <p className="relative z-10 caption-tag !text-porcelain/60">Για εσάς</p>
            <div className="relative z-10">
              <h2 className="display-md text-porcelain">Σημεία πώλησης</h2>
              <p className="mt-breath max-w-[34ch] text-[0.9rem] text-porcelain/70">
                Βρείτε το κοντινότερο φαρμακείο με προϊόντα Uplab — 2.075+ σημεία σε όλη την Ελλάδα.
              </p>
            </div>
            <span className="relative z-10 mt-line inline-block text-amber-bright transition-transform duration-500 group-hover:translate-x-2" aria-hidden>
              →
            </span>
          </Link>

          <Link
            href="/synergasia"
            className="pointer-events-auto group flex flex-col justify-between border border-ink/15 bg-paper p-stanza transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5"
            style={{ borderRadius: "0.5rem", minHeight: "16rem" }}
          >
            <p className="caption-tag">Για φαρμακεία — B2B</p>
            <div>
              <h2 className="display-md text-ink">Συνεργαστείτε μαζί μας</h2>
              <p className="mt-breath max-w-[30ch] text-[0.9rem] text-mist">
                Γίνετε σημείο πώλησης Uplab ή ζητήστε τον κατάλογο χονδρικής.
              </p>
            </div>
            <span className="mt-line inline-block text-ink transition-transform duration-500 group-hover:translate-x-2" aria-hidden>
              →
            </span>
          </Link>
        </div>

        {/* FAQ accordion */}
        <div className="mt-act max-w-3xl">
          <h2 className="display-md text-ink">Συχνές ερωτήσεις</h2>
          <dl className="pointer-events-auto mt-verse divide-y divide-ink/10 border-y border-ink/10">
            {FAQ.map((f, i) => (
              <div key={i}>
                <dt>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    aria-expanded={open === i}
                    className="flex w-full items-baseline justify-between gap-line py-line text-left"
                  >
                    <span
                      className="font-display text-[clamp(1rem,1.6vw,1.25rem)] text-ink transition-colors duration-300 hover:text-slate"
                    >
                      {f.q}
                    </span>
                    <motion.span
                      animate={{ rotate: open === i ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                      className="text-[1.3rem] leading-none text-mist"
                      aria-hidden
                    >
                      +
                    </motion.span>
                  </button>
                </dt>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.dd
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[62ch] pb-line text-[0.92rem] leading-relaxed text-mist">{f.a}</p>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
