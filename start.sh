#!/bin/bash
# space-aofs
/usr/bin/space-aofs &

# space-web
/docker-entrypoint.sh &

# space-media-vod
/usr/local/nginx/sbin/nginx -g 'daemon off;' &

