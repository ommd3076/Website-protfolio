import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { useReveal, usePageIntro } from "../components/site/motion";

const title = "Notes — Om M. Doddamani";
const description = "Notes and writing by Om M. Doddamani.";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  const scope = useRef<HTMLDivElement>(null);
  useReveal(scope);
  usePageIntro(scope);

  return (
    <div
      ref={scope}
      className="min-h-[calc(100vh-140px)] bg-black text-neutral-200 antialiased selection:bg-white/20 selection:text-white flex flex-col items-center justify-center px-6 py-24"
    >
      {/* 
        NOTES ROUTE (/notes)
        Quiet, honest reading space without unverified authored entries or fabricated essays.
        Preserves route presence for global navigation without inventing unearned text.
      */}
      <div className="w-full max-w-[480px] space-y-6 text-left">
        <header data-page-intro className="space-y-4 border-b border-neutral-900 pb-8">
          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 block">
            Notebook
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-white tracking-tight">
            Notes
          </h1>
          <p className="font-serif italic text-sm text-neutral-400">
            Writing and technical notes will be published here.
          </p>
        </header>

        <footer data-reveal className="pt-2 font-mono text-xs text-neutral-600">
          <span>Om M. Doddamani · VVCE Mysuru · Cerenetics</span>
        </footer>
      </div>
    </div>
  );
}
