import Link from "next/link";
import type { Metadata } from "next";
import { productsEn, trust } from "@/lib/data";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import AnimatedNumber from "@/components/ui/AnimatedNumber";
import TiltCard from "@/components/ui/TiltCard";

export const metadata: Metadata = {
  title: "Uplab Pharmaceuticals — Nature & Science in Balance",
  description:
    "Behind the UPLAB brand stands a modern GMP pharmaceutical production facility. Health products available exclusively through pharmacies in Greece.",
  alternates: { canonical: "/en", languages: { el: "/", en: "/en" } },
};

const STATS = [
  { value: trust.products, suffix: "", l: "health products (GR catalogue)" },
  { value: trust.categories, suffix: "", l: "health categories" },
  { value: trust.partners, suffix: "", l: "exclusive European partners" },
  { value: trust.pharmacies, suffix: "+", l: "pharmacy sale points" },
];

export default function EnHome() {
  const featured = productsEn.slice(0, 8);
  return (
    <div className="bg-porcelain">
      <section className="relative flex h-[72dvh] items-end overflow-hidden bg-sky" aria-label="Uplab Pharmaceuticals">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/hero-still.png" alt="" className="absolute inset-0 h-full w-full scale-105 object-cover" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-[30vh] bg-gradient-to-b from-ink/35 to-transparent" aria-hidden />
        <div className="relative z-10 w-full px-[clamp(1.2rem,4vw,4.5rem)] pb-verse">
          <Reveal y={40} duration={1}>
            <h1 className="display-xl logo-type text-porcelain">UPLAB</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-breath max-w-[38ch] font-display italic text-porcelain/85">
              The absolute natural balance between people and their environment — elements connected,
              both ways, with health.
            </p>
          </Reveal>
        </div>
      </section>

      <Stagger as="section" className="mx-auto grid max-w-6xl grid-cols-2 gap-verse px-[clamp(1.2rem,4vw,4.5rem)] py-chapter md:grid-cols-4" aria-label="Uplab in numbers" gap={0.1}>
        {STATS.map((s) => (
          <StaggerItem key={s.l}>
            <p className="display-lg text-ink">
              <AnimatedNumber value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-hair max-w-[16ch] text-[0.85rem] text-mist">{s.l}</p>
          </StaggerItem>
        ))}
      </Stagger>

      <section className="mx-auto max-w-6xl px-[clamp(1.2rem,4vw,4.5rem)] pb-act" aria-label="Featured products">
        <Reveal className="flex items-baseline justify-between">
          <h2 className="display-md text-ink">Products</h2>
          <Link href="/en/products" className="group inline-flex items-center gap-2 text-[0.85rem] text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-current">
            All products
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
          </Link>
        </Reveal>
        <Stagger as="ul" className="mt-verse grid grid-cols-2 gap-x-line gap-y-verse md:grid-cols-4" gap={0.06}>
          {featured.map((p) => (
            <li key={p.id}>
              <TiltCard href={`/en/products/${p.slug}`} className="group" tilt={7}>
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={p.imageAlt || p.name} loading="lazy" className="aspect-square w-full rounded-[0.4rem] border border-ink/8 object-cover transition-transform duration-500 group-hover:scale-[1.06]" />
                ) : (
                  <div className="flex aspect-square items-center justify-center rounded-[0.4rem] bg-bone font-display italic text-sage/60">U</div>
                )}
                <h3 className="mt-breath text-[0.9rem] text-ink group-hover:text-slate">{p.name}</h3>
              </TiltCard>
            </li>
          ))}
        </Stagger>
      </section>
    </div>
  );
}
