import { useRef, useState } from "react";
import { Section } from "../ui/Section";
import { RevealText, Reveal } from "../ui/Reveal";
import { useIsTouch, usePrefersReducedMotion } from "@/lib/hooks";

const LEFT = {
  kicker: "Option A",
  title: "Send us your footage",
  copy: "Already have videos? Upload your raw footage and our creative team will transform it into polished social content.",
  list: [
    "Professional editing",
    "Colour grading",
    "Sound design",
    "Captions",
    "Motion graphics",
    "Social optimization",
  ],
  cta: "Send Footage →",
};
const RIGHT = {
  kicker: "Option B",
  title: "We come to you",
  copy: "Need the entire production handled? MOVEXA can travel anywhere in Sri Lanka to plan, shoot and create your campaign.",
  list: [
    "Creative planning",
    "Professional filming",
    "Photography",
    "Lighting",
    "Direction",
    "Editing",
    "Final content delivery",
  ],
  cta: "Book a Shoot →",
};

export function TwoWays() {
  const ref = useRef<HTMLDivElement>(null);
  const [split, setSplit] = useState(50);
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const interactive = !isTouch && !reduced;

  const onMove = (e: React.PointerEvent) => {
    if (!interactive || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const pct = ((e.clientX - r.left) / r.width) * 100;
    setSplit(Math.max(24, Math.min(76, pct)));
  };

  return (
    <Section id="two-ways">
      <div className="container-x">
        <span className="eyebrow">Two ways to work with us</span>
        <RevealText
          text="Your footage. Or our cameras."
          className="mt-4 font-display font-semibold display-xl"
        />
      </div>

      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={() => interactive && setSplit(50)}
        className="relative mt-10 grid overflow-hidden border-y border-white/10 sm:mt-14 md:h-[68vh] md:grid-cols-[var(--l)_var(--r)]"
        style={
          {
            "--l": `${split}%`,
            "--r": `${100 - split}%`,
          } as React.CSSProperties
        }
      >
        {[LEFT, RIGHT].map((panel, i) => (
          <div
            key={panel.title}
            className={`relative flex flex-col justify-center gap-6 px-5 py-9 sm:p-14 ${
              i === 1 ? "border-t border-white/10 md:border-t-0" : ""
            }`}
            style={{
              backgroundImage:
                i === 0
                  ? "radial-gradient(90% 90% at 10% 20%, rgba(48,35,174,0.35), transparent 60%), linear-gradient(160deg,#08081a,#050510)"
                  : "radial-gradient(90% 90% at 90% 80%, rgba(215,40,169,0.32), transparent 60%), linear-gradient(160deg,#0a0713,#050510)",
            }}
          >
            <div className="grain-layer pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay" />
            <Reveal className="relative">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-white/50">
                {panel.kicker}
              </span>
              <h3 className="mt-3 font-display text-3xl font-semibold sm:text-5xl">{panel.title}</h3>
              <p className="mt-4 max-w-md text-sm text-muted sm:text-base">{panel.copy}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {panel.list.map((l) => (
                  <li
                    key={l}
                    className="rounded-full border border-white/12 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/70"
                  >
                    {l}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                data-cursor="open"
                className="mt-7 inline-flex items-center gap-2 self-start rounded-full border border-white/25 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-white transition-colors hover:border-white/70 hover:bg-white/[0.05] sm:mt-8"
              >
                {panel.cta}
              </a>
            </Reveal>
          </div>
        ))}

        {/* divider */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 hidden w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-magenta to-transparent shadow-[0_0_20px_rgba(215,40,169,0.9)] md:block"
          style={{ left: `${split}%` }}
        />
      </div>
    </Section>
  );
}
