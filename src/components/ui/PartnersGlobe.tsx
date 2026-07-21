"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

/**
 * Interactive globe (cobe) marking the European houses Uplab represents
 * exclusively, plus the Athens HQ. Auto-rotates; drag to spin. Tuned to the
 * porcelain/ink palette with amber markers.
 */

// [lat, lng] of each partner country's capital-ish point + Athens HQ
const MARKERS: { location: [number, number]; size: number }[] = [
  { location: [37.98, 23.72], size: 0.11 }, // Athens (HQ)
  { location: [45.81, 15.98], size: 0.06 }, // Zagreb — Apipharma
  { location: [52.23, 21.01], size: 0.07 }, // Warsaw — AronPharma / Biofaktor / Biovico
  { location: [50.08, 14.44], size: 0.06 }, // Prague — Aveflor
  { location: [46.05, 14.51], size: 0.06 }, // Ljubljana — Pharmalinea
  { location: [41.9, 12.5], size: 0.06 }, // Rome — Signorini Medicale
  { location: [56.95, 24.11], size: 0.06 }, // Riga — Silvanols
];

export default function PartnersGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let phi = 4.1; // start centred roughly on Europe
    let width = 0;
    const doublePi = Math.PI * 2;

    // pointer drag
    let pointerDown = false;
    let lastX = 0;
    let dragOffset = 0;
    let autoStopped = false;

    const onResize = () => {
      width = canvas.offsetWidth;
    };
    onResize();
    window.addEventListener("resize", onResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      width: width * 2,
      height: width * 2,
      phi,
      theta: 0.35,
      dark: 0,
      diffuse: 1.1,
      mapSamples: 16000,
      mapBrightness: 5.4,
      baseColor: [0.86, 0.83, 0.77], // parchment landmass
      markerColor: [0.79, 0.5, 0.24], // amber
      glowColor: [0.94, 0.92, 0.88],
      markers: MARKERS,
      onRender: (state) => {
        if (!pointerDown && !autoStopped) phi += 0.0032;
        state.phi = phi + dragOffset;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    const onDown = (e: PointerEvent) => {
      pointerDown = true;
      autoStopped = true;
      lastX = e.clientX;
      canvas.style.cursor = "grabbing";
    };
    const onUp = () => {
      pointerDown = false;
      autoStopped = false;
      phi += dragOffset;
      dragOffset = 0;
      canvas.style.cursor = "grab";
    };
    const onMove = (e: PointerEvent) => {
      if (!pointerDown) return;
      dragOffset = ((e.clientX - lastX) / width) * doublePi * 0.6;
    };
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointermove", onMove);

    // fade in
    requestAnimationFrame(() => (canvas.style.opacity = "1"));

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="aspect-square w-full max-w-[34rem] cursor-grab opacity-0 transition-opacity duration-1000"
      style={{ contain: "layout paint size" }}
      aria-label="Χάρτης Ευρωπαϊκών συνεργατών της Uplab"
    />
  );
}
