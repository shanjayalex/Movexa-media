import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Section, SectionHeading } from "../ui/Section";
import { processSteps } from "@/data/misc";
import { usePrefersReducedMotion } from "@/lib/hooks";

export function Approach() {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !root.current || !line.current) return;
    const ctx = gsap.context(() => {
      gsap.to(line.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 65%",
          end: "bottom 80%",
          scrub: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".approach-step").forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          x: -30,
          duration: 0.6,
          scrollTrigger: { trigger: step, start: "top 78%", toggleActions: "play none none reverse" },
        });
        ScrollTrigger.create({
          trigger: step,
          start: "top 60%",
          end: "bottom 60%",
          onToggle: (self) => step.classList.toggle("is-active", self.isActive),
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <Section id="process">
      <div className="container-x">
        <SectionHeading eyebrow="The MOVEXA approach" title="One team. The whole process." />

        <div ref={root} className="relative mt-16 pl-10 sm:pl-16">
          {/* rail */}
          <div className="absolute left-[13px] top-2 h-[calc(100%-1rem)] w-px bg-white/10 sm:left-[23px]" />
          <div
            ref={line}
            className="absolute left-[13px] top-2 h-[calc(100%-1rem)] w-px origin-top scale-y-0 bg-brand-gradient shadow-[0_0_16px_rgba(108,59,255,0.8)] sm:left-[23px]"
          />

          <ol className="space-y-10 sm:space-y-14">
            {processSteps.map((s) => (
              <li key={s.no} className="approach-step group relative">
                <span className="absolute -left-10 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-ink-950 font-mono text-[0.6rem] text-white/70 transition-colors duration-300 [.is-active_&]:border-magenta [.is-active_&]:text-white sm:-left-16 sm:h-12 sm:w-12 sm:text-xs">
                  {s.no}
                </span>
                <h3 className="font-display text-2xl font-semibold text-white/50 transition-colors duration-300 [.is-active_&]:text-white sm:text-4xl">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-md text-sm text-muted sm:text-base">{s.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
