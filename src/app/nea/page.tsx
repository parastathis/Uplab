import Link from "next/link";
import type { Metadata } from "next";
import { news } from "@/lib/data";

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
        <p className="caption-tag">Ενημέρωση</p>
        <h1 className="display-lg mt-hair text-ink">Τα νέα μας</h1>
      </header>

      <ol className="mx-auto mt-chapter max-w-5xl divide-y divide-ink/8 px-[clamp(1.2rem,4vw,4.5rem)] pb-act">
        {news.map((n) => (
          <li key={n.id}>
            <Link href={`/nea/${encodeURIComponent(n.slug)}`} className="group grid grid-cols-1 gap-breath py-stanza md:grid-cols-[11rem_1fr] md:gap-verse">
              <time dateTime={n.date} className="text-[0.82rem] text-mist">{fmtDate(n.date)}</time>
              <div>
                <h2
                  className="font-display text-[clamp(1.15rem,2.1vw,1.6rem)] leading-snug text-ink transition-colors duration-300 group-hover:text-slate"
                >
                  {n.title}
                </h2>
                <p className="mt-breath max-w-[68ch] text-[0.9rem] leading-relaxed text-mist">{n.excerpt}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
