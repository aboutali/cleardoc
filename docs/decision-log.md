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
| 2026-08-26 | Adopt handover landing page (German, TARDOC-specific) as the authoritative launch site at repo root | Founder delivered validated prototype via handover documentation; speculative English document-analysis page discarded. Site proves market fit with Swiss medical practices and demonstrates the core value proposition: local, transparent, AI-assisted invoice verification. | ACCEPTED |
| 2026-08-26 | Planning docs in English, launch site in German | Launch site targets Swiss medical practices (German-language interface, Swiss cultural context, TARDOC familiarity). Planning and roadmap docs stay in English to facilitate international tooling, collaboration, and future documentation migration to the product repo. | ACCEPTED |
| 2026-08-26 | Multilingual site as static per-language subdirectories (/en/, /fr/, /it/) with shared CSS/JS and per-page I18N string config; German default at root | Swiss national languages (DE, FR, IT) + English for international reach. Parsimony: no build step, no i18n framework; language pages reference shared styles.css and script.js at root via ../. Per-page I18N strings in window.CLEARDOC_I18N object; each page has canonical URL + hreflang alternates for SEO. | ACCEPTED |
| 2026-08-26 | Swiss apostrophe number grouping (21'080) kept across all languages | Cross-language visual consistency of the shared calculator and cost examples. Only the decimal separator is localized (de: comma; en: period; fr: comma; it: comma). Thousands apostrophe remains consistent as a widely used Swiss convention across language regions. | ACCEPTED |
| 2026-08-26 | Legal pages (Impressum + Datenschutzerklärung) published in four languages; operating entity named as ANB Ventures, PO Box, Zurich | Swiss legal requirement before go-live. Combined per-language legal.html reusing shared styles; privacy policy reflects actual processing only (GitHub Pages hosting, Formspree form, no cookies/tracking). Professional legal review still recommended. | ACCEPTED |
| 2026-08-26 | Hosting via GitHub Pages from main with custom domain www.cleardoc.ch (CNAME file) | Parsimony: static site, free hosting, deploy = merge to main. DNS record and Pages activation happen in registrar/GitHub settings. | ACCEPTED |
