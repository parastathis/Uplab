import type { Metadata } from "next";
import Tiles from "@/components/ui/Tiles";
import PageHeader from "@/components/ui/PageHeader";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import StoreFinder from "@/components/stores/StoreFinder";

export const metadata: Metadata = {
  title: "Σημεία πώλησης",
  description:
    "Τα προϊόντα Uplab διατίθενται αποκλειστικά μέσω φαρμακείων — 2.075+ σημεία πώλησης σε όλη την Ελλάδα.",
};

export default function StoresPage() {
  return (
    <div className="relative overflow-hidden bg-porcelain pt-[calc(var(--nav-h)+2rem)]">
      <Tiles rows={26} cols={44} tileSize="md" />
      <div className="pointer-events-none relative z-10 mx-auto max-w-6xl px-[clamp(1.2rem,4vw,4.5rem)] pb-act">
        <div className="grid grid-cols-1 items-center gap-chapter lg:grid-cols-[1fr_0.85fr]">
          <PageHeader
            kicker="Πού θα μας βρείτε"
            title="2.075+ φαρμακεία σε όλη την Ελλάδα."
            lead="Τα προϊόντα Uplab διατίθενται αποκλειστικά μέσω φαρμακείων και φαρμακαποθηκών. Ρωτήστε τον φαρμακοποιό σας — ή αναζητήστε στον χάρτη το κοντινότερο σημείο πώλησης."
          />
          <Reveal className="pointer-events-auto" delay={0.1}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/gallery/gen-hands-capsule.png"
              alt="Το σκεύασμα στο χέρι, στο φαρμακείο"
              className="aspect-[4/5] w-full rounded-[8px] border border-ink/10 object-cover shadow-[0_30px_70px_-45px_rgba(28,43,58,0.6)]"
            />
          </Reveal>
        </div>

        <Stagger className="pointer-events-auto mt-chapter grid max-w-3xl grid-cols-1 gap-line sm:grid-cols-2" gap={0.12}>
          <StaggerItem>
            <div className="h-full border border-ink/10 bg-bone p-stanza transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5" style={{ borderRadius: "0.5rem 2rem 0.5rem 0.5rem" }}>
              <p className="caption-tag">Τηλεφωνικά</p>
              <a href="tel:+302102844333" className="link-underline mt-breath inline-block font-display text-[1.5rem] text-ink hover:text-slate">
                +30 210 28 44 333
              </a>
              <p className="mt-breath text-[0.85rem] text-mist">Δευτέρα–Παρασκευή, ώρες γραφείου</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="h-full border border-ink/10 bg-bone p-stanza transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1.5" style={{ borderRadius: "0.5rem" }}>
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
                className="group mt-breath inline-flex items-center gap-2 text-[0.85rem] text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-current"
              >
                Άνοιγμα στους χάρτες
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
              </a>
            </div>
          </StaggerItem>
        </Stagger>

        <Reveal delay={0.1} className="pointer-events-auto mt-chapter">
          <p className="max-w-[46ch] font-display text-[clamp(1.1rem,2vw,1.6rem)] italic leading-snug text-ink/70">
            Το κανάλι του φαρμακείου προστατεύει τη συμβουλευτική αξία κάθε προϊόντος.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mt-act">
          <StoreFinder />
        </Reveal>
      </div>
    </div>
  );
}
