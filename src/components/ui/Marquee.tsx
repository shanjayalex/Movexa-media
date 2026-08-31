import { usePrefersReducedMotion } from "@/lib/hooks";

/** Seamless CSS marquee. `items` renders twice for the loop. */
export function Marquee({
  items,
  reverse = false,
  className = "",
  itemClassName = "",
  separator = "•",
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
  separator?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const Group = (
    <div className="flex shrink-0 items-center" aria-hidden={reduced ? undefined : true}>
      {items.map((it, i) => (
        <span key={i} className={`flex items-center whitespace-nowrap ${itemClassName}`}>
          {it}
          <span className="mx-6 text-magenta/60 sm:mx-10">{separator}</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div
        className={`flex w-max ${
          reduced ? "" : reverse ? "animate-marquee-rev" : "animate-marquee"
        }`}
      >
        {Group}
        {Group}
      </div>
    </div>
  );
}
