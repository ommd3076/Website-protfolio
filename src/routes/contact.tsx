import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Section } from "../components/site/Chrome";
import { useReveal } from "../components/site/motion";

const title = "Contact — Carenetics";
const description =
  "Start a conversation with Carenetics about structure, digital experience, or a launch that needs to land properly.";

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
                href="mailto:studio@carenetics.com"
                className="block transition-colors duration-300 hover:text-accent-deep"
              >
                studio@carenetics.com
              </a>
              <p className="text-muted-foreground">Remote · European hours</p>
            </div>
          </div>

          <div className="reveal self-end border-t border-border pt-8 md:col-span-5 md:col-start-8">
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Include the problem, what needs to ship, and any timing already in motion. No formal
              brief is required.
            </p>
            <a
              href="mailto:studio@carenetics.com?subject=Project%20enquiry"
              data-cursor="cta"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-foreground px-7 py-3.5 text-sm text-background transition-colors duration-200 hover:bg-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Write to the studio
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
