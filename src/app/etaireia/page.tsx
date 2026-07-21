import type { Metadata } from "next";
import { companyTabs, partners } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import CompanyReader from "@/components/company/CompanyReader";
import Timeline from "@/components/company/Timeline";

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

      <Timeline />

      <CompanyReader tabs={tabs} partners={partners} />
    </div>
  );
}
