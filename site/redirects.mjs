/**
 * 301 map: every old percent-encoded Greek URL from the live uplab.gr
 * (content/raw/all-urls.txt crawl) → new clean route.
 * Pattern rules cover the taxonomies; explicit rules cover the static pages.
 */
const raw = [
  // products: /προϊόν/<category>/<slug>/ and /προϊόν/<slug>/
  { source: '/προϊόν/:cat/:slug', destination: '/proionta/:slug', permanent: true },
  { source: '/προϊόν/:slug', destination: '/proionta/:slug', permanent: true },
  // product category archives → filtered hub
  { source: '/κατηγορία-προϊόντος/:cat', destination: '/proionta', permanent: true },
  { source: '/κατηγορία-προϊόντος/:cat/:sub', destination: '/proionta', permanent: true },
  // news: posts and both archive forms (/νέα/ page + /category/νέα/)
  { source: '/νέα/:slug', destination: '/nea', permanent: true },
  { source: '/νέα', destination: '/nea', permanent: true },
  { source: '/category/νέα', destination: '/nea', permanent: true },
  // static pages (old Greek slugs, verbatim from the crawl)
  { source: '/η-εταιρεία', destination: '/etaireia', permanent: true },
  { source: '/επικοινωνία', destination: '/epikoinonia', permanent: true },
  { source: '/σημεία-πώλησης', destination: '/simeia-polisis', permanent: true },
  { source: '/προϊόντα', destination: '/proionta', permanent: true },
  { source: '/πιστοποιήσεις', destination: '/etaireia#pistopoiiseis', permanent: true },
  { source: '/πολιτική-ποιότητας', destination: '/etaireia#poiotita', permanent: true },
  { source: '/θέσεις-εργασίας', destination: '/etaireia#theseis', permanent: true },
  { source: '/κατάλογος-προϊόντων', destination: '/proionta', permanent: true },
  { source: '/ενημερωτικό-δελτίο', destination: '/epikoinonia', permanent: true },
  // English (WPML kept the Greek προϊόν segment in EN URLs)
  { source: '/en/προϊόν/:cat/:slug', destination: '/en/products/:slug', permanent: true },
  { source: '/en/προϊόντα/:cat', destination: '/en/products', permanent: true },
  { source: '/en/προϊόντα', destination: '/en/products', permanent: true },
  { source: '/en/news/:slug', destination: '/en', permanent: true },
  { source: '/en/category/news', destination: '/en', permanent: true },
  // WooCommerce leftovers (catalog only — no checkout on the new site)
  { source: '/καλάθι', destination: '/proionta', permanent: true },
  { source: '/ολοκλήρωση-αγοράς', destination: '/proionta', permanent: true },
  { source: '/ο-λογαριασμός-μου', destination: '/proionta', permanent: true },
];

// Next's matcher works on the percent-encoded path — encode the Greek
// literals but keep :params and separators intact.
const encodeSource = src =>
  src.split('/').map(seg => (seg.startsWith(':') ? seg : encodeURIComponent(seg))).join('/');

export const redirects = raw.map(r => ({ ...r, source: encodeSource(r.source) }));
