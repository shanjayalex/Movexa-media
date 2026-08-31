import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { industries } from "@/data/industries";
import { industriesBgId } from "@/data/reels";
import { usePrefersReducedMotion, useIsTouch } from "@/lib/hooks";
import { RevealText } from "../ui/Reveal";
import { VideoBackdrop } from "../ui/VideoBackdrop";

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
          ? "h-[52vh] min-h-[360px] w-[86vw] snap-center rounded-2xl border border-white/10"
          : "h-screen w-screen"
      }`}
      style={{
        // translucent so the video backdrop reads through — heavier, even scrim on
        // the mobile card; a lighter left-weighted one for the desktop wide panel
        backgroundImage: simple
          ? `radial-gradient(85% 80% at 15% 25%, ${ind.tint[0]}33, transparent 60%), linear-gradient(180deg, rgba(3,3,10,0.86) 0%, rgba(3,3,10,0.6) 45%, rgba(4,4,12,0.8) 100%)`
          : `radial-gradient(70% 90% at 12% 30%, ${ind.tint[0]}30, transparent 60%), radial-gradient(80% 90% at 92% 88%, ${ind.tint[1]}2b, transparent 55%), linear-gradient(102deg, rgba(3,3,10,0.85) 0%, rgba(3,3,10,0.48) 46%, rgba(6,5,18,0.18) 100%)`,
      }}
    >
      <span className="pointer-events-none absolute right-5 top-5 font-mono text-[0.6rem] tracking-[0.3em] text-white/40 sm:right-6 sm:top-6">
        {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
      </span>
      <div
        className={`relative ${simple ? "px-6" : "container-x"}`}
        style={{ textShadow: "0 2px 30px rgba(0,0,0,0.9), 0 0 10px rgba(0,0,0,0.55)" }}
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/80">{ind.name}</span>
        <h3 className="mt-4 max-w-4xl font-display font-semibold display-xl sm:mt-6">
          “{ind.line}”
        </h3>
        <p className="mt-4 max-w-md text-sm text-white/85 sm:mt-6 sm:text-base">{ind.note}</p>
      </div>
    </article>
  );

  if (simple) {
    return (
      <section id="industries" className="relative overflow-hidden py-20">
        <VideoBackdrop id={industriesBgId} overlay="bg-ink-950/72" />
        {/* extra darkening behind the heading */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[22rem] bg-gradient-to-b from-ink-950 from-30% via-ink-950/88 to-transparent" />
        <div
          className="container-x relative"
          style={{ textShadow: "0 2px 28px rgba(0,0,0,0.9)" }}
        >
          <span className="eyebrow">Built for</span>
          <RevealText
            text="Built for modern brands."
            className="mt-4 font-display font-semibold display-xl"
          />
        </div>
        <div className="no-scrollbar relative mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[8vw] pb-6">
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
        <VideoBackdrop id={industriesBgId} overlay="bg-ink-950/48" />
        <div
          className="container-x absolute left-0 top-0 z-10 pt-24"
          style={{ textShadow: "0 2px 28px rgba(0,0,0,0.85)" }}
        >
          <span className="eyebrow">Built for</span>
          <RevealText
            text="Built for modern brands."
            className="mt-3 font-display font-semibold display-xl"
          />
        </div>
        <motion.div style={{ x }} className="relative z-[5] flex h-full w-max">
          {industries.map((ind, i) => (
            <Panel key={ind.key} ind={ind} i={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
