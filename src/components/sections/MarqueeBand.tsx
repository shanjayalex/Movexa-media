import { Marquee } from "../ui/Marquee";

export function MarqueeBand() {
  return (
    <section aria-hidden className="border-y border-white/10 py-10 sm:py-16">
      <Marquee
        items={["Shoot", "Create", "Move", "Grow"]}
        itemClassName="font-display text-5xl font-semibold tracking-tightest text-white/90 sm:text-7xl"
      />
      <Marquee
        items={["Video", "Social", "Design", "Strategy", "Production", "Digital"]}
        reverse
        separator="/"
        className="mt-6"
        itemClassName="font-display text-4xl font-semibold tracking-tightest text-white/25 sm:text-6xl"
      />
    </section>
  );
}
