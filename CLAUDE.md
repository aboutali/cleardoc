# Working Agreements for AI Sessions in This Repo

Standing instructions from the founder — valid at all times:

## Orchestration model

- The strongest available model (orchestrator) plans, decides, and reviews;
  standard/mechanical tasks are delegated to cheaper models (e.g. Sonnet for
  translation/build tasks, Haiku for hygiene/boilerplate).
- Use recursive loops between agents: orchestrator reviews every agent
  deliverable and sends revisions back to the same agent until it clears the
  bar; escalate to the orchestrator itself only for judgment-heavy work
  (strategy, reconciliation, final review).
- Balance parsimony and quality on every task: smallest change that meets the
  quality bar; no frameworks, build steps, or dependencies without need.

## Repo conventions

- This repo is the **launch website + product planning** only. The ClearDoc
  product is developed in a separate repository — do not build product features
  here.
- `ClearDoc_Handover_2026-08-26/` is a preserved record — never edit it.
- Site: static, zero build step. German is the default at the root; EN/FR/IT
  live in `/en/`, `/fr/`, `/it/` and share the root `styles.css`/`script.js`
  (UI strings via per-page `window.CLEARDOC_I18N`). Any copy change must be
  propagated to all four languages.
- Site copy must never promise beyond the MVP scope in `docs/product/mvp.md`,
  and model calculations stay labeled as examples, never guarantees.
- Planning docs are English; site copy is DE/EN/FR/IT.
- Launch facts: domain https://www.cleardoc.ch (connection ON HOLD — do not add
  a `CNAME` file until the founder says so) · contact info@cleardoc.ch ·
  Formspree endpoint https://formspree.io/f/mvkpeykq.
- Internal files (README, CLAUDE.md, docs/, handover folder) are excluded from
  the published site via `_config.yml` — keep that list in sync when adding
  non-site files.
