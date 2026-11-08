# Gemini build brief — personal portfolio

Use this file together with `portfolio-mockup.html`. The mockup is the current visual direction; the React homepage is an initial implementation already in progress. Continue from the existing project rather than replacing the app wholesale.

## Goal

Create a personal portfolio for Om M. Doddamani that leaves a thoughtful, memorable impression of an engineer with deep technical intuition, adaptability, and sound judgment earned through years of building and learning. The portfolio is not a sales page. Keep the writing natural, specific, modest, and human.

Primary readers: investors. Also potential co-founders, future teammates, and technical peers. A visitor should come away with a sense of how Om thinks and makes decisions, not a pile of unsubstantiated superlatives.

## Approved public material

- Display name: Om M. Doddamani.
- Public profiles: https://github.com/ommd3076 and https://www.linkedin.com/in/om-m-doddamani/ . These are old snapshots; treat them as discovery sources, not unquestioned current truth.
- Founder role at Cerenetics is approved for the portfolio.
- Strongest work areas to emphasize: implementation, experiments, and architecture.
- Desired language for the core strength: technical intuition, adaptability, fast orientation in unfamiliar systems, practical judgment, and choosing the next useful step. Avoid “grasping power.”
- Mention the cycle of trying, failing, learning, and taking responsibility for decisions. Do not expose intimate personal history or private thoughts.
- A first hackathon project called EVA attempted office automation and did not work as intended. It can be framed honestly as an early attempt and a learning experience.
- The user wants a Newton/calculus story as an idea section: a problem in one field can prompt a tool that later proves useful far beyond the original problem. Keep the historical framing accurate: Newton developed his method of fluxions as calculus emerged, while Leibniz independently developed calculus and introduced the notation that became widely used. Do not claim a single instantaneous invention or that calculus is “more useful” than the laws Newton studied.
- The user’s extrapolation: better tools can improve the precision of consequential work, and greater capability can create room for more research and discovery. Present this as the author’s perspective, not a proven neuroscientific claim.
- Style references: https://www.contentarchitecture.dev/ for technical/project storytelling; https://datacurve.ai/ for restrained About presentation; https://ellipsus.com/ for an organic written/ideas voice. They are references, not templates to copy.
- Motion preference for project presentation: 65% systems reveal / 35% instrument-like interaction. Use mostly calm, legible structure with rare tactile details that explain the work. Honor reduced motion.

## Privacy boundary

Only use the approved portfolio facts above. Do not copy private discovery notes, persona files, personal history, private opinions, or startup strategy into public copy. Do not include sensitive/personal information that is not explicitly listed as approved. No private context should be surfaced in this handoff.

## Accuracy and project evidence

Known candidate projects surfaced during discovery: PRISM/offline AI research; deep reinforcement learning game research; Cerenetics; EVA. Early notes say PRISM was accepted for a conference presentation and the DRL work was presented at IEEE AIEI, but exact paper titles, venues, dates, citations, author order, contribution statements, and links still need primary-source verification. Do not upgrade “presentation” into “publication,” imply sole authorship, or invent measured outcomes.

GitHub may reveal more repositories. LinkedIn may reveal experience and older descriptions. Research papers and project files are the authorities for factual claims. Create a project only when its status, contribution, and evidence can be stated. Separate shipped, presented, in progress, and concept-stage work. Keep concept-stage work out of the featured-project list unless clearly labeled.

Current candidate card copy in the mockup is provisional. Before publishing it, verify every detail against the underlying repository/paper and confirm the user’s personal role. Do not invent project screenshots; use real artifacts or restrained diagrams made from verified system structure.

## Visual direction

- Editorial, quiet, tactile. Warm paper background, near-black ink, restrained earth-toned accent, thin dividers, generous white space.
- Strong typographic hierarchy: large plainspoken hero, compact eyebrow labels, readable project notes, and an expressive serif treatment for the Newton idea passage.
- A subtle orbit / instrument diagram can suggest observation and technical perception; keep it quiet and functional.
- Header stays compact and usable. Main sections: Hero, Selected work, Ideas (Newton/calculus), How I work/About, Contact.
- Responsive from small mobile through desktop. Preserve high contrast and keyboard/focus access. Respect `prefers-reduced-motion`.
- Avoid glowing AI gradients, overstuffed dashboards, generic SaaS cards, fake metrics, invented testimonials, and hype claims.

## Project instructions

1. Read the existing `AGENTS.md` in the app root before edits and preserve the TanStack Start + React + TypeScript architecture, routes, and authored motion setup.
2. Review `portfolio-mockup.html` and the current `src/routes/index.tsx`; refine the actual app so it follows the mockup while preserving progressive content visibility and reduced-motion behavior.
3. Inspect existing project data before reusing it. Some current company-site sample project names, outcomes, and metrics may be placeholders; do not migrate those claims into this personal portfolio.
4. Continue implementation in the existing app. Keep any substantive project-detail pages separate and evidence-led. Do not rewrite generated route files manually.
5. Keep code changes scoped to portfolio work. Do not remove unrelated user files or history.
6. Return a concise change summary and list every factual claim that still needs source/user verification. Do not claim tests or visual review that were not performed.

## Current files

- `portfolio-mockup.html`: standalone HTML concept.
- `src/routes/index.tsx`: initial homepage implementation.
- `src/components/site/HeaderBar.tsx`: current header adapted to personal portfolio anchors.
- `src/components/site/Chrome.tsx`: footer adapted to public profile links.
