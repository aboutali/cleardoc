# Decision Log

This is a lightweight Architecture Decision Record (ADR) for ClearDoc. Use this to track decisions—especially technical architecture, product scope, and process—that have consequences over time or that multiple people might question later.

**How to use:**
- Add a new row whenever the team resolves a significant question (not every small choice, but ones that could be revisited).
- Include the context: why this matters, what alternatives were considered.
- Link to relevant docs (e.g., `docs/product/mvp.md`, sprint notes, GitHub issues) if available.
- Update the status as circumstances change (e.g., "ACCEPTED" → "SUPERSEDED" if a new decision revises it).

---

## Decisions

| Date | Decision | Context | Status |
|------|----------|---------|--------|
| 2026-08-26 | Launch site is static, zero-build-step | Parsimony: no CI overhead, free hosting (GitHub Pages/Vercel), minimal maintenance burden. Product code (separate repo) can be more complex; the public face stays simple. | ACCEPTED |
| 2026-08-26 | Product docs live in this (launch) repo until product repo exists | Single source of truth for vision, MVP scope, and roadmap during pre-MVP. Avoids split context. Will migrate to product repo once development begins in earnest. | ACCEPTED |
