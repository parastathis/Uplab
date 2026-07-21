"use client";

import { useEffect } from "react";

/** EN subtree: flips the document language (single root layout owns <html>). */
export default function EnLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = "en";
    return () => {
      document.documentElement.lang = "el";
    };
  }, []);
  return <>{children}</>;
}
