"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/** Kidzlab / Femlab / Anagent — three micro-worlds. Kidzlab is allowed to be playful. */
const WORLDS = [
  {
    slug: "kidzlab",
    title: "Kidzlab",
    kicker: "Για μικρούς ήρωες",
    text: "Η παιδική σειρά της Uplab — γευστικά σκευάσματα σχεδιασμένα για την καθημερινή φροντίδα των παιδιών.",
    href: "/proionta?seira=kidzlab",
    bg: "bg-[#f4e9d8]",
    accent: "text-[#8f5312]",
    playful: true,
  },
  {
    slug: "femlab",
    title: "Femlab",
    kicker: "Γυναικεία φροντίδα",
    text: "Στοχευμένη σειρά για τη γυναικολογική υγεία, με σεβασμό στη φυσιολογία κάθε ηλικίας.",
    href: "/proionta?seira=femlab",
    bg: "bg-[#eee7ea]",
    accent: "text-[#8a4a5e]",
    playful: false,
  },
  {
    slug: "anagent",
    title: "Anagent",
    kicker: "Στοχευμένη αναγέννηση",
    text: "Το εξειδικευμένο σκεύασμα της Uplab για την υποστήριξη της φυσικής αναγέννησης του οργανισμού.",
    href: "/proionta/anagent",
    bg: "bg-[#e6eae4]",
    accent: "text-[#4c6a51]",
    playful: false,
  },
];

export default function Triptych() {
  return (
    <section className="bg-porcelain py-chapter" aria-label="Οι σειρές μας">
      <div className="mx-auto max-w-7xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <p className="caption-tag">Μικρόκοσμοι</p>
        <div className="mt-stanza grid grid-cols-1 gap-line md:grid-cols-3">
          {WORLDS.map((w, i) => (
            <motion.div
              key={w.slug}
              initial={{ opacity: 0, y: 42 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.23, 1, 0.32, 1] }}
              className={i === 1 ? "md:mt-verse" : ""}
            >
              <Link
                href={w.href}
                className={`group block h-full overflow-hidden ${w.bg} p-stanza transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-2`}
                style={{ borderRadius: i === 0 ? "2.6rem 0.5rem 2.6rem 0.5rem" : "0.5rem" }}
              >
                <p className={`caption-tag ${w.accent}`}>{w.kicker}</p>
                <h3
                  className={`mt-line font-display text-[clamp(1.7rem,3vw,2.5rem)] text-ink ${w.playful ? "rotate-[-1.5deg]" : ""} transition-transform duration-500 group-hover:rotate-0`}
                  style={{ fontWeight: w.playful ? 700 : 400 }}
                >
                  {w.title}
                </h3>
                <p className="mt-line text-[0.92rem] leading-relaxed text-ink/70">{w.text}</p>
                <span className="mt-stanza inline-block text-[0.82rem] text-ink underline decoration-transparent underline-offset-4 transition-colors duration-300 group-hover:decoration-current">
                  Δείτε τη σειρά →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
