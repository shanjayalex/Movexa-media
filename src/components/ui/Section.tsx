import { ReactNode } from "react";
import { Reveal, RevealText } from "./Reveal";

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-16 sm:py-28 lg:py-40 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-4xl"} ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <RevealText
        text={title}
        className="mt-4 font-display font-semibold display-xl sm:mt-5"
      />
      {intro && (
        <Reveal delay={0.1}>
          <p
            className={`mt-6 max-w-2xl text-base text-muted sm:text-lg ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
