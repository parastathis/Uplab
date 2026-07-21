// 301 map: every old uplab.gr URL (percent-encoded Greek slugs) → new clean route.
// Sources MUST stay percent-encoded — path-to-regexp rejects raw non-ASCII.
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const source = require("./src/lib/uplab-source.json");

const STATIC_MAP = {
  "/επικοινωνία/": "/epikoinonia",
  "/κατάλογος-προϊόντων/": "/katalogos",
  "/πολιτική-ποιότητας/": "/politiki-poiotitas",
  "/θέσεις-εργασίας/": "/theseis-ergasias",
  "/σημεία-πώλησης/": "/simeia-polisis",
  "/η-εταιρεία/": "/etaireia",
  "/πολιτική-για-τα-cookies/": "/politiki-cookies",
  "/category/νέα/": "/nea",
  "/νέα/": "/nea",
  "/en/category/news/": "/en",
  "/locations.kml": "/simeia-polisis",
};

function destinationFor(decoded) {
  if (decoded === "/") return null;
  if (STATIC_MAP[decoded]) return STATIC_MAP[decoded];

  let m;
  if ((m = decoded.match(/^\/νέα\/(.+?)\/?$/))) return `/nea/${encodeURIComponent(m[1])}`;
  if ((m = decoded.match(/^\/προϊόν\/[^/]+\/([^/]+)\/?$/))) return `/proionta/${encodeURIComponent(m[1])}`;
  if ((m = decoded.match(/^\/προϊόντα\/([^/]+)\/?$/))) return `/proionta?katigoria=${encodeURIComponent(m[1])}`;
  if ((m = decoded.match(/^\/σειρά_προϊόντων\/([^/]+)\/?$/))) return `/proionta?seira=${encodeURIComponent(m[1])}`;
  if ((m = decoded.match(/^\/en\/προϊόν\/[^/]+\/([^/]+)\/?$/))) return `/en/products/${encodeURIComponent(m[1])}`;
  if (decoded.startsWith("/en/προϊόντα/")) return "/en/products";
  if (decoded.startsWith("/en/news/")) return "/en";
  if (decoded.startsWith("/en/")) return "/en";
  return "/";
}

export function buildRedirects() {
  const seen = new Set();
  const out = [];
  for (const { encoded, decoded } of source.allUrls) {
    const destination = destinationFor(decoded);
    if (!destination) continue;
    const src = encoded.replace(/\/$/, "");
    if (!src || seen.has(src)) continue;
    seen.add(src);
    out.push({ source: src, destination, permanent: true });
  }
  return out;
}
