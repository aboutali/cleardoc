# Assumptions — Reconciled Against Handover

> **Status: RECONCILED (2026-08-26).** The handover documentation arrived in
> `ClearDoc_Handover_2026-08-26/` and is the source of truth. The original
> pre-handover assumptions are kept below with verdicts, so the reasoning trail
> stays visible.

## What ClearDoc actually is (from the handover)

A **locally-run, specialized AI verification layer for Swiss outpatient medical
billing (TARDOC)**. It compares an invoice draft against treatment
documentation and reliable time sources (practice software, telephony, time
tracking) and flags documented services that may be missing from the invoice —
with source, tariff position, rule, and financial effect shown for each
suggestion. Core promise: *"Jede erbrachte Leistung. Korrekt verrechnet.
Patientendaten bleiben in der Praxis."*

Non-negotiable guardrails (handover §3, §6):

- No time source → no suggestion. ClearDoc never invents services or times.
- Nothing is booked or sent automatically; human (medical) approval is mandatory.
- Patient data stays in the practice's controlled infrastructure; no training
  of general models on patient data.
- No definitive compliance claims before technical, tariff, and legal review.
- Supplementary-insurance (Zusatzversicherung) logic is separate from basic
  insurance and out of the current scope.

## Verdicts on the original assumptions

| # | Original assumption | Verdict |
|---|---------------------|---------|
| A1 | AI product that makes complex documents understandable for laypeople | **Wrong.** ClearDoc verifies completeness/correctness of TARDOC invoices for medical practices — a B2B revenue-integrity tool, not a consumer comprehension tool. |
| A2 | Audience: individuals facing contracts, leases, insurance policies | **Wrong.** Audience: Swiss medical practices — physicians, MPAs, billing specialists, practice owners. First validation targets high-volume practices ("Pionierpraxen"). |
| A3 | Product developed in a separate repository; this repo = launch site + planning | **Confirmed.** |
| A4 | Web-first upload/paste delivery | **Wrong.** Runs locally within practice infrastructure; local processing is the core trust differentiator, not a cloud upload flow. |
| A5 | Freemium consumer model | **Wrong.** B2B validation phase: pioneer-practice pilots in shadow mode first; pricing not yet defined. |
| A6 | No committed brand identity beyond the name | **Partly wrong.** A German landing page with established copy, example invoice (AA.10.0020 case, CHF 257.17 → 286.40), and annual calculator (6'800 × CHF 155 × 2.0% = CHF 21'080) exists and is authoritative. Domain, legal entity, and final brand name are still open (handover §9). |

## Remaining open points (from handover §9)

1. Formspree project + recipient address
2. Domain, brand name, legal entity
3. Impressum + Datenschutzerklärung (legally required before go-live)
4. Tariff/legal sign-off on sources and claims
5. Integration priorities: practice software, telephony, time tracking
6. Pilot specialties and success criteria
7. Local-model operating architecture + benchmarks
8. Separate rule/data basis for supplementary insurance
