"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import GradientScrollText from "@/components/ui/GradientScrollText";

/**
 * «Η Ισορροπία» — replaces the old drag-slider comparison. A single cinematic
 * macro (natural source resolving into a finished capsule) reveals on scroll:
 * the frame wipes open, the image drifts and settles, and the statement fills
 * in word by word. Two quiet labels mark the two worlds — φύση and επιστήμη.
 */
export default function NatureToScience() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // slow vertical parallax on the image inside its frame
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.12, 1]);

  return (
    <section className="bg-porcelain py-act" aria-label="Φύση και επιστήμη σε ισορροπία">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-chapter px-[clamp(1.2rem,4vw,4.5rem)] lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <Reveal>
            <p className="caption-tag">Η Ισορροπία</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="display-lg mt-hair max-w-[14ch] text-ink">Από τη φύση, στο σκεύασμα.</h2>
          </Reveal>
          <GradientScrollText
            text="Κάθε σκεύασμα ξεκινά από μια φυσική πρώτη ύλη και ολοκληρώνεται σε πιστοποιημένο εργαστήριο GMP — δύο κόσμοι, μία ισορροπία."
            className="mt-stanza max-w-[42ch] text-[1.05rem] leading-[1.7]"
          />
          <div className="mt-stanza flex items-center gap-verse">
            <div>
              <p className="caption-tag !text-slate">Φύση</p>
              <p className="mt-hair text-[0.9rem] text-mist">Η πρώτη ύλη</p>
            </div>
            <span aria-hidden className="h-8 w-px bg-ink/15" />
            <div>
              <p className="caption-tag !text-slate">Επιστήμη</p>
              <p className="mt-hair text-[0.9rem] text-mist">Το πιστοποιημένο εργαστήριο</p>
            </div>
          </div>
        </div>

        <div ref={ref}>
          <motion.figure
            className="relative aspect-[16/10] w-full overflow-hidden rounded-[6px] border border-ink/10 shadow-[0_40px_80px_-50px_rgba(28,43,58,0.6)]"
            initial={reduce ? false : { clipPath: "inset(12% 12% 12% 12% round 6px)", opacity: 0.4 }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 6px)", opacity: 1 }}
            viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div className="absolute inset-0" style={{ y, scale }}>
              <Image
                src="/media/nature-formulation.png"
                alt="Ένα διάφανο κεχριμπαρένιο σκεύασμα πάνω σε φυσική κηρήθρα — από τη φύση στο εργαστήριο"
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </motion.div>
            <figcaption className="absolute bottom-4 left-4 rounded-[3px] bg-ink/70 px-3 py-1 text-[0.7rem] uppercase tracking-[0.16em] text-porcelain backdrop-blur">
              Φύση &amp; Επιστήμη
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
