import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Section } from "../ui/Section";
import { RevealText } from "../ui/Reveal";
import { contactSteps, contact } from "@/data/misc";

type Form = {
  need: string[];
  business: string;
  location: string;
  project: string;
  name: string;
  company: string;
  email: string;
  phone: string;
};

const EMPTY: Form = {
  need: [],
  business: "",
  location: "",
  project: "",
  name: "",
  company: "",
  email: "",
  phone: "",
};

const STEPS = ["What do you need?", "Type of business?", "Where are you?", "Your project", "Contact details"];

export function Contact() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(EMPTY);
  const [sent, setSent] = useState(false);

  const canNext = useMemo(() => {
    switch (step) {
      case 0:
        return form.need.length > 0;
      case 1:
        return !!form.business;
      case 2:
        return form.location.trim().length > 1;
      case 3:
        return form.project.trim().length > 4;
      case 4:
        return form.name.trim() && /\S+@\S+\.\S+/.test(form.email);
      default:
        return false;
    }
  }, [step, form]);

  const toggleNeed = (n: string) =>
    setForm((f) => ({
      ...f,
      need: f.need.includes(n) ? f.need.filter((x) => x !== n) : [...f.need, n],
    }));

  const submit = () => {
    // No backend wired yet — hand off to WhatsApp / email with a prefilled summary.
    const summary = [
      `New project enquiry — MOVEXA MEDIA`,
      `Need: ${form.need.join(", ")}`,
      `Business: ${form.business}`,
      `Location: ${form.location}`,
      `Project: ${form.project}`,
      `Name: ${form.name}${form.company ? ` (${form.company})` : ""}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
    ].join("\n");
    window.open(
      `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(summary)}`,
      "_blank",
      "noopener",
    );
    setSent(true);
  };

  return (
    <Section id="contact">
      <div className="container-x">
        <span className="eyebrow">Start a project</span>
        <RevealText text="Let's create." className="mt-4 font-display font-semibold display-xl" />

        <div className="glass mt-10 overflow-hidden rounded-3xl sm:mt-14">
          {/* progress */}
          <div className="flex gap-1.5 p-2">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                  i <= step ? "bg-brand-gradient" : "bg-white/10"
                }`}
              />
            ))}
          </div>

          <div className="min-h-[360px] p-6 sm:p-10">
            {sent ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <h3 className="font-display text-3xl font-semibold">Thanks — that's on its way.</h3>
                <p className="mt-3 max-w-sm text-sm text-muted">
                  We opened WhatsApp with your details. If it didn't open, email us at{" "}
                  <a className="text-white underline" href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-magenta">
                      {String(step + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl font-semibold sm:text-3xl">{STEPS[step]}</h3>
                  </div>

                  <div className="mt-7">
                    {step === 0 && (
                      <div className="flex flex-wrap gap-2.5">
                        {contactSteps.need.map((n) => (
                          <button
                            key={n}
                            onClick={() => toggleNeed(n)}
                            data-cursor="hover"
                            className={`rounded-full border px-4 py-3 font-mono text-[0.66rem] uppercase tracking-[0.08em] transition-colors sm:py-2 sm:text-[0.68rem] sm:tracking-[0.12em] ${
                              form.need.includes(n)
                                ? "border-magenta bg-magenta/15 text-white"
                                : "border-white/15 text-white/70 hover:border-white/40"
                            }`}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                    )}

                    {step === 1 && (
                      <div className="flex flex-wrap gap-2.5">
                        {contactSteps.business.map((b) => (
                          <button
                            key={b}
                            onClick={() => setForm((f) => ({ ...f, business: b }))}
                            data-cursor="hover"
                            className={`rounded-full border px-4 py-3 font-mono text-[0.66rem] uppercase tracking-[0.08em] transition-colors sm:py-2 sm:text-[0.68rem] sm:tracking-[0.12em] ${
                              form.business === b
                                ? "border-magenta bg-magenta/15 text-white"
                                : "border-white/15 text-white/70 hover:border-white/40"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    )}

                    {step === 2 && (
                      <input
                        autoFocus
                        value={form.location}
                        onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                        placeholder="City / area — e.g. Colombo, Kandy, Jaffna"
                        className="w-full border-b border-white/20 bg-transparent py-3 text-lg outline-none placeholder:text-white/30 focus:border-magenta"
                      />
                    )}

                    {step === 3 && (
                      <textarea
                        autoFocus
                        rows={5}
                        value={form.project}
                        onChange={(e) => setForm((f) => ({ ...f, project: e.target.value }))}
                        placeholder="What are you building? What do you need from us?"
                        className="w-full resize-none border-b border-white/20 bg-transparent py-3 text-lg outline-none placeholder:text-white/30 focus:border-magenta"
                      />
                    )}

                    {step === 4 && (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {(
                          [
                            ["name", "Name*"],
                            ["company", "Company"],
                            ["email", "Email*"],
                            ["phone", "Phone / WhatsApp"],
                          ] as const
                        ).map(([k, label]) => (
                          <input
                            key={k}
                            value={form[k]}
                            onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
                            placeholder={label}
                            className="w-full border-b border-white/20 bg-transparent py-3 outline-none placeholder:text-white/30 focus:border-magenta"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {!sent && (
            <div className="flex items-center justify-between border-t border-white/10 px-3 py-3 sm:px-10 sm:py-6">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                data-cursor="hover"
                className="rounded-full px-4 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white/50 enabled:hover:text-white disabled:opacity-30"
              >
                ← Back
              </button>
              {step < STEPS.length - 1 ? (
                <button
                  onClick={() => canNext && setStep((s) => s + 1)}
                  disabled={!canNext}
                  data-cursor="hover"
                  className="rounded-full bg-white px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-ink-950 transition-opacity disabled:opacity-30"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={() => canNext && submit()}
                  disabled={!canNext}
                  data-cursor="open"
                  className="rounded-full bg-brand-gradient px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white transition-opacity disabled:opacity-30"
                >
                  Let's Create →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
