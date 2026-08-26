# MVP Definition — Pioneer-Practice Shadow Pilot

> Product development happens in a **separate repository**. This defines what
> the MVP is, so the launch site, pilot recruiting, and sprint planning stay
> aligned. Source of truth: handover §3, §6, §7.

## MVP goal

Prove one thing in real practices: **ClearDoc finds documented-but-unbilled
services accurately enough, and explains them clearly enough, that a practice
would pay for it — without ever inventing a service or leaking patient data.**

The vehicle is a **shadow-mode pilot**: ClearDoc analyzes real invoice drafts
in pioneer practices but changes nothing in production; every suggestion is
reviewed by practice staff and the outcome is measured.

## In scope (MVP)

| Capability | Notes |
|------------|-------|
| Ingest invoice draft + treatment documentation | From the pilot practices' existing systems; start with the integration(s) prioritized in Sprint 1 |
| At least one reliable time source | Practice software, telephony duration, or time tracking — no time source, no suggestion |
| Missing-position detection (TARDOC basic insurance) | Flat-rate (Pauschale) precedence checked before per-item logic |
| Per-suggestion justification | Source, time basis, tariff position, rule version, financial effect |
| Review & decision UI (accept / reject with reason) | Rejection reasons feed the metrics below |
| Local deployment | Runs in the practice's controlled infrastructure |
| Metrics capture | The pilot's success criteria — see below |

## Explicitly out of scope (MVP)

- Any automatic change or transmission of an invoice (permanent guardrail, not just MVP)
- Supplementary insurance (Zusatzversicherung) logic — separate rule set, later phase
- Cloud processing of clinical content
- Billing/payments, multi-practice management, mobile apps
- Definitive legal/compliance certification claims (needs independent review first)

## Success metrics (handover §7)

1. Share of correctly detected missing positions (precision on accepted suggestions)
2. Share of discarded/false suggestions
3. Review time per invoice, before vs. with ClearDoc
4. Accepted financial effect (CHF)
5. Payer rejections or queries after invoice dispatch (must not increase)
6. Practice trust in local processing and per-suggestion justifications (qualitative)

## Quality bar

- Zero invented services or times in the entire pilot — a single hallucinated
  position is a launch-blocking incident, not a bug.
- Every suggestion traceable to its sources on inspection.
- Patient data verifiably confined to practice infrastructure.

## Launch-site relationship

The launch site (this repo, German) recruits pioneer practices via the
Formspree form and must promise nothing beyond this MVP scope. The example
invoice (AA.10.0020 × 3, CHF 257.17 → 286.40) and the annual calculator
(6'800 × CHF 155 × 2.0% = CHF 21'080) are illustrative model calculations,
never guarantees — keep that framing intact in all copy.
