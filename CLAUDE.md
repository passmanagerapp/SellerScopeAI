# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

SellerScope (`sellerscopeai.app`) — a multi-tenant order-management dashboard for small marketplace
sellers, built with [Kobweb](https://github.com/varabyte/kobweb) (Kotlin Multiplatform, Compose
HTML). Public marketing pages (`/`, `/about`), Firebase Auth sign-up/login (`/signup`, `/login`)
and the seller panel (`/admin`). One Gradle module: `:site`, package root `com.orderpanel`.

**Direction (ADR-0005):** the panel is being brought up to feature parity with the AhrarWood
`/panel` (sister repo `passmanagerapp/AhrarWood`), **without the Etsy API** — ShipEntegra is the
only integration. Work is phased; see "Port status" below.

## Commands

```bash
./gradlew :site:compileKotlinJs     # type-check the frontend after any jsMain change
./gradlew :site:compileKotlinJvm    # type-check the server after any jvmMain change
./gradlew :site:jvmJar              # build the API jar (site/build/libs/orderpanel.jar)
```

- No test suite exists. Don't invent one.
- Java 17 toolchain in Docker (21 works locally).
- In cloud sessions Maven Central sometimes answers 429 — rerun with `--max-workers=1`.

## Deploy — read before touching `jsMain`

- Production runs on **Railway** from `Dockerfile` (`railway.toml`, health check `/api/ping`).
  The Docker build compiles **only the JVM side**; the frontend it serves is the **git-committed**
  export in `site/.kobweb/site/` (FULLSTACK layout: `pages/`, `system/`, `resources/`).
- A `jvmMain` change ships on push. **A `jsMain` change ships only after re-exporting and
  committing `site/.kobweb/site/`** — use the `deploy-frontend` skill
  (`.claude/skills/deploy-frontend/SKILL.md`). Never the bare `kobweb export` CLI (ADR-0004).
- `docs/` and `site/docs/` are the old GitHub Pages (STATIC) mirror. They stay until the
  `sellerscopeai.app` DNS points to Railway, then get deleted. Don't update them.
- Railway env vars (set in the Railway dashboard, never committed): `FIREBASE_SERVICE_ACCOUNT`,
  `CREDENTIALS_KEY`, `CRON_SECRET`, `OPENAI_API_KEY` (customs-reply summaries). Added as the phases
  that need them land.

## Architecture

### Source sets (`site/src/`)

- `jsMain` — the whole UI. `@Page` composables in `pages/` become routes (`Admin.kt` → `/admin`).
  `AppEntry.kt` (`@App`) initialises Firebase and global CSS.
- `jvmMain/.../api/` — Kobweb `@Api` endpoints, one `suspend fun` per file; the kebab-case function
  name is the route under `/api/` (`fun ping` → `/api/ping`). `kobweb-api` is `compileOnly`.

### Data — Firestore (project `sellerscopeai`)

- Every user's data lives under `users/{uid}/…` (`admin_orders`, `app_config/skus`,
  `monthly_snapshots`, `losses`, …). Rules in `firestore.rules`: only the signed-in owner;
  `users/{uid}/private/**` is server-only (encrypted third-party credentials).
- Documents are `EncryptedPayload(enc)` blobs: AES-GCM with a key derived from the uid
  (`crypto/Crypto.kt`). Legacy plaintext docs are migrated on read. Data classes must keep default
  values for every field and be decoded with `ignoreUnknownKeys` so old blobs still open.
- Firebase web config (`firebase/FirebaseConfig.kt`) is public by design and committed.

### ShipEntegra

`publicapi.shipentegra.com/v1`. Reference + hard-won quirks: [SHIPENTEGRA-API.md](SHIPENTEGRA-API.md).
Always read `creationDate` through `correctSeCreationDate()` (ADR-0003). Server HTTP clients use
HTTP/1.1 + explicit connect/request timeouts + one retry (never retry `POST /orders`).

## Conventions

- Work on the branch the session was given; don't push elsewhere without being asked.
- User-facing text goes through `strings/StringsProvider.kt` + `public/resources/strings_{en,tr}.xml`
  — no bare string literals in the DOM.
- Source files are capped at **1500 lines** (ADR-0002). `pages/Admin.kt` is the known exception
  and is being split into `pages/admin/*` during the port.
- Decisions live in [`adr/`](adr/README.md); add one when you make a non-obvious call.

## Port status (AhrarWood → SellerScope, ShipEntegra only)

- [x] Phase 0 — Kobweb server enabled, Railway Dockerfile, FULLSTACK RELEASE export, Firestore
      rules, docs/ADRs.
- [ ] Phase 1 — Firebase-ID-token API guard, per-user encrypted ShipEntegra credentials, JVM twin of
      `Crypto.kt`, Firestore REST helpers, extended order model.
- [ ] Phase 2 — ShipEntegra proxies (orders, detail, create order, label, price, tracking,
      calculate) and multi-tenant crons (sync, shipping sync, price update, customs replies).
- [ ] Phase 3 — split `Admin.kt`; Orders tab (automation board, Today, Ledger, drawer, label dialog).
- [ ] Phase 4 — Returns & replacements + manual shipment, Loss, Expenses, Damage claims, Customs risk + TSCA.
- [ ] Phase 5 — Analytics (summary, shipping, country, colour), Settings / App Info, i18n audit.
- [ ] Phase 6 — Railway env + DNS cutover, delete `docs/`.

Out of scope: anything using the Etsy API, AI listing/review tools, AhrarWood's book covers,
nameplates, custom designs, software costs, Q4 goal bar.
