# Security, Privacy & Hygiene Specifications

**Subject**: Security Posture, Fail-Closed Content Approval, Client Leakage Prevention, and Path Validation  
**Status**: DRAFT / PLANNING PHASE (Gated)  
**Last Updated**: 2026-11-08 (Post Gemini 1–4 & Grok 1–5 Consultations)  
**Repository**: `portfolio-site`

---

## 1. Fail-Closed Content Approval & Privacy Boundary

To eliminate the risk of accidental exposure of unverified research, private notes, or founder strategy (Gemini 3 & 4):

1. **Default Deny (Fail-Closed)**:
   - All content records default to `approvalStatus: "private-draft"`.
   - Content without an explicit `"approved-for-public"` status flag is never compiled into static builds, SSR routes, or client-side bundles.
2. **Client Data Leakage Prevention via Public DTO Projection**:
   - Client bundles and SSR state caches (such as TanStack Router de/hydration stores) consume strictly projected **Public DTOs** (`PublicProjectDTO`).
   - Internal development fields (`internalNotes`, raw file paths, unvetted author drafts) are eliminated at the server/build projection layer before serialization.
3. **Primary-Source Verification Gate**:
   - Any citation (e.g. PRISM conference acceptance, IEEE AIEI presentation) must be verified against primary sources before promotion to `"approved-for-public"`.

---

## 2. Path Traversal & Parameter Validation

To prevent path injection, file disclosure, or router exploitation:

1. **Strict Slug & Anchor Whitelist**:
   - All URL parameters (`?category=...&q=...`) and in-page anchor identifiers (`#featured-stories`, `#repo-catalog`, `#repo-<name>`) must validate against the regex `^[a-z0-9]+(?:-[a-z0-9]+)*$`. The portfolio routes strictly follow the authorized five-route specification (`/`, `/work`, `/about`, `/notes`, `/contact`). Dynamic wildcard routes are rejected.
   - Input containing `../`, `./`, null bytes, slashes, or special characters is rejected immediately and redirected to the safe base route.
2. **Static Asset Resolution**:
   - Image and SVG assets must resolve strictly from an approved, static whitelist within `@/assets/`. No dynamic filesystem path concatenation is permitted.

---

## 3. Content Security Policy (CSP) & HTTP Headers

Configured in Nitro server runtime (`src/server.ts`):

```typescript
const securityHeaders = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'", // Required for TanStack Start SSR hydration
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; "),
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};
```

---

## 4. Safe External Link Protocol

All external links (GitHub, LinkedIn, papers) must implement:

```html
<a href="https://..." target="_blank" rel="noopener noreferrer">...</a>
```

This isolates the window context, prevents `window.opener` hijacking, and prevents referrer leakage.

---

## 5. Dependency Hygiene & Version Audit

- **Independent Verification (Grok 3)**:
  - Third-party packages must be independently verified for permissive licenses (MIT, Apache 2.0, BSD-3-Clause) and audited for CVE vulnerabilities via `npm audit`.
  - Lockfile integrity must be strictly maintained across both `package-lock.json` and `bun.lock`.
- **Zero Injected CDN Scripts**: No external runtime CDN scripts (`<script src="https://cdn...">`) are permitted.
