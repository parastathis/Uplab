import source from "./uplab-source.json";

export type Product = {
  id: number;
  name: string;
  slug: string;
  oldPath: string;
  oldPathEncoded: string;
  date: string;
  categories: string[];
  eofTags: string[];
  family: string[];
  image: string | null;
  imageAlt: string;
  excerpt: string;
  description: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  count: number;
  oldPath: string;
  description: string;
};

export type NewsItem = {
  id: number;
  title: string;
  slug: string;
  oldPath: string;
  date: string;
  excerpt: string;
  body: string;
};

const src = source as unknown as {
  contact: Record<string, unknown>;
  vision: string;
  partners: string[];
  trustNumbers: Record<string, number | string>;
  categoriesHealth: Category[];
  categoriesEOF: Category[];
  products: Product[];
  news: NewsItem[];
  homepageNewProducts: string[];
  productFamilies: { id: number; name: string; slug: string; count: number }[];
  companyTabs: Record<string, string>;
};

const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/<[^>]+>/g, "");

export const vision = src.vision;
export const partners = src.partners;
export const contact = src.contact;
export const companyTabs = src.companyTabs;

export const trust = {
  products: 76,
  categories: 27,
  partners: 10,
  pharmacies: 2075,
};

export const healthCategories: Category[] = src.categoriesHealth
  .map((c) => ({ ...c, name: decode(c.name) }))
  .filter((c) => c.name !== "χωρίς κατηγορία");

export const eofCategories: Category[] = src.categoriesEOF.map((c) => ({ ...c, name: decode(c.name) }));

export const products: Product[] = src.products;

export const productByName = (name: string) =>
  src.products.find((p) => p.name.toLowerCase() === name.toLowerCase());

export const newProducts: Product[] = src.homepageNewProducts
  .map((n) => productByName(n))
  .filter((p): p is Product => Boolean(p));

export const news: NewsItem[] = src.news.map((n) => ({ ...n, title: decode(n.title) }));

export const families = src.productFamilies;

export const productsByFamily = (slug: string) =>
  src.products.filter((p) => p.family?.some((f) => f.toLowerCase() === slug.toLowerCase()));

/** Body-map regions: health categories grouped by body area, counts from the live taxonomy */
export const bodyRegions: {
  id: string;
  label: string;
  /** anchor on the silhouette, in a 0–100 × 0–100 viewBox */
  cx: number;
  cy: number;
  categories: string[];
}[] = [
  { id: "head", label: "Κεφάλι & Νους", cx: 50, cy: 8, categories: ["Υγιή μάτια", "Στοματική υγεία", "Αϋπνία", "Ψυχική υγεία", "Νευρικό σύστημα"] },
  { id: "chest", label: "Αναπνοή & Καρδιά", cx: 50, cy: 26, categories: ["Αναπνευστικό", "Αλλεργίες", "Υγεία καρδιάς"] },
  { id: "gut", label: "Πεπτικό", cx: 50, cy: 40, categories: ["Γαστρεντερική υγεία", "Ήπαρ", "Έλεγχος βάρους", "Ναυτία ταξιδιού"] },
  { id: "immune", label: "Άμυνα & Ενέργεια", cx: 28, cy: 30, categories: ["Ενίσχυση ανοσοποιητικού", "Ενέργεια & Τόνωση"] },
  { id: "skin", label: "Δέρμα", cx: 72, cy: 34, categories: ["Δέρμα", "Αντηλιακά", "Αντιμετώπιση τραυμάτων & πληγών", "Εντομοαπωθητικά", "Αντισηπτικά - Βιοκτόνα"] },
  { id: "pelvis", label: "Γυναικεία & Ουροποιητικό", cx: 50, cy: 52, categories: ["Γυναικολογική φροντίδα", "Ουροποιητικό"] },
  { id: "limbs", label: "Οστά, Μύες & Κυκλοφορία", cx: 38, cy: 72, categories: ["Οστά & αρθρώσεις", "Μυϊκό σύστημα", "Ορθοπεδικό", "Φλεβική υγεία"] },
  { id: "child", label: "Παιδική φροντίδα", cx: 66, cy: 62, categories: ["Παιδική φροντίδα"] },
];

export const categoryByName = (name: string) => healthCategories.find((c) => c.name === name);

/* ————— static pages, EN subset, SEO sources ————— */

type PageRec = { id: number; title: string; slug: string; oldPath: string; text: string };

const srcFull = source as unknown as {
  pagesGr: PageRec[];
  pagesEn: PageRec[];
  qualityPolicy: PageRec;
  jobs: PageRec;
  catalog: { title: string; pdf: string };
  certifications: { images: string[] };
  productsEn: Product[];
  newsEn: NewsItem[];
  allUrls: { encoded: string; decoded: string }[];
  categoriesHealthEn?: Category[];
};

export const pageGr = (slug: string) => srcFull.pagesGr.find((p) => p.slug === slug);
export const pageEn = (slug: string) => srcFull.pagesEn.find((p) => p.slug === slug);
export const qualityPolicy = srcFull.qualityPolicy;
export const jobs = srcFull.jobs;
export const catalog = srcFull.catalog;
export const certifications = srcFull.certifications;
export const productsEn = srcFull.productsEn;
export const allUrls = srcFull.allUrls;
