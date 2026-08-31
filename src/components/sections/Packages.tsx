import { Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { MagneticLink } from "../ui/MagneticButton";
import { packages } from "@/data/misc";

export function Packages() {
  return (
    <Section id="packages">
      <div className="container-x">
        <SectionHeading
          eyebrow="Monthly content packages"
          title="Content that doesn't stop."
        />

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.08} className="h-full">
              <div
                className={`glass relative flex h-full flex-col rounded-2xl p-8 ${
                  p.popular ? "border-magenta/40" : ""
                }`}
              >
                {p.popular && (
                  <span className="absolute right-6 top-6 rounded-full bg-brand-gradient px-3 py-1 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-3xl font-semibold">{p.name}</h3>
                <p className="mt-3 text-sm text-muted">{p.for}</p>

                <ul className="mt-7 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white/85">
                      <span className="h-1 w-1 rounded-full bg-magenta" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <MagneticLink
                    href="#contact"
                    variant={p.popular ? "solid" : "outline"}
                    cursor="open"
                    className="w-full"
                  >
                    Build My Package →
                  </MagneticLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-sm text-muted">
            Every business is different. Packages can be customized around your goals.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
