import Link from "next/link";
import { news } from "@/lib/data";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("el-GR", { day: "numeric", month: "long", year: "numeric" });

/** Editorial news strip — real timeline from Νέα, revealed on scroll. */
export default function NewsStrip() {
  const items = news.slice(0, 4);
  return (
    <section className="border-y border-ink/10 bg-bone py-chapter" aria-label="Τα νέα μας">
      <div className="mx-auto max-w-6xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <Reveal className="flex items-baseline justify-between gap-line">
          <h2 className="display-md text-ink">Τα νέα μας</h2>
          <Link href="/nea" className="group inline-flex items-center gap-2 text-[0.85rem] text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-current">
            Όλα τα νέα
            <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
          </Link>
        </Reveal>

        <Stagger as="ol" className="mt-verse divide-y divide-ink/8" gap={0.08}>
          {items.map((n) => (
            <StaggerItem as="li" key={n.id}>
              <Link href={`/nea/${encodeURIComponent(n.slug)}`} className="group grid grid-cols-1 gap-breath py-line md:grid-cols-[10rem_1fr] md:gap-verse">
                <time dateTime={n.date} className="text-[0.8rem] text-mist transition-colors duration-300 group-hover:text-slate">
                  {fmtDate(n.date)}
                </time>
                <div>
                  <h3 className="subhead text-[clamp(1.05rem,1.8vw,1.4rem)] text-ink transition-colors duration-300 group-hover:text-slate">
                    {n.title}
                  </h3>
                  <p className="mt-hair line-clamp-2 max-w-[68ch] text-[0.88rem] text-mist">{n.excerpt}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
