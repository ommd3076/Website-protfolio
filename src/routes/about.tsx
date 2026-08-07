import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "../components/site/Chrome";
import { MagneticLink } from "../components/site/CTA";
import { useReveal, usePageIntro } from "../components/site/motion";

const tabs = [
  {
    id: "who-we-are",
    label: "Who We Are",
    content: (
      <>
        <h3 className="text-[1.75rem] leading-[1.2] tracking-[-0.03em] mb-6">
          AI-native at the core
        </h3>
        <p className="text-base leading-relaxed text-muted-foreground mb-8 max-w-2xl">
          Cerenetics was founded on the belief that artificial intelligence should be the substrate
          of how digital systems are conceived, built, and launched — not a feature layered on top.
        </p>
        <p className="text-base leading-relaxed text-muted-foreground mb-8 max-w-2xl">
          We don't retrofit AI into existing workflows. We design delivery around it: research
          synthesis, structural framing, content architecture, interface logic, motion choreography,
          and launch observability all run through models we've built and tuned.
        </p>
        <p className="text-base leading-relaxed text-muted-foreground max-w-2xl">
          The result is a studio that moves with precision at every layer — from the argument a site
          must land, to the motion language that carries its pace, to the observability that tells
          you whether it worked.
        </p>
      </>
    ),
  },
  {
    id: "how-we-think",
    label: "How We Think",
    content: (
      <>
        <h3 className="text-[1.75rem] leading-[1.2] tracking-[-0.03em] mb-6">
          Structure before surface
        </h3>
        <p className="text-base leading-relaxed text-muted-foreground mb-8 max-w-2xl">
          Most studios start with the visual. We start with the argument. Before a pixel is placed,
          we map the decision landscape: who decides, what they believe, what must shift, and what
          the single claim is that the work must land.
        </p>
        <p className="text-base leading-relaxed text-muted-foreground mb-8 max-w-2xl">
          That frame becomes the spine. Information architecture, content models, narrative
          hierarchy, and interaction logic all resolve from it. Nothing becomes a page until it
          earns its place in the structure.
        </p>
        <p className="text-base leading-relaxed text-muted-foreground max-w-2xl">
          This discipline prevents the bloat and drift that plague typical agency work. The result
          is leaner, sharper, and built to extend.
        </p>
      </>
    ),
  },
  {
    id: "how-we-build",
    label: "How We Build",
    content: (
      <>
        <h3 className="text-[1.75rem] leading-[1.2] tracking-[-0.03em] mb-6">Models in the loop</h3>
        <p className="text-base leading-relaxed text-muted-foreground mb-8 max-w-2xl">
          Our delivery engine runs on proprietary AI workflows: research synthesis, structural
          validation, copy generation, component scaffolding, motion token generation, QA
          simulation, and launch observability.
        </p>
        <p className="text-base leading-relaxed text-muted-foreground mb-8 max-w-2xl">
          These aren't black boxes. They're transparent, auditable, and designed to amplify human
          judgment — not replace it. The people who framed the work are the people who ship it. No
          handoffs. No dilution.
        </p>
        <p className="text-base leading-relaxed text-muted-foreground max-w-2xl">
          Fixed windows. Six to ten weeks. Scoped to a decision, not a backlog. A short observation
          period is part of the engagement, not an upsell.
        </p>
      </>
    ),
  },
  {
    id: "what-we-believe",
    label: "What We Believe",
    content: (
      <>
        <h3 className="text-[1.75rem] leading-[1.2] tracking-[-0.03em] mb-6">
          Clarity carries consequence
        </h3>
        <p className="text-base leading-relaxed text-muted-foreground mb-8 max-w-2xl">
          In deeptech, healthcare, and medtech, being understood isn't a brand advantage — it's a
          safety requirement. The interface is part of the science.
        </p>
        <p className="text-base leading-relaxed text-muted-foreground mb-8 max-w-2xl">
          We believe the best work comes from small, senior teams operating in fixed windows with
          full ownership. We believe launch is a system, not an announcement. We believe the
          observation period after ship is where the real work begins.
        </p>
        <p className="text-base leading-relaxed text-muted-foreground max-w-2xl">
          We build for teams that inherit what we ship. Every component, token, and pattern is
          designed to extend — not to impress in a portfolio.
        </p>
      </>
    ),
  },
  {
    id: "what-makes-us-different",
    label: "What Makes Us Different",
    content: (
      <>
        <h3 className="text-[1.75rem] leading-[1.2] tracking-[-0.03em] mb-6">
          Not an agency. Not a SaaS. A new model.
        </h3>
        <div className="grid gap-6 md:grid-cols-2 max-w-3xl">
          <div className="rounded-2xl border border-border bg-background p-6">
            <h4 className="text-[1.125rem] leading-tight mb-3">No handoffs</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The team that frames the work ships it. No account managers, no junior handoffs, no
              dilution.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6">
            <h4 className="text-[1.125rem] leading-tight mb-3">Fixed windows</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Six to ten weeks, scoped to a decision. Timeboxes force clarity.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6">
            <h4 className="text-[1.125rem] leading-tight mb-3">Systems, not pages</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Everything we ship extends. Components, tokens, patterns — not static comps.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6">
            <h4 className="text-[1.125rem] leading-tight mb-3">Measured after</h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A structured observation period is included. We close the loop.
            </p>
          </div>
        </div>
      </>
    ),
  },
];

