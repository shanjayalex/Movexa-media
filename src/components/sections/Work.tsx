import { Link } from "react-router-dom";
import { Section, SectionHeading } from "../ui/Section";
import { Reveal } from "../ui/Reveal";
import { MediaFrame } from "../ui/MediaFrame";
import { projects } from "@/data/portfolio";
import { ytThumb } from "@/data/reels";

const spanClass: Record<string, string> = {
  wide: "sm:col-span-7",
  tall: "sm:col-span-5 sm:row-span-2",
  std: "sm:col-span-5",
};

export function Work() {
  return (
    <Section id="work">
      <div className="container-x">
        <SectionHeading eyebrow="Stories we've helped move" title="Selected work." />

        <div className="mt-16 grid auto-rows-min gap-5 sm:grid-cols-12">
          {projects.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={(i % 3) * 0.06}
              className={`${spanClass[p.span]} col-span-1`}
            >
              <Link
                to={`/work/${p.slug}`}
                data-cursor="view"
                className="group block"
              >
                <MediaFrame
                  label={`${p.no} — ${p.tags.join(" / ")}`}
                  image={p.reels ? ytThumb(p.reels[0]) : undefined}
                  tint={p.tint}
                  aspect={p.span === "tall" ? "4 / 5" : "16 / 10"}
                >
                  {p.reels && (
                    <span className="absolute right-3 top-3 rounded-full border border-white/25 bg-black/40 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
                      {p.reels.length} reels
                    </span>
                  )}
                  <div className="absolute inset-x-0 bottom-0 translate-y-4 p-5 opacity-0 transition-all duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm text-white/70">{p.summary}</p>
                  </div>
                </MediaFrame>
                <div className="mt-3 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-lg font-medium">{p.title}</h3>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted">
                    {p.industry} · {p.year}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
