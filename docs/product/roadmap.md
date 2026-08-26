# Roadmap — Features per Sprint

> Two-week sprints. Sprints 1–4 build to the shadow-pilot MVP in `mvp.md`.
> Product code lives in a separate repo; items marked **(site)** belong here.
> Derived from handover §7 (validation plan) and §9 (open decisions).

## Sprint 0 — Launch readiness (this sprint)

- [x] Repo initialized: handover preserved, authoritative German site at root, planning docs reconciled **(site)**
- [x] Formspree configured (`f/mvkpeykq`) — end-to-end test submission from the live site still recommended **(site)**
- [x] Domain decided: www.cleardoc.ch · contact info@cleardoc.ch **(site)**
- [x] Site translated: DE (default), EN, FR, IT with hreflang + language switcher **(site)**
- [x] Hosting: GitHub Pages from `main`; internal files excluded from the published site via `_config.yml` **(site)**
- [ ] Connect custom domain www.cleardoc.ch — ON HOLD per founder; re-add `CNAME` file + DNS records when ready **(site)**
- [x] Impressum + Datenschutzerklärung published in DE/EN/FR/IT (ANB Ventures, PO Box, Zurich) — professional legal review still recommended **(site)**
- [ ] Tariff + legal review of site claims and sources (BAG reference value, example calculation) **(site)**
- [ ] Product repo: create skeleton, CI, and eval harness scaffold (separate repo)

## Sprint 1 — Data foundations & architecture

- Prioritize integrations: which practice software, telephony, and time-tracking
  systems the first pilots actually run (handover §9.5) — pick the top 1–2
- Ingestion for invoice drafts + treatment documentation from those systems
- Local-model operating architecture: candidate models, hardware envelope,
  benchmark on realistic anonymized/synthetic cases (handover §9.7)
- Golden eval set: representative TARDOC cases with known correct outcomes,
  including "no time source → no suggestion" negatives; regression-run on every
  rule/model change

## Sprint 2 — Detection engine (TARDOC basic insurance)

- Missing-position detection with Pauschale-precedence check before per-item logic
- Time-source reconciliation (telephony/time-tracking vs. billed positions —
  the landing-page AA.10.0020 case is the canonical scenario)
- Per-suggestion justification object: source, time basis, tariff position,
  rule version, financial effect
- Hallucination guardrail tests: engine provably silent without a time source

## Sprint 3 — Review workflow & pilot packaging

- Review UI: suggestion list per invoice, accept/reject with reason capture
- Metrics pipeline for the six pilot success criteria (`mvp.md`)
- Local deployment package: install/update path inside practice infrastructure,
  data confined to practice, deletion story
- Security & privacy pass; draft pilot agreement (shadow mode, data handling)

## Sprint 4 — Shadow pilot with Pionierpraxen

- Onboard first 2–3 pioneer practices from the waitlist (pick specialties per
  handover §9.6)
- Weekly metric reviews; tune rules against discard reasons
- Site: switch "Pionierpraxen gesucht" messaging to pilot-progress proof points
  as data allows **(site)**

## Sprint 5+ — Directions gated on pilot evidence

- Go/no-go on active mode (suggestions before invoice dispatch, still with
  mandatory human approval) — only if hit rate and trust metrics clear the bar
- Additional integrations by pilot demand
- Pricing model + commercial pilot conversion
- Supplementary insurance (Zusatzversicherung): separate contract/product/insurer
  rule set and its own compliance review (handover §8, explicitly out of MVP)
- Broader specialties; multi-site/group-practice support

## Standing tracks (every sprint)

- **Integrity:** zero invented services/times — eval regressions must pass
  before any rule or model change ships
- **Privacy:** patient data stays in the practice; every feature reviewed
  against handover §6 guardrails
- **Site accuracy:** launch-site claims stay in sync with validated product
  reality; model calculations stay labeled as examples, never guarantees **(site)**
