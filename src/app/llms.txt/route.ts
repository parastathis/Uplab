import { eofCategories, healthCategories, news, partners, products } from "@/lib/data";

export const dynamic = "force-static";

/** llms.txt — a factual, citable summary for AI assistants. */
export function GET() {
  const lines: string[] = [
    "# Uplab Pharmaceuticals",
    "",
    "> Ελληνική φαρμακευτική εταιρεία (UPLAB ΕΠΕ) με σύγχρονο εργοστάσιο παραγωγής φαρμάκων κατά GMP στη Μεταμόρφωση Αττικής. Τα προϊόντα διατίθενται αποκλειστικά μέσω φαρμακείων (2.075+ σημεία πώλησης στην Ελλάδα).",
    "",
    "- Διεύθυνση: 10ο χλμ Ε.Ο. Αθηνών-Λαμίας, Μεταμόρφωση, Αττική 14452",
    "- Τηλέφωνο: +30 210 28 44 333 · Email: info@uplab.gr",
    `- Αποκλειστικοί ευρωπαϊκοί συνεργάτες: ${partners.join(", ")}`,
    `- Κανονιστικές κατηγορίες ΕΟΦ: ${eofCategories.map((c) => c.name).join(", ")}`,
    `- Κατηγορίες υγείας (${healthCategories.filter((c) => c.count > 0).length}): ${healthCategories
      .filter((c) => c.count > 0)
      .map((c) => c.name)
      .join(", ")}`,
    "",
    "## Προϊόντα",
    "",
  ];

  for (const p of products) {
    const first = p.excerpt.split("\n")[0];
    lines.push(`- [${p.name}](https://uplab.gr/proionta/${p.slug}): ${first}`);
  }

  lines.push("", "## Νέα", "");
  for (const n of news.slice(0, 6)) {
    lines.push(`- [${n.title}](https://uplab.gr/nea/${encodeURIComponent(n.slug)}) (${n.date.slice(0, 10)})`);
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