const tabOrder = [
  "who-we-are",
  "how-we-think",
  "how-we-build",
  "what-we-believe",
  "what-makes-us-different",
];

export function AboutPage() {
  const scope = useRef<HTMLDivElement>(null);
  useReveal(scope);
  usePageIntro(scope);

  return (
    <div ref={scope}>
      <Section className="pb-10">
        <div className="grid gap-8 md:grid-cols-12" data-reveal-group>
          <div className="md:col-span-8">
            <p data-page-intro className="eyebrow">
              About
            </p>
            <h1
              data-page-intro
              className="mt-8 max-w-[18ch] text-[2.6rem] leading-[1.02] tracking-[-0.035em] md:text-[4.2rem]"
            >
              A new model for building digital systems.
            </h1>
          </div>
          <p
            data-page-intro
            className="self-end text-base leading-relaxed text-muted-foreground md:col-span-3 md:col-start-10"
          >
            AI-native delivery. Fixed windows. No handoffs. Measured after.
          </p>
        </div>
      </Section>

      <Section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1360px]" data-reveal-group>
          <p className="eyebrow reveal">Our Thesis</p>
          <h2 className="reveal mt-5 text-[1.75rem] leading-[1.15] tracking-[-0.03em] md:text-[2.5rem]">
            How we move from problem to launched system
          </h2>

          <div className="reveal mt-12" data-tab-container>
            <Tabs defaultValue="who-we-are" tabs={tabs} tabOrder={tabOrder} />
          </div>
        </div>
      </Section>

      <Section className="border-t border-border bg-mineral">
        <div className="grid gap-8 md:grid-cols-12 md:items-end" data-reveal-group>
          <h2 className="reveal text-[1.9rem] leading-[1.15] tracking-[-0.03em] md:col-span-7 md:text-[2.9rem]">
            Tell us what stage you are at.
          </h2>
          <div className="reveal md:col-span-4 md:col-start-9">
            <MagneticLink to="/contact">Start a conversation</MagneticLink>
          </div>
        </div>
      </Section>
    </div>
  );
}

function Tabs({
  defaultValue,
  tabs,
  tabOrder,
}: {
  defaultValue: string;
  tabs: typeof tabs;
  tabOrder: string[];
}) {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const tabsListRef = useRef<HTMLDivElement>(null);
  const activeTabRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const indicator = tabsListRef.current?.querySelector("[data-tab-indicator]") as HTMLElement;
    const activeButton = activeTabRef.current;
    if (!indicator || !activeButton) return;

    const rect = activeButton.getBoundingClientRect();
    const listRect = tabsListRef.current!.getBoundingClientRect();
    indicator.style.width = `${activeButton.offsetWidth}px`;
    indicator.style.transform = `translateX(${rect.left - listRect.left}px)`;
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => {
      const indicator = tabsListRef.current?.querySelector("[data-tab-indicator]") as HTMLElement;
      const activeButton = activeTabRef.current;
      if (!indicator || !activeButton) return;

      const rect = activeButton.getBoundingClientRect();
      const listRect = tabsListRef.current!.getBoundingClientRect();
      indicator.style.width = `${activeButton.offsetWidth}px`;
      indicator.style.transform = `translateX(${rect.left - listRect.left}px)`;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab]);

  return (
    <div className="relative">
      <div
        ref={tabsListRef}
        className="relative flex items-center gap-1 bg-background/50 rounded-xl p-1 border border-border"
        role="tablist"
        aria-label="About sections"
      >
        <div
          data-tab-indicator
          className="absolute top-1 left-1 h-[calc(100%-0.5rem)] bg-accent-soft rounded-lg transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: 0, transform: "translateX(0)" }}
        />
        {tabOrder.map((tabId) => {
          const tab = tabs.find((t) => t.id === tabId);
          if (!tab) return null;
          return (
            <button
              key={tab.id}
              ref={activeTab === tab.id ? activeTabRef : undefined}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`relative z-10 rounded-lg px-5 py-2.5 text-[0.85rem] font-medium tracking-[-0.01em] transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${
                activeTab === tab.id
                  ? "text-accent-deep"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8" role="tabpanel">
        <AnimatePresence mode="wait">
          {tabOrder.map((tabId) => {
            const tab = tabs.find((t) => t.id === tabId);
            if (!tab) return null;
            return (
              <motion.div
                key={tab.id}
                role="tabpanel"
                id={`panel-${tab.id}`}
                aria-labelledby={`tab-${tab.id}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {tab.content}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

const title = "About — Cerenetics";
const description =
  "How Cerenetics operates: AI-native delivery, fixed windows, no handoffs, and measured outcomes. Built for deeptech, healthcare, and medtech.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AboutPage,
});
