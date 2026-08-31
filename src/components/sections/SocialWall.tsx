import { motion } from "framer-motion";
import { Section } from "../ui/Section";
import { RevealText, Reveal } from "../ui/Reveal";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { allReels, ytThumb, onThumbError } from "@/data/reels";
import { openReels } from "../ui/ReelPlayer";

// 4 drifting columns, each a rotating slice of the real reel set
const COLUMNS = [
  { ids: [0, 5, 10, 15, 2], dur: 40, dir: -1, tilt: -7 },
  { ids: [3, 8, 13, 18, 6], dur: 48, dir: 1, tilt: -2 },
  { ids: [1, 7, 12, 16, 4], dur: 36, dir: -1, tilt: 3 },
  { ids: [9, 14, 11, 17, 0], dur: 52, dir: 1, tilt: 8 },
];

function Tile({ id }: { id: string }) {
  const globalIndex = allReels.indexOf(id);
  return (
    <button
      onClick={() => openReels(allReels, Math.max(0, globalIndex))}
      data-cursor="play"
      className="group relative aspect-[9/16] w-full overflow-hidden rounded-xl border border-white/10 bg-ink-900"
    >
      <img
        src={ytThumb(id)}
        alt="Short-form reel by MOVEXA MEDIA"
        loading="lazy"
        onError={onThumbError}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-expo group-hover:scale-110"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
      <span className="absolute inset-0 grid place-items-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/45 bg-black/30 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
          <span className="ml-0.5 border-y-[7px] border-l-[12px] border-y-transparent border-l-white" />
        </span>
      </span>
    </button>
  );
}

export function SocialWall() {
  const reduced = usePrefersReducedMotion();

  return (
    <Section id="social" className="overflow-hidden">
      <div className="container-x">
        <span className="eyebrow">Made for the feed</span>
        <RevealText text="Made for the feed." className="mt-4 font-display font-semibold display-xl" />
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-lg text-sm text-muted">
            Real short-form content from MOVEXA campaigns — restaurants, real estate and brand
            reels. Tap any one to play.
          </p>
        </Reveal>
      </div>

      <div className="edge-fade-x relative mt-14 flex justify-center gap-3 px-3 [perspective:1400px] sm:gap-5 sm:px-4">
        {COLUMNS.map((col, ci) => {
          const ids = [...col.ids, ...col.ids].map((n) => allReels[n % allReels.length]);
          return (
            <motion.div
              key={ci}
              className="flex w-[42vw] shrink-0 flex-col gap-3 sm:w-[190px] sm:gap-5"
              style={{ rotateY: reduced ? 0 : col.tilt }}
              animate={reduced ? undefined : { y: col.dir === -1 ? ["0%", "-50%"] : ["-50%", "0%"] }}
              transition={{ duration: col.dur, repeat: Infinity, ease: "linear" }}
            >
              {ids.map((id, i) => (
                <Tile key={`${ci}-${i}`} id={id} />
              ))}
            </motion.div>
          );
        })}
      </div>

      <p className="container-x mt-10 text-center text-sm text-muted sm:hidden">
        Swipe up to keep exploring.
      </p>
    </Section>
  );
}
