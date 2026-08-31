import { Section } from "../ui/Section";
import { RevealText, Reveal } from "../ui/Reveal";
import { MagneticLink } from "../ui/MagneticButton";
import { scrollToTarget } from "@/lib/SmoothScroll";
import { contact } from "@/data/misc";

export function FinalCta() {
  return (
    <Section className="relative overflow-hidden text-center">
      <div className="pointer-events-none absolute inset-0 bg-brand-radial opacity-80" />
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[30vw] font-bold leading-none tracking-tightest text-white/[0.03]"
      >
        MOVEXA
      </span>

      <div className="container-x relative">
        <RevealText
          text="Ready to move your brand?"
          className="mx-auto max-w-4xl font-display font-semibold display-hero"
        />
        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-md text-muted">
            Tell us what you're building. We'll help people notice it.
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4 [&>a]:w-full sm:[&>a]:w-auto">
            <MagneticLink
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#contact");
              }}
              cursor="open"
            >
              Start a Project ↗
            </MagneticLink>
            <MagneticLink
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener"
              variant="outline"
              cursor="open"
            >
              WhatsApp Us ↗
            </MagneticLink>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="mt-7 text-sm text-white/55">
            Have footage already?{" "}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget("#contact");
              }}
              data-cursor="open"
              className="inline-block py-1 font-medium text-white underline underline-offset-4"
            >
              Send your footage →
            </a>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
