# Roadmap — Features per Sprint

> Two-week sprints. Sprints 1–3 build to the MVP defined in `mvp.md`; later
> sprints are direction, not commitment. Product code lives in a separate repo;
> items marked **(site)** belong in this repo.

## Sprint 0 — Foundation (this sprint)

- [x] Launch website scaffold, deployable as static site **(site)**
- [x] Product planning docs: vision, MVP, roadmap, assumptions **(site)**
- [ ] Reconcile docs with handover documentation (`docs/HANDOVER.md`)
- [ ] Decide hosting (GitHub Pages vs. Vercel/Netlify) and custom domain **(site)**
- [ ] Wire waitlist form to a real backend (Formspree/Buttondown/Tally or own endpoint) **(site)**
- [ ] Product repo: skeleton, CI, model-provider choice (separate repo)

## Sprint 1 — Core pipeline

- Document ingestion: PDF + pasted text, robust text extraction
- Summary generation with adjustable depth
- Grounding architecture: every output span maps to source passages (this is
  foundational — retrofitting grounding later is far harder)
- Internal eval set: 20–30 real documents (leases, policies, ToS) with expected
  outputs; regression-run on every prompt/model change

## Sprint 2 — Understanding UX

- Interactive document view: click passage → explanation
- Risk & attention flags (deadlines, auto-renewals, unusual clauses)
- Ask-the-document Q&A with citations
- Reading-level control (plain / detailed)

## Sprint 3 — MVP hardening & private beta

- Accounts, document history, deletion that deletes
- Feedback capture ("did this help?") + basic analytics funnel
- Security pass: encryption at rest, secrets handling, rate limiting
- Private beta with waitlist cohort #1; launch site updates from "waitlist" to
  "request access" **(site)**

## Sprint 4 — Learn & iterate

- Act on beta feedback (reserve the whole sprint for this — plan nothing else big)
- Document-type detection with tailored flag sets (lease vs. insurance vs. ToS)
- Shareable summary (read-only link) — first organic-growth loop

## Sprint 5+ — Candidate directions (pick by beta evidence)

- Multi-document comparison ("what changed between these two versions?")
- Integrations: email-in a document, Google Drive picker
- Pricing + billing (only once retention proves willingness to return)
- Team workspaces
- Localization (plain-language output in the user's language)

## Standing tracks (every sprint)

- **Quality:** eval-set regression must pass before any model/prompt change ships
- **Trust:** privacy posture and non-advice boundaries reviewed with each feature
- **Site:** keep launch-site claims in sync with actual product scope **(site)**
