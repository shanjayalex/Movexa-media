import { ButtonHTMLAttributes, AnchorHTMLAttributes, useRef, ReactNode } from "react";
import { useIsTouch, usePrefersReducedMotion } from "@/lib/hooks";

type Common = {
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  strength?: number;
  className?: string;
  cursor?: string;
};

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-300 ease-expo will-change-transform";

const variants = {
  solid: "bg-white text-ink-950 hover:bg-white/90",
  outline: "border border-white/25 text-white hover:border-white/70 hover:bg-white/[0.04]",
  ghost: "text-white/80 hover:text-white",
};

function useMagnet(strength: number) {
  const ref = useRef<HTMLElement>(null);
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const disabled = isTouch || reduced;

  const onMove = (e: React.PointerEvent) => {
    if (disabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };

  return { ref, onMove, reset };
}

export function MagneticButton({
  children,
  variant = "solid",
  strength = 0.28,
  className = "",
  cursor = "hover",
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { ref, onMove, reset } = useMagnet(strength);
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      data-cursor={cursor}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`${base} ${variants[variant]} ${className}`}
      style={{ transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), background-color 0.3s, border-color 0.3s" }}
      {...rest}
    >
      {children}
    </button>
  );
}

export function MagneticLink({
  children,
  variant = "solid",
  strength = 0.28,
  className = "",
  cursor = "hover",
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { ref, onMove, reset } = useMagnet(strength);
  return (
    <a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      data-cursor={cursor}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`${base} ${variants[variant]} ${className}`}
      style={{ transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), background-color 0.3s, border-color 0.3s" }}
      {...rest}
    >
      {children}
    </a>
  );
}
