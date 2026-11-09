# 0001 — Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-11-09

## Context

SellerScope is a solo/small-team project with a fair amount of non-obvious structure
(the frontend-export deploy step, the per-user encrypted Firestore layout, the server proxy
for ShipEntegra, the multi-tenant cron scheduler). These choices are
easy to forget or accidentally undo. `CLAUDE.md` describes *how things are*; it
doesn't record *why* or when a rule was set.

## Decision

Keep Architecture Decision Records in `adr/`, one Markdown file per decision, using
the lightweight Nygard format (Context / Decision / Consequences). ADRs are
append-only: an accepted ADR is never edited except to mark it superseded.

`adr/` lives at the repo root. Several early ADRs are adopted from the sister project
AhrarWood (where the panel this app is being aligned with was built) and say so.

## Consequences

- Every rule that a future contributor (human or Claude) might reasonably question
  should have an ADR to point at.
- `CLAUDE.md` links to `adr/` and may restate an ADR's rule tersely, but the ADR is
  the source of truth for the reasoning.
- Superseding a decision means a new ADR, not editing history.
