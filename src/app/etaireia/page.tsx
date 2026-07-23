import type { Metadata } from "next";
import { companyTabs, partners } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import CompanyReader from "@/components/company/CompanyReader";
import Timeline from "@/components/company/Timeline";
import Certifications from "@/components/company/Certifications";
import PingPongVideo from "@/components/ui/PingPongVideo";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Η εταιρεία",
  description:
    "Πίσω από το brand UPLAB βρίσκεται ένα σύγχρονο εργοστάσιο παραγωγής φαρμάκων με πρότυπα GMP — ποιοι είμαστε, η φιλοσοφία μας, τα πρότυπα ποιότητας, οι άνθρωποι και οι συνεργάτες μας.",
};

/** Η εταιρεία — the 5 real tabs rendered as an editorial long-read with scroll-spy nav. */
export default function CompanyPage() {
  const tabs = Object.entries(companyTabs) as [string, string][];

  return (
    <div className="bg-porcelain pt-[calc(var(--nav-h)+2rem)]">
      <header className="mx-auto max-w-6xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <PageHeader kicker="Η εταιρεία" title="Φύση και επιστήμη, σε ισορροπία." />
      </header>

      {/* cinematic band — ping-pong loop */}
      <Reveal className="mx-auto mt-chapter max-w-6xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <div className="relative aspect-[21/9] overflow-hidden rounded-[8px] border border-ink/10 shadow-[0_40px_80px_-55px_rgba(28,43,58,0.6)]">
          <PingPongVideo
            src="/media/nature-science.mp4"
            poster="/media/honeycomb-still.png"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" aria-hidden />
          <p className="absolute bottom-4 left-5 font-display text-[clamp(1rem,2.4vw,1.7rem)] italic text-porcelain">
            Από τη φύση, στην επιστήμη.
          </p>
        </div>
      </Reveal>

      <Timeline />

      <CompanyReader tabs={tabs} partners={partners} />

      <Certifications />
    </div>
  );
}
