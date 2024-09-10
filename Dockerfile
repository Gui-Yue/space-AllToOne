# Copyright (c) 2022 Institute of Software, Chinese Academy of Sciences (ISCAS)
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

FROM ubuntu:24.10 as builder1

WORKDIR /work/

COPY . .

ENV LANG C.UTF-8

ENV TZ=Asia/Shanghai \
    DEBIAN_FRONTEND=noninteractive

# get all sources
RUN apt-get update; \
    apt-get install git -y

# for space-filepreview
RUN git clone --branch dev --single-branch https://github.com/ao-space/space-filepreview.git

# for space-aofs
RUN git clone --branch dev --single-branch https://github.com/ao-space/space-aofs.git

# for space-upgrade
RUN git clone --branch dev --single-branch https://github.com/ao-space/space-upgrade.git

# for space-agent
RUN git clone --branch ospp --single-branch https://github.com/Gui-Yue/space-agent.git

# for space-space-media-vod
RUN git clone --branch dev --single-branch https://github.com/ao-space/space-media-vod.git

# for space-gateway
RUN git clone --branch dev --single-branch https://github.com/ao-space/space-gateway.git

# for space-postgresql 
RUN git clone --branch dev --single-branch https://github.com/ao-space/space-postgresql.git

# for space-web
RUN git clone --branch dev --single-branch https://github.com/ao-space/space-web.git

# creat binary floder
RUN mkdir object-binary

# compile for space-filepreview
RUN mv space-filepreview object-binary

# compile for for space-aofs
RUN apt-get update -y \
    && apt-get install golang-any -y; \
    cd space-aofs; \
    go env -w CGO_ENABLED=0 \
    && go env -w GO111MODULE=on \
    && go build -o space-aofs

