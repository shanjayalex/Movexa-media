import { CSSProperties, ReactNode } from "react";
import { onThumbError } from "@/data/reels";

/**
 * Media panel. Pass `image` for a real photo / video thumbnail; without one it
 * renders a tinted cinematic placeholder (real MP4/WebM assets drop in later at
 * `public/media/…`).
 */
export function MediaFrame({
  label,
  image,
  tint = ["#6C3BFF", "#D728A9"],
  play = false,
  aspect = "16 / 9",
  className = "",
  children,
}: {
  label?: string;
  image?: string;
  tint?: [string, string];
  play?: boolean;
  aspect?: string;
  className?: string;
  children?: ReactNode;
}) {
  // gradient is always present so a missing / broken image reveals it
  const style: CSSProperties = {
    aspectRatio: aspect,
    backgroundImage: `radial-gradient(120% 120% at 20% 10%, ${tint[0]}55, transparent 55%), radial-gradient(120% 120% at 90% 90%, ${tint[1]}55, transparent 55%), linear-gradient(160deg, #0b0b1c, #060612)`,
  };

  return (
    <div
      className={`group/media relative overflow-hidden rounded-xl border border-white/10 bg-ink-900 ${className}`}
      style={style}
    >
      {image && (
        <img
          src={image}
          alt={label ? `${label} — MOVEXA MEDIA` : "MOVEXA MEDIA work"}
          loading="lazy"
          onError={onThumbError}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-expo group-hover/media:scale-105"
        />
      )}

      <div className="grain-layer pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: image
            ? "linear-gradient(to top, rgba(3,3,10,0.78), rgba(3,3,10,0.08) 55%)"
            : "linear-gradient(to top, rgba(3,3,10,0.7), transparent)",
        }}
      />

      {play && (
        <div className="absolute inset-0 grid place-items-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/5 backdrop-blur-sm transition-transform duration-500 ease-expo group-hover/media:scale-110">
            <span className="ml-1 border-y-[9px] border-l-[15px] border-y-transparent border-l-white" />
          </span>
        </div>
      )}

      {label && (
        <span className="absolute bottom-3 left-3 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-white/80">
          {label}
        </span>
      )}

      {children}
    </div>
  );
}
