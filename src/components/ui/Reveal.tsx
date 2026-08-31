import { createElement, ElementType, ReactNode, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fade + rise, once, when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 34,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? undefined : { opacity: 0, y }}
      animate={inView && !reduced ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const wordVariants: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.8, ease: EASE, delay: i * 0.055 },
  }),
};

/** Word-by-word masked heading reveal. Pass plain text. */
export function RevealText({
  text,
  as = "h2",
  className = "",
}: {
  text: string;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return createElement(as, { ref, className }, text);
  }

  return createElement(
    as,
    { ref, className },
    words.map((w, i) => (
      <span key={i} className="inline-block overflow-hidden align-bottom">
        <motion.span
          className="inline-block"
          custom={i}
          variants={wordVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      </span>
    )),
  );
}
