import { useEffect, useLayoutEffect } from "react";

/**
 * useLayoutEffect on the client, useEffect on the server (avoids the SSR
 * warning). Crucially, the *cleanup* of a layout effect runs synchronously
 * during React's mutation phase — BEFORE the DOM nodes are detached — so GSAP
 * ScrollTrigger `pin` spacers get unwrapped (via ctx.revert) before the App
 * Router removes the page. With a plain useEffect the cleanup runs too late and
 * React throws "removeChild: node is not a child of this node" on navigation.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
