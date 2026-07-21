import type { Metadata } from "next";
import ProsePage from "@/components/layout/ProsePage";
import { certifications, qualityPolicy } from "@/lib/data";

export const metadata: Metadata = {
  title: "Πολιτική Ποιότητας",
  description: "Το Σύστημα Διαχείρισης Ποιότητας της UPLAB ΕΠΕ και οι πιστοποιήσεις της εταιρείας.",
};

export default function QualityPage() {
  return (
    <ProsePage kicker="Ποιότητα" title={qualityPolicy.title} text={qualityPolicy.text}>
      <section className="mt-act" aria-label="Πιστοποιήσεις">
        <h2 className="caption-tag">Πιστοποιήσεις</h2>
        <div className="mt-line grid grid-cols-1 gap-line sm:grid-cols-2">
          {certifications.images.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="Πιστοποιητικό Uplab" loading="lazy" className="border border-ink/10" />
          ))}
        </div>
      </section>
    </ProsePage>
  );
}
