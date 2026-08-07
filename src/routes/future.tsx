import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Section } from "../components/site/Chrome";
import { MagneticLink } from "../components/site/CTA";
import { AmbientGradient } from "../components/site/AmbientGradient";
import { useReveal } from "../components/site/motion";

const title = "Future — Cerenetics";
const description =
  "Cerenetics is heading toward deeptech, healthcare and medtech: AI-native systems for organisations where clarity carries real consequence.";

export const Route = createFileRoute("/future")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: FuturePage,
});

const theses = [
  [
    "Clarity becomes clinical",
    "The next decade of health and medtech will be decided partly by whether people understand what they are being offered. That is an interface problem as much as a science one.",
  ],
  [
    "AI-native by construction",
    "We are building delivery around models rather than bolting them on — research, structure, content and QA already run through our own workflows.",
  ],
  [
    "Deeptech needs translation",
    "Hard technology is routinely undersold by its own communication. We intend to be the layer that makes it legible to buyers, regulators and patients.",
  ],
  [
    "Longer horizons",
    "Launch is not the finish line. We are shaping engagements that keep attention on a system for the year after it ships.",
  ],
];

function FuturePage() {
  const scope = useRef<HTMLDivElement>(null);
  useReveal(scope);

  return (
    <div ref={scope}>
      <section className="relative overflow-hidden px-6 pb-24 pt-28 md:px-12 md:pb-32 md:pt-40">
        <AmbientGradient tone="bright" />
        {/* Field-like U form, static composition only */}
        <svg
          aria-hidden
          viewBox="0 0 1200 400"
          className="pointer-events-none absolute inset-x-0 bottom-[-6%] mx-auto h-[420px] w-[110%] text-accent-soft/60"
        >
          <path
            d="M60 0 C60 320 360 380 600 380 C840 380 1140 320 1140 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M180 0 C180 260 380 310 600 310 C820 310 1020 260 1020 0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.55"
          />
        </svg>

        <div className="relative mx-auto max-w-[1360px]" data-reveal-group>
          <p className="eyebrow reveal">Future</p>
          <h1 className="reveal mt-8 max-w-[19ch] text-[2.7rem] leading-[1.0] tracking-[-0.04em] md:text-[4.6rem]">
            Toward deeptech, healthcare and medtech.
          </h1>
          <p className="reveal mt-10 max-w-[48ch] text-[1rem] leading-[1.7] text-muted-foreground">
            Cerenetics starts where we are strongest — AI-native digital systems and launch
            infrastructure — and moves deliberately toward the sectors where being understood has
            consequences.
          </p>
        </div>
      </section>

      <Section className="pt-4">
        <div className="grid gap-x-20 gap-y-20 md:grid-cols-2" data-reveal-group>
          {theses.map(([t, d]) => (
            <div key={t} className="reveal">
              <h2 className="max-w-[18ch] text-[1.7rem] leading-[1.12] tracking-[-0.03em] md:text-[2.2rem]">
                {t}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="relative overflow-hidden border-t border-border bg-mineral px-6 py-28 md:px-12 md:py-36">
        <div className="relative mx-auto max-w-[1000px] text-center" data-reveal-group>
          <h2 className="reveal text-[2rem] leading-[1.08] tracking-[-0.04em] md:text-[3.4rem]">
            Ambitious, on purpose. Overclaimed, never.
          </h2>
          <div className="reveal mt-11 flex justify-center">
            <MagneticLink to="/contact">Start a conversation</MagneticLink>
          </div>
        </div>
      </section>
    </div>
  );
}
