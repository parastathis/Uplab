import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import NavHeader from "@/components/layout/NavHeader";
import Footer from "@/components/layout/Footer";
import CookieBanner from "@/components/layout/CookieBanner";

export const metadata: Metadata = {
  metadataBase: new URL("https://uplab.gr"),
  title: {
    default: "Uplab Pharmaceuticals — Η Ισορροπία Φύσης & Επιστήμης",
    template: "%s — Uplab Pharmaceuticals",
  },
  description:
    "Πίσω από το brand UPLAB βρίσκεται ένα σύγχρονο εργοστάσιο παραγωγής φαρμάκων. Προϊόντα υγείας αποκλειστικά μέσω φαρμακείων.",
  alternates: { languages: { el: "/", en: "/en" } },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Uplab Pharmaceuticals",
  legalName: "UPLAB ΕΠΕ",
  url: "https://uplab.gr",
  email: "info@uplab.gr",
  telephone: "+30 210 28 44 333",
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

export const viewport = {
  themeColor: "#f8f6f2",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
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
