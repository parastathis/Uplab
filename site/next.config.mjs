import { redirects } from './redirects.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'uplab.gr' }],
  },
  async redirects() {
    return redirects;
  },
};

export default nextConfig;
