import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";
import { usePrefersReducedMotion } from "./hooks";

/**
 * Wraps the app in Lenis smooth-scroll and keeps GSAP ScrollTrigger in sync.
 * Skips smoothing entirely when the user prefers reduced motion.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onRaf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onRaf);
    gsap.ticker.lagSmoothing(0);

    // expose for anchor links / programmatic scrolls
    (window as Window & { lenis?: Lenis }).lenis = lenis;

    return () => {
      gsap.ticker.remove(onRaf);
      lenis.destroy();
      delete (window as Window & { lenis?: Lenis }).lenis;
    };
  }, [reduced]);

  return <>{children}</>;
}

/** Smoothly scroll to a selector or Y offset, Lenis-aware. */
export function scrollToTarget(target: string | number) {
  const lenis = (window as Window & { lenis?: Lenis }).lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset: -1, duration: 1.2 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  }
}
