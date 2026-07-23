import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import Manifesto from "@/components/home/Manifesto";
import Pillars from "@/components/home/Pillars";
import NatureToScience from "@/components/home/NatureToScience";
import BodyMap from "@/components/home/BodyMap";
import NewProducts from "@/components/home/NewProducts";
import Triptych from "@/components/home/Triptych";
import GalleryAccordion from "@/components/home/GalleryAccordion";
import NewsFeature from "@/components/home/NewsFeature";
import Finale from "@/components/home/Finale";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Manifesto />
      <Pillars />
      <NatureToScience />
      <BodyMap />
      <NewProducts />
      <Triptych />
      <GalleryAccordion />
      <NewsFeature />
      <Finale />
    </>
  );
}
