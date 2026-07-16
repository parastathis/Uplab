// Distills raw crawl data (content/raw/*) into content/uplab-source.json
// Every fact here comes from the live uplab.gr — nothing invented.
const fs = require('fs');
const path = require('path');
const RAW = path.join(__dirname, 'raw');
const j = f => JSON.parse(fs.readFileSync(path.join(RAW, f), 'utf8'));

const ent = s => s
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"')
  .replace(/&rsquo;|&#8217;/g, '’').replace(/&hellip;|&#8230;/g, '…')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>');

const strip = h => ent(h
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/\[\/?vc_[^\]]*\]/g, '\n')
  .replace(/\[\/?(rev_slider_vc|mpc_[a-z_]+|dflip)[^\]]*\]/g, '\n')
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(/<\/(p|div|h[1-6]|li|tr)>/gi, '\n')
  .replace(/<[^>]+>/g, ' '))
  .replace(/[ \t]+/g, ' ')
  .replace(/\s*\n\s*/g, '\n')
  .replace(/\n{2,}/g, '\n')
  .trim();

const pages = j('pages.json'), pagesEn = j('pages-en.json');
const posts = j('posts.json'), postsEn = j('posts-en.json');
const products = j('products1.json'), productsEn = j('products-en.json');
const cats = j('product_cat.json'), tags = j('product_tag.json'), fams = j('product_family.json');
const media = j('media.json');
const mediaMap = Object.fromEntries(media.map(m => [m.id, { url: m.source_url, alt: m.alt_text || '' }]));

const dec = u => { try { return decodeURIComponent(u); } catch { return u; } };
const pathOf = link => dec(new URL(link).pathname);

const catById = Object.fromEntries(cats.map(c => [c.id, c]));
const tagById = Object.fromEntries(tags.map(t => [t.id, t]));
const famById = Object.fromEntries(fams.map(f => [f.id, f]));

const mapProduct = p => ({
  id: p.id,
  name: ent(p.title.rendered),
  slug: dec(p.slug),
  oldPath: pathOf(p.link),
  oldPathEncoded: new URL(p.link).pathname,
  date: p.date,
  categories: (p.product_cat || []).map(id => catById[id] ? catById[id].name : `#${id}`),
  eofTags: (p.product_tag || []).map(id => tagById[id] ? tagById[id].name : `#${id}`),
  family: (p.product_family || []).map(id => famById[id] ? famById[id].name : `#${id}`),
  image: p.featured_media && mediaMap[p.featured_media] ? mediaMap[p.featured_media].url : null,
  imageAlt: p.featured_media && mediaMap[p.featured_media] ? mediaMap[p.featured_media].alt : '',
  excerpt: strip(p.excerpt ? p.excerpt.rendered : ''),
  description: strip(p.content ? p.content.rendered : ''),
});

const grProducts = products.map(mapProduct);
const enProducts = productsEn.map(mapProduct);

// Image fallbacks verified from homepage "Νέα προϊόντα" gallery markup (filenames name the SKU).
const imageFallbacks = {
  'sunlab-spray-spf30': 'https://uplab.gr/media/2021/11/Uplab-Products_SunLab_30-both.png',
  'sunlab-family-spray-spf50': 'https://uplab.gr/media/2021/11/Uplab-Products_SunLab_50-both.png',
  'sunlab-after-sun-cream-gel': 'https://uplab.gr/media/2021/11/Uplab-Products_SunLab_after-both.png',
};
for (const p of grProducts) if (!p.image && imageFallbacks[p.slug]) p.image = imageFallbacks[p.slug];

const mapPost = p => ({
  id: p.id,
  title: ent(p.title.rendered),
  slug: dec(p.slug),
  oldPath: pathOf(p.link),
  date: p.date,
  excerpt: strip(p.excerpt.rendered),
  body: strip(p.content.rendered),
});

const grCats = cats.filter(c => !c.link.includes('/en/') && c.slug !== 'uncategorized')
  .map(c => ({ id: c.id, name: c.name, slug: dec(c.slug), count: c.count, oldPath: pathOf(c.link), description: strip(c.description || '') }));
