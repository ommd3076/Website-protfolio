import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Section } from "../components/site/Chrome";
import { MagneticLink } from "../components/site/CTA";
import { useReveal } from "../components/site/motion";
const title = "Contact — Cerenetics";
const description =
  "Start a conversation with Cerenetics about AI-native digital systems, structure, or a launch that needs to land properly.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const scope = useRef<HTMLDivElement>(null);
  useReveal(scope);

  return (
    <div ref={scope}>
      <Section>
        <div className="grid gap-16 md:grid-cols-12" data-reveal-group>
          <div className="md:col-span-5">
            <p className="eyebrow reveal">Contact</p>
            <h1 className="reveal mt-7 text-[2.2rem] leading-[1.1] tracking-[-0.03em] md:text-[3.2rem]">
              Tell us what you are trying to make understood.
            </h1>
            <p className="reveal mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A paragraph is enough to start. We reply to everything within two working days.
            </p>
            <div className="reveal mt-10 space-y-1 text-sm">
              <a
                href="mailto:studio@cerenetics.com"
                className="block transition-colors duration-300 hover:text-accent-deep"
              >
                studio@cerenetics.com
              </a>
              <p className="text-muted-foreground">Remote · European hours</p>
            </div>
          </div>

          <div className="reveal self-end border-t border-border pt-8 md:col-span-5 md:col-start-8">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Include the problem, what needs to ship, and any timing already in motion. No formal
              brief is required.
            </p>
            <div className="reveal mt-8 flex justify-end">
              <MagneticLink to="mailto:studio@cerenetics.com?subject=Project%20enquiry">
                Write to the studio
              </MagneticLink>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
