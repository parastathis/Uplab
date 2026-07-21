import Link from "next/link";
import type { Metadata } from "next";
import { trust } from "@/lib/data";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import Magnetic from "@/components/ui/Magnetic";

export const metadata: Metadata = {
  title: "Συνεργασία B2B",
  description:
    "Γίνετε σημείο πώλησης Uplab — συνεργασία με φαρμακεία και φαρμακαποθήκες σε όλη την Ελλάδα.",
};

const STATS = [
  { value: trust.pharmacies, suffix: "+", t: "συνεργαζόμενα σημεία πώλησης" },
  { value: trust.products, suffix: "", t: "κωδικοί προϊόντων σε 27 κατηγορίες" },
  { value: trust.partners, suffix: "", t: "αποκλειστικές ευρωπαϊκές αντιπροσωπείες" },
];

/** B2B: the pharmacist/wholesaler narrative — not a buried contact form. */
export default function B2BPage() {
  return (
    <div className="bg-ink pt-[calc(var(--nav-h)+2rem)] text-porcelain">
      <div className="relative overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-30"
          src="/media/pharmacy.mp4"
          poster="/media/pharmacy-still.png"
          muted
          loop
          playsInline
          autoPlay
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" aria-hidden />
        <div className="relative z-10 mx-auto max-w-6xl px-[clamp(1.2rem,4vw,4.5rem)] py-act">
          <Reveal>
            <p className="caption-tag !text-porcelain/60">Για φαρμακεία & φαρμακαποθήκες</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display-lg mt-hair max-w-[18ch]">Το ράφι σας, ο συνεργάτης μας.</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-line max-w-[52ch] text-porcelain/70">
              Η Uplab διακινεί αποκλειστικά μέσω φαρμακείων — δεν θα βρείτε τα προϊόντα μας σε σούπερ
              μάρκετ ή marketplaces. Αυτή η δέσμευση προστατεύει το κανάλι και τη συμβουλευτική αξία του
              φαρμακοποιού.
            </p>
          </Reveal>
        </div>
      </div>

      <Stagger className="mx-auto grid max-w-6xl grid-cols-1 gap-verse px-[clamp(1.2rem,4vw,4.5rem)] py-chapter md:grid-cols-3" gap={0.14}>
        {STATS.map((s) => (
          <StaggerItem key={s.t}>
            <p className="display-md text-amber-bright">
              <AnimatedNumber value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-hair max-w-[22ch] text-[0.88rem] text-porcelain/60">{s.t}</p>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mx-auto max-w-6xl px-[clamp(1.2rem,4vw,4.5rem)] pb-act">
        <Reveal className="flex flex-wrap items-center justify-between gap-line border-t border-porcelain/12 pt-chapter">
          <div>
            <h2 className="display-md">Ξεκινήστε τη συνεργασία</h2>
            <p className="mt-breath max-w-[46ch] text-[0.9rem] text-porcelain/60">
              Καλέστε μας στο <a href="tel:+302102844333" className="link-underline text-porcelain">+30 210 28 44 333</a> ή
              στείλτε μας email για τον κατάλογο χονδρικής και τον υπεύθυνο της περιοχής σας.
            </p>
          </div>
          <div className="flex flex-wrap gap-breath">
            <Magnetic strength={0.4}>
              <a
                href="mailto:info@uplab.gr?subject=%CE%A3%CF%85%CE%BD%CE%B5%CF%81%CE%B3%CE%B1%CF%83%CE%AF%CE%B1%20B2B"
                className="cta-sheen inline-block rounded-full bg-amber px-[1.5em] py-[0.7em] text-[0.85rem] text-ink-black transition-colors duration-300 hover:bg-amber-bright"
                style={{ fontWeight: 560 }}
              >
                Ζητήστε τον κατάλογο
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <Link
                href="/epikoinonia"
                className="inline-block rounded-full border border-porcelain/30 px-[1.5em] py-[0.7em] text-[0.85rem] text-porcelain transition-colors duration-300 hover:bg-porcelain hover:text-ink"
              >
                Επικοινωνία
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
