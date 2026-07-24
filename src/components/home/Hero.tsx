"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

gsap.registerPlugin(ScrollTrigger);

const VISION =
  "Η απόλυτη φυσική ισορροπία ανθρώπου και περιβάλλοντος. Στοιχεία συνδεδεμένα, αμφίδρομα με την υγεία.";

const FRAME_COUNT = 145;
const framePath = (i: number) => `/media/hero-frames/f_${String(i).padStart(3, "0")}.jpg`;

/**
 * Full-viewport hero. Instead of seeking a compressed MP4 on every scroll
 * frame (which stutters), we preload a JPG frame-sequence and blit the nearest
 * decoded frame to a <canvas> from a single rAF loop — the orbit scrubs glass-
 * smooth. Frame target is eased toward, so fast flicks glide rather than snap.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The scroll story runs on every device (desktop + mobile) — the hand
    // orbits and the letters pop up as you scroll, as originally planned. Frames
    // load progressively (eager first batch, then small batches) so mobile
    // isn't hit with 145 decodes at once, and the pin works with native scroll.

    // ── preload frames — first batch eager, rest progressive ──
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loaded = 0;
    const onFrame = () => {
      loaded++;
      if (loaded === 1) drawCover(0); // first paint asap
      if (loaded >= 8) setReady(true);
    };
    const loadFrame = (i: number) =>
      new Promise<void>((res) => {
        const img = new Image();
        img.src = framePath(i + 1);
        images[i] = img;
        img.onload = () => {
          onFrame();
          res();
        };
        img.onerror = () => {
          onFrame();
          res();
        };
      });
    (async () => {
      // eager first 16 for a quick, scrubbable start…
      await Promise.all(Array.from({ length: 16 }, (_, i) => loadFrame(i)));
      // …then stream the rest in small batches so we never fire 145 at once
      for (let i = 16; i < FRAME_COUNT; i += 8) {
        await Promise.all(
          Array.from({ length: Math.min(8, FRAME_COUNT - i) }, (_, k) => loadFrame(i + k))
        );
      }
    })();

    // ── canvas sizing (DPR-aware, cover fit) ──
    let cw = 0,
      ch = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = section.clientWidth;
      ch = section.clientHeight;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawCover(Math.round(state.frame));
    };

    function drawCover(idx: number) {
      const img = images[Math.max(0, Math.min(FRAME_COUNT - 1, idx))];
      if (!img || !img.complete || !img.naturalWidth) return;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw = cw,
        dh = ch,
        dx = 0,
        dy = 0;
      if (ir > cr) {
        dh = ch;
        dw = ch * ir;
        dx = (cw - dw) / 2;
      } else {
        dw = cw;
        dh = cw / ir;
        dy = (ch - dh) / 2;
      }
      ctx!.clearRect(0, 0, cw, ch);
      ctx!.drawImage(img, dx, dy, dw, dh);
    }

    const state = { frame: 0, drawn: -1 };

    // Only spend frames drawing while the hero is on-screen — keeps mobile light
    // once you've scrolled past it (the canvas would otherwise keep blitting).
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      rootMargin: "200px 0px",
    });
    io.observe(section);

    const ctxGsap = gsap.context(() => {
      // one rAF: ease drawn frame toward target, blit only on change
      const render = () => {
        if (!visible) return;
        state.drawn += (state.frame - state.drawn) * 0.18;
        const idx = Math.round(state.drawn);
        drawCover(idx);
      };
      gsap.ticker.add(render);

      resize();
      window.addEventListener("resize", resize);

      if (reduced) {
        drawCover(0);
        return () => {
          gsap.ticker.remove(render);
          window.removeEventListener("resize", resize);
        };
      }

      // ── the scroll story — ONE pinned master timeline owns the pin. As you
      //    scroll: the UPLAB letters pop up, then the copy + CTAs, the scroll
      //    cue fades, and the 145-frame hand-orbit scrubs (onUpdate → eased
      //    render loop). This is the original planned behaviour. ──
      const vh = window.innerHeight || 800;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${vh * 2.6}`,
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => {
            state.frame = self.progress * (FRAME_COUNT - 1);
          },
        },
      });

      tl.fromTo(
        section.querySelectorAll("[data-letter]"),
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.05, ease: "power3.out", duration: 0.28 },
        0
      )
        .fromTo(
          section.querySelectorAll("[data-hero-copy]"),
          { y: 46, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, ease: "power2.out", duration: 0.22 },
          0.22
        )
        .to(
          section.querySelector("[data-hero-scrollcue]"),
          { opacity: 0, duration: 0.12 },
          0.14
        )
        .to({}, { duration: 0.5 });

      return () => {
        gsap.ticker.remove(render);
        window.removeEventListener("resize", resize);
      };
    }, section);

    return () => {
      io.disconnect();
      ctxGsap.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Uplab Pharmaceuticals"
      className="relative min-h-[100svh] w-full overflow-hidden bg-sky lg:h-[100dvh] lg:min-h-0"
    >
      {/* poster underneath the canvas until frames decode — no flash of empty */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/hero-still.png"
        alt=""
        aria-hidden
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />

      {/* ink veils for legibility */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32vh] bg-gradient-to-b from-ink/45 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38vh] bg-gradient-to-t from-ink/55 to-transparent" aria-hidden />

      <div className="relative z-10 flex h-full flex-col justify-between px-[clamp(1.2rem,4vw,4.5rem)] pb-verse pt-[calc(var(--nav-h)+2rem)]">
        <h1 className="display-xl mt-[4vh] flex overflow-hidden text-porcelain" aria-label="UPLAB">
          {"UPLAB".split("").map((ch, i) => (
            <span key={i} data-letter aria-hidden className="inline-block will-change-transform">
              {ch}
            </span>
          ))}
        </h1>

        <div className="mb-[5vh] flex flex-wrap items-end justify-between gap-stanza">
          <p
            data-hero-copy
            className="max-w-[26ch] font-display text-[clamp(1.05rem,1.9vw,1.5rem)] italic leading-snug text-porcelain/90"
          >
            {VISION}
          </p>
          <div data-hero-copy className="flex flex-wrap items-center gap-x-verse gap-y-line">
            <Link href="/proionta" className="btn-solid group">
              <span>Τα προϊόντα μας</span>
              <span className="btn-arrow" aria-hidden>→</span>
            </Link>
            <Link href="/simeia-polisis" className="btn-line group text-porcelain">
              <span>Βρείτε φαρμακείο</span>
              <span className="btn-line__arrow" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div
        data-hero-scrollcue
        className="pointer-events-none absolute bottom-verse left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-porcelain/70"
        aria-hidden
      >
        <span className="caption-tag !text-porcelain/60 !text-[0.62rem]">Κυλήστε</span>
        <span className="h-9 w-px bg-porcelain/40">
          <span className="block h-3 w-px animate-hero-cue bg-porcelain" />
        </span>
      </div>
    </section>
  );
}
