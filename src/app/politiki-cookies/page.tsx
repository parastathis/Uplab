import type { Metadata } from "next";
import ProsePage from "@/components/layout/ProsePage";
import { pageGr } from "@/lib/data";

export const metadata: Metadata = {
  title: "Πολιτική για τα cookies",
  description: "Η πολιτική cookies του ιστοτόπου της Uplab ΕΠΕ.",
};

export default function CookiesPage() {
  const page = pageGr("πολιτική-για-τα-cookies");
  return <ProsePage kicker="Νομικά" title={page?.title ?? "Πολιτική για τα cookies"} text={page?.text} />;
}
