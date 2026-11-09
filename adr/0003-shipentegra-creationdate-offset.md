# 0003 — Correct ShipEntegra's creationDate at every read site

- **Status:** Accepted
- **Date:** 2026-11-09
- **Adopted from:** AhrarWood ADR-0003

## Context

ShipEntegra's `creationDate` (`"yyyy-MM-dd HH:mm:ss"`, no timezone) runs **3 hours ahead** of the
real event time — confirmed in AhrarWood: an order placed 22:00 Turkey time is recorded as 01:00 the
next day. It looks plausible, so it silently breaks every day/month-boundary decision (which month
an order belongs to, the sync's "new vs existing" window, analytics buckets).

## Decision

Subtract exactly 3 hours at the point `creationDate` is **first read** from ShipEntegra's raw JSON,
never later, so everything downstream (including the stored `orderDate`) inherits the fix.

- jvmMain: `correctSeCreationDate(raw)` in `api/CronCommon.kt` (`LocalDateTime` → `minusHours(3)`).
- jsMain: an independent copy in the admin panel (pure UTC-component arithmetic via
  `kotlin.js.Date.UTC`, independent of the browser's timezone).
- There is no shared `commonMain` code for this; keep the two copies identical.

## Consequences

- Every sync (cron or panel button) stores the corrected date.
- Two implementations to keep in sync — accepted, matching the per-target duplication convention.
