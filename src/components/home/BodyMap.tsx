"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { bodyRegions, categoryByName } from "@/lib/data";

/**
 * Flagship interactive — «Ανατομικός Άτλας».
 * The figure is engraved from ~2.500 ink stipple dots (canvas), like a
 * lithograph plate from a medical atlas: dense at the contour, sparse at the
 * core. Regions are indexed with numbered hairline leader lines. On
 * hover/tap/focus the nearby dots migrate toward the region and turn amber —
 * the active substance concentrating where it is needed.
 */

/* ————— figure space: 135 × 230 units, figure centered at x=67.5 ————— */
const CX = 67.5;
const VIEW_W = 135;
const VIEW_H = 230;
const SCALE = 6; // canvas pixels per figure unit

/* anchors + label side for each real region of data.ts */
const ANCHORS: Record<string, { x: number; y: number; r: number; side: "L" | "R"; n: string }> = {
  head:   { x: CX,      y: 15,  r: 13, side: "R", n: "01" },
  chest:  { x: CX,      y: 46,  r: 14, side: "L", n: "02" },
  immune: { x: CX - 19, y: 64,  r: 11, side: "L", n: "03" },
  skin:   { x: CX + 19, y: 64,  r: 11, side: "R", n: "04" },
  gut:    { x: CX,      y: 68,  r: 11, side: "L", n: "05" },
  pelvis: { x: CX,      y: 88,  r: 11, side: "R", n: "06" },
  limbs:  { x: CX - 8,  y: 132, r: 14, side: "L", n: "07" },
  child:  { x: CX + 23, y: 96,  r: 10, side: "R", n: "08" },
};

/* Label Y-slots per side: sorted top→bottom and pushed apart by ≥GAP so the
   leader-line labels never fall on top of one another (immune/gut used to
   collide on the left). The leader then bends from the body up/down to this Y. */
const LABEL_Y: Record<string, number> = (() => {
  const GAP = 13;
  const out: Record<string, number> = {};
  (["L", "R"] as const).forEach((side) => {
    const ids = Object.keys(ANCHORS)
      .filter((id) => ANCHORS[id].side === side)
      .sort((a, b) => ANCHORS[a].y - ANCHORS[b].y);
    let prev = -Infinity;
    ids.forEach((id) => {
      const y = Math.max(ANCHORS[id].y, prev + GAP);
      out[id] = y;
      prev = y;
    });
  });
  return out;
})();

/* Short leader labels (kept tidy in the margin); the full region name + its
   categories appear in the reveal panel on hover. */
const SHORT: Record<string, string> = {
  head: "Κεφάλι & Νους",
  chest: "Αναπνοή & Καρδιά",
  immune: "Άμυνα & Ενέργεια",
  skin: "Δέρμα",
  gut: "Πεπτικό",
  pelvis: "Γυναικεία & Ουρο.",
  limbs: "Οστά & Μύες",
  child: "Παιδική φροντίδα",
};

