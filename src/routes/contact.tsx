import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { Section } from "../components/site/Chrome";
import { MagneticLink } from "../components/site/CTA";
import { useReveal, usePageIntro } from "../components/site/motion";

const title = "Contact — Om M Doddamani";
const description =
  "Connect with Om M Doddamani for technical discussions, systems engineering collaboration, and research inquiries.";

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
  usePageIntro(scope);

  return (
    <div ref={scope}>
      <Section className="pb-16 pt-24 md:pt-36">
        <div className="grid gap-12 md:grid-cols-12" data-reveal-group>
          <div className="md:col-span-6">
            <p data-page-intro className="eyebrow">
              Contact
            </p>
            <h1
              data-page-intro
              className="mt-6 text-[2.4rem] leading-[1.08] tracking-[-0.035em] md:text-[3.8rem]"
            >
              Start a conversation.
            </h1>
            <p
              data-page-intro
              className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground"
            >
              I welcome discussions on private offline AI, reinforcement learning, systems
              architecture, and founder engineering. Whether you have a research inquiry, a
              technical question, or an interesting engineering problem, feel free to reach out.
            </p>
            <div className="mt-8 space-y-2 text-sm font-mono">
              <a
                href="mailto:ommd3076@gmail.com"
                className="block text-foreground transition-colors hover:text-white"
              >
                ommd3076@gmail.com ↗
              </a>
              <p className="text-muted-foreground text-xs">
                Based in Mysuru, Karnataka, India (IST / UTC+5:30)
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 md:col-span-6 md:border-t-0 md:border-l md:pl-12">
            <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground mb-6">
              Verified Public Channels
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <span className="text-xs text-muted-foreground font-mono">CODE REPOSITORIES</span>
                <p className="mt-1 font-medium text-foreground">GitHub</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Personal codebases, research implementations, and verified experiments.
                </p>
                <div className="mt-4">
                  <a
                    href="https://github.com/ommd3076"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-foreground font-mono hover:underline"
                  >
                    github.com/ommd3076 ↗
                  </a>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <span className="text-xs text-muted-foreground font-mono">
                  PROFESSIONAL PROFILE
                </span>
                <p className="mt-1 font-medium text-foreground">LinkedIn</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Founder background, academic updates from VVCE Mysuru, and network connections.
                </p>
                <div className="mt-4">
                  <a
                    href="https://www.linkedin.com/in/om-m-doddamani/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-foreground font-mono hover:underline"
                  >
                    linkedin.com/in/om-m-doddamani ↗
                  </a>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <MagneticLink to="mailto:ommd3076@gmail.com?subject=Engineering%20Inquiry">
                  Send an Email
                </MagneticLink>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
