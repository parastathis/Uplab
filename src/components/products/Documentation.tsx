import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

/**
 * Real product brochures + published clinical studies scraped from uplab.gr.
 * Links point at the live PDF sources (to be re-hosted on deploy). Studies are
 * highlighted first — the scientific documentation is the credibility anchor.
 */

const B = "https://uplab.gr/media";

const STUDIES: { t: string; u: string }[] = [
  { t: "Δημοσιευμένες μελέτες για την D-mannose", u: `${B}/2024/05/Δημοσιευμένες-μελέτες-για-την-D-mannose.pdf` },
  { t: "Δημοσιευμένες μελέτες για τα συστατικά του Anagent", u: `${B}/2023/02/Δημοσιευμένες-μελέτες-για-τα-συστατικά-του-Anagent.pdf` },
  { t: "Berroxin — Elderberry study", u: `${B}/2021/11/Elderberry_Berroxin_Study.pdf` },
  { t: "Berroxin — Fenactive study", u: `${B}/2019/03/Berroxin-Fenactive-study-Greek.pdf` },
  { t: "Clinical Study UMP", u: `${B}/2019/03/Clinical-study-UMP.pdf` },
  { t: "Δημοσίευση — Pharmaceuticals (MDPI, 2022)", u: `${B}/2022/09/pharmaceuticals-15-00619-v2.pdf` },
];

const BROCHURES: { t: string; u: string }[] = [
  { t: "Symbactil", u: `${B}/2024/09/Symbactil-brochure-web.pdf` },
  { t: "Berroxin", u: `${B}/2022/11/Berroxin-brochure-web.pdf` },
  { t: "Berroxin Immuno", u: `${B}/2021/11/Berroxin_immuno_brochure.pdf` },
  { t: "Biophen", u: `${B}/2023/05/Biophen-brochure-web.pdf` },
  { t: "Biolevox Neuro", u: `${B}/2019/03/Biolevox-neuro-brochure-web.pdf` },
  { t: "Biolevox HA", u: `${B}/2021/11/Biolevox_HA_brochure.pdf` },
  { t: "Hyalufil", u: `${B}/2022/06/Hyalufil-brochure.pdf` },
  { t: "Hemopropin", u: `${B}/2022/06/Hemopropin-brochure.pdf` },
  { t: "Reduce", u: `${B}/2021/10/Reduce-brochure-web.pdf` },
  { t: "Optavid", u: `${B}/2021/10/Optavid-brochure-web.pdf` },
  { t: "femLab", u: `${B}/2021/10/femLab-brochure-web.pdf` },
  { t: "Eat & Fit", u: `${B}/2021/10/Eat-Fit-brochure-web.pdf` },
  { t: "Argogen", u: `${B}/2021/10/Argogen-brochure-web.pdf` },
  { t: "Uragin", u: `${B}/2019/03/Uragin-brochure-web.pdf` },
  { t: "Prostamin", u: `${B}/2021/10/Prostamin-brochure-web.pdf` },
  { t: "Uromax Litho", u: `${B}/2021/11/Uromax-Litho-Brochure.pdf` },
  { t: "Relusten", u: `${B}/2021/11/Relusten_brochure.pdf` },
  { t: "Proposil", u: `${B}/2021/11/Proposil_brochure.pdf` },
  { t: "Optic Senior", u: `${B}/2021/11/Optic_senior_brochure.pdf` },
  { t: "Mamarin", u: `${B}/2021/11/Mamarin_brochure.pdf` },
  { t: "Longsept", u: `${B}/2021/11/Longsept_hands_brochure_web.pdf` },
  { t: "Leveren", u: `${B}/2021/11/Leveren_brochure.pdf` },
  { t: "KidzLab", u: `${B}/2021/11/KidzLab_brochure_web.pdf` },
  { t: "Haemo line", u: `${B}/2021/11/Haemo_line_brochure.pdf` },
  { t: "Esquito", u: `${B}/2021/11/Esquito_brochure.pdf` },
  { t: "Dezinox", u: `${B}/2021/11/Dezinox_brochure.pdf` },
  { t: "Dermacura", u: `${B}/2021/11/Dermacura_brochure.pdf` },
  { t: "Cicasilver", u: `${B}/2021/11/Cicasilver_brochure_Greek.pdf` },
  { t: "Avenea", u: `${B}/2021/11/Avenea_brochure.pdf` },
  { t: "Alezin", u: `${B}/2021/11/Alezin_brochure.pdf` },
  { t: "Akutol", u: `${B}/2021/11/Akutol_brochure.pdf` },
];

function DocLink({ t, u, kind }: { t: string; u: string; kind: "study" | "brochure" }) {
  return (
    <a
      href={u}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-3 border-b border-ink/10 py-[0.6rem] text-ink transition-colors hover:text-slate"
    >
      <span className="flex items-baseline gap-2 text-[0.95rem]">
        <span aria-hidden className="font-display text-[0.8rem] italic text-mist">
          {kind === "study" ? "μελέτη" : "PDF"}
        </span>
        {t}
      </span>
      <span aria-hidden className="btn-arrow text-mist transition-colors group-hover:text-amber-deep">
        ↓
      </span>
    </a>
  );
}

export default function Documentation() {
  return (
    <section className="border-t border-ink/10 bg-porcelain py-act" aria-label="Τεκμηρίωση και έντυπα">
      <div className="mx-auto max-w-6xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <Reveal>
          <p className="caption-tag">Τεκμηρίωση</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="display-md mt-hair max-w-[26ch] text-ink">
            Επιστημονικές μελέτες &amp; έντυπα προϊόντων.
          </h2>
        </Reveal>

        <div className="mt-chapter grid grid-cols-1 gap-chapter lg:grid-cols-[1fr_1.15fr]">
          {/* studies */}
          <div>
            <p className="caption-tag !text-sage-ink">Δημοσιευμένες μελέτες</p>
            <Stagger as="div" className="mt-breath" gap={0.05}>
              {STUDIES.map((s) => (
                <StaggerItem key={s.u}>
                  <DocLink t={s.t} u={s.u} kind="study" />
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* brochures */}
          <div>
            <p className="caption-tag">Έντυπα προϊόντων</p>
            <div className="mt-breath sm:columns-2 sm:gap-verse">
              {BROCHURES.map((b) => (
                <div key={b.u} className="break-inside-avoid">
                  <DocLink t={b.t} u={b.u} kind="brochure" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
