import { Section } from "../ui/Section";
import { RevealText, Reveal } from "../ui/Reveal";
import { MediaFrame } from "../ui/MediaFrame";
import { coconutIslandReels, realEstateReels, socialReels, ytThumb } from "@/data/reels";

/**
 * Behind-the-scenes gallery. Uses real campaign frames by default; drop proper
 * BTS photos into `public/about/` (camera.jpg / monitor.jpg / lighting.jpg /
 * editing.jpg) and set `useLocal` to true to swap them in.
 */
const USE_LOCAL_PHOTOS = false;

const TILES = [
  { local: "camera.jpg", reel: coconutIslandReels[1], label: "On location", tint: ["#6C3BFF", "#D728A9"] },
  { local: "monitor.jpg", reel: realEstateReels[0], label: "Direction", tint: ["#3023AE", "#6C3BFF"] },
  { local: "lighting.jpg", reel: socialReels[1], label: "Production", tint: ["#D728A9", "#9328D6"] },
  { local: "editing.jpg", reel: coconutIslandReels[6], label: "Edit & colour", tint: ["#071B55", "#D728A9"] },
] as const;

export function About() {
  return (
    <Section id="about">
      <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="eyebrow">About MOVEXA</span>
          <RevealText
            text="Creativity in motion."
            className="mt-4 font-display font-semibold display-xl"
          />
          <div className="mt-8 space-y-5 text-sm text-muted sm:text-base">
            <Reveal>
              <p>
                MOVEXA MEDIA is a Sri Lankan creative media and digital marketing agency built
                for a world where brands are judged in seconds.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                We combine creative direction, professional production, editing, design and
                social media strategy to create content that doesn't simply look good — it
                earns attention.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                Whether you already have footage or need us to build a campaign from the ground
                up, MOVEXA gives your brand one creative team from concept to delivery.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="mt-8 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-white/60">
              Based in Sri Lanka · Available nationwide
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {TILES.map((t, i) => (
            <Reveal key={t.label} delay={i * 0.06} className={i % 2 === 1 ? "sm:mt-10" : ""}>
              <MediaFrame
                label={t.label}
                image={USE_LOCAL_PHOTOS ? `/about/${t.local}` : ytThumb(t.reel)}
                tint={t.tint as [string, string]}
                aspect="4 / 5"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
