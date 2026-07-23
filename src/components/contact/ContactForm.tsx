"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";

const EASE = [0.22, 1, 0.36, 1] as const;

/** mailto-backed form: no backend yet — submit opens a prefilled email.
 *  Fields carry an animated focus underline; the panel reveals on scroll. */
export default function ContactForm() {
  const reduce = useReducedMotion();
  const [focused, setFocused] = useState<string | null>(null);

  const field = (name: string, label: string, multiline = false) => (
    <label className="block">
      <span className="text-[0.82rem] text-mist">{label}</span>
      <div className="relative mt-hair">
        {multiline ? (
          <textarea
            name={name}
            rows={6}
            required
            onFocus={() => setFocused(name)}
            onBlur={() => setFocused(null)}
            className="w-full resize-none border-b border-ink/20 bg-transparent py-breath text-ink outline-none"
          />
        ) : (
          <input
            name={name}
            required
            onFocus={() => setFocused(name)}
            onBlur={() => setFocused(null)}
            className="w-full border-b border-ink/20 bg-transparent py-breath text-ink outline-none"
          />
        )}
        <motion.span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left bg-ink"
          initial={false}
          animate={{ scaleX: focused === name ? 1 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        />
      </div>
    </label>
  );

  return (
    <motion.form
      action="mailto:info@uplab.gr"
      method="get"
      className="border border-ink/10 bg-bone p-stanza"
      style={{ borderRadius: "0.5rem 2.4rem 0.5rem 0.5rem" }}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <p className="caption-tag">Φόρμα μηνύματος</p>
      <div className="mt-line space-y-line">
        {field("subject", "Θέμα")}
        {field("body", "Μήνυμα", true)}
      </div>
      <Magnetic strength={0.4}>
        <button
          type="submit"
          className="btn-solid mt-stanza"
          style={{ fontWeight: 560 }}
        >
          Αποστολή μέσω email
        </button>
      </Magnetic>
      <p className="mt-line text-[0.72rem] text-mist">
        Η φόρμα ανοίγει το πρόγραμμα email σας — δεν αποθηκεύουμε δεδομένα στον ιστότοπο.
      </p>
    </motion.form>
  );
}
