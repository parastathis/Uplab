import Link from "next/link";
import type { Metadata } from "next";
import { news } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Νέα",
  description: "Τα νέα της Uplab Pharmaceuticals — προϊόντα, εκθέσεις και ανακοινώσεις.",
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("el-GR", { day: "numeric", month: "long", year: "numeric" });

// decorative imagery (real + generated) cycled across the news cards
const IMGS = [
  "/media/gallery/gen-production.png",
  "/media/gallery/gen-hands-capsule.png",
  "/media/gallery/who-we-are.jpg",
  "/media/gallery/gen-botanical.png",
  "/media/gallery/human_healthcare.jpg",
  "/media/gallery/gen-quality.png",
  "/media/gallery/our_people-scaled.jpg",
  "/media/nature-formulation.png",
  "/media/gallery/pharmacy-scaled.jpg",
  "/media/gallery/our_vision.jpg",
];

export default function NewsPage() {
  return (
    <div className="bg-porcelain pt-[calc(var(--nav-h)+2rem)]">
      <header className="mx-auto max-w-5xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <PageHeader kicker="Ενημέρωση" title="Τα νέα μας" />
      </header>

      <Stagger as="ol" className="mx-auto mt-chapter max-w-5xl divide-y divide-ink/8 px-[clamp(1.2rem,4vw,4.5rem)] pb-act" gap={0.06}>
        {news.map((n, i) => (
          <StaggerItem as="li" key={n.id}>
            <Link href={`/nea/${encodeURIComponent(n.slug)}`} className="group grid grid-cols-1 gap-breath py-stanza md:grid-cols-[15rem_1fr] md:gap-verse">
              <div className="overflow-hidden rounded-[6px] border border-ink/8 bg-bone">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={IMGS[i % IMGS.length]}
                  alt=""
                  loading="lazy"
                  aria-hidden
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.05]"
                />
              </div>
              <div>
                <time dateTime={n.date} className="caption-tag !font-normal !tracking-[0.14em] text-mist transition-colors duration-300 group-hover:text-slate">
                  {fmtDate(n.date)}
                </time>
                <h2 className="mt-breath font-display text-[clamp(1.15rem,2.1vw,1.6rem)] leading-snug text-ink transition-colors duration-300 group-hover:text-slate">
                  {n.title}
                </h2>
                <p className="mt-breath max-w-[68ch] text-[0.9rem] leading-relaxed text-mist">{n.excerpt}</p>
                <span className="mt-breath inline-flex items-center gap-2 text-[0.8rem] text-ink opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Διαβάστε <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
