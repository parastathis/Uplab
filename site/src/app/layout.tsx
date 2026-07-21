import type { Metadata, Viewport } from 'next';
import { Literata, Commissioner } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/LenisProvider';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { contact } from '@/lib/content';

const literata = Literata({
  subsets: ['latin', 'greek'],
  variable: '--font-literata',
  display: 'swap',
});

const commissioner = Commissioner({
  subsets: ['latin', 'greek'],
  variable: '--font-commissioner',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#d0935b',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://uplab.gr'),
  title: {
    default: 'Uplab Pharmaceuticals — Η Ισορροπία φύσης και επιστήμης',
    template: '%s | Uplab Pharmaceuticals',
  },
  description:
    'Πίσω από το brand UPLAB βρίσκεται ένα σύγχρονο εργοστάσιο παραγωγής φαρμάκων. Προϊόντα υγείας σε 27 κατηγορίες, αποκλειστικά μέσω φαρμακείων, σε 2.075 σημεία πώλησης.',
  openGraph: {
    type: 'website',
    locale: 'el_GR',
    siteName: 'Uplab Pharmaceuticals',
  },
  twitter: { site: '@Uplab_Ltd', card: 'summary_large_image' },
  verification: {
    google: 'Id_lOFz_PjijGDScErc39Ms2DYJ0BM34NEhxxK2HHBk',
    other: { 'msvalidate.01': '806B59AB28B5AE9C81E844280D7D5F15' },
  },
  alternates: {
    canonical: '/',
    languages: { el: '/', en: '/en' },
  },
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Uplab Pharmaceuticals',
  legalName: 'UPLAB ΕΠΕ',
  url: 'https://uplab.gr/',
  email: 'info@uplab.gr',
  telephone: '+302102844333',
  faxNumber: '+302102813466',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '10ο χλμ Ε.Ο. Αθηνών-Λαμίας',
    addressLocality: 'Μεταμόρφωση',
    addressRegion: 'Αττική',
    postalCode: '14452',
    addressCountry: 'GR',
  },
  sameAs: Object.values(contact.social),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el" className={`${literata.variable} ${commissioner.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <LenisProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </LenisProvider>
      </body>
    </html>
  );
}
