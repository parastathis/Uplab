import type { Metadata } from "next";
import ProsePage from "@/components/layout/ProsePage";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
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
        <Stagger className="mt-line grid grid-cols-1 gap-line sm:grid-cols-2" gap={0.1}>
          {certifications.images.map((src) => (
            <StaggerItem key={src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="Πιστοποιητικό Uplab"
                loading="lazy"
                className="border border-ink/10 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(27,42,58,0.45)]"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </section>
    </ProsePage>
  );
}
