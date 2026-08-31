import { ReactNode, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { MarkM } from "./brand/MarkM";

/**
 * Route-change wipe: a dark panel with the MOVEXA mark drops to cover the
 * viewport, the route swaps underneath, then it retracts upward. Skips the
 * first mount (the loader covers that) and honours reduced-motion.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const reduced = usePrefersReducedMotion();
  const prev = useRef(location.pathname);
  const [covering, setCovering] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (prev.current === location.pathname) return;
    prev.current = location.pathname;
    setCovering(true);
    window.scrollTo(0, 0);
    const t = window.setTimeout(() => setCovering(false), 620);
    return () => window.clearTimeout(t);
  }, [location.pathname, reduced]);

  return (
    <>
      {children}
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[1500] flex items-center justify-center bg-ink-950"
          initial={{ y: "-100%" }}
          animate={{ y: covering ? "0%" : "-100%" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <MarkM className="h-16 w-16" animated={false} />
        </motion.div>
      )}
    </>
  );
}
