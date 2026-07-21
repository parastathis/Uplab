import type { Metadata } from "next";
import ProsePage from "@/components/layout/ProsePage";
import { jobs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Θέσεις εργασίας",
  description: "Ανοιχτές θέσεις εργασίας στην Uplab Pharmaceuticals.",
};

export default function JobsPage() {
  return (
    <ProsePage kicker="Καριέρα" title={jobs.title} text={jobs.text}>
      <p className="mt-chapter text-[0.9rem] text-mist">
        Αποστολή βιογραφικών: <a className="text-ink underline decoration-ink/30 hover:decoration-current" href="mailto:info@uplab.gr">info@uplab.gr</a>
      </p>
    </ProsePage>
  );
}
