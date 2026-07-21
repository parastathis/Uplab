import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ΕΣΠΑ",
  description: "Χρηματοδότηση ΕΣΠΑ — Επιχειρησιακό Πρόγραμμα «Ανταγωνιστικότητα, Επιχειρηματικότητα και Καινοτομία».",
};

export default function EspaPage() {
  return (
    <div className="bg-porcelain pt-[calc(var(--nav-h)+2rem)]">
      <div className="mx-auto max-w-3xl px-[clamp(1.2rem,4vw,4.5rem)] pb-act">
        <p className="caption-tag">Χρηματοδότηση</p>
        <h1 className="display-md mt-hair text-ink">ΕΣΠΑ 2014–2020</h1>
        <p className="mt-line leading-relaxed text-ink/75">
          Η επιχείρηση εντάχθηκε σε δράση του Επιχειρησιακού Προγράμματος «Ανταγωνιστικότητα,
          Επιχειρηματικότητα και Καινοτομία», με τη συγχρηματοδότηση της Ελλάδας και της Ευρωπαϊκής
          Ένωσης.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://uplab.gr/media/2024/04/e-bannerespaEAEAC120X60.jpg"
          alt="Banner ΕΣΠΑ — Ευρωπαϊκή Ένωση, Ευρωπαϊκό Ταμείο Περιφερειακής Ανάπτυξης"
          className="mt-chapter border border-ink/10"
        />
        <a
          href="https://uplab.gr/media/2024/04/antagonistikotita_web.pptx"
          className="mt-line inline-block text-[0.88rem] text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-current"
        >
          Αναλυτικά στοιχεία δράσης (αρχείο παρουσίασης) →
        </a>
      </div>
    </div>
  );
}
