import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ProductHub } from '@/components/ProductHub';

export const metadata: Metadata = {
  title: 'Προϊόντα',
  description:
    '76 προϊόντα υγείας σε 27 κατηγορίες — συμπληρώματα διατροφής, ιατροτεχνολογικά, καλλυντικά και βιοκτόνα, αποκλειστικά μέσω φαρμακείων.',
  alternates: {
    canonical: '/proionta',
    languages: { el: '/proionta', en: '/en/products' },
  },
};

export default function ProiontaPage() {
  return (
    <Suspense>
      <ProductHub />
    </Suspense>
  );
}
