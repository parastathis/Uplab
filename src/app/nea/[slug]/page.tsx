import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { news } from "@/lib/data";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const n = news.find((x) => x.slug === decodeURIComponent(slug));
  if (!n) return {};
  return { title: n.title, description: n.excerpt.slice(0, 158) };
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("el-GR", { day: "numeric", month: "long", year: "numeric" });

export default async function NewsArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === decodeURIComponent(slug));
  if (!item) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: item.title,
    datePublished: item.date,
    publisher: { "@type": "Organization", name: "Uplab Pharmaceuticals" },
  };

  const paras = item.body.split("\n").filter(Boolean);

  return (
    <article className="bg-porcelain pt-[calc(var(--nav-h)+2rem)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-3xl px-[clamp(1.2rem,4vw,4.5rem)] pb-act">
        <nav aria-label="Breadcrumb" className="text-[0.78rem] text-mist">
          <Link href="/" className="link-underline hover:text-slate">Αρχική</Link>
          <span aria-hidden> / </span>
          <Link href="/nea" className="link-underline hover:text-slate">Νέα</Link>
        </nav>
        <Reveal>
          <time dateTime={item.date} className="mt-chapter block text-[0.82rem] text-mist">{fmtDate(item.date)}</time>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="display-md mt-breath text-ink">{item.title}</h1>
        </Reveal>
        <Stagger className="mt-verse space-y-line" gap={0.05}>
          {paras.map((p, i) => (
            <StaggerItem key={i}>
              <p className="text-[1rem] leading-[1.85] text-ink/80">{p}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-act">
          <Link href="/nea" className="group inline-flex items-center gap-2 text-[0.85rem] text-ink">
            <span className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden>←</span>
            Όλα τα νέα
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
