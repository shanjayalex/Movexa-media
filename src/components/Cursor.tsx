import { useEffect, useRef, useState } from "react";
import { useIsTouch, usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Custom magnetic cursor. Any element can drive it:
 *   <a data-cursor="view">  -> expands, shows "VIEW"
 *   <button data-cursor="hover"> -> just expands
 * Falls back to the native cursor on touch / reduced-motion.
 */
export function Cursor() {
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string>("");
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(true);

  const disabled = isTouch || reduced;

  useEffect(() => {
    if (disabled) {
      document.body.dataset.cursor = "off";
      return;
    }
    document.body.dataset.cursor = "on";

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf = 0;

    const render = () => {
      ring.x += (pos.x - ring.x) * 0.18;
      ring.y += (pos.y - ring.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      setHidden(false);

      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      if (el) {
        const kind = el.dataset.cursor ?? "hover";
        setActive(true);
        setLabel(kind === "hover" || kind === "on" ? "" : kind.toUpperCase());
      } else {
        setActive(false);
        setLabel("");
      }
    };

    const onLeave = () => setHidden(true);
    const onDown = () => setActive((a) => a || true);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("mouseleave", onLeave);
      delete document.body.dataset.cursor;
    };
  }, [disabled]);

  if (disabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: hidden ? 0 : 1, transition: "opacity 0.3s" }}
    >
      <div
        ref={dotRef}
        className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="absolute flex items-center justify-center rounded-full border border-white/70 font-mono uppercase tracking-[0.2em] text-white mix-blend-difference transition-[width,height,background-color,border-color] duration-300 ease-expo"
        style={{
          width: active ? 84 : 34,
          height: active ? 84 : 34,
          marginLeft: active ? -42 : -17,
          marginTop: active ? -42 : -17,
          fontSize: 10,
          backgroundColor: active && label ? "rgba(255,255,255,0.06)" : "transparent",
        }}
      >
        {label}
      </div>
    </div>
  );
}
