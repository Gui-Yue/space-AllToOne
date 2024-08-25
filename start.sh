#!/bin/bash

# 启动 PostgreSQL
service postgresql start && su - postgres -c "psql -c \"ALTER USER postgres PASSWORD 'placeholder_mysecretpassword';\""

# 启动 Redis
redis-server --requirepass placeholder_mysecretpassword --appendonly yes --appendfsync everysec --auto-aof-rewrite-percentage 100 --auto-aof-rewrite-min-size 100mb &

# 启动 Nginx
service nginx start

# 启动你的应用程序
# space-postgresql
su - postgres -c /usr/local/bin/docker-entrypoint.sh &

# space-filepreview
python3 /workdir/main.py &

# space-aofs
/usr/bin/space-aofs &

# space-gateway
java -jar -Dquarkus.http.host=0.0.0.0 /deployments/quarkus-run.jar &

# space-web
/docker-entrypoint.sh &

# space-media-vod
/usr/local/nginx/sbin/nginx -g 'daemon off;' &

# space-agent
/usr/bin/supervisord -n -c /etc/supervisor/supervisord.conf &

# 阻塞脚本，使其保持运行
tail -f /dev/null