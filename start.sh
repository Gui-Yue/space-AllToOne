#!/bin/bash

# space-gateway
echo "starting space-gateway... "
java -jar -Dquarkus.http.host=0.0.0.0 /deployments/quarkus-run.jar 

# space-aofs
echo "starting aofs..."
/usr/bin/space-aofs &

# space-web
echo "starting space-web..."
/docker-entrypoint.sh &

# space-media-vod
echo "starting space-media-vod..."
/usr/local/nginx/sbin/nginx

