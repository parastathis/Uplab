import { buildRedirects } from "./redirects.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return buildRedirects();
  },
};

export default nextConfig;
