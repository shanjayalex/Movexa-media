import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { Section } from "../ui/Section";
import { RevealText, Reveal } from "../ui/Reveal";
import { engineOutputs } from "@/data/misc";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks";

function CameraCore({ small = false }: { small?: boolean }) {
  const reduced = usePrefersReducedMotion();
  return (
    <div
      className={`relative z-10 flex items-center justify-center rounded-2xl border border-white/15 bg-brand-radial ${
        small ? "h-28 w-28" : "h-40 w-40"
      }`}
    >
      <motion.div
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-3 rounded-xl border border-white/10"
      />
      <svg viewBox="0 0 48 48" className={small ? "h-12 w-12" : "h-16 w-16"}>
        <rect x="6" y="14" width="26" height="20" rx="3" fill="none" stroke="#fff" strokeWidth="1.6" />
        <path d="M32 20 L42 15 V33 L32 28 Z" fill="none" stroke="#D728A9" strokeWidth="1.6" />
      </svg>
    </div>
  );
}

function EngineNode({
  label,
  x,
  y,
  spread,
  reduced,
}: {
  label: string;
  x: number;
  y: number;
  spread: MotionValue<number>;
  reduced: boolean;
}) {
  const mx = useTransform(spread, [0, 1], [0, x]);
  const my = useTransform(spread, [0, 1], [0, y]);
  const opacity = useTransform(spread, [0, 0.4, 1], [0, 0.4, 1]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 z-10"
      style={reduced ? { x, y } : { x: mx, y: my, opacity }}
    >
      <span className="-translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/12 bg-ink-900/80 px-3 py-1.5 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/80 backdrop-blur-sm">
        {label}
      </span>
    </motion.div>
  );
}

export function ContentEngine() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const narrow = useMediaQuery("(max-width: 720px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const spread = useTransform(scrollYProgress, [0.15, 0.6], [0, 1]);
  const rawX = useTransform(spread, [0, 1], [40, -10]);

  return (
    <Section id="engine" className="overflow-hidden">
      <div ref={ref} className="container-x relative">
        <div className="text-center">
          <span className="eyebrow">MOVEXA content engine</span>
          <RevealText
            text="One shoot. Endless content."
            className="mx-auto mt-4 max-w-4xl font-display font-semibold display-xl"
          />
        </div>

        {narrow ? (
          /* ---- mobile: raw footage → camera → output cloud, with a live signal line ---- */
          <div className="mt-10 flex flex-col items-center">
            <span className="glass rounded-lg px-4 py-2.5 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white/70">
              Raw footage in
            </span>

            <div className="relative h-12 w-px bg-white/12">
              {!reduced &&
                [0, 1, 2].map((k) => (
                  <motion.span
                    key={k}
                    className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-magenta"
                    animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: k * 0.53, ease: "easeIn" }}
                  />
                ))}
            </div>

            <div className="relative">
              {!reduced && (
                <motion.span
                  className="absolute inset-0 rounded-2xl border border-magenta/40"
                  animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <CameraCore small />
            </div>

            <div className="relative h-12 w-px bg-white/12">
              {!reduced &&
                [0, 1, 2, 3].map((k) => (
                  <motion.span
                    key={k}
                    className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-violet-bright"
                    animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: k * 0.35, ease: "easeOut" }}
                  />
                ))}
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {engineOutputs.map((out, i) => (
                <Reveal key={out} delay={i * 0.05}>
                  <span className="rounded-full border border-white/15 bg-ink-900/80 px-3.5 py-2 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-white/85">
                    {out}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        ) : (
          /* ---- desktop: radial explosion ---- */
          <div className="relative mx-auto mt-20 flex min-h-[420px] max-w-5xl items-center justify-center">
            <motion.div
              className="glass absolute left-0 top-1/2 -translate-y-1/2 rounded-lg px-4 py-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/70"
              style={reduced ? undefined : { x: rawX }}
            >
              Raw footage →
            </motion.div>

            <CameraCore />

            {engineOutputs.map((out, i) => {
              const angle = (i / engineOutputs.length) * Math.PI * 2;
              return (
                <EngineNode
                  key={out}
                  label={out}
                  x={Math.cos(angle) * 240}
                  y={Math.sin(angle) * 240 * 0.6}
                  spread={spread}
                  reduced={reduced}
                />
              );
            })}

            <div className="pointer-events-none absolute inset-0 grid place-items-center">
              {[160, 300, 440].map((d) => (
                <div
                  key={d}
                  className="absolute rounded-full border border-white/[0.06]"
                  style={{ width: d, height: d * 0.7 }}
                />
              ))}
            </div>
          </div>
        )}

        <Reveal>
          <p className="mx-auto mt-10 max-w-xl text-center text-muted">
            Turn one production day into weeks of branded content.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
