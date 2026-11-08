# Content & Data Schema Architecture

**Subject**: Typed Data Contracts, Fail-Closed Approval, Public DTO Projection, and Graph Validation  
**Status**: DRAFT / PLANNING PHASE (Gated)  
**Last Updated**: 2026-11-08 (Post Gemini 1–4 & Grok 1–5 Consultations)  
**Repository**: `portfolio-site`

---

## 1. Schema Philosophy: Fail-Closed Security & Anti-Leakage

To strictly preserve public/private boundaries and eliminate client data leaks (Gemini 3 & 4):

1. **Fail-Closed Default**: Every project, experience record, and note defaults to `private-draft`. Nothing is exposed to the client or public build unless its `approvalStatus` is explicitly set to `"approved-for-public"`.
2. **Public DTO Projection**: Client-facing components and SSR payloads consume sanitized **Data Transfer Objects (DTOs)**. Internal development notes, private discovery files, and unverified reviewer feedback are stripped at the projection layer before JSON serialization.
3. **Strict Path Validation**: All slugs and identifiers must match a strict kebab-case alphanumeric regex (`^[a-z0-9]+(?:-[a-z0-9]+)*$`). Any parameter containing path traversal (`../`), dots, or special characters is rejected.

---

## 2. Project Data Contracts & Public DTO

```typescript
import { z } from "zod";

// Strict slug validator preventing path injection
export const SlugSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase alphanumeric with hyphens");

export const ApprovalStatusSchema = z.enum([
  "approved-for-public", // Verified against primary sources; publishable
  "provisional-review", // Under verification; internal only
  "private-draft", // Default: strictly withheld from public builds
]);

export const ProjectStatusSchema = z.enum([
  "presented", // Formally presented at conference / symposium
  "shipped", // Production software released
  "in-progress", // Active development / ongoing research
  "learning-experiment", // Honest retrospective learning attempt (e.g. EVA)
  "concept", // Staged architectural concept
]);

// Architecture Graph Schemas (with Edge Validation)
export const ArchitectureNodeSchema = z.object({
  id: z.string().regex(/^[a-z0-9-_]+$/),
  label: z.string(),
  subtext: z.string(),
  status: z.enum(["active", "idle", "processing", "complete"]),
  telemetryMetric: z.string().optional(),
});

export const ArchitectureEdgeSchema = z.object({
  id: z.string(),
  fromNodeId: z.string(),
  toNodeId: z.string(),
  label: z.string().optional(),
});

// Full Internal Content Schema (Never sent directly to client)
export const InternalProjectSchema = z
  .object({
    id: z.string(),
    slug: SlugSchema,
    title: z.string(),
    category: z.string(),
    status: ProjectStatusSchema,
    approvalStatus: ApprovalStatusSchema.default("private-draft"),
    summary: z.string(),
    details: z.string(),
    evidenceCitation: z.string().optional(),
    presentationVenue: z.string().optional(),
    personalContribution: z.string(),
    internalNotes: z.string().optional(), // Private: stripped from client DTO
    verifiedLinks: z.object({
      github: z.string().url().optional(),
      paper: z.string().url().optional(),
      demo: z.string().url().optional(),
    }),
    nodes: z.array(ArchitectureNodeSchema).default([]),
    edges: z.array(ArchitectureEdgeSchema).default([]),
    featured: z.boolean().default(false),
  })
  .refine(
    (data) => {
      // Graph Integrity Check: All edge connections must point to existing nodes
      const nodeIds = new Set(data.nodes.map((n) => n.id));
      return data.edges.every((edge) => nodeIds.has(edge.fromNodeId) && nodeIds.has(edge.toNodeId));
    },
    { message: "Graph edges must connect to valid node IDs." },
  );

// Sanitized Public DTO (Safe for SSR hydration and client bundles)
export const PublicProjectDTOSchema = z.object({
  id: z.string(),
  slug: SlugSchema,
  title: z.string(),
  category: z.string(),
  status: ProjectStatusSchema,
  summary: z.string(),
  details: z.string(),
  evidenceCitation: z.string().optional(),
  presentationVenue: z.string().optional(),
  personalContribution: z.string(),
  verifiedLinks: z.object({
    github: z.string().url().optional(),
    paper: z.string().url().optional(),
    demo: z.string().url().optional(),
  }),
  nodes: z.array(ArchitectureNodeSchema),
  edges: z.array(ArchitectureEdgeSchema),
  featured: z.boolean(),
});

export type PublicProjectDTO = z.infer<typeof PublicProjectDTOSchema>;
export type InternalProject = z.infer<typeof InternalProjectSchema>;

// Public Projection Function
export function toPublicProjectDTO(project: InternalProject): PublicProjectDTO | null {
  if (project.approvalStatus !== "approved-for-public") {
    return null; // Fail-closed: non-approved items cannot serialize
  }
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    category: project.category,
    status: project.status,
    summary: project.summary,
    details: project.details,
    evidenceCitation: project.evidenceCitation,
    presentationVenue: project.presentationVenue,
    personalContribution: project.personalContribution,
    verifiedLinks: project.verifiedLinks,
    nodes: project.nodes,
    edges: project.edges,
    featured: project.featured,
  };
}
```

---

## 3. Experience & Milestones Contract (`ExperienceSchema`)

```typescript
export const ExperienceSchema = z.object({
  id: z.string(),
  organization: z.string(),
  role: z.string(),
  period: z.string(),
  location: z.string(),
  status: z.enum(["current", "completed"]),
  approvalStatus: ApprovalStatusSchema.default("private-draft"),
  coreFocus: z.array(z.string()),
  evidenceLevel: z.enum(["public-fact", "provisional", "under-review"]),
  description: z.string(),
});

export type Experience = z.infer<typeof ExperienceSchema>;
```

---

## 4. Bookmark Fieldnotes Contract (`BookmarkFieldnoteSchema`)

Structured directly after the verified 234-item dataset extracted from `saved-fieldnotes.html`:

```typescript
export const BookmarkFieldnoteSchema = z.object({
  date: z.string(),
  author: z.string(),
  statusId: z.string().regex(/^\d+$/),
  category: z.enum([
    "Design & visual tools",
    "Creative workflow",
    "Careers & hiring",
    "AI research & models",
    "AI products & demos",
    "Funding & opportunities",
    "Developer learning",
    "Agents & harnesses",
  ]),
  title: z.string(),
  context: z.string(),
  isArticleCard: z.boolean(),
  canonicalUrl: z.string().url().optional(),
});

export type BookmarkFieldnote = z.infer<typeof BookmarkFieldnoteSchema>;
```
