#!/bin/sh
PORT=${PORT:-8080}
sed -i "s/port: 8080/port: $PORT/" .kobweb/conf.yaml
exec java \
  -Xmx384m \
  -XX:+UseSerialGC \
  -XX:+ExitOnOutOfMemoryError \
  -Dkobweb.server.environment=PROD \
  -Dkobweb.site.layout=FULLSTACK \
  -Dio.ktor.development=false \
  -jar .kobweb/server/server.jar
