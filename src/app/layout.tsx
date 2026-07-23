import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import NavHeader from "@/components/layout/NavHeader";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";

const DESCRIPTION =
  "Πίσω από το brand UPLAB βρίσκεται ένα σύγχρονο εργοστάσιο παραγωγής φαρμάκων. Προϊόντα υγείας σε 27 κατηγορίες, αποκλειστικά μέσω φαρμακείων — 2.075+ σημεία σε όλη την Ελλάδα.";

export const metadata: Metadata = {
  metadataBase: new URL("https://uplab.gr"),
  title: {
    default: "Uplab Pharmaceuticals — Η Ισορροπία Φύσης & Επιστήμης",
    template: "%s — Uplab Pharmaceuticals",
  },
  description: DESCRIPTION,
  applicationName: "Uplab Pharmaceuticals",
  keywords: [
    "Uplab",
    "φάρμακα",
    "συμπληρώματα διατροφής",
    "ιατροτεχνολογικά",
    "καλλυντικά",
    "φαρμακείο",
    "GMP",
    "ΕΟΦ",
  ],
  authors: [{ name: "Uplab Pharmaceuticals" }],
  alternates: { canonical: "/", languages: { el: "/", en: "/en" } },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Uplab Pharmaceuticals",
    locale: "el_GR",
    alternateLocale: "en_US",
    url: "https://uplab.gr",
    title: "Uplab Pharmaceuticals — Η Ισορροπία Φύσης & Επιστήμης",
    description: DESCRIPTION,
    images: [
      { url: "/media/nature-formulation.png", width: 2752, height: 1536, alt: "Uplab Pharmaceuticals" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uplab Pharmaceuticals — Η Ισορροπία Φύσης & Επιστήμης",
    description: DESCRIPTION,
    images: ["/media/nature-formulation.png"],
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Uplab Pharmaceuticals",
  legalName: "UPLAB ΕΠΕ",
  url: "https://uplab.gr",
  logo: "https://uplab.gr/brand/logo.png",
  email: "info@uplab.gr",
  telephone: "+30 210 28 44 333",
  areaServed: "GR",
  address: {
    "@type": "PostalAddress",
    streetAddress: "10ο χλμ Ε.Ο. Αθηνών-Λαμίας",
    addressLocality: "Μεταμόρφωση",
    addressRegion: "Αττική",
    postalCode: "14452",
    addressCountry: "GR",
  },
  sameAs: [
    "https://www.facebook.com/Uplab-Ltd-943326059039353/",
    "https://www.instagram.com/uplab_ltd/",
    "https://www.linkedin.com/in/uplab-ltd-008667109/",
    "https://twitter.com/Uplab_Ltd",
  ],
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Uplab Pharmaceuticals",
  url: "https://uplab.gr",
  inLanguage: "el",
  publisher: { "@type": "Organization", name: "Uplab Pharmaceuticals" },
};

export const viewport = {
  themeColor: "#f8f6f2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
        <SmoothScroll>
          <NavHeader />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </SmoothScroll>
      </body>
    </html>
  );
}
