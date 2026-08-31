import { useRef } from "react";
import { useInView } from "framer-motion";
import { usePerfTier, usePrefersReducedMotion } from "@/lib/hooks";
import { ytLoopEmbed, ytThumbLandscape, onThumbError } from "@/data/reels";

/**
 * Full-bleed, muted, looping YouTube video sitting behind a section.
 * Lazy-mounts when the section nears the viewport; falls back to a poster
 * image on reduced-motion. Purely decorative — pointer-events off, aria-hidden.
 */
export function VideoBackdrop({
  id,
  className = "",
  overlay = "bg-ink-950/55",
}: {
  id: string;
  className?: string;
  /** dark scrim on top of the video so foreground text stays readable */
  overlay?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "40% 0px 40% 0px" });
  const reduced = usePrefersReducedMotion();
  const tier = usePerfTier();
  const play = inView && !reduced && tier === "high";

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-ink-950 ${className}`}
    >
      {play ? (
        <iframe
          className="absolute left-1/2 top-1/2 h-[100svh] w-[177.78svh] min-w-full -translate-x-1/2 -translate-y-1/2 scale-[1.25]"
          src={ytLoopEmbed(id)}
          title=""
          allow="autoplay; encrypted-media; picture-in-picture"
          loading="lazy"
          tabIndex={-1}
        />
      ) : (
        <img
          src={ytThumbLandscape(id)}
          onError={onThumbError}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="grain-layer absolute inset-0 opacity-[0.08] mix-blend-overlay" />
    </div>
  );
}