/* ————— signed-distance figure (smooth-blended anatomical volumes) ————— */
const sdSeg = (px: number, py: number, ax: number, ay: number, bx: number, by: number, r: number) => {
  const pax = px - ax, pay = py - ay, bax = bx - ax, bay = by - ay;
  const h = Math.max(0, Math.min(1, (pax * bax + pay * bay) / (bax * bax + bay * bay)));
  return Math.hypot(pax - bax * h, pay - bay * h) - r;
};
const sdEll = (px: number, py: number, cx: number, cy: number, rx: number, ry: number) => {
  return (Math.hypot((px - cx) / rx, (py - cy) / ry) - 1) * Math.min(rx, ry);
};
const smin = (a: number, b: number, k = 2.2) => {
  const h = Math.max(0, Math.min(1, 0.5 + (0.5 * (b - a)) / k));
  return b * (1 - h) + a * h - k * h * (1 - h);
};
const bodySDF = (x: number, y: number) => {
  let d = sdEll(x, y, CX, 14.5, 7.2, 9.2); // head
  d = smin(d, sdSeg(x, y, CX, 22, CX, 30, 3.1)); // neck
  d = smin(d, sdEll(x, y, CX, 45, 13.8, 10)); // chest/shoulders
  d = smin(d, sdEll(x, y, CX, 63, 10.8, 13)); // waist
  d = smin(d, sdEll(x, y, CX, 82, 11.4, 10)); // hips
  for (const s of [-1, 1]) {
    // arms as a hard min so the armpit gap survives
    let a = sdSeg(x, y, CX + s * 12.2, 38.5, CX + s * 17.5, 50, 4.0);
    a = smin(a, sdSeg(x, y, CX + s * 17.5, 50, CX + s * 19.5, 68, 3.4));
    a = smin(a, sdSeg(x, y, CX + s * 19.5, 68, CX + s * 22.5, 90, 2.9));
    a = smin(a, sdEll(x, y, CX + s * 23.5, 95.5, 2.9, 4.0));
    d = Math.min(d, a);
    // legs separated at the thigh so the figure doesn't fuse
    let l = sdSeg(x, y, CX + s * 7.6, 94, CX + s * 8.2, 140, 5.1);
    l = smin(l, sdSeg(x, y, CX + s * 8.2, 140, CX + s * 8.4, 184, 3.9));
    l = smin(l, sdSeg(x, y, CX + s * 8.4, 184, CX + s * 8.4, 203, 2.5));
    l = smin(l, sdSeg(x, y, CX + s * 8.4, 206, CX + s * 13.8, 207.5, 2.6));
    d = Math.min(d, l);
  }
  return d;
};

type Dot = {
  ox: number; oy: number; r: number; a: number;
  ph: number; sp: number; sw: number;
  cx: number; cy: number; cr: number; ca: number; amber: number;
};

const buildDots = (): Dot[] => {
  let seed = 7;
  const rnd = () => ((seed = (seed * 1103515245 + 12345) & 0x7fffffff), seed / 0x7fffffff);
  const dots: Dot[] = [];
  const STEP = 1.05;
  for (let y = 2; y < 226; y += STEP)
    for (let x = 30; x < 105; x += STEP) {
      const jx = x + (rnd() - 0.5) * STEP, jy = y + (rnd() - 0.5) * STEP;
      const d = bodySDF(jx, jy);
      if (d > 0.15) continue;
      // engraving density: near-certain at the contour, sparser toward the core
      const edge = Math.exp(-Math.abs(d + 0.15) / 1.9);
      if (rnd() > 0.38 + 0.62 * edge) continue;
      dots.push({
        ox: jx, oy: jy,
        r: 0.4 + rnd() * 0.46, a: 0.32 + 0.28 * edge + rnd() * 0.28,
        ph: rnd() * Math.PI * 2, sp: 0.4 + rnd() * 0.6, sw: 1.4 + rnd() * 0.4,
        cx: jx, cy: jy, cr: 0, ca: 0, amber: 0,
      });
    }
  return dots;
};

const INK = [28, 43, 58];
const AMB = [201, 128, 62];
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

