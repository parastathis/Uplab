"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type * as LeafletNS from "leaflet";
import "leaflet/dist/leaflet.css";
import storesData from "@/lib/stores.json";

type Store = { n: string; a: string; c: string; z: string; p: string; lat: number; lng: number };

const decode = (s: string) => s.replace(/&#038;|&amp;/g, "&").replace(/&#8211;/g, "–");
const all = (storesData as Store[])
  .map((s) => ({ ...s, n: decode(s.n), a: decode(s.a), c: decode(s.c) }))
  .filter((s) => Number.isFinite(s.lat) && Number.isFinite(s.lng) && s.lat > 34 && s.lat < 42);

// The source data mixes Latin homoglyphs into Greek words (e.g. "XAΛKIΔA").
const HOMO: Record<string, string> = {
  A: "Α", B: "Β", E: "Ε", H: "Η", I: "Ι", K: "Κ", M: "Μ", N: "Ν",
  O: "Ο", P: "Ρ", T: "Τ", X: "Χ", Y: "Υ", Z: "Ζ",
};
const norm = (s: string) =>
  s.toUpperCase().replace(/[ABEHIKMNOPTXYZ]/g, (c) => HOMO[c] ?? c).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

const LIST_LIMIT = 60;
const AMBER = "#c9803e";

/**
 * Store finder — Leaflet/OpenStreetMap map + searchable list of Uplab's
 * pharmacy network (~860 real σημεία scraped from the live locator). Searching
 * filters the list and the map markers together and re-fits the map bounds.
 */
export default function StoreFinder() {
  const [q, setQ] = useState("");
  const [ready, setReady] = useState(false);
  const mapEl = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletNS.Map | null>(null);
  const layerRef = useRef<LeafletNS.LayerGroup | null>(null);
  const Lref = useRef<typeof LeafletNS | null>(null);

  const filtered = useMemo(() => {
    const nq = norm(q.trim());
    if (!nq) return all;
    return all.filter((s) => norm(`${s.n} ${s.c} ${s.a} ${s.z}`).includes(nq));
  }, [q]);

  // init map once (leaflet is imported dynamically — it touches window at load)
  useEffect(() => {
    let map: LeafletNS.Map | null = null;
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !mapEl.current || mapRef.current) return;
      Lref.current = L;
      const m = L.map(mapEl.current, { preferCanvas: true, scrollWheelZoom: false }).setView([38.7, 24.2], 6);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
        maxZoom: 18,
      }).addTo(m);
      layerRef.current = L.layerGroup().addTo(m);
      mapRef.current = m;
      map = m;
      setReady(true);
      // recompute size once laid out (fixes blank tiles inside animated/flex parents)
      setTimeout(() => m.invalidateSize(), 250);
      if (mapEl.current && "ResizeObserver" in window) {
        const ro = new ResizeObserver(() => m.invalidateSize());
        ro.observe(mapEl.current);
        (m as unknown as { _ro?: ResizeObserver })._ro = ro;
      }
    })();
    return () => {
      cancelled = true;
      if (map) {
        (map as unknown as { _ro?: ResizeObserver })._ro?.disconnect();
        map.remove();
      }
      mapRef.current = null;
    };
  }, []);

  // update markers on filter change
  useEffect(() => {
    const L = Lref.current;
    const map = mapRef.current;
    const lg = layerRef.current;
    if (!L || !map || !lg) return;
    lg.clearLayers();
    const bounds: [number, number][] = [];
    filtered.forEach((s) => {
      const m = L.circleMarker([s.lat, s.lng], {
        radius: 4,
        color: AMBER,
        weight: 1,
        fillColor: AMBER,
        fillOpacity: 0.85,
      });
      m.bindPopup(
        `<strong>${s.n}</strong><br>${s.a ? s.a + ", " : ""}${s.z} ${s.c}${s.p ? `<br>${s.p}` : ""}`
      );
      m.addTo(lg);
      bounds.push([s.lat, s.lng]);
    });
    if (bounds.length) map.fitBounds(bounds, { padding: [30, 30], maxZoom: q ? 12 : 7 });
    else map.setView([38.7, 24.2], 6);
  }, [filtered, q, ready]);

  const list = filtered.slice(0, LIST_LIMIT);

  return (
    <div className="pointer-events-auto">
      <div className="flex flex-wrap items-end justify-between gap-line">
        <label className="block w-full max-w-md">
          <span className="caption-tag">Αναζήτηση φαρμακείου</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Πόλη, όνομα ή διεύθυνση…"
            className="mt-breath w-full border-b border-ink/25 bg-transparent pb-2 text-[1.05rem] text-ink outline-none transition-colors placeholder:text-mist/70 focus:border-amber"
          />
        </label>
        <p className="text-[0.85rem] text-mist">
          {filtered.length} {filtered.length === 1 ? "σημείο" : "σημεία"}
          {filtered.length > LIST_LIMIT ? ` · λίστα: πρώτα ${LIST_LIMIT}` : ""}
        </p>
      </div>

      <div className="mt-stanza grid grid-cols-1 gap-line lg:grid-cols-[1.3fr_1fr]">
        <div
          ref={mapEl}
          className="h-[340px] w-full overflow-hidden rounded-[6px] border border-ink/12 lg:h-[560px]"
          aria-label="Χάρτης σημείων πώλησης"
        />
        <ul className="max-h-[560px] overflow-y-auto pr-2">
          {list.map((s, i) => (
            <li key={`${s.n}-${i}`} className="flex items-start justify-between gap-line border-b border-ink/10 py-line">
              <div className="min-w-0">
                <p className="subhead text-[0.95rem] text-ink">{s.n}</p>
                <p className="mt-hair text-[0.8rem] text-mist">
                  {s.a}
                  {s.a ? ", " : ""}
                  {s.z} {s.c}
                </p>
                {s.p && (
                  <a href={`tel:${s.p}`} className="link-underline mt-hair inline-block text-[0.8rem] text-slate hover:text-ink">
                    {s.p}
                  </a>
                )}
              </div>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Οδηγίες προς ${s.n}`}
                className="btn-arrow shrink-0 pt-1 text-mist transition-colors hover:text-amber-deep"
              >
                →
              </a>
            </li>
          ))}
          {list.length === 0 && <li className="py-line text-mist">Δεν βρέθηκε σημείο για «{q}».</li>}
        </ul>
      </div>
    </div>
  );
}
