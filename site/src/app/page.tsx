import { Hero } from '@/components/Hero';
import { TrustStrip } from '@/components/TrustStrip';
import { Pillars } from '@/components/Pillars';
import { BodyMap } from '@/components/BodyMap';
import { NewProducts } from '@/components/NewProducts';
import { Triptych } from '@/components/Triptych';
import { NewsStrip } from '@/components/NewsStrip';
import { Finale } from '@/components/Finale';

/* Homepage — 8 scroll chapters, per the "Η Ισορροπία" creative direction. */
export default function Home() {
  return (
    <>
      <Hero />          {/* 1 — hero orbit scrub */}
      <TrustStrip />    {/* 2 — count-up, real numbers only */}
      <Pillars />       {/* 3 — ΠΑΡΑΓΟΥΜΕ / ΕΠΙΛΕΓΟΥΜΕ / ΔΙΑΚΙΝΟΥΜΕ over factory clip */}
      <BodyMap />       {/* 4 — body-map product finder */}
      <NewProducts />   {/* 5 — horizontal 3D-tilt gallery */}
      <Triptych />      {/* 6 — KidzLab / FemLab / Anagent micro-worlds */}
      <NewsStrip />     {/* 7 — editorial news strip */}
      <Finale />        {/* 8 — consumer + B2B split */}
    </>
  );
}