export default function BodyMap() {
  const [active, setActive] = useState<string | null>(null);
  const [inview, setInview] = useState(false);
  const region = useMemo(() => bodyRegions.find((r) => r.id === active) ?? null, [active]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef<string | null>(null);
  activeRef.current = active;

  useEffect(() => {
    const cvs = canvasRef.current;
    const section = sectionRef.current;
    if (!cvs || !section) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dots = buildDots();
    let raf = 0;
    let running = false;

    const draw = (t: number) => {
      const anchor = activeRef.current ? ANCHORS[activeRef.current] : null;
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      if (anchor) {
        // soft amber pool behind the gathering
        const g = ctx.createRadialGradient(anchor.x * SCALE, anchor.y * SCALE, 2, anchor.x * SCALE, anchor.y * SCALE, anchor.r * 1.9 * SCALE);
        g.addColorStop(0, "rgba(201,128,62,.14)");
        g.addColorStop(1, "rgba(201,128,62,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(anchor.x * SCALE, anchor.y * SCALE, anchor.r * 1.9 * SCALE, 0, 7);
        ctx.fill();
      }
      for (const d of dots) {
        const dist = anchor ? Math.hypot(d.ox - anchor.x, d.oy - anchor.y) : 1e9;
        const inR = anchor !== null && dist < anchor.r;
        let tx = d.ox, ty = d.oy, tr = d.r, ta = d.a, tAmber = 0;
        if (inR && anchor) {
          // distance-staggered pull keeps the cluster stippled, not a blob
          const k = 0.18 + 0.38 * (1 - dist / anchor.r);
          tx = lerp(d.ox, anchor.x, k) + Math.sin(d.ph * 3.7) * 1.3;
          ty = lerp(d.oy, anchor.y, k) + Math.cos(d.ph * 2.9) * 1.3;
          tr = d.r * d.sw;
          ta = 0.95;
          tAmber = 1;
        } else if (anchor) ta = d.a * 0.45;
        const E = reduced ? 1 : 0.09;
        d.cx = lerp(d.cx, tx, E);
        d.cy = lerp(d.cy, ty, E);
        d.cr = lerp(d.cr || d.r, tr, E);
        d.ca = lerp(d.ca || d.a, ta, E);
        d.amber = lerp(d.amber, tAmber, E);
        let bx = 0, by = 0;
        if (!reduced && !inR) {
          bx = Math.sin(t * 0.0006 * d.sp + d.ph) * 0.28;
          by = Math.cos(t * 0.0005 * d.sp + d.ph) * 0.28;
        }
        const r = Math.round(lerp(INK[0], AMB[0], d.amber));
        const g = Math.round(lerp(INK[1], AMB[1], d.amber));
        const b = Math.round(lerp(INK[2], AMB[2], d.amber));
        ctx.fillStyle = `rgba(${r},${g},${b},${d.ca})`;
        ctx.beginPath();
        ctx.arc((d.cx + bx) * SCALE, (d.cy + by) * SCALE, d.cr * SCALE * 0.5, 0, 7);
        ctx.fill();
      }
    };

    draw(0); // first paint before any rAF (hidden tabs, reduced motion)
    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInview(true); // stagger the atlas labels in on scroll
      if (e.isIntersecting && !reduced && !running) {
        running = true;
        raf = requestAnimationFrame(loop);
      } else if (!e.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    }, { rootMargin: "-12% 0px -12% 0px" });
    io.observe(section);

    // reduced motion: redraw only on state change
    let mo: MutationObserver | null = null;
    if (reduced) {
      mo = new MutationObserver(() => draw(0));
      mo.observe(section, { attributes: true, attributeFilter: ["data-active"] });
    }

    return () => {
      io.disconnect();
      mo?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-active={active ?? ""}
      className="relative overflow-hidden bg-bone py-chapter"
      aria-label="Βρείτε προϊόν ανά ανάγκη υγείας"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-chapter px-[clamp(1.2rem,4vw,4.5rem)] lg:grid-cols-[0.95fr_1.05fr]">
        {/* left: the engraved figure with its atlas index */}
        <div className="relative mx-auto w-full max-w-[19rem] select-none">
          <canvas
            ref={canvasRef}
            width={VIEW_W * SCALE}
            height={VIEW_H * SCALE}
            className="block h-auto w-full"
            aria-hidden
          />
          <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="absolute inset-0 h-full w-full overflow-visible">
            {bodyRegions.map((r, i) => {
              const a = ANCHORS[r.id];
              if (!a) return null;
              const on = active === r.id;
              const dotX = a.x + (a.side === "L" ? -a.r * 0.55 : a.r * 0.55);
              const bendX = a.side === "L" ? a.x - a.r - 6 : a.x + a.r + 6;
              const ly = LABEL_Y[r.id] ?? a.y;
              const lineEndX = a.side === "L" ? 1 : VIEW_W - 1;
              const textX = a.side === "L" ? -1.5 : VIEW_W + 1.5;
              const anchor = a.side === "L" ? "end" : "start";
              return (
                <g
                  key={r.id}
                  className="cursor-pointer"
                  onPointerEnter={() => setActive(r.id)}
                  onClick={() => setActive(r.id)}
                  style={{
                    opacity: inview ? 1 : 0,
                    transition: `opacity 0.6s var(--ease-lab) ${0.15 + i * 0.09}s`,
                  }}
                >
                  {/* elbow leader + labels — hidden on mobile (they'd crop off-screen) */}
                  <polyline
                    points={`${dotX},${a.y} ${bendX},${a.y} ${bendX},${ly} ${lineEndX},${ly}`}
                    fill="none"
                    strokeWidth="0.35"
                    strokeLinejoin="round"
                    className={`hidden lg:block transition-colors duration-300 ${on ? "stroke-amber" : "stroke-parchment"}`}
                  />
                  <circle
                    cx={dotX}
                    cy={a.y}
                    r="1.3"
                    strokeWidth="0.4"
                    className={`transition-colors duration-300 ${on ? "fill-amber stroke-amber" : "fill-parchment stroke-mist"}`}
                  />
                  <text
                    x={textX}
                    y={ly - 1.4}
                    textAnchor={anchor}
                    className={`hidden lg:block font-display italic transition-colors duration-300 ${on ? "fill-amber-deep" : "fill-mist"}`}
                    fontSize="3.6"
                  >
                    {a.n}
                  </text>
                  <text
                    x={textX}
                    y={ly + 3.9}
                    textAnchor={anchor}
                    className={`hidden lg:block transition-colors duration-300 ${on ? "fill-ink" : "fill-slate"}`}
                    fontSize="3.3"
                    style={{ fontWeight: 700 }}
                  >
                    {SHORT[r.id] ?? r.label}
                  </text>
                  {/* generous invisible hit zone; focusable for keyboard users */}
                  <circle
                    cx={a.x}
                    cy={a.y}
                    r={Math.max(a.r, 10)}
                    fill="transparent"
                    tabIndex={0}
                    role="button"
                    aria-label={r.label}
                    aria-pressed={on}
                    onFocus={() => setActive(r.id)}
                    className="outline-offset-4"
                  />
                </g>
              );
            })}
          </svg>

          {/* mobile: tappable region list (the atlas labels are desktop-only) */}
          <ul className="mt-stanza grid grid-cols-2 gap-x-line gap-y-[0.35rem] lg:hidden">
            {bodyRegions.map((r) => {
              const on = active === r.id;
              return (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => setActive(r.id)}
                    aria-pressed={on}
                    className={`flex w-full items-baseline gap-2 py-1 text-left text-[0.9rem] transition-colors ${
                      on ? "text-ink" : "text-mist"
                    }`}
                  >
                    <span className="font-display text-[0.78rem] italic text-mist">{ANCHORS[r.id]?.n}</span>
                    {r.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* right: reveal panel */}
        <div className="flex flex-col justify-center">
          <p className="caption-tag">Τι σας απασχολεί;</p>
          <h2 className="display-md mt-breath max-w-[22ch] text-ink">
            Δείξτε στο σώμα — σας δείχνουμε τα προϊόντα.
          </h2>

          <div className="relative mt-stanza min-h-[10rem]">
            <AnimatePresence mode="wait">
              {region ? (
                <motion.div
                  key={region.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                >
                  <h3 className="subhead text-[1.45rem] text-ink">
                    <span className="mr-breath text-[1.05rem] text-mist">{ANCHORS[region.id]?.n}</span>
                    {region.label}
                  </h3>
                  <ul className="mt-line flex flex-wrap gap-x-verse gap-y-line">
                    {region.categories.map((name) => {
                      const cat = categoryByName(name);
                      if (!cat || cat.count === 0) return null;
                      return (
                        <li key={name}>
                          <Link
                            href={`/proionta?katigoria=${encodeURIComponent(cat.slug)}`}
                            className="filter-tab"
                          >
                            {name}
                            <span className="filter-tab__count">{cat.count}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </motion.div>
              ) : (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-[38ch] text-mist"
                >
                  Περάστε τον δείκτη πάνω από μια περιοχή του σώματος — ή αγγίξτε την — για να δείτε τις
                  κατηγορίες υγείας και πόσα προϊόντα αντιστοιχούν σε καθεμία.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* SEO/keyboard fallback: full category list, visually hidden */}
          <ul className="sr-only">
            {bodyRegions.flatMap((r) => r.categories).map((name) => {
              const cat = categoryByName(name);
              if (!cat) return null;
              return (
                <li key={name}>
                  <Link href={`/proionta?katigoria=${encodeURIComponent(cat.slug)}`}>
                    {name} ({cat.count})
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
