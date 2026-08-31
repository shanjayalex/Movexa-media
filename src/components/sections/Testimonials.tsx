import { useRef } from "react";
import { motion } from "framer-motion";
import { Section, SectionHeading } from "../ui/Section";
import { testimonials } from "@/data/misc";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  return (
    <Section id="testimonials" className="overflow-hidden">
      <div className="container-x">
        <SectionHeading eyebrow="Brands in motion" title="Brands in motion." />
      </div>

      <div
        ref={track}
        className="no-scrollbar mt-14 flex cursor-grab gap-5 overflow-x-auto px-[5vw] pb-6 active:cursor-grabbing"
      >
        {testimonials.map((t, i) => (
          <motion.figure
            key={i}
            data-cursor="drag"
            className="glass flex w-[86vw] shrink-0 flex-col justify-between rounded-2xl p-8 sm:w-[440px]"
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
          >
            <blockquote className="font-display text-xl font-medium leading-snug text-white/90 sm:text-2xl">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-8 border-t border-white/10 pt-5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted">
              {t.name} — {t.company}
              <span className="block text-white/40">{t.industry}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
      <p className="container-x mt-4 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/30">
        Placeholder testimonials — replace with approved client quotes.
      </p>
    </Section>
  );
}
