"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { getLenis } from "@/lib/lenis";

const EASE = [0.22, 1, 0.36, 1] as const;

const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-").replace(/[^\p{L}\p{N}-]/gu, "");

/**
 * Editorial long-read with a scroll-spy index. The active section highlights
 * in the sticky rail; clicking an entry smooth-scrolls via Lenis. Each section
 * reveals as it enters. Partners cascade in on the «Οι συνεργάτες μας» block.
 */
export default function CompanyReader({
  tabs,
  partners,
}: {
  tabs: [string, string][];
  partners: string[];
}) {
  const [active, setActive] = useState(slugify(tabs[0]?.[0] ?? ""));
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = tabs
      .map(([name]) => document.getElementById(slugify(name)))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        // pick the entry nearest the top that is intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [tabs]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, name: string) => {
    e.preventDefault();
    const el = document.getElementById(slugify(name));
    if (!el) return;
    const offset = -100;
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el, { offset });
    } else {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setActive(slugify(name));
  };

  return (
    <div
      ref={containerRef}
      className="mx-auto mt-chapter grid max-w-6xl grid-cols-1 gap-chapter px-[clamp(1.2rem,4vw,4.5rem)] pb-act lg:grid-cols-[15rem_1fr]"
    >
      <nav aria-label="Ενότητες" className="lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)] lg:self-start">
        <ol className="space-y-breath border-l border-ink/12 pl-line text-[0.85rem]">
          {tabs.map(([name], i) => {
            const id = slugify(name);
            const on = active === id;
            return (
              <li key={name} className="relative">
                {on && !reduce && (
                  <motion.span
                    layoutId="company-marker"
                    className="absolute -left-[calc(1rem+1px)] top-1/2 h-4 w-[2px] -translate-y-1/2 bg-amber"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    aria-hidden
                  />
                )}
                <a
                  href={`#${id}`}
                  onClick={(e) => go(e, name)}
                  aria-current={on ? "true" : undefined}
                  className={`inline-flex items-baseline gap-2 transition-colors duration-300 ${
                    on ? "text-ink" : "text-mist hover:text-slate"
                  }`}
                >
                  <span className="font-display text-[0.75rem] italic text-mist">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {name}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="max-w-[64ch]">
        {tabs.map(([name, text], i) => (
          <section key={name} id={slugify(name)} className={i > 0 ? "mt-act" : ""} aria-label={name}>
            <Reveal>
              <span className="caption-tag">{String(i + 1).padStart(2, "0")}</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="display-md mt-hair text-ink">{name}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-line text-[1rem] leading-[1.85] text-ink/80">{text}</p>
            </Reveal>
            {name === "Οι συνεργάτες μας" && (
              <motion.ul
                className="mt-stanza flex flex-wrap gap-x-line gap-y-breath"
                aria-label="Αποκλειστικοί συνεργάτες"
                initial={reduce ? false : "hidden"}
                whileInView="show"
                viewport={{ once: true, margin: "-10%" }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
              >
                {partners.map((p) => (
                  <motion.li
                    key={p}
                    variants={
                      reduce
                        ? undefined
                        : {
                            hidden: { opacity: 0, y: 14 },
                            show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                          }
                    }
                    className="font-display text-[1.05rem] italic text-ink/55 transition-colors duration-500 hover:text-slate"
                  >
                    {p}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
