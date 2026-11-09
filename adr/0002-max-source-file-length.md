# 0002 — Cap source files at 1500 lines

- **Status:** Accepted
- **Date:** 2026-11-09
- **Adopted from:** AhrarWood ADR-0002

## Context

`pages/Admin.kt` is ~4,900 lines: data classes, the encrypted Firestore helpers, the orders
dashboard, analytics, the loss tab, historical data and the onboarding overlay all share one file.
The AhrarWood panel that SellerScope is being aligned with grew the same way (to ~7,300 lines)
before being split into `pages/admin/*`. A file that size can't be held in one's head, doesn't fit
an AI context window, and makes every change conflict with every other.

## Decision

A Kotlin source file may not exceed **1500 lines** (soft cap, enforced in review).

When a file approaches the cap, split it by feature. The admin panel moves to
`pages/admin/Admin<Feature>.kt` (package `com.orderpanel.pages.admin`), mirroring AhrarWood's file
names so features can be compared side by side. Shared data classes and Firestore helpers go to
`pages/admin/AdminModel.kt` / `AdminFirestore.kt`.

## Consequences

- More, smaller files; more imports. Accepted.
- `Admin.kt` is split as part of the AhrarWood port (phase 3), not in a separate rewrite.
- Reviews flag any new or grown file past 1500 lines.
