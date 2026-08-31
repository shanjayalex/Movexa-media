import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ytEmbed } from "@/data/reels";

const EVT = "movexa:reels";

/** Open the reel lightbox from anywhere. */
export function openReels(ids: string[], index = 0) {
  window.dispatchEvent(new CustomEvent(EVT, { detail: { ids, index } }));
}

/** Mount once near the app root. */
export function ReelPlayer() {
  const [ids, setIds] = useState<string[]>([]);
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(false);

  const close = useCallback(() => setVisible(false), []);
  const prev = useCallback(() => setI((v) => (v - 1 + ids.length) % ids.length), [ids.length]);
  const next = useCallback(() => setI((v) => (v + 1) % ids.length), [ids.length]);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const { ids, index } = (e as CustomEvent<{ ids: string[]; index: number }>).detail;
      setIds(ids);
      setI(index);
      setVisible(true);
    };
    window.addEventListener(EVT, onOpen);
    return () => window.removeEventListener(EVT, onOpen);
  }, []);

  useEffect(() => {
    if (!visible) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [visible, close, prev, next]);

  return (
    <AnimatePresence>
      {visible && ids[i] && (
        <motion.div
          className="fixed inset-0 z-[1300] flex items-center justify-center bg-black/92 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <button
            onClick={close}
            data-cursor="hover"
            aria-label="Close"
            className="absolute right-5 top-5 z-10 font-mono text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white"
          >
            ✕ Close
          </button>

          {ids.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                data-cursor="hover"
                aria-label="Previous reel"
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 p-4 text-3xl text-white/60 hover:text-white sm:left-10"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                data-cursor="hover"
                aria-label="Next reel"
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 p-4 text-3xl text-white/60 hover:text-white sm:right-10"
              >
                ›
              </button>
            </>
          )}

          <motion.div
            key={ids[i]}
            className="relative aspect-[9/16] h-[82vh] max-h-[860px] w-auto max-w-[92vw] overflow-hidden rounded-xl border border-white/10 bg-black"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="h-full w-full"
              src={ytEmbed(ids[i])}
              title="MOVEXA MEDIA — client reel"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </motion.div>

          {ids.length > 1 && (
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] tracking-[0.2em] text-white/50">
              {String(i + 1).padStart(2, "0")} / {String(ids.length).padStart(2, "0")}
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
