import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { ProjectExplorer, type ProjectId } from "../components/site/ProjectExplorer";

const title = "Om M. Doddamani — Engineer, researcher, builder";
const description = "Notes on engineering, research, and learning systems by building them.";

const searchSchema = z.object({
  project: z.enum(["prism", "drl", "cerenetics", "eva"]).optional(),
  node: z.string().optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate({ from: "/" });
  const search = Route.useSearch();
  const selectedProject: ProjectId = search.project ?? "prism";
  const activeNode = search.node ?? "focus";

  const handleSelectProject = (id: ProjectId) => {
    navigate({
      search: (prev) => ({ ...prev, project: id, node: undefined }),
    });
  };

  const handleSelectNode = (nodeId: string) => {
    navigate({
      search: (prev) => ({ ...prev, node: nodeId }),
    });
  };

  return (
    <div className="min-h-screen bg-black text-neutral-200 antialiased selection:bg-white/20 selection:text-white px-6 pb-24 pt-16 md:px-12 md:pt-24">
      {/* 
        PRIMARY VISUAL REFERENCE ANCHOR 
        C:/Users/ommd3/AppData/Local/Temp/codex-clipboard-8bc00f75-f36a-4cea-8da9-85e4159a597a.png
        Pure black background, narrow centered column (~540px), modest italic serif display name,
        compact serif body text (13.5px-14px), ample whitespace.
      */}
      <header id="top" className="mx-auto max-w-[540px] pt-12 md:pt-16 pb-16">
        <h1 className="font-serif italic text-2xl md:text-[28px] font-normal text-white tracking-tight">
          Om M Doddamani
        </h1>

        <div className="mt-8 space-y-4 font-serif text-[13.5px] md:text-[14px] leading-[1.7] text-neutral-300">
          <p>
            I'm Om M Doddamani, a third-year Computer Science and Engineering student at
            Vidyavardhaka College of Engineering, Mysuru. I'm also the founder of Cerenetics, a
            startup focused on building intelligent, practical software solutions for real-world
            problems.
          </p>
          <p>
            My interests lie at the intersection of Artificial Intelligence, software engineering,
            entrepreneurship, and emerging technologies. I'm particularly fascinated by how we can
            make AI systems more reliable, efficient, and capable of reasoning beyond conventional
            approaches. I've been exploring hybrid AI architectures, quantum machine learning,
            optimization, and intelligent software systems.
          </p>
        </div>

        <div className="mt-6 flex items-center gap-5 text-xs text-neutral-400 font-mono">
          <a
            href="https://github.com/ommd3076"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 decoration-neutral-700 hover:text-white hover:decoration-white transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/om-m-doddamani/"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 decoration-neutral-700 hover:text-white hover:decoration-white transition-colors"
          >
            LinkedIn ↗
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-[840px]">
        {/* 
          CONNECTED FACTUAL PROJECT EXPLORER (Advisor Synthesis)
          Immediate authoritative state, ~280ms power2.out presentation handshake,
          deterministic URL-pinned state, pure factual SVG/DOM pipeline, zero invented metrics.
        */}
        <section id="work" className="border-t border-neutral-800/80 py-14 md:py-16">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              01 · Building
            </h2>
            <p className="text-[11px] font-mono text-neutral-500">
              Selected systems · URL-pinned state
            </p>
          </div>

          <ProjectExplorer
            selectedId={selectedProject}
            activeNodeId={activeNode}
            onSelectProject={handleSelectProject}
            onSelectNode={handleSelectNode}
          />

          <p className="mt-6 text-[11px] font-mono leading-relaxed text-neutral-500">
            Selected systems represent verified implementations and research submissions. Notes are
            updated as publication proceedings and code repositories reach formal release.
          </p>
        </section>

        {/* 
          NOTES / THE INSTRUMENT NARRATIVE (Calculus / Tools Essay)
        */}
        <section id="ideas" className="border-t border-neutral-800/80 py-14 md:py-16">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              02 · Notes
            </h2>
            <span className="text-[11px] font-mono text-neutral-500">
              On instruments and what they make possible
            </span>
          </div>

          <article className="mt-8 max-w-[620px]">
            <p className="font-serif text-lg md:text-[1.35rem] leading-[1.35] tracking-[-0.02em] text-white">
              Sometimes the tool a problem forces us to invent outlasts the problem that called for
              it.
            </p>
            <div className="mt-5 space-y-4 font-serif text-[13.5px] md:text-[14px] leading-[1.75] text-neutral-300">
              <p>
                Newton’s questions about motion helped drive his work on fluxions, one of the
                developments that formed calculus. Leibniz developed calculus independently and gave
                it much of the notation we still use. A question in one field had pushed mathematics
                toward a new way to describe change.
              </p>
              <p>
                I keep coming back to that pattern. Better instruments can extend what people are
                able to do: a more precise tool can give a surgeon greater control; better tools for
                research can make new questions tractable. One advance can create room for the next.
              </p>
              <p>
                That is the kind of engineering I care about—building the right instrument for a
                real task, with the context and care needed for someone to use it well.
              </p>
            </div>
            <p className="mt-4 text-[11px] font-mono text-neutral-500">
              A working perspective, grounded in implementation.
            </p>
          </article>
        </section>

        {/* 
          NOW / ABOUT SECTION
        */}
        <section id="about" className="border-t border-neutral-800/80 py-14 md:py-16">
          <div className="grid gap-6 md:grid-cols-[180px_1fr]">
            <h2 className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              03 · Now
            </h2>
            <div className="space-y-4 font-serif text-[13.5px] md:text-[14px] leading-[1.75] text-neutral-300">
              <p>
                I’m a founder at Cerenetics, and a computer science student at Vidyavardhaka College
                of Engineering, Mysuru. The work I’m most drawn to sits close to implementation,
                experiments, and architecture: learning a system by tracing it, forming a model,
                then testing that model in code.
              </p>
              <p>
                I care about the decisions around the build as much as the build itself—what to keep
                simple, where precision matters, and when the next useful step is to change
                direction.
              </p>
            </div>
          </div>
        </section>

        {/* 
          FOOTER / OUTBOUND PROFILES
        */}
        <footer
          id="contact"
          className="flex flex-wrap items-center justify-between gap-4 border-t border-neutral-800/80 pt-8 text-xs font-mono text-neutral-500"
        >
          <p>Interested in thoughtful engineering and difficult problems.</p>
          <div className="flex gap-4">
            <a
              href="https://github.com/ommd3076"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 underline underline-offset-4 decoration-neutral-800 hover:text-white hover:decoration-white transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/om-m-doddamani/"
              target="_blank"
              rel="noreferrer"
              className="text-neutral-400 underline underline-offset-4 decoration-neutral-800 hover:text-white hover:decoration-white transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