RUN mkdir object-binary/space-aofs; \
    rm -rf /var/lib/apt/lists/*; \
    cp -r space-aofs/template object-binary/space-aofs; \
    cp space-aofs/space-aofs object-binary/space-aofs

# compile for space-upgrade
RUN apt-get update && apt-get install -y make; \
    cd space-upgrade \
    && make -f Makefile

RUN mkdir object-binary/space-upgrade; \
    mv space-upgrade/build/eulixspace-upgrade object-binary/space-upgrade

# compile for space-media-vod
RUN apt-get update \
    && apt-get install -y curl gcc openssl libssl-dev zlib1g-dev libssl-dev libavcodec-dev linux-headers-generic libpcre3-dev libpcre2-dev git make \
    libswscale-dev libavfilter-dev libxml2-dev; \
    mkdir space-media-vod/nginx; \
    cd space-media-vod; \
    git clone https://github.com/ao-space/nginx-vod-module.git

ARG NGINX_VERSION=1.23.0
ARG VOD_MODULE_VERSION=d96b61febe06f147f937dde721921f2d2206c6bc

RUN apt-get update \
    && apt-get install -y curl

RUN curl -sL https://nginx.org/download/nginx-${NGINX_VERSION}.tar.gz | tar -C space-media-vod/nginx --strip 1 -xz; \
    ls space-media-vod

RUN cd space-media-vod/nginx; \
    ./configure --prefix=/usr/local/nginx \
    --add-module=../nginx-vod-module \
    --with-http_ssl_module \
    --with-file-aio \
    --with-threads \
    --with-cc-opt="-O3 -Wno-deprecated-declarations"; \
    make; \
    make install; \
    ls /usr/local; \
    rm -rf /usr/local/nginx/html /usr/local/nginx/conf/*.default

RUN mkdir object-binary/space-media-vod; \
    cp -r /usr/local/nginx object-binary/space-media-vod; \
    ls object-binary/space-media-vod; \
    cp space-media-vod/nginx.conf object-binary/space-media-vod

# compile for space-gateway
RUN apt-get update -y \
    && apt-get install openjdk-17-jdk -y

# RUN export JAVA_VERSION=17; \
#     cd space-gateway; \
#     ./mvnw -B clean verify \
#     -Dquarkus.http.host=0.0.0.0 \
#     -Dmaven.compiler.release=${JAVA_VERSION} \
#     -Dmaven.test.skip=true

RUN mkdir object-binary/space-gateway; \
    cp -r resource_for_gateway/deployments object-binary/space-gateway

# compile for space-postgresql
RUN apt-get update && apt-get install -y \
    tzdata \
    dos2unix \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN cd space-postgresql; \
    dos2unix -k update-pg-password.sh docker-entrypoint.sh eulixspace_pgsql_init.sh

RUN mkdir object-binary/space-postgresql; \
    cp space-postgresql/*.sh object-binary/space-postgresql

# compile for space-web
RUN apt-get update && apt-get install -y \
    curl \
    dos2unix \
    build-essential \
    && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN cd space-web; \
    find . -type f -exec dos2unix {} \;

# About npm_config_proxy need to be removed after test.
RUN cd space-web; \
    npm install && npm run build && npm run buildsingle

RUN mkdir object-binary/space-web; \
    cp space-web/nginx.conf.template object-binary/space-web; \
    cp space-web/verify_access_token.lua object-binary/space-web; \
    cp space-web/cert.crt object-binary/space-web; \
    cp space-web/private.key object-binary/space-web; \
    cp -r space-web/dist object-binary/space-web; \
    cp space-web/docker-entrypoint.sh object-binary/space-web

# compile for space-agent
RUN apt-get update \
    && apt-get install -y zip

# maybe commands below is not essential.
# RUN cd space-agent/web/boxdocker && npm install && npm run build && mv dist boxdocker && \
#    zip -r static_html.zip boxdocker && mv static_html.zip ../../res

RUN cd space-agent; \
    go env -w GO111MODULE=on && make -f Makefile

RUN mkdir object-binary/space-agent; \
    cp space-agent/build/aospace object-binary/space-agent; \
    cp space-agent/supervisord.conf object-binary/space-agent

RUN apt remove docker.io -y; \
    rm -rf /var/lib/apt/lists/*


# clean no longer needed source
RUN rm -rf space-*


FROM ubuntu:24.10 as builder2
WORKDIR /workdir/
# install all dependence for starting all services

# space-filepreview
RUN set -eux; \
	apt-get update; \
    apt-get install -y --no-install-recommends libc6;\
	apt-get install -y --no-install-recommends \
		ca-certificates \
		netbase \
		tzdata \
        gcc g++ python3 python3-pip python3-full python3-dev; \
        apt-get clean;\
	rm -rf /var/lib/apt/lists/*
RUN ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime; \
        echo ${TZ} > /etc/timezone; \
        dpkg-reconfigure --frontend noninteractive tzdata; \
        rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install --no-install-recommends \
        apt-transport-https ca-certificates poppler-utils qpdf \
        libfile-mimeinfo-perl libimage-exiftool-perl ghostscript \
        libsecret-1-0 zlib1g-dev libjpeg-dev ffmpeg python3-magic \
        libmagickwand-dev imagemagick -y \
        && rm -rf /var/lib/apt/lists/*

COPY --from=builder1 /work/object-binary/space-filepreview ./
RUN pip3 install -r ./requirements.txt --break-system-packages -i https://mirrors.aliyun.com/pypi/simple/

# space-aofs
RUN apt-get update && apt-get install -y --no-install-recommends \
        wget \
        ntfs-3g \
        util-linux \
        exfat-fuse \
        exfatprogs \
        usbutils \
        mediainfo \
        udev \
    && rm -rf /var/lib/apt/lists/*

# space-upgrade
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        netbase \
        tzdata \
        iputils-ping \
    ; \
    apt remove docker.io -y ; \
    rm -rf /var/lib/apt/lists/*

# space-agent
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        netbase \
        tzdata \
        supervisor \
        iputils-ping \
        docker-compose \
        curl \
        cron \
    ; \
    apt remove docker.io -y ; \
    rm -rf /var/lib/apt/lists/*

# space-media-vod
RUN apt-get install -y ca-certificates openssl; \
    rm -rf /var/lib/apt/lists/*

# space-gateway
RUN apt-get update \
    && apt-get install -y openjdk-17-jdk

# space-postgresql
RUN apt-get update \
    && apt-get install postgresql postgresql-contrib -y
RUN find /usr/lib/postgresql/16/bin -type f -exec ln -s {} /usr/local/bin/ \;
RUN install --verbose --directory --owner postgres --group postgres --mode 3777 /var/run/postgresql

# space-web
RUN apt-get update \
    && apt-get install -y wget make libpcre3 libpcre3-dev build-essential libssl-dev zlib1g-dev

RUN wget https://openresty.org/download/openresty-1.21.4.4.tar.gz \
    && tar -xvf openresty-1.21.4.4.tar.gz; \
    cd openresty-1.21.4.4; \
    ./configure -j2; \
    make -j2; \
    make install
RUN rm -rf openresty-*
RUN ln -s /usr/local/openresty/bin/openresty /usr/bin/openresty
ENV PATH=/usr/local/openresty/bin:$PATH

# aospace-redis
RUN apt-get update -y \
    && apt-get install redis-server postgresql-client -y

# space-filepreview
# python project no installation required

# space-aofs
COPY --from=builder1 /work/object-binary/space-aofs/space-aofs /usr/bin
COPY --from=builder1 /work/object-binary/space-aofs/template /tmp/
RUN chmod +x /usr/bin/space-aofs

# space-upgrade
COPY --from=builder1 /work/object-binary/space-upgrade/eulixspace-upgrade /usr/local/bin/eulixspace-upgrade

# space-media-vod
COPY --from=builder1 /work/object-binary/space-media-vod/nginx /usr/local/nginx
COPY --from=builder1 /work/object-binary/space-media-vod/nginx.conf /usr/local/nginx/conf/nginx.conf

# space-gateway
USER root
ENV JAVA_OPTS="-Duser.timezone=GMT+8 -Dquarkus.http.host=0.0.0.0 -Djava.util.logging.manager=org.jboss.logmanager.LogManager"
ENV JAVA_APP_JAR="/deployments/quarkus-run.jar"
COPY --chown=1001 --from=builder1 /work/object-binary/space-gateway/deployments /deployments

# space-postgresql
COPY --from=builder1 /work/object-binary/space-postgresql/update-pg-password.sh /usr/local/bin
COPY --from=builder1 /work/object-binary/space-postgresql/eulixspace_pgsql_init.sh /docker-entrypoint-initdb.d/10_eulixspace.sh
COPY --from=builder1 /work/object-binary/space-postgresql/docker-entrypoint.sh /usr/local/bin
RUN sed -i '1s|#!/bin/sh|#!/bin/bash|' /usr/local/bin/update-pg-password.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/update-pg-password.sh
RUN chmod +x /docker-entrypoint-initdb.d/10_eulixspace.sh

# space-web
COPY --from=builder1 /work/object-binary/space-web/nginx.conf.template  /nginx.conf.template
COPY --from=builder1 /work/object-binary/space-web/verify_access_token.lua /etc/nginx/verify_access_token.lua
COPY --from=builder1 /work/object-binary/space-web/cert.crt /etc/nginx/certs/cert.pem
COPY --from=builder1 /work/object-binary/space-web/private.key /etc/nginx/certs/cert.key
RUN mkdir -p /opt/eulixspace-web/space/ /opt/eulixspace-web/share/
COPY --from=builder1 /work/object-binary/space-web/dist /opt/eulixspace-web/space
COPY --from=builder1 /work/object-binary/space-web/docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

# space-agent
COPY --from=builder1 /work/object-binary/space-agent/aospace /usr/local/bin/aospace
COPY --from=builder1 /work/object-binary/space-agent/supervisord.conf /etc/supervisor/supervisord.conf


# 设置启动脚本
COPY --from=builder1 /work/prestart.sh /usr/local/bin/prestart.sh
COPY --from=builder1 /work/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/prestart.sh
RUN chmod +x /usr/local/bin/start.sh

# 暴露必要的端口
EXPOSE 80 443 5432 6379 3001 2001 8080 5678

# 使用启动脚本作为入口点
ENTRYPOINT ["/usr/local/bin/prestart.sh"]
