import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { industries } from "@/data/industries";
import { usePrefersReducedMotion, useIsTouch } from "@/lib/hooks";
import { RevealText } from "../ui/Reveal";

export function Industries() {
  const reduced = usePrefersReducedMotion();
  const isTouch = useIsTouch();
  const simple = reduced || isTouch;

  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const n = industries.length;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${((n - 1) / n) * 100}%`]);

  const Panel = ({ ind, i }: { ind: (typeof industries)[number]; i: number }) => (
    <article
      className={`relative flex shrink-0 items-center overflow-hidden ${
        simple
          ? "h-[52vh] min-h-[360px] w-[86vw] snap-center rounded-2xl"
          : "h-screen w-screen"
      }`}
      style={{
        backgroundImage: `radial-gradient(80% 90% at 15% 20%, ${ind.tint[0]}4d, transparent 60%), radial-gradient(90% 90% at 90% 90%, ${ind.tint[1]}4d, transparent 55%), linear-gradient(160deg,#0a0a1a,#050510)`,
      }}
    >
      <div className="grain-layer pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />
      <span className="pointer-events-none absolute right-5 top-5 font-mono text-[0.6rem] tracking-[0.3em] text-white/25 sm:right-6 sm:top-6">
        {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
      </span>
      <div className={simple ? "px-6" : "container-x"}>
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">{ind.name}</span>
        <h3 className="mt-4 max-w-4xl font-display font-semibold display-xl sm:mt-6">“{ind.line}”</h3>
        <p className="mt-4 text-sm text-muted sm:mt-6 sm:text-base">{ind.note}</p>
      </div>
    </article>
  );

  if (simple) {
    return (
      <section id="industries" className="relative overflow-hidden py-20">
        <div className="container-x">
          <span className="eyebrow">Built for</span>
          <RevealText
            text="Built for modern brands."
            className="mt-4 font-display font-semibold display-xl"
          />
        </div>
        <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[8vw] pb-6">
          {industries.map((ind, i) => (
            <Panel key={ind.key} ind={ind} i={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="industries" ref={wrap} style={{ height: `${n * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="container-x absolute left-0 top-0 z-10 pt-24">
          <span className="eyebrow">Built for</span>
          <RevealText
            text="Built for modern brands."
            className="mt-3 font-display font-semibold display-xl"
          />
        </div>
        <motion.div style={{ x }} className="flex h-full w-max">
          {industries.map((ind, i) => (
            <Panel key={ind.key} ind={ind} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
