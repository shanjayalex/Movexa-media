import { Link } from "react-router-dom";
import { MarkM } from "./brand/MarkM";
import { scrollToTarget } from "@/lib/SmoothScroll";
import { contact } from "@/data/misc";

const COLS = [
  {
    title: "Navigation",
    links: [
      ["Work", "#work"],
      ["Services", "#services"],
      ["About", "#about"],
      ["Contact", "#contact"],
    ],
  },
  {
    title: "Services",
    links: [
      ["Production", "#services"],
      ["Social Media", "#services"],
      ["Video Editing", "#services"],
      ["Photography", "#services"],
      ["Design", "#services"],
      ["Advertising", "#services"],
    ],
  },
];

// only render socials that have a real URL set
const SOCIAL: [string, string][] = (
  [
    ["Instagram", contact.instagram],
    ["LinkedIn", contact.linkedin],
    ["TikTok", contact.tiktok],
    ["Facebook", contact.facebook],
    ["YouTube", contact.youtube],
  ] as [string, string][]
).filter(([, href]) => href && href !== "#");

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 pt-20">
      <div className="container-x relative z-10">
        <div className="flex items-center gap-3">
          <MarkM className="h-9 w-9" />
          <span className="font-display text-lg font-semibold tracking-tightest">
            MOVEXA <span className="text-muted">MEDIA</span>
          </span>
        </div>
        <p className="mt-6 font-display text-3xl font-semibold tracking-tightest sm:text-5xl">
          We create attention.
        </p>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {COLS.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-white/40">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {col.links.map(([label, hash]) => (
                  <li key={label}>
                    <Link
                      to="/"
                      onClick={() => setTimeout(() => scrollToTarget(hash), 60)}
                      data-cursor="hover"
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-white/40">
              Social
            </h3>
            <ul className="mt-4 space-y-2">
              {SOCIAL.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener"
                    data-cursor="open"
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-white/40">
              Contact
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  data-cursor="open"
                  className="break-all text-white/70 transition-colors hover:text-white"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noopener"
                  data-cursor="open"
                  className="text-white/70 transition-colors hover:text-white"
                >
                  WhatsApp {contact.whatsappDisplay}
                </a>
              </li>
              <li className="pt-1 text-white/50">Sri Lanka · Available Nationwide</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 py-8 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} MOVEXA MEDIA</span>
          <div className="flex gap-6">
            <a href="#" data-cursor="hover" className="hover:text-white">
              Privacy
            </a>
            <a href="#" data-cursor="hover" className="hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>

      {/* huge outlined wordmark */}
      <div
        aria-hidden
        className="pointer-events-none select-none px-2 pb-2 text-center font-display text-[24vw] font-bold leading-[0.8] tracking-tightest text-transparent"
        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.07)" }}
      >
        MOVEXA
      </div>
    </footer>
  );
}
