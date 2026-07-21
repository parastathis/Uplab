import type { Metadata } from "next";
import Tiles from "@/components/ui/Tiles";

export const metadata: Metadata = {
  title: "Σημεία πώλησης",
  description:
    "Τα προϊόντα Uplab διατίθενται αποκλειστικά μέσω φαρμακείων — 2.075+ σημεία πώλησης σε όλη την Ελλάδα.",
};

export default function StoresPage() {
  return (
    <div className="relative overflow-hidden bg-porcelain pt-[calc(var(--nav-h)+2rem)]">
      <Tiles rows={26} cols={44} tileSize="md" />
      <div className="pointer-events-none relative z-10 mx-auto max-w-5xl px-[clamp(1.2rem,4vw,4.5rem)] pb-act">
        <p className="caption-tag">Πού θα μας βρείτε</p>
        <h1 className="display-lg mt-hair max-w-[16ch] text-ink">2.075+ φαρμακεία σε όλη την Ελλάδα.</h1>
        <p className="mt-line max-w-[52ch] text-mist">
          Τα προϊόντα Uplab διατίθενται αποκλειστικά μέσω φαρμακείων και φαρμακαποθηκών. Ρωτήστε τον
          φαρμακοποιό σας — ή επικοινωνήστε μαζί μας για το κοντινότερο σημείο πώλησης.
        </p>

        <div className="pointer-events-auto mt-chapter grid max-w-3xl grid-cols-1 gap-line sm:grid-cols-2">
          <div className="border border-ink/10 bg-bone p-stanza" style={{ borderRadius: "0.5rem 2rem 0.5rem 0.5rem" }}>
            <p className="caption-tag">Τηλεφωνικά</p>
            <a href="tel:+302102844333" className="mt-breath block font-display text-[1.5rem] text-ink hover:text-slate">
              +30 210 28 44 333
            </a>
            <p className="mt-breath text-[0.85rem] text-mist">Δευτέρα–Παρασκευή, ώρες γραφείου</p>
          </div>
          <div className="border border-ink/10 bg-bone p-stanza" style={{ borderRadius: "0.5rem" }}>
            <p className="caption-tag">Έδρα</p>
            <p className="mt-breath text-[0.95rem] leading-relaxed text-ink/80">
              10ο χλμ Ε.Ο. Αθηνών-Λαμίας
              <br />
              Μεταμόρφωση, Αττική 14452
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Uplab+Pharmaceuticals+%CE%9C%CE%B5%CF%84%CE%B1%CE%BC%CF%8C%CF%81%CF%86%CF%89%CF%83%CE%B7"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-breath inline-block text-[0.85rem] text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-current"
            >
              Άνοιγμα στους χάρτες →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
