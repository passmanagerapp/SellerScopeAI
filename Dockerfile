# ── Build Stage ───────────────────────────────────────────────────────────────
# Only builds the JVM side (the /api endpoints). No Node.js / webpack: the frontend is the
# pre-built, git-committed output in site/.kobweb/site (see ADR-0004 and the deploy-frontend skill).
FROM eclipse-temurin:17-jdk AS build

WORKDIR /app
COPY . .
RUN chmod +x gradlew

RUN ./gradlew :site:kobwebUnpackServerJar :site:kspKotlinJvm :site:compileKotlinJvm :site:jvmJar --no-daemon

# ── Runtime Stage ─────────────────────────────────────────────────────────────
FROM eclipse-temurin:17-jre

WORKDIR /app

# Static site files from the repo (pre-built, committed — no rebuild here)
COPY site/.kobweb/conf.yaml .kobweb/conf.yaml
COPY site/.kobweb/site .kobweb/site

# Kobweb server jar (downloaded by kobwebUnpackServerJar)
COPY --from=build /app/site/.kobweb/server .kobweb/server

# Freshly built API jar — the FULLSTACK server loads it from .kobweb/site/system/orderpanel.jar
# (the export's copy is git-ignored, so this is the only one in the image).
COPY --from=build /app/site/build/libs/orderpanel.jar .kobweb/site/system/orderpanel.jar

COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["./entrypoint.sh"]
