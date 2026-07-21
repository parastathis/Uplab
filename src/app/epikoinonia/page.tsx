import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import ContactMap from "@/components/contact/ContactMap";

export const metadata: Metadata = {
  title: "Επικοινωνία",
  description: "Επικοινωνήστε με την Uplab Pharmaceuticals — τηλέφωνο, email, διεύθυνση.",
};

const DETAILS = [
  { term: "Τηλέφωνο", node: <a className="link-underline text-ink hover:text-slate" href="tel:+302102844333">+30 210 28 44 333</a> },
  { term: "Fax", node: <span className="text-ink/75">+30 210 28 13 466</span> },
  { term: "Email", node: <a className="link-underline text-ink hover:text-slate" href="mailto:info@uplab.gr">info@uplab.gr</a> },
  {
    term: "Διεύθυνση",
    node: (
      <span className="leading-relaxed text-ink/75">
        10ο χλμ Ε.Ο. Αθηνών-Λαμίας
        <br />
        Μεταμόρφωση, Αττική 14452
      </span>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="bg-porcelain pt-[calc(var(--nav-h)+2rem)]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-chapter px-[clamp(1.2rem,4vw,4.5rem)] pb-act lg:grid-cols-[1fr_1.1fr]">
        <div>
          <PageHeader kicker="Επικοινωνία" title="Ας μιλήσουμε." />
          <Stagger as="dl" className="mt-chapter space-y-stanza text-[0.95rem]" gap={0.1}>
            {DETAILS.map((d) => (
              <StaggerItem key={d.term}>
                <dt className="caption-tag">{d.term}</dt>
                <dd className="mt-hair">{d.node}</dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <ContactForm />
      </div>

      <ContactMap />
    </div>
  );
}
