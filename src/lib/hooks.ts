import { useEffect, useMemo, useRef, useState } from "react";

/** Matches a media query, SSR-safe-ish and reactive. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** True on coarse pointers / small screens — used to dial down 3D + effects. */
export function useIsTouch(): boolean {
  return useMediaQuery("(hover: none), (pointer: coarse)");
}

/**
 * Cheap device-capability tier. `low` disables heavy 3D / particles.
 */
export function usePerfTier(): "low" | "high" {
  const reduced = usePrefersReducedMotion();
  const isTouch = useIsTouch();
  const isNarrow = useMediaQuery("(max-width: 820px)");

  return useMemo(() => {
    if (reduced) return "low";
    const cores =
      typeof navigator !== "undefined" && navigator.hardwareConcurrency
        ? navigator.hardwareConcurrency
        : 8;
    const mem =
      typeof navigator !== "undefined" && "deviceMemory" in navigator
        ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8
        : 8;
    if ((isTouch && isNarrow) || cores <= 4 || mem <= 4) return "low";
    return "high";
  }, [reduced, isTouch, isNarrow]);
}

/** Smoothed, normalised (-1..1) pointer position for parallax. */
export function usePointer(smoothing = 0.08) {
  const target = useRef({ x: 0, y: 0 });
  const value = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const tick = () => {
    value.current.x += (target.current.x - value.current.x) * smoothing;
    value.current.y += (target.current.y - value.current.y) * smoothing;
    return value.current;
  };

  return { tick, value, target };
}
