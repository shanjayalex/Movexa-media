# MOVEXA MEDIA

MOVEXA MEDIA is a Sri Lanka-based creative media and digital marketing agency
helping businesses grow through cinematic content, professional video production,
social media marketing, photography, motion design, creative advertising and
high-end visual storytelling.

This repo is the agency's cinematic, 3D-interactive marketing site.

> Idea → Shoot → Edit → Design → Post → Promote

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (dark cinematic theme, tokens in `tailwind.config.ts`)
- **Three.js** + **@react-three/fiber** + **@react-three/drei** — hero 3D "M" mark
- **GSAP** + ScrollTrigger — pinned process timeline
- **Framer Motion** — reveals, page/route transitions, horizontal scroll
- **Lenis** — smooth scrolling
- **React Router** — home + reusable case-study pages (`/work/:slug`)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build
```

## Structure

```
src/
  components/
    brand/MarkM.tsx          # animated M monogram (loader, nav, transitions)
    three/                   # Stage (fixed canvas), MovexaM3D, Particles
    ui/                      # Reveal, Marquee, MediaFrame, MagneticButton, Section, ReelPlayer
    sections/                # one file per homepage section (Hero … Contact)
    Navbar / Footer / Cursor / Loader / PageTransition
  data/                      # services, industries, portfolio, reels, misc — edit content here
  pages/                     # Home, CaseStudy
```

All copy and content lives in `src/data/*` — no code changes needed to update
services, industries, projects, packages, testimonials, process steps or reels.

## Real content

Client reels are wired in `src/data/reels.ts` (YouTube Short IDs), grouped by
campaign, and surfaced in:

- **Featured Work** — Coconut Island UK, Real Estate Tours, Brand Social Reels
- **Case-study pages** — playable reel grid + lightbox (`ReelPlayer`)
- **Social wall** — draggable 3D reel wall
- **Showreel** — "Play reels" opens the lightbox

## Before launch — replace

| What | Where |
|---|---|
| Social links (`#` placeholders) | `src/data/misc.ts` → `contact` (email + WhatsApp are set) |
| Testimonials (placeholder) | `src/data/misc.ts` → `testimonials` |
| Add more case studies | `src/data/portfolio.ts` (3 real projects wired; add new ones with their reel IDs) |
| About behind-the-scenes photos | `public/about/` — see `public/about/README.txt`, then set `USE_LOCAL_PHOTOS = true` in `src/components/sections/About.tsx` |
| Showreel video | drop `movexa-showreel.mp4` in `public/media/` and wire it into `Showreel.tsx` |
| Analytics (GA / Meta Pixel) | add to `index.html` before `</body>` |

## Accessibility / performance

- `prefers-reduced-motion` fully respected — Lenis, the 3D canvas, marquees and
  reveals all fall back to static.
- 3D quality auto-tiers down on low-core / touch / small-screen devices
  (`usePerfTier`), and the `three` bundle is lazy-loaded after first paint.
- Semantic landmarks, keyboard focus states, custom cursor disabled on touch.
