import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import GalleryGrid, { type GalleryImage } from "@/components/gallery/GalleryGrid";
import { products } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Οπτικό αρχείο της Uplab Pharmaceuticals — παραγωγή, φύση, εργαστήριο και σκευάσματα.",
};

const MEDIA: GalleryImage[] = [
  { src: "/media/hero-still.png", label: "Το σκεύασμα στο φως" },
  { src: "/media/honeycomb-still.png", label: "Φυσική πρώτη ύλη" },
  { src: "/media/factory-still.png", label: "Γραμμή παραγωγής GMP" },
  { src: "/media/pharmacy-still.png", label: "Το ράφι του φαρμακείου" },
  { src: "/media/family-still.png", label: "Καθημερινή φροντίδα" },
];

export default function GalleryPage() {
  // interleave cinematic stills with real product photography
  const productShots: GalleryImage[] = products
    .filter((p) => p.image)
    .slice(0, 18)
    .map((p) => ({ src: p.image as string, label: p.name }));

  const images: GalleryImage[] = [];
  const maxLen = Math.max(MEDIA.length, productShots.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < MEDIA.length) images.push(MEDIA[i]);
    // 3 product shots between each cinematic still
    images.push(...productShots.slice(i * 3, i * 3 + 3));
  }

  return (
    <div className="bg-porcelain pt-[calc(var(--nav-h)+2rem)]">
      <header className="mx-auto max-w-7xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <PageHeader
          kicker="Gallery"
          title="Το οπτικό αρχείο."
          lead="Από τη φυσική πρώτη ύλη ως το πιστοποιημένο εργαστήριο και το ράφι του φαρμακείου. Πατήστε μια εικόνα για πλήρη προβολή."
        />
      </header>

      <div className="mt-chapter">
        <GalleryGrid images={images} />
      </div>
    </div>
  );
}
