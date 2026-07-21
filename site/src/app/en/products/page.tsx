import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ProductHubEn } from '@/components/ProductHubEn';

export const metadata: Metadata = {
  title: 'Products (EN)',
  description:
    'The English catalogue of Uplab Pharmaceuticals — health products distributed exclusively through pharmacies across Greece.',
  alternates: {
    canonical: '/en/products',
    languages: { el: '/proionta', en: '/en/products' },
  },
};

export default function EnProductsPage() {
  return (
    <Suspense>
      <ProductHubEn />
    </Suspense>
  );
}
