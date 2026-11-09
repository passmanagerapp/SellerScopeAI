# 0005 — Multi-tenant Kobweb server on Railway; ShipEntegra is the only integration

- **Status:** Accepted
- **Date:** 2026-11-09

## Context

SellerScope was a static site on GitHub Pages: Firebase Auth sign-up, each user's data under
`users/{uid}/...` as client-side AES-GCM blobs (`crypto/Crypto.kt`), orders entered by CSV or by
hand. The AhrarWood admin panel offers far more (ShipEntegra order sync, label creation, delivery
tracking, returns/replacements, customs-risk follow-up, expense and damage tracking, analytics,
daily crons), but it is single-tenant, keeps third-party keys in server env vars, and depends on
the Etsy Open API for parts of it.

Bringing those features here needs a server: ShipEntegra's API requires a client secret (cannot
live in a browser) and the daily jobs must run headlessly.

## Decision

1. **Hosting:** the same Kobweb app gains `jvmMain` `@Api` endpoints and runs on Railway from
   `Dockerfile` (JVM-only build; frontend is the committed export — ADR-0004). GitHub Pages
   (`docs/`) is retired once `sellerscopeai.app` points to Railway.
2. **No Etsy API.** Orders, revenue (`totalPrice`/`taxAmount` → `computeEarned()`), tracking and
   shipping costs all come from ShipEntegra. Marketplace fee rates used by `computeEarned()` are a
   per-user setting (default: Etsy US published rates) rather than a call to any marketplace.
3. **Tenancy:** every user connects **their own** ShipEntegra account. The browser authenticates
   to `/api/*` with its Firebase ID token (`Authorization: Bearer …`); a default-deny interceptor
   verifies it and resolves the `uid`. Per-user secrets (ShipEntegra client id/secret, optional
   Gmail app password) are stored under `users/{uid}/private/…`, encrypted with a server-only key
   (`CREDENTIALS_KEY`), and are unreachable from the client (`firestore.rules`).
4. **Data compatibility:** the server writes user data in the same `EncryptedPayload` blob format
   as the browser (a JVM twin of `Crypto.kt`), so cron-written orders open in the panel and
   existing users' data keeps working.
5. **Crons** iterate over users who have ShipEntegra connected; one user's failure never stops the
   others.

## Consequences

- Railway cost (~$5/month) and a server to operate.
- `Crypto.kt`'s key is derived from the uid, so it is obfuscation at rest, not secrecy; the
  third-party credentials therefore get their own server-side key.
- Field-level Firestore updates are impossible on encrypted blobs: server writes are
  read → decrypt → merge → encrypt → write.
- ShipEntegra rate limits apply per user account; token cache is per uid.
