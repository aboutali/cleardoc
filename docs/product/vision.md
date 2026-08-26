# ClearDoc — Product Vision

> Source of truth: `ClearDoc_Handover_2026-08-26/` (HANDOVER.md,
> VALUE_PROPOSITION.md). This file is the English working summary for planning.

## One-liner

**Jede erbrachte Leistung. Korrekt verrechnet. Patientendaten bleiben in der Praxis.**
(Every service rendered. Correctly billed. Patient data stays in the practice.)

ClearDoc is a locally-run, Swiss-tariff-specialized AI verification layer for
outpatient billing. Before an invoice leaves the practice, ClearDoc checks the
draft against treatment documentation and reliable time sources, and flags
documented services that may be missing — traceably, with tariff position,
rule, and financial effect.

## Problem

- With TARDOC, Swiss outpatient billing became more granular and rule-heavy;
  documented services are easy to under-bill under time pressure.
- Manual invoice review is slow, inconsistent, and competes with patient care.
- Cloud AI tools are a hard sell in medical practices: clinical content must
  not leave the controlled practice environment.

## The three pillars (from the handover)

1. **Vollständig** — detect documented services possibly missing from the draft.
2. **Nachvollziehbar** — every suggestion shows its source, time basis, tariff
   position, rule version, and financial effect. The practice decides.
3. **Vertraulich** — the specialized model runs inside the practice's
   infrastructure; no clinical content to external AI providers, no training of
   general models on patient data.

## Product logic (non-negotiable)

- A suggestion exists only when the invoice draft can be cross-checked against
  a solid source (documentation, practice software, telephony duration, time
  tracking). **No time source, no suggestion.**
- Never recommend an undocumented service; never alter treatment or
  documentation to increase revenue.
- No automatic booking or sending; human approval is mandatory.
- Check flat-rate (Pauschale) precedence before per-item logic.
- Basic vs. supplementary insurance handled by strictly separate rule sets;
  supplementary insurance is future scope.

## Positioning

Local, specialized AI for verifying Swiss outpatient medical invoices — a
revenue-integrity and compliance aid for practices, not a billing automat and
not a general chatbot. External messaging targets all practices; first
validation targets practices with high invoice volume or heavy manual review
burden ("Pionierpraxen").

## Success looks like

- Pilot practices in shadow mode confirm: high hit rate on genuinely missing
  documented positions, low false-positive/discard rate, measurable review-time
  savings, accepted financial effect, and no increase in payer rejections.
- Practices trust the local processing and the per-suggestion justification
  enough to move from shadow mode to active use.
