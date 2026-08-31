import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticLink } from "../ui/MagneticButton";
import { scrollToTarget } from "@/lib/SmoothScroll";
import { usePrefersReducedMotion } from "@/lib/hooks";

// clustered in the right third, around the 3D mark — clear of the text column
const FRAMES = [
  { label: "Food", x: "56%", y: "15%", d: 0.2 },
  { label: "Fashion", x: "83%", y: "24%", d: 0.35 },
  { label: "Brands", x: "88%", y: "52%", d: 0.5 },
  { label: "Hospitality", x: "64%", y: "70%", d: 0.65 },
  { label: "Products", x: "84%", y: "80%", d: 0.8 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -120]);
  const leftX = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -160]);
  const rightX = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 160]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const ghostY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 160]);

  return (
    <section ref={ref} className="relative min-h-[90svh] overflow-hidden sm:min-h-[100svh]">
      {/* giant ghost wordmark */}
      <motion.span
        aria-hidden
        style={{ y: ghostY }}
        className="pointer-events-none absolute left-1/2 top-[46%] hidden -translate-x-1/2 -translate-y-1/2 select-none font-display text-[26vw] font-bold leading-none tracking-tightest text-white/[0.035] sm:block"
      >
        MOVEXA
      </motion.span>

      {/* floating category frames */}
      {FRAMES.map((f) => (
        <motion.div
          key={f.label}
          aria-hidden
          className="absolute hidden md:block"
          style={{ left: f.x, top: f.y, opacity: fade }}
          initial={reduced ? undefined : { opacity: 0, y: 30 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + f.d, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            animate={reduced ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: 6 + f.d * 3, repeat: Infinity, ease: "easeInOut" }}
            className="glass flex h-24 w-40 items-end rounded-lg p-3"
            style={{
              backgroundImage:
                "radial-gradient(100% 100% at 0% 0%, rgba(108,59,255,0.35), transparent 60%)",
            }}
          >
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-white/70">
              {f.label}
            </span>
          </motion.div>
        </motion.div>
      ))}

      <div className="container-x relative flex min-h-[90svh] flex-col justify-end pb-14 pt-28 sm:min-h-[100svh] sm:justify-center sm:pb-0">
        <motion.p
          className="eyebrow !tracking-[0.16em] sm:!tracking-[0.28em]"
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Creative Media × Digital Marketing
        </motion.p>

        <motion.h1
          style={{ y: titleY }}
          className="mt-4 font-display font-bold display-hero sm:mt-5"
        >
          <motion.span
            className="block"
            style={{ x: leftX }}
            initial={reduced ? undefined : { opacity: 0, y: 40 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            WE CREATE
          </motion.span>
          <motion.span
            className="block text-gradient"
            style={{ x: rightX }}
            initial={reduced ? undefined : { opacity: 0, y: 40 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            ATTENTION.
          </motion.span>
        </motion.h1>

        <motion.p
          className="mt-5 max-w-xl text-[0.95rem] text-muted sm:mt-8 sm:text-lg"
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8 }}
        >
          MOVEXA MEDIA helps brands turn ideas into cinematic content, powerful social
          campaigns and visuals people actually stop to watch.
        </motion.p>

        <motion.div
          className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 [&>a]:w-full sm:[&>a]:w-auto"
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <MagneticLink
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget("#contact");
            }}
            cursor="open"
          >
            Start a Project ↗
          </MagneticLink>
          <MagneticLink
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget("#work");
            }}
            variant="outline"
            cursor="explore"
          >
            View Our Work ↓
          </MagneticLink>
        </motion.div>
      </div>

      {/* scroll label */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted [writing-mode:vertical-rl]">
          Scroll to explore
        </span>
        <span className="h-12 w-px bg-gradient-to-b from-magenta to-transparent" />
      </motion.div>
    </section>
  );
}
