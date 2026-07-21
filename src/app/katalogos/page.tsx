import type { Metadata } from "next";
import Link from "next/link";
import ProsePage from "@/components/layout/ProsePage";
import Magnetic from "@/components/ui/Magnetic";
import { catalog } from "@/lib/data";

export const metadata: Metadata = {
  title: "Κατάλογος προϊόντων",
  description: "Κατεβάστε τον πλήρη κατάλογο προϊόντων της Uplab Pharmaceuticals σε PDF.",
};

export default function CatalogPage() {
  return (
    <ProsePage kicker="Κατάλογος" title={catalog.title}>
      <p className="mt-verse max-w-[52ch] text-[0.95rem] leading-relaxed text-ink/80">
        Ο πλήρης έντυπος κατάλογος της Uplab σε ψηφιακή μορφή — όλα τα προϊόντα, οι συσκευασίες και οι
        κατηγορίες υγείας.
      </p>
      <div className="mt-stanza flex flex-wrap gap-breath">
        <Magnetic strength={0.4}>
          <a
            href={catalog.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-sheen inline-block rounded-full bg-amber px-[1.6em] py-[0.7em] text-[0.88rem] text-ink-black transition-colors duration-300 hover:bg-amber-bright"
            style={{ fontWeight: 560 }}
          >
            Λήψη καταλόγου (PDF)
          </a>
        </Magnetic>
        <Magnetic strength={0.3}>
          <Link
            href="/proionta"
            className="inline-block rounded-full border border-ink/20 px-[1.6em] py-[0.7em] text-[0.88rem] text-ink transition-colors duration-300 hover:bg-ink hover:text-porcelain"
          >
            Περιήγηση online
          </Link>
        </Magnetic>
      </div>
    </ProsePage>
  );
}
