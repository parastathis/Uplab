import type { MetadataRoute } from 'next';
import { products, productsEn, news } from '@/lib/content';

const BASE = 'https://uplab.gr';

export default function sitemap(): MetadataRoute.Sitemap {
  const statics: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, priority: 1 },
    { url: `${BASE}/proionta`, priority: 0.9 },
    { url: `${BASE}/etaireia`, priority: 0.7 },
    { url: `${BASE}/nea`, priority: 0.6 },
    { url: `${BASE}/simeia-polisis`, priority: 0.7 },
    { url: `${BASE}/epikoinonia`, priority: 0.6 },
  ];

  const productUrls: MetadataRoute.Sitemap = products.map(p => ({
    url: `${BASE}/proionta/${encodeURIComponent(p.slug)}`,
    lastModified: p.date,
    priority: 0.8,
  }));

  const newsUrls: MetadataRoute.Sitemap = news.map(n => ({
    url: `${BASE}/nea#${n.id}`,
    lastModified: n.date,
    priority: 0.4,
  }));

  const enUrls: MetadataRoute.Sitemap = [
    { url: `${BASE}/en`, priority: 0.8 },
    { url: `${BASE}/en/products`, priority: 0.7 },
    ...productsEn.map(p => ({
      url: `${BASE}/en/products/${encodeURIComponent(p.slug)}`,
      lastModified: p.date,
      priority: 0.6,
    })),
  ];

  return [...statics, ...productUrls, ...newsUrls, ...enUrls];
}
