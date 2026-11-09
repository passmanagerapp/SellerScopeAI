# 0004 — `kobweb export` must force a RELEASE build target (FULLSTACK layout)

- **Status:** Accepted
- **Date:** 2026-11-09
- **Adopted from:** AhrarWood ADR-0004

## Context

Kobweb's Gradle plugin defaults `kobwebBuildTarget` to `DEBUG` unless `kobwebEnv=PROD`, but
`kobwebExport` hard-requires `kobwebEnv=DEV` (it spins up a dev server to prerender pages). The
`kobweb` CLI never passes `-PkobwebBuildTarget=RELEASE`, so every plain `kobweb export` ships a
DEBUG bundle. A DEBUG `main()` calls `handleServerStatusEvents()`, which does
`document.getElementById("status")!!` — an element that exists only in the dev-server shell — so
every exported page throws on load and nothing is interactive. `kobweb run` never shows this.
AhrarWood lost weeks of production to it. Gradle may also keep the production JS compile
UP-TO-DATE across a build-target change and re-ship the DEBUG bundle.

SellerScope moved from GitHub Pages (STATIC layout, `docs/`) to Railway with server endpoints, so
the export must also use the FULLSTACK layout (`pages/` + `system/`) that `entrypoint.sh` serves.

## Decision

`site/.kobweb/site/` is only ever produced by:

```bash
./gradlew :site:kobwebExport -PkobwebBuildTarget=RELEASE -PkobwebExportLayout=FULLSTACK --rerun-tasks
```

and verified before committing:

```bash
grep -c 'handleServerStatusEvents\|getElementById("status")' site/.kobweb/site/system/orderpanel.js   # must be 0
```

Step-by-step in `.claude/skills/deploy-frontend/SKILL.md`.

## Consequences

- Exports are slower (`--rerun-tasks`). Accepted.
- The grep gate stays even if the CLI is ever fixed — it costs nothing.
