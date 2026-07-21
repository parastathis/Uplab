import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "ΕΣΠΑ",
  description: "Χρηματοδότηση ΕΣΠΑ — Επιχειρησιακό Πρόγραμμα «Ανταγωνιστικότητα, Επιχειρηματικότητα και Καινοτομία».",
};

export default function EspaPage() {
  return (
    <div className="bg-porcelain pt-[calc(var(--nav-h)+2rem)]">
      <div className="mx-auto max-w-3xl px-[clamp(1.2rem,4vw,4.5rem)] pb-act">
        <Reveal>
          <p className="caption-tag">Χρηματοδότηση</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="display-md mt-hair text-ink">ΕΣΠΑ 2014–2020</h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-line leading-relaxed text-ink/75">
            Η επιχείρηση εντάχθηκε σε δράση του Επιχειρησιακού Προγράμματος «Ανταγωνιστικότητα,
            Επιχειρηματικότητα και Καινοτομία», με τη συγχρηματοδότηση της Ελλάδας και της Ευρωπαϊκής
            Ένωσης.
          </p>
        </Reveal>
        <Reveal blur delay={0.16}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://uplab.gr/media/2024/04/e-bannerespaEAEAC120X60.jpg"
            alt="Banner ΕΣΠΑ — Ευρωπαϊκή Ένωση, Ευρωπαϊκό Ταμείο Περιφερειακής Ανάπτυξης"
            className="mt-chapter border border-ink/10"
          />
        </Reveal>
        <Reveal delay={0.2}>
          <a
            href="https://uplab.gr/media/2024/04/antagonistikotita_web.pptx"
            className="group mt-line inline-flex items-center gap-2 text-[0.88rem] text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-current"
          >
            Αναλυτικά στοιχεία δράσης (αρχείο παρουσίασης)
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
          </a>
        </Reveal>
      </div>
    </div>
  );
}
