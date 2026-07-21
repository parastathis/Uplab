import type { Metadata } from "next";
import ProsePage from "@/components/layout/ProsePage";
import { pageGr } from "@/lib/data";

export const metadata: Metadata = {
  title: "Πολιτική απορρήτου",
  description: "Η πολιτική απορρήτου και προστασίας προσωπικών δεδομένων της Uplab ΕΠΕ.",
};

export default function PrivacyPage() {
  const page = pageGr("πολιτική-απορρήτου");
  return <ProsePage kicker="Νομικά" title={page?.title ?? "Πολιτική απορρήτου"} text={page?.text} />;
}
