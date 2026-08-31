import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Section } from "../ui/Section";
import { Reveal, RevealText } from "../ui/Reveal";
import {
  showreelId,
  ytThumbLandscape,
  ytLoopEmbed,
  ytFullEmbed,
  onThumbError,
} from "@/data/reels";
import { usePrefersReducedMotion } from "@/lib/hooks";

const SYSTEM = ["Strategy.", "Production.", "Editing.", "Design.", "Marketing."];

export function Showreel() {
  const frameRef = useRef<HTMLDivElement>(null);
  const inView = useInView(frameRef, { once: true, margin: "0px 0px -20% 0px" });
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);

  const autoplay = inView && !reduced;

  return (
    <Section id="showreel" className="text-center">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow">A glimpse of what we create</span>
        </Reveal>
        <RevealText text="Press play." className="mt-4 font-display font-semibold display-xl" />

        <Reveal delay={0.1}>
          <div
            ref={frameRef}
            className="group relative mx-auto mt-14 aspect-video w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-ink-900"
          >
            {autoplay ? (
              <iframe
                className="pointer-events-none absolute left-1/2 top-1/2 h-[122%] w-[122%] -translate-x-1/2 -translate-y-1/2"
                src={ytLoopEmbed(showreelId)}
                title="MOVEXA MEDIA — showreel"
                allow="autoplay; encrypted-media; picture-in-picture"
                loading="lazy"
                tabIndex={-1}
              />
            ) : (
              <img
                src={ytThumbLandscape(showreelId)}
                onError={onThumbError}
                alt="MOVEXA MEDIA showreel"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {/* scrims — hide YouTube chrome top/bottom + add cinematic depth */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-ink-950 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-950 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" />
            <div className="grain-layer pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay" />

            <span className="pointer-events-none absolute bottom-4 left-4 font-mono text-[0.6rem] uppercase tracking-[0.24em] text-white/70">
              MOVEXA · Showreel
            </span>

            <button
              onClick={() => setOpen(true)}
              data-cursor="play"
              className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-colors hover:border-white/60 hover:bg-black/60"
            >
              <span className="border-y-[5px] border-l-[8px] border-y-transparent border-l-white" />
              Watch with sound
            </button>

            {/* full-cover click target when it's just a poster */}
            {!autoplay && (
              <button
                onClick={() => setOpen(true)}
                data-cursor="play"
                aria-label="Play showreel"
                className="absolute inset-0 grid place-items-center"
              >
                <span className="flex h-24 w-24 items-center justify-center rounded-full border border-white/50 bg-black/25 font-mono text-[0.58rem] uppercase tracking-[0.2em] backdrop-blur-sm transition-transform duration-500 ease-expo group-hover:scale-110">
                  Play<br />Showreel
                </span>
              </button>
            )}
          </div>
        </Reveal>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {SYSTEM.map((s, i) => (
            <Reveal key={s} delay={i * 0.05}>
              <span className="font-display text-xl font-medium text-white/85 sm:text-2xl">{s}</span>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-4 text-muted">One connected creative system.</p>
        </Reveal>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[1300] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <button
              onClick={() => setOpen(false)}
              data-cursor="hover"
              aria-label="Close"
              className="absolute right-5 top-5 z-10 font-mono text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white"
            >
              ✕ Close
            </button>
            <motion.div
              className="relative aspect-video w-full max-w-6xl overflow-hidden rounded-xl border border-white/10 bg-black"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                className="h-full w-full"
                src={ytFullEmbed(showreelId)}
                title="MOVEXA MEDIA — showreel"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
