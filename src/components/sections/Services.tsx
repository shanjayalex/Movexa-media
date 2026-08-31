import { useRef } from "react";
import { motion } from "framer-motion";
import { Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { services, type Service } from "@/data/services";
import { useIsTouch, usePrefersReducedMotion } from "@/lib/hooks";

function ServiceVisual({ kind }: { kind: Service["visual"] }) {
  const common = "absolute inset-0";
  const spin = { rotate: 360 };
  const t = { duration: 26, repeat: Infinity, ease: "linear" as const };

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 bg-brand-radial opacity-70" />
      {kind === "camera" && (
        <svg viewBox="0 0 120 120" className={common}>
          <motion.g animate={spin} transition={t} style={{ transformOrigin: "60px 60px" }}>
            <circle cx="60" cy="60" r="34" fill="none" stroke="#6C3BFF" strokeWidth="1.5" />
            <circle cx="60" cy="60" r="22" fill="none" stroke="#D728A9" strokeWidth="1.5" />
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={i}
                x1="60"
                y1="60"
                x2={60 + 34 * Math.cos((i * Math.PI) / 4)}
                y2={60 + 34 * Math.sin((i * Math.PI) / 4)}
                stroke="#ffffff22"
              />
            ))}
          </motion.g>
          <rect x="44" y="26" width="32" height="10" rx="2" fill="#D728A9" />
        </svg>
      )}
      {kind === "orbit" && (
        <svg viewBox="0 0 120 120" className={common}>
          <circle cx="60" cy="60" r="10" fill="#6C3BFF" />
          {[22, 34, 46].map((r, i) => (
            <motion.g
              key={r}
              animate={spin}
              transition={{ ...t, duration: 14 + i * 8, direction: i % 2 ? "reverse" : "normal" }}
              style={{ transformOrigin: "60px 60px" }}
            >
              <ellipse cx="60" cy="60" rx={r} ry={r * 0.5} fill="none" stroke="#ffffff22" />
              <rect x={60 + r - 4} y="56" width="8" height="8" rx="1.5" fill="#D728A9" />
            </motion.g>
          ))}
        </svg>
      )}
      {kind === "timeline" && (
        <svg viewBox="0 0 120 120" className={common}>
          {[30, 45, 60, 75, 90].map((y, i) => (
            <motion.rect
              key={y}
              x="14"
              y={y - 5}
              width="92"
              height="8"
              rx="2"
              fill={i === 2 ? "#D728A9" : "#ffffff18"}
              animate={{ x: [14, 14 - (i % 2 ? 8 : -8), 14] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </svg>
      )}
      {kind === "shutter" && (
        <svg viewBox="0 0 120 120" className={common}>
          <motion.g animate={{ rotate: [0, 40, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "60px 60px" }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <path
                key={i}
                d="M60 60 L60 18 A42 42 0 0 1 96 40 Z"
                fill={i % 2 ? "#6C3BFF88" : "#D728A988"}
                transform={`rotate(${i * 60} 60 60)`}
              />
            ))}
          </motion.g>
        </svg>
      )}
      {kind === "grid" && (
        <svg viewBox="0 0 120 120" className={common}>
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.rect
              key={i}
              x={18 + (i % 3) * 30}
              y={18 + Math.floor(i / 3) * 30}
              width="24"
              height="24"
              rx="3"
              fill={i % 4 === 0 ? "#D728A9" : "#ffffff14"}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </svg>
      )}
      {kind === "target" && (
        <svg viewBox="0 0 120 120" className={common}>
          {[40, 28, 16].map((r, i) => (
            <circle key={r} cx="60" cy="60" r={r} fill="none" stroke={i === 2 ? "#D728A9" : "#ffffff22"} strokeWidth="1.5" />
          ))}
          <motion.circle cx="60" cy="60" r="4" fill="#D728A9" animate={{ scale: [1, 1.6, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.line x1="60" y1="10" x2="60" y2="110" stroke="#ffffff22" animate={{ rotate: 360 }} transition={t} style={{ transformOrigin: "60px 60px" }} />
        </svg>
      )}
    </div>
  );
}

function Card({ s, index }: { s: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    if (isTouch || reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
    ref.current.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  };

  return (
    <Reveal delay={(index % 2) * 0.08} className="h-full">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        data-cursor="hover"
        className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-[transform,border-color] duration-300 ease-expo hover:border-white/25 sm:p-9"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-magenta">{s.no}</span>
            <h3 className="mt-3 font-display text-2xl font-semibold sm:text-3xl">{s.title}</h3>
          </div>
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10">
            <ServiceVisual kind={s.visual} />
          </div>
        </div>

        <p className="mt-5 max-w-md text-sm text-muted sm:text-base">{s.blurb}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {s.includes.map((i) => (
            <li
              key={i}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/70"
            >
              {i}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <span className="inline-block h-px w-0 bg-brand-gradient transition-all duration-500 ease-expo group-hover:w-full" />
        </div>
      </div>
    </Reveal>
  );
}

export function Services() {
  return (
    <Section id="services">
      <div className="container-x">
        <SectionHeading
          eyebrow="What we do"
          title="From idea to impact."
          intro="MOVEXA combines strategy, production, design and social media marketing under one creative team."
        />
        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Card key={s.no} s={s} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
