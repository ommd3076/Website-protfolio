import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { CopyButton } from "../components/evil/CopyButton";
import { useReveal, usePageIntro } from "../components/site/motion";

const title = "Contact — Om M. Doddamani";
const description = "Direct communication with Om M. Doddamani.";

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
    <div
      ref={scope}
      className="min-h-[calc(100vh-140px)] bg-black text-neutral-200 antialiased selection:bg-black/20 selection:text-black flex items-center justify-center px-6 py-20"
    >
      {/* 
        CONTACT ROUTE (/contact)
        Matched directly to the user's supplied Screenshot 2:
        - Floating pale ceramic squircle card with soft ambient drop-shadow
        - Top header: Name + quiet status indicator
        - Large rounded media frame for portrait / monogram insignia
        - Bottom action bar: User tag + solid dark direct action button
      */}
      <div className="w-full max-w-[380px]">
        <div
          data-page-intro
          className="rounded-[36px] border border-neutral-200/80 bg-[#fbfbfa] p-6 text-neutral-900 shadow-2xl space-y-5 flex flex-col"
        >
          {/* Card Top Header */}
          <div className="text-center space-y-1 pt-1">
            <h1 className="font-sans text-xl font-semibold tracking-tight text-neutral-950">
              Om M. Doddamani
            </h1>
            <p className="text-xs text-neutral-500 font-mono">Mysuru, India</p>
          </div>

          {/* Central Large Rounded Portrait Frame (matching Screenshot 2 media slot) */}
          <div className="relative w-full h-56 rounded-2xl border border-neutral-200 bg-gradient-to-b from-neutral-100 to-neutral-200/70 overflow-hidden flex flex-col items-center justify-center shadow-inner">
            <div className="grid h-24 w-24 place-items-center rounded-full border border-neutral-300 bg-white shadow-md">
              <span className="font-serif italic text-3xl font-medium text-neutral-800">OM</span>
            </div>
            <span className="mt-3 font-mono text-[10px] uppercase tracking-widest text-neutral-500">
              Founder at Cerenetics
            </span>
          </div>

          {/* Bottom Action Strip (matching Screenshot 2 layout) */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                aria-hidden="true"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-neutral-900 text-white font-serif italic text-xs shadow-sm"
              >
                OM
              </div>
              <div className="min-w-0">
                <span className="block font-mono text-xs font-semibold text-neutral-900 truncate">
                  @ommd3076
                </span>
                <span className="block text-[11px] text-neutral-500 truncate">VVCE Mysuru</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href="mailto:ommd3076@gmail.com"
                className="inline-flex items-center justify-center rounded-xl bg-neutral-950 px-3.5 py-2 text-xs font-medium text-white shadow-sm hover:bg-neutral-800 transition-colors"
              >
                Send Email
              </a>
              <CopyButton textToCopy="ommd3076@gmail.com" label="Copy" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
