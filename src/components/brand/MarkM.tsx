import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The MOVEXA "M" monogram — a bold geometric M with a play triangle cut into
 * its centre valley. Matches /public/brand/movexa-mark.svg exactly.
 *
 * `assemble` (loader / page transitions): false = mark sits slightly scaled +
 * rotated + dim, true = it snaps home. `animated=false` renders it static.
 */
export function MarkM({
  className = "h-9 w-9",
  assemble = true,
  animated = true,
}: {
  className?: string;
  assemble?: boolean;
  animated?: boolean;
}) {
  const M =
    "M5 41 L5 9 Q5 8 6 8 L12 8 Q13 8 13.6 9 L24 24 L34.4 9 Q35 8 36 8 L42 8 Q43 8 43 9 L43 41 Q43 42 42 42 L36 42 Q35 42 35 41 L35 20 L25 33 Q24 34.5 23 33 L13 20 L13 41 Q13 42 12 42 L6 42 Q5 42 5 41 Z";
  const play = "M21 18.5 L31 24 L21 29.5 Z";

  return (
    <svg className={className} viewBox="0 0 48 48" role="img" aria-label="MOVEXA MEDIA">
      <defs>
        <linearGradient id="mvx-grad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#071B55" />
          <stop offset="38%" stopColor="#3023AE" />
          <stop offset="66%" stopColor="#6C3BFF" />
          <stop offset="100%" stopColor="#D728A9" />
        </linearGradient>
        <mask id="mvx-mask">
          <rect width="48" height="48" fill="white" />
          <path d={play} fill="black" />
        </mask>
      </defs>
      <motion.path
        d={M}
        fill="url(#mvx-grad)"
        mask="url(#mvx-mask)"
        style={{ transformOrigin: "24px 24px" }}
        initial={animated ? { scale: 0.7, rotate: -14, opacity: 0 } : false}
        animate={{
          scale: assemble ? 1 : 0.86,
          rotate: assemble ? 0 : -8,
          opacity: assemble ? 1 : 0.45,
        }}
        transition={{ duration: 0.7, ease: EASE }}
      />
    </svg>
  );
}
