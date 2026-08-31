import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { MarkM } from "./brand/MarkM";

const STOPS = [0, 18, 37, 61, 84, 100];

export function Loader({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setPct(100);
      const t = setTimeout(finish, 300);
      return () => clearTimeout(t);
    }
    let i = 0;
    const advance = () => {
      i += 1;
      if (i < STOPS.length) {
        setPct(STOPS[i]);
        timer = window.setTimeout(advance, 260 + Math.random() * 220);
      } else {
        timer = window.setTimeout(finish, 520);
      }
    };
    let timer = window.setTimeout(advance, 350);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  function finish() {
    setGone(true);
    window.setTimeout(onDone, 720);
  }

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="mb-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.35, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <MarkM className="h-16 w-16" assemble={pct >= 100} animated={!reduced} />
          </motion.div>

          <div className="text-center font-display text-2xl font-semibold leading-none tracking-tightest sm:text-3xl">
            <div>MOVEXA</div>
            <div className="text-muted">MEDIA</div>
          </div>

          {/* expanding glow line */}
          <div className="relative mt-8 h-px w-56 overflow-hidden bg-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 bg-brand-gradient shadow-[0_0_18px_rgba(108,59,255,0.9)]"
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="mt-4 font-mono text-xs tracking-[0.3em] text-muted">
            {String(pct).padStart(3, "0")}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
