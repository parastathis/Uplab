import type { MetadataRoute } from "next";
import { news, products, productsEn } from "@/lib/data";

const BASE = "https://uplab.gr";

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = [
    "",
    "/proionta",
    "/etaireia",
    "/nea",
    "/simeia-polisis",
    "/epikoinonia",
    "/synergasia",
    "/katalogos",
    "/politiki-poiotitas",
    "/theseis-ergasias",
    "/politiki-aporritou",
    "/politiki-cookies",
    "/espa",
    "/en",
    "/en/products",
  ].map((p) => ({ url: `${BASE}${p}`, lastModified: new Date() }));

  const productUrls = products.map((p) => ({
    url: `${BASE}/proionta/${p.slug}`,
    lastModified: new Date(p.date),
  }));
  const productEnUrls = productsEn.map((p) => ({
    url: `${BASE}/en/products/${p.slug}`,
    lastModified: new Date(p.date),
  }));
  const newsUrls = news.map((n) => ({
    url: `${BASE}/nea/${encodeURIComponent(n.slug)}`,
    lastModified: new Date(n.date),
  }));

  return [...statics, ...productUrls, ...productEnUrls, ...newsUrls];
}
