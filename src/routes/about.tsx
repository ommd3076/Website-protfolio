import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { useReveal, usePageIntro } from "../components/site/motion";
import { DeterministicPixelParticles } from "../components/site/DeterministicPixelParticles";

const title = "About — Om M. Doddamani";
const description =
  "Background and engineering focus of Om M. Doddamani — Computer Science at VVCE Mysuru, founder at Cerenetics.";

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

function AboutPage() {
  const scope = useRef<HTMLDivElement>(null);
  useReveal(scope);
  usePageIntro(scope);

  return (
    <div
      ref={scope}
      className="min-h-[calc(100vh-140px)] bg-black text-neutral-200 antialiased selection:bg-white/20 selection:text-white flex flex-col items-center justify-center px-6 py-20"
    >
      {/* 
        ABOUT ROUTE (/about)
        Matched to User Supplied Screenshot 1 (Ethiack cue):
        - Restrained dark rectangular scanner frame with hairline corner crosshairs (+)
        - Large, solid, chunky mint pixel silhouette filling ~80% of the frame
        - Zero fake telemetry labels or unverified claims
        - Factual, restrained personal bio below
      */}
      <div className="w-full max-w-[540px] space-y-8 text-center flex flex-col items-center">
        {/* Ethiack Scanner Frame with Corner Crosshairs */}
        <div
          data-page-intro
          className="relative w-full rounded-xl border border-teal-950/70 bg-[#071014] p-4 sm:p-6 shadow-2xl overflow-hidden"
        >
          {/* Subtle horizontal atmospheric beam */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-1/3 h-24 bg-gradient-to-b from-teal-400/[0.03] via-emerald-400/[0.015] to-transparent pointer-events-none"
          />

          {/* Hairline Crosshair Corners (+) */}
          <span
            aria-hidden="true"
            className="absolute top-2.5 left-2.5 font-mono text-xs text-teal-400/40 select-none"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="absolute top-2.5 right-2.5 font-mono text-xs text-teal-400/40 select-none"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="absolute bottom-2.5 left-2.5 font-mono text-xs text-teal-400/40 select-none"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="absolute bottom-2.5 right-2.5 font-mono text-xs text-teal-400/40 select-none"
          >
            +
          </span>

          {/* Visual Center: Large chunky solid mint pixel silhouette filling ~80% width and height */}
          <div className="flex items-center justify-center py-2">
            <DeterministicPixelParticles
              width={480}
              height={300}
              className="border-none bg-transparent p-0"
            />
          </div>
        </div>

        {/* Compact Factual Bio */}
        <div data-reveal className="space-y-4 max-w-[460px]">
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight">
            Om M. Doddamani
          </h1>

          <p className="font-serif text-sm sm:text-base text-neutral-300 leading-relaxed">
            Computer Science student at Vidyavardhaka College of Engineering (VVCE), Mysuru, and
            founder of Cerenetics. I build software systems by implementing them directly—focusing
            on machine learning architectures, on-device computing, and practical software systems.
          </p>

          <div className="pt-2 font-mono text-xs text-neutral-500">VVCE Mysuru · Cerenetics</div>
        </div>
      </div>
    </div>
  );
}
