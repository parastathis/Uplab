import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import Pillars from "@/components/home/Pillars";
import BalanceCompare from "@/components/home/BalanceCompare";
import BodyMap from "@/components/home/BodyMap";
import NewProducts from "@/components/home/NewProducts";
import Triptych from "@/components/home/Triptych";
import Partners from "@/components/home/Partners";
import NewsFeature from "@/components/home/NewsFeature";
import Finale from "@/components/home/Finale";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Pillars />
      <BalanceCompare />
      <BodyMap />
      <NewProducts />
      <Triptych />
      <Partners />
      <NewsFeature />
      <Finale />
    </>
  );
}
