---
name: rare-ui
description: Install and adapt Rare UI's animated React components through the project's shadcn registry and MCP.
---

# Rare UI

Rare UI is a source registry of animated React components. This project accesses it through the shadcn MCP and the `@rare-ui` registry in `components.json`.

## Install workflow

1. Find the exact component name and review its live preview, API, dependencies, reduced-motion behavior, and attribution terms on [rareui.com](https://www.rareui.com/components).
2. Install through the shadcn MCP or run `npx shadcn@latest add @rare-ui/<component> --yes` from `portfolio-site/`.
3. Components install under `src/components/ui/`. Keep existing shared utilities in `src/lib/utils.ts`; if a registry dependency prompts to replace that file, preserve the project version and adapt the new component to import `cn` from `@/lib/utils`.
4. Adapt the component to the site's existing design and motion rules. Do not add it to a screen unless that screen's requirements call for it.
5. Before shipping a component, follow its Rare UI attribution and copyright terms. Rare UI's terms require a visible link to rareui.com when a project ships one of its components.

## MCP

The generic `shadcn` MCP server is configured in `.mcp.json` and the workspace Codex configuration. Restart the editor after changing MCP configuration so its tools bind.

## References

- [Rare UI components](https://www.rareui.com/components)
- [Rare UI MCP setup](https://www.rareui.com/mcp)
- [Rare UI terms](https://www.rareui.com/terms)
