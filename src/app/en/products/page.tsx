import type { Metadata } from "next";
import { productsEn } from "@/lib/data";
import PageHeader from "@/components/ui/PageHeader";
import ProductGrid from "@/components/products/ProductGrid";

export const metadata: Metadata = {
  title: "Products — Uplab Pharmaceuticals",
  description:
    "Uplab health products available in English — the international subset of the full Greek catalogue. Sold exclusively through pharmacies.",
  alternates: { canonical: "/en/products", languages: { el: "/proionta", en: "/en/products" } },
};

export default function EnProducts() {
  return (
    <div className="bg-porcelain pt-[calc(var(--nav-h)+2rem)]">
      <header className="mx-auto max-w-7xl px-[clamp(1.2rem,4vw,4.5rem)]">
        <PageHeader
          kicker="Catalogue"
          title="Products"
          lead={`${productsEn.length} products available in English — sold exclusively through pharmacies. The full Greek catalogue lists 76 products.`}
        />
      </header>

      <ProductGrid products={productsEn} filterKey="en-all" hrefBase="/en/products" />
    </div>
  );
}
