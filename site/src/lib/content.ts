// Typed access to the frozen crawl of uplab.gr (Step 0 research).
// Source of truth: content/uplab-source.json at repo root, copied here for bundling.
import source from './uplab-source.json';

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

export type NewsPost = {
  id: number;
  title: string;
  slug: string;
  oldPath: string;
  date: string;
  excerpt: string;
  body: string;
};

const unamp = (s: string) => s.replace(/&amp;/g, '&');

export const meta = source.meta;
export const contact = source.contact;
export const vision: string = source.vision;
export const companyTabs = source.companyTabs as Record<string, string>;
export const partners: string[] = source.partners;
export const trust = source.trustNumbers;
export const storeLocator = source.storeLocator;
export const catalog = source.catalog;
export const espa = source.espa;
export const certifications = source.certifications;
export const qualityPolicy = source.qualityPolicy;
export const jobs = source.jobs;

// '#<id>' = category ids the crawl could not resolve; 'χωρίς κατηγορία' = WP uncategorized
const junkCat = (c: string) => c === 'χωρίς κατηγορία' || /^#\d+$/.test(c);

export const products: Product[] = (source.products as Product[]).map(p => ({
  ...p,
  categories: p.categories.map(unamp).filter(c => !junkCat(c)),
  eofTags: p.eofTags.map(unamp).filter(c => !junkCat(c)),
}));

export const productsEn: Product[] = (source.productsEn as Product[]).map(p => ({
  ...p,
  categories: p.categories.map(unamp).filter(c => !junkCat(c) && c !== 'Uncategorized'),
  eofTags: p.eofTags.map(unamp).filter(c => !junkCat(c)),
}));

export const healthCategoriesEn: { name: string; count: number }[] = [
  ...new Set(productsEn.flatMap(p => p.categories)),
].sort((a, b) => a.localeCompare(b, 'en'))
  .map(name => ({ name, count: productsEn.filter(p => p.categories.includes(name)).length }));

export const productEnBySlug = (slug: string) =>
  productsEn.find(p => p.slug === decodeURIComponent(slug));

export const news: NewsPost[] = source.news as NewsPost[];
export const newsEn: NewsPost[] = source.newsEn as NewsPost[];

export const newProductNames: string[] = source.homepageNewProducts;
export const newProducts: Product[] = newProductNames
  .map(n => products.find(p => p.name === n))
  .filter((p): p is Product => !!p);

/** Health categories with live product counts (EOF regulatory classes kept separate). */
export const healthCategories: { name: string; count: number }[] = [
  ...new Set(products.flatMap(p => p.categories)),
].sort((a, b) => a.localeCompare(b, 'el'))
  .map(name => ({ name, count: products.filter(p => p.categories.includes(name)).length }));

export const eofCategories: { name: string; count: number }[] = [
  ...new Set(products.flatMap(p => p.eofTags)),
].sort((a, b) => a.localeCompare(b, 'el'))
  .map(name => ({ name, count: products.filter(p => p.eofTags.includes(name)).length }));

export const families: string[] = ['Femlab', 'Kidzlab'];

export const familyProducts = (fam: string) =>
  products.filter(p => p.family.includes(fam));

/** ASCII-safe slugs for routing; Greek product slugs stay as-is (Next handles UTF-8 routes). */
export const productBySlug = (slug: string) =>
  products.find(p => p.slug === decodeURIComponent(slug));

/** Body-map regions → health categories (only categories that exist in the data). */
export const bodyRegions: { id: string; label: string; cats: string[] }[] = [
  { id: 'head', label: 'Κεφάλι & Νους', cats: ['Νευρικό σύστημα', 'Ψυχική υγεία', 'Αϋπνία', 'Υγιή μάτια', 'Στοματική υγεία'] },
  { id: 'chest', label: 'Θώρακας', cats: ['Αναπνευστικό', 'Υγεία καρδιάς', 'Αλλεργίες'] },
  { id: 'core', label: 'Πεπτικό & Μεταβολισμός', cats: ['Γαστρεντερική υγεία', 'Ήπαρ', 'Έλεγχος βάρους', 'Ενίσχυση ανοσοποιητικού'] },
  { id: 'pelvis', label: 'Ουρογεννητικό', cats: ['Ουροποιητικό', 'Γυναικολογική φροντίδα', 'Σεξουαλική υγεία'] },
  { id: 'arms', label: 'Μύες & Αρθρώσεις', cats: ['Μυϊκό σύστημα', 'Οστά & αρθρώσεις', 'Ορθοπεδικό'] },
  { id: 'legs', label: 'Πόδια & Κυκλοφορικό', cats: ['Φλεβική υγεία', 'Υγιή πόδια', 'Ενέργεια & Τόνωση'] },
  { id: 'skin', label: 'Δέρμα & Προστασία', cats: ['Δέρμα', 'Αντηλιακά', 'Αντιμετώπιση τραυμάτων & πληγών', 'Αντισηπτικά - Βιοκτόνα', 'Εντομοαπωθητικά'] },
  { id: 'family', label: 'Οικογένεια', cats: ['Παιδική φροντίδα', 'Ναυτία ταξιδιού'] },
];

export const categoryCount = (cat: string) =>
  products.filter(p => p.categories.includes(cat)).length;
