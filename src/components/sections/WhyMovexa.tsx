import { Section } from "../ui/Section";
import { RevealText, Reveal } from "../ui/Reveal";
import { whyPoints } from "@/data/misc";

export function WhyMovexa() {
  return (
    <Section id="why">
      <div className="container-x">
        <RevealText
          text="Content is everywhere. Attention isn't."
          className="max-w-5xl font-display font-semibold display-xl"
        />

        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {whyPoints.map((p, i) => (
            <Reveal key={p.no} delay={i * 0.07} className="h-full">
              <div className="group flex h-full flex-col bg-ink-950 p-8 transition-colors duration-300 hover:bg-ink-900">
                <span className="font-mono text-xs tracking-[0.3em] text-magenta">{p.no}</span>
                <h3 className="mt-6 font-display text-2xl font-semibold">{p.title}</h3>
                <p className="mt-3 text-sm text-muted">{p.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
