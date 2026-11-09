---
name: deploy-frontend
description: Re-export the Kobweb frontend (RELEASE, FULLSTACK layout) and commit the built output so jsMain changes actually reach production on Railway. Only run when the user asks to finish / commit / deploy / ship — never after each individual jsMain edit.
---

# Deploy the frontend

## Why this is a separate step

Production runs on Railway from `Dockerfile`. The Docker build compiles **only the JVM side**
(`/api` endpoints). The frontend it serves is the **git-committed** pre-built output in
`site/.kobweb/site/`. So:

- `jvmMain` (`api/`) changes go live as soon as they're pushed to the deployed branch.
- **`jsMain` changes (pages, strings XML, public resources) do NOT reach production until
  `site/.kobweb/site/` is re-exported and committed.**

While iterating, just run `./gradlew :site:compileKotlinJs`. Export once, right before the push.

## Steps (from the repo root)

1. `./gradlew :site:compileKotlinJs`
2. Export — **never** with the bare `kobweb export` CLI (see ADR-0004):
   ```bash
   ./gradlew :site:kobwebExport -PkobwebBuildTarget=RELEASE -PkobwebExportLayout=FULLSTACK --rerun-tasks
   ```
3. Verify it is a release bundle — must print `0`:
   ```bash
   grep -c 'handleServerStatusEvents\|getElementById("status")' site/.kobweb/site/system/orderpanel.js
   ```
4. `git add site/.kobweb/site && git status --short site/.kobweb` — expect `pages/*.html` and
   `system/orderpanel.js(.map)` to change. `system/orderpanel.jar` is git-ignored on purpose (the
   Dockerfile builds it).
5. Commit with the jsMain source change and push.

## Cloud sessions (Claude Code on the web)

The export prerenders pages with Playwright 1.45 (bundled in the Kobweb Gradle plugin), which wants
Chromium build 1124 and tries to download it. The container ships a newer Chromium under
`/opt/pw-browsers`. Point Playwright at it through a throwaway browsers dir instead of downloading:

```bash
PW=<scratchpad>/pw
mkdir -p $PW/chromium-1124
ln -sfn /opt/pw-browsers/chromium-1243/chrome-linux64 $PW/chromium-1124/chrome-linux
touch $PW/chromium-1124/INSTALLATION_COMPLETE $PW/chromium-1124/DEPENDENCIES_VALIDATED
export PLAYWRIGHT_BROWSERS_PATH=$PW PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
```

(Adjust `chromium-1243` to whatever `ls /opt/pw-browsers` shows.) Maven Central sometimes answers
429 there — rerun with `--max-workers=1`.

## Verify end-to-end (optional, recommended after layout/config changes)

Mimic the Docker image and run the real PROD server:

```bash
RT=<scratchpad>/rt; rm -rf $RT; mkdir -p $RT/.kobweb/server
cp site/.kobweb/conf.yaml $RT/.kobweb/ && cp -r site/.kobweb/site $RT/.kobweb/site
cp site/.kobweb/server/server.jar $RT/.kobweb/server/
./gradlew :site:jvmJar && cp site/build/libs/orderpanel.jar $RT/.kobweb/site/system/
cp entrypoint.sh $RT/ && cd $RT && PORT=8099 ./entrypoint.sh
# curl localhost:8099/api/ping → {"ok":true}; open pages in a browser, check the console
```

## Gotchas

- Gradle may keep `compileProductionExecutableKotlinJs` UP-TO-DATE across a build-target change and
  re-ship a DEBUG bundle — that is why step 2 always passes `--rerun-tasks` and step 3 exists.
- Never interrupt an in-flight export: it deletes `site/.kobweb/site/` first. If it was killed,
  `git checkout -- site/.kobweb/site` and rerun to completion.
- Do not hand-edit anything under `site/.kobweb/site/`.
- `site/.kobweb/conf.yaml` is committed and copied into the image — touch it deliberately
  (CORS hosts live there).
