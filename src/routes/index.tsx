import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { useReveal, usePageIntro } from "../components/site/motion";

const title = "Om M. Doddamani";
const description =
  "Om M. Doddamani — Computer Science and Engineering student at Vidyavardhaka College of Engineering (VVCE), Mysuru, and founder at Cerenetics.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const scope = useRef<HTMLDivElement>(null);
  useReveal(scope);
  usePageIntro(scope);

  return (
    <div
      ref={scope}
      className="min-h-screen bg-black text-neutral-200 antialiased selection:bg-white/20 selection:text-white flex items-center justify-center px-8 py-20"
    >
      {/* 
        HOME IDENTITY ANCHOR
        Matched with absolute fidelity to the user-supplied Home reference screenshot:
        - Deep black field with vast negative space
        - Narrow column (~420px) centered as a block in the viewport
        - Small, one-line, left-aligned italic serif name (26-28px, whitespace-nowrap)
        - Compact, left-aligned verified student/founder prose
      */}
      <div className="w-full max-w-[420px] text-left">
        <div data-page-intro className="space-y-10">
          <h1 className="font-serif italic text-2xl sm:text-[26px] md:text-[28px] font-normal text-white tracking-normal whitespace-nowrap">
            Om M Doddamani
          </h1>

          <p className="font-serif text-[13.5px] sm:text-[14px] text-neutral-300 leading-[1.85] font-normal">
            Computer Science and Engineering student at Vidyavardhaka College of Engineering (VVCE),
            Mysuru, and founder at Cerenetics.
          </p>
        </div>
      </div>
    </div>
  );
}
