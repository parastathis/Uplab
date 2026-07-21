import type Lenis from "lenis";

/** Module-scoped handle to the active Lenis instance, for in-page anchor nav. */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;
