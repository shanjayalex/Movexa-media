import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getProject, projects } from "@/data/portfolio";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Reveal, RevealText } from "@/components/ui/Reveal";
import { MagneticLink } from "@/components/ui/MagneticButton";
import { openReels } from "@/components/ui/ReelPlayer";
import { ytThumb, onThumbError } from "@/data/reels";

const BLOCKS = [
  ["The challenge", "challenge"],
  ["The idea", "idea"],
  ["The production", "production"],
  ["The content", "content"],
  ["The result", "result"],
] as const;

export default function CaseStudy() {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <main className="container-x flex min-h-[70vh] flex-col items-center justify-center text-center">
        <h1 className="font-display text-4xl font-semibold">Project not found</h1>
        <Link to="/" className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-magenta">
          ← Back home
        </Link>
      </main>
    );
  }

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <main className="pt-28">
      <div className="container-x">
        <Link
          to="/"
          onClick={() => setTimeout(() => document.getElementById("work")?.scrollIntoView(), 60)}
          data-cursor="hover"
          className="font-mono text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white"
        >
          ← All work
        </Link>

        <RevealText
          text={project.title}
          as="h1"
          className="mt-6 font-display font-semibold display-hero"
        />

        <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-white/10 py-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] sm:grid-cols-4">
          {[
            ["Client", project.client],
            ["Industry", project.industry],
            ["Services", project.tags.join(", ")],
            ["Year", project.year],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-white/40">{k}</dt>
              <dd className="mt-1 text-white/90">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="container-x mt-10">
        <MediaFrame
          label={`${project.title} — hero film`}
          image={project.reels ? ytThumb(project.reels[0]) : undefined}
          tint={project.tint}
          aspect="16 / 9"
          play
        >
          {project.reels && (
            <button
              onClick={() => openReels(project.reels!, 0)}
              data-cursor="play"
              aria-label="Play reels"
              className="absolute inset-0"
            />
          )}
        </MediaFrame>
      </div>

      {project.reels && (
        <section className="container-x mt-24">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-mono text-xs uppercase tracking-[0.28em] text-magenta">
              The content — {project.reels.length} reels
            </h2>
            <button
              onClick={() => openReels(project.reels!, 0)}
              data-cursor="play"
              className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/70 hover:text-white"
            >
              Play all →
            </button>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {project.reels.map((id, n) => (
              <button
                key={id}
                onClick={() => openReels(project.reels!, n)}
                data-cursor="play"
                className="group relative aspect-[9/16] overflow-hidden rounded-lg border border-white/10 bg-ink-900"
              >
                <img
                  src={ytThumb(id)}
                  alt={`${project.title} reel ${n + 1}`}
                  loading="lazy"
                  onError={onThumbError}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-black/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <span className="ml-0.5 border-y-[6px] border-l-[10px] border-y-transparent border-l-white" />
                  </span>
                </span>
                <span className="absolute bottom-2 left-2 font-mono text-[0.55rem] tracking-[0.16em] text-white/70">
                  {String(n + 1).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/35">
            Real delivered content · plays from YouTube
          </p>
        </section>
      )}

      <div className="container-x mt-24 space-y-24">
        {BLOCKS.map(([label, key], i) => (
          <section key={key} className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <h2 className="font-mono text-xs uppercase tracking-[0.28em] text-magenta">{label}</h2>
              <p className="mt-5 text-lg text-white/85 sm:text-xl">{project[key]}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <MediaFrame
                label={label}
                image={project.reels ? ytThumb(project.reels[(i + 2) % project.reels.length]) : undefined}
                tint={project.tint}
                aspect={i % 2 ? "4 / 3" : "16 / 10"}
              />
            </Reveal>
          </section>
        ))}
      </div>

      <div className="container-x mt-32 border-t border-white/10 pt-10">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
          Next project
        </span>
        <div className="mt-4 flex items-center justify-between gap-6">
          <Link
            to={`/work/${next.slug}`}
            data-cursor="view"
            className="font-display text-3xl font-semibold tracking-tightest hover:text-gradient sm:text-6xl"
          >
            {next.title}
          </Link>
          <MagneticLink href={`/work/${next.slug}`} variant="outline" cursor="view">
            View →
          </MagneticLink>
        </div>
      </div>
    </main>
  );
}
