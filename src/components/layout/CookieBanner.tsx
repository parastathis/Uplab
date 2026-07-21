"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "uplab-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    localStorage.setItem(KEY, value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          role="dialog"
          aria-label="Συγκατάθεση cookies"
          className="fixed bottom-line left-line z-50 max-w-sm rounded-lg border border-ink/10 bg-porcelain/90 p-line shadow-[0_8px_40px_rgba(27,42,58,0.16)] backdrop-blur-xl"
        >
          <p className="text-[0.82rem] leading-relaxed text-ink/80">
            Χρησιμοποιούμε cookies για τη μέτρηση της επισκεψιμότητας. Μπορείτε να τα αποδεχθείτε ή να τα
            απορρίψετε — το site λειτουργεί το ίδιο και στις δύο περιπτώσεις.
          </p>
          <div className="mt-line grid grid-cols-2 gap-breath">
            {/* equal prominence by design — GDPR */}
            <button
              onClick={() => decide("rejected")}
              className="rounded-full border border-ink/25 px-4 py-2 text-[0.8rem] text-ink transition-colors hover:bg-ink hover:text-porcelain"
            >
              Απόρριψη όλων
            </button>
            <button
              onClick={() => decide("accepted")}
              className="rounded-full border border-ink/25 px-4 py-2 text-[0.8rem] text-ink transition-colors hover:bg-ink hover:text-porcelain"
            >
              Αποδοχή όλων
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
