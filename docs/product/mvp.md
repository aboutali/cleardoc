# MVP Definition

> Product development happens in a **separate repository**. This document defines
> *what* the MVP is so the launch site, waitlist messaging, and sprint planning
> stay aligned with it. Reconcile against `docs/HANDOVER.md` when available.

## MVP goal

Prove one thing: **people with a dense document will upload it and come away
understanding it better — and will tell us so.**

Everything that doesn't serve that proof is out.

## In scope (MVP)

| Capability | Notes |
|------------|-------|
| Upload or paste a document (PDF / text) | Single document at a time |
| Plain-language summary | Adjustable depth: one-liner / overview / section-by-section |
| Clause/passage explanations | Click a passage → what it means, grounded quote shown |
| Risk & attention flags | "Unusual", "obligation", "deadline", "auto-renewal" style flags |
| Ask a question about the document | Answers cite the passage they rely on |
| Basic account + document history | Minimum needed for retention measurement |
| Feedback capture | "Did this help?" on every explanation — the MVP's success metric |

## Explicitly out of scope (MVP)

- Multi-document comparison, negotiation suggestions, redlining
- Team/collaboration features, sharing, comments
- Integrations (Drive, email ingestion, e-signature platforms)
- Mobile apps (responsive web only)
- Payments (waitlist + free beta first; pricing validated before billing is built)

## MVP quality bar

- Every generated claim is passage-grounded; ungroundable answers say so.
- Clear non-advice disclaimer in the product surface, not buried in ToS.
- Documents encrypted at rest; deletion actually deletes; no training on user
  documents without explicit opt-in.

## Launch-site relationship

The launch website (this repo) sells the MVP promise and collects the waitlist.
Site copy must not promise anything outside the MVP scope table above.
