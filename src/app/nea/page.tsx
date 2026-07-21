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

export default function NewsPage() {
  return (
    <div className="bg-porcelain pt-[calc(var(--nav-h)+2rem)]">
      <header className="mx-auto max-w-5xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <PageHeader kicker="Ενημέρωση" title="Τα νέα μας" />
      </header>

      <Stagger as="ol" className="mx-auto mt-chapter max-w-5xl divide-y divide-ink/8 px-[clamp(1.2rem,4vw,4.5rem)] pb-act" gap={0.06}>
        {news.map((n) => (
          <StaggerItem as="li" key={n.id}>
            <Link href={`/nea/${encodeURIComponent(n.slug)}`} className="group grid grid-cols-1 gap-breath py-stanza md:grid-cols-[11rem_1fr] md:gap-verse">
              <time dateTime={n.date} className="text-[0.82rem] text-mist transition-colors duration-300 group-hover:text-slate">{fmtDate(n.date)}</time>
              <div>
                <h2 className="font-display text-[clamp(1.15rem,2.1vw,1.6rem)] leading-snug text-ink transition-colors duration-300 group-hover:text-slate">
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