const catsEnRaw = j('product_cat-en.json');
const enCats = catsEnRaw.filter(c => c.slug !== 'uncategorized')
  .map(c => ({ id: c.id, name: c.name, slug: dec(c.slug), count: c.count, oldPath: pathOf(c.link) }));

// The 4 real ΕΟΦ regulatory groups; a stray zero-count duplicate tag exists on the live site (see gaps).
const EOF_NAMES = ['Βιοκτόνα', 'Ιατροτεχνολογικά', 'Καλλυντικά', 'Συμπληρώματα διατροφής'];
const eofCats = tags.filter(t => EOF_NAMES.includes(t.name))
  .map(t => ({ id: t.id, name: t.name, slug: dec(t.slug), count: t.count, oldPath: pathOf(t.link) }));

const pageRec = p => ({ id: p.id, title: ent(p.title.rendered), slug: dec(p.slug), oldPath: pathOf(p.link), text: strip(p.content.rendered) });

const allUrls = fs.readFileSync(path.join(RAW, 'all-urls.txt'), 'utf8')
  .split('\n').filter(l => l.startsWith('http')).map(u => ({ encoded: new URL(u).pathname, decoded: dec(new URL(u).pathname) }));

const src = {
  crawledAt: '2026-07-16',
  source: 'https://uplab.gr/ (live crawl: raw HTML + WP REST API at /api-json/)',

  meta: {
    title: 'Uplab Pharmaceuticals',
    metaDescription: 'Πίσω από το brand UPLAB βρίσκεται ένα σύγχρονο εργοστάσιο παραγωγής φαρμάκων …',
    themeColor: '#d0935b',
    gtmContainer: 'GTM-PWWL987',
    ga4: 'G-J4JZCGNYSH',
    googleSiteVerification: 'Id_lOFz_PjijGDScErc39Ms2DYJ0BM34NEhxxK2HHBk',
    bingValidate: '806B59AB28B5AE9C81E844280D7D5F15',
    fbAppId: '586527869094316',
    twitterSite: '@Uplab_Ltd',
    appleMobileWebAppTitle: 'Uplab',
    ogLocale: 'el_GR',
    cms: 'WordPress 7.0.1 + WPML 4.9.2.1 + WPBakery + Slider Revolution 6.5.7 + Site Kit 1.183.0 + WooCommerce (catalog only, no checkout) + WP Store Locator + RankMath redirections + DearFlip',
  },

  contact: {
    company: 'UPLAB ΕΠΕ / Uplab Pharmaceuticals',
    address: '10ο χλμ Ε.Ο. Αθηνών-Λαμίας, Μεταμόρφωση, Αττική',
    postcode: '14452 (contact page) — KML sitemap says 144 51; discrepancy on live site, kept both',
    phone: '+30 210 28 44 333',
    fax: '+30 210 28 13 466',
    email: 'info@uplab.gr',
    social: {
      facebook: 'https://www.facebook.com/Uplab-Ltd-943326059039353/',
      instagram: 'https://www.instagram.com/uplab_ltd/',
      linkedin: 'https://www.linkedin.com/in/uplab-ltd-008667109/',
      twitter: 'https://twitter.com/Uplab_Ltd',
    },
  },

  vision: 'Η απόλυτη φυσική ισορροπία ανθρώπου και περιβάλλοντος. Στοιχεία συνδεδεμένα, αμφίδρομα με την υγεία. Αυτό είναι το κύριο μέλημα, ο στόχος και το όραμά μας',

  companyTabs: {
    'Ποιοι είμαστε': 'Πίσω από το brand UPLAB βρίσκεται ένα σύγχρονο εργοστάσιο παραγωγής φαρμάκων, που λειτουργεί σύμφωνα με τις ισχύουσες Αρχές Ορθής Παρασκευαστικής Πρακτικής (GMP), διαθέτοντας όλες τις απαιτούμενες πιστοποιήσεις. Με σεβασμό στον άνθρωπο και τις ανάγκες του σχεδιάζουμε, επιλέγουμε και παράγουμε καινοτόμα φαρμακευτικά σκευάσματα, τα οποία διακινούμε πανελλαδικά μέσα από ένα πολυμελές και σύγχρονο δίκτυο, αποκλειστικά στα φαρμακεία και στις φαρμακαποθήκες.',
    'Η φιλοσοφία μας': 'Στην UPLAB ανταποκρινόμαστε στις πραγματικές ανάγκες του ανθρώπου με σοβαρότητα και επιστημονική τεκμηρίωση, χωρίς να παρασυρόμαστε από πρόσκαιρες τάσεις. Αναπτύσσουμε καινοτόμα προϊόντα, αποτελεσματικά, ασφαλή αλλά και προσιτά σε όλους. Διασφαλίζουμε την ποιότητα των προϊόντων μας, τηρώντας όλες τις προδιαγραφές και συνεισφέρουμε με το δικό μας τρόπο στο αγαθό της υγείας.',
    'Τα πρότυπα ποιότητας': 'Με αποκλειστικό γνώμονα την ασφάλεια και την αποτελεσματικότητα, στην UPLAB προσφέρουμε υψηλής ποιότητας ιατροτεχνολογικά προϊόντα (medical devices) όλων των κλάσεων, καλλυντικά και συμπληρώματα διατροφής για ειδικούς ιατρικούς σκοπούς, ενώ παράγει αντισηπτικά-βιοκτόνα εγκεκριμένα από τον ΕΟΦ. Όλα τα σκευάσματα είναι γνωστοποιημένα στον ΕΟΦ, ενώ τα καλλυντικά είναι γνωστοποιημένα στο CPNP (Cosmetic Products Notification Portal).',
    'Οι άνθρωποί μας': 'Κοινό όραμα, επιστημονικό υπόβαθρο, ομαδικό πνεύμα, σεβασμός στους συνεργάτες μας: αυτές είναι οι αρχές μας στην UPLAB. Φροντίζουμε για τη συνεχή ενημέρωση των ανθρώπων μας, ενθαρρύνουμε τη δημιουργικότητα, την ομαδικότητα και προσφέρουμε ίσες ευκαιρίες εκπαίδευσης και ανάπτυξης, επενδύοντας στο πιο πολύτιμο κεφάλαιο: στους ανθρώπους μας.',
    'Οι συνεργάτες μας': 'Στην UPLAB διακινούμε τα προϊόντα μας αποκλειστικά στα φαρμακεία και στις φαρμακαποθήκες όλης της χώρας, ενώ αντιπροσωπεύουμε κατ’ αποκλειστικότητα μεγάλες ευρωπαϊκές εταιρίες όπως Apipharma, AronPharma, Aveflor, Biofaktor, Biovico, Gofarm, Pharmacy Lab, Pharmalinea, Signorini Medicale, Silvanols, διευρύνοντας συνεχώς το δίκτυο των συνεργατών μας.',
  },

  partners: ['Apipharma', 'AronPharma', 'Aveflor', 'Biofaktor', 'Biovico', 'Gofarm', 'Pharmacy Lab', 'Pharmalinea', 'Signorini Medicale', 'Silvanols'],

  trustNumbers: {
    productsGr: grProducts.length,
    healthCategories: grCats.length,
    eofRegulatoryCategories: 4,
    exclusivePartners: 10,
    pharmacyPoints: 2075,
    note: 'pharmacyPoints = wpsl_stores X-WP-Total. Founding year NOT stated anywhere on the site — do not invent (see gaps).',
  },

  categoriesHealth: grCats,
  categoriesHealthEn: enCats,
  categoriesEOF: eofCats,
  productFamilies: fams.map(f => ({ id: f.id, name: f.name, slug: f.slug, count: f.count, oldPath: pathOf(f.link) })),

  products: grProducts,
  productsEn: enProducts,

  news: posts.map(mapPost),
  newsEn: postsEn.map(mapPost),

  pagesGr: pages.map(pageRec),
  pagesEn: pagesEn.map(pageRec),

  qualityPolicy: pageRec(pages.find(p => p.id === 18583)),
  jobs: pageRec(pages.find(p => p.id === 1299)),

  certifications: {
    note: 'Live page is image-based: ISO certificate + ministerial decision attestation. No cert body/number in HTML text.',
    images: [
      'https://uplab.gr/media/2021/11/UPLAB-ISO-CERTIFICATE-GREEK.jpg',
      'https://uplab.gr/media/2021/11/UPLAB-2021-ΙΣΧΥΟΥΣΑ-ΒΕΒΑΙΩΣΗ-ΥΠΟΥΡΓΙΚΗΣ-ΑΠΟΦΑΣΗΣ-1348-2004.jpg',
    ],
    sections: ['Πιστοποιητικά ISO', 'Ισχύουσα βεβαίωση υπουργικής απόφασης'],
  },

  catalog: {
    title: 'Κατάλογος προϊόντων 2024-2025',
    pdf: 'https://uplab.gr/wp-content/uploads/2024/06/20240719-Uplab-SalesFolder-vWEB-new-prices.pdf',
    viewer: 'DearFlip flipbook on live site',
  },

  espa: {
    banner: 'https://uplab.gr/media/2024/04/e-bannerespaEAEAC120X60.jpg',
    link: 'https://uplab.gr/media/2024/04/antagonistikotita_web.pptx',
    note: 'Legal requirement — keep in discreet fixed footer placement.',
  },

  storeLocator: {
    plugin: 'WP Store Locator (wpsl_stores)',
    totalStores: 2075,
    hq: { name: 'Uplab Pharmaceuticals', address: '10ο χλμ Ε.Ο. Αθηνών-Λαμίας, Μεταμόρφωση, Αττική, 144 51, Ελλάδα', phone: '+30 210 28 44 333' },
    searchRadii: ['1 km', '5 km', '10 km', '25 km', '50 km', '100 km', '200 km'],
  },

  homepageNewProducts: [
    'Sinuforce nasal spray', 'Curalid cream', 'GetUp! NAC', 'Symbactil', 'Modus Day Plus',
    'SunLab After Sun cream gel', 'SunLab Family spray SPF50', 'SunLab spray SPF30',
    'MannoCin-D', 'Berroxin® Lollipops', 'Apitusik® syrup', 'Berroxin® gummies',
  ],

  allUrls,

  gaps: [
    'Founding year / "years active" NOT stated anywhere on the crawled site. The homepage trust strip must not claim a year count — use products/categories/partners/pharmacy-points instead, or ask Uplab.',
    'Πιστοποιήσεις: certificate details (ISO number, issuing body) only exist inside JPEG scans, not extractable as text. Carry images verbatim.',
    'Hero Slider Revolution text loads via JS; not in static HTML. Vision statement sourced from Η εταιρεία page opener instead.',
    'Postcode discrepancy on live site: contact page "Αττική 14452" vs locations.kml "144 51".',
    'product_brand taxonomy exists but is empty — partner logo images not published as structured data; partner names only in Οι συνεργάτες μας text.',
    'Two products are in "uncategorized" on live site: dezinox-spray (EN: feet-health), avenea-essence-tablets (EN: sexual-health) — the GR categories Υγιή πόδια / Σεξουαλική υγεία exist but these products are not assigned; keep their EN category as hint, flag for Uplab.',
    'EN site has 30 products vs 76 GR — EN catalog is a subset; preserve as-is, do not machine-translate the missing 46.',
    'News category page /category/νέα/ exists alongside /νέα/ page — both map to the new /νέα/ archive.',
    'Newsletter page (Ενημερωτικό δελτίο) is a bare signup embed (500 chars).',
    'No product image exists on the live site for longsept-total and femlab-hygiene-gel (no featured media, no inline image; media search only finds "Longsept hands", a different SKU). Left null — ask Uplab for pack shots.',
    'A stray zero-count product_tag "Ενίσχυση ανοσοποιητικού" exists under προϊόντα-εοφ on the live site — duplicate of the health category, excluded from the ΕΟΦ list.',
  ],
};

fs.writeFileSync(path.join(__dirname, 'uplab-source.json'), JSON.stringify(src, null, 2));
console.log('products GR:', grProducts.length, '| EN:', enProducts.length);
console.log('health cats GR:', grCats.length, '| EN:', enCats.length, '| EOF:', eofCats.length);
console.log('news GR:', posts.length, '| EN:', postsEn.length);
console.log('urls:', allUrls.length);
const missingImg = grProducts.filter(p => !p.image).map(p => p.slug);
console.log('products without featured image:', missingImg.length, missingImg.join(', '));
console.log('written: uplab-source.json', fs.statSync(path.join(__dirname, 'uplab-source.json')).size, 'bytes');
