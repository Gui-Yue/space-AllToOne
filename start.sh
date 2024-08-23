#!/bin/bash

# 启动 PostgreSQL
service postgresql start

# 启动 Redis
redis-server --requirepass placeholder_mysecretpassword --appendonly yes --appendfsync everysec --auto-aof-rewrite-percentage 100 --auto-aof-rewrite-min-size 100mb &

# 启动 Nginx
service nginx start

# 启动你的应用程序
cd /opt/app/your_application
./your_application_binary &

# 其他应用程序启动命令...

# 阻塞脚本，使其保持运行
tail -f /dev/null