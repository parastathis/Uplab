import Link from "next/link";
import { news } from "@/lib/data";
import NewsDisplayCards from "./NewsDisplayCards";
import { Reveal } from "@/components/ui/Reveal";

/** Τα νέα μας as a fanned display-card deck. */
export default function NewsFeature() {
  const items = news.slice(0, 3).map((n) => ({
    id: n.id,
    title: n.title,
    slug: n.slug,
    date: n.date,
    excerpt: n.excerpt,
  }));

  return (
    <section className="border-y border-ink/10 bg-bone py-act" aria-label="Τα νέα μας">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-chapter px-[clamp(1.2rem,4vw,4.5rem)] lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Reveal>
            <p className="caption-tag">Ενημέρωση</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display-lg mt-hair text-ink">Τα νέα μας</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-line max-w-[38ch] text-mist">
              Προϊόντα, εκθέσεις και ανακοινώσεις. Περάστε τον δείκτη πάνω από τη στοίβα για να ξεφυλλίσετε.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <Link href="/nea" className="btn-line mt-stanza text-ink">
              Όλα τα νέα
              <span className="btn-arrow" aria-hidden>→</span>
            </Link>
          </Reveal>
        </div>

        <NewsDisplayCards items={items} />
      </div>
    </section>
  );
}
