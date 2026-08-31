import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { MarkM } from "./brand/MarkM";
import { MagneticLink } from "./ui/MagneticButton";
import { scrollToTarget } from "@/lib/SmoothScroll";

const LINKS = [
  { label: "Work", to: "#work" },
  { label: "Services", to: "#services" },
  { label: "About", to: "#about" },
  { label: "Process", to: "#process" },
  { label: "Contact", to: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const go = (hash: string) => {
    setMenuOpen(false);
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToTarget(hash), 120);
    } else {
      scrollToTarget(hash);
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[900] transition-all duration-500 ease-expo ${
          scrolled ? "glass py-3" : "bg-transparent py-5"
        }`}
      >
        <nav className="container-x flex items-center justify-between" aria-label="Primary">
          <Link
            to="/"
            onClick={() => scrollToTarget(0)}
            data-cursor="hover"
            className="-my-1 flex items-center gap-2.5 py-1"
          >
            <MarkM className="h-8 w-8" />
            <span className="font-display text-sm font-semibold tracking-tightest">
              MOVEXA <span className="text-muted">MEDIA</span>
            </span>
          </Link>

          <div className="hidden items-center gap-9 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.label}
                onClick={() => go(l.to)}
                data-cursor="hover"
                className="group relative font-mono text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-magenta transition-all duration-300 ease-expo group-hover:w-full" />
              </button>
            ))}
            <MagneticLink
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                go("#contact");
              }}
              variant="outline"
              cursor="open"
            >
              Start a Project ↗
            </MagneticLink>
          </div>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            data-cursor="hover"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="relative z-[1001] flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`block h-px w-6 bg-white transition-all duration-300 ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-white transition-all duration-300 ${
                menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[1000] flex flex-col justify-between bg-ink-950 px-6 pb-10 pt-28 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grain-layer pointer-events-none absolute inset-0 opacity-[0.12]" />
            <div className="relative flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.label}
                  onClick={() => go(l.to)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-left font-display text-5xl font-semibold tracking-tightest text-white sm:text-6xl"
                >
                  {l.label}
                </motion.button>
              ))}
            </div>
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button
                onClick={() => go("#contact")}
                className="w-full rounded-full bg-white py-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-ink-950"
              >
                Start a Project ↗
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
