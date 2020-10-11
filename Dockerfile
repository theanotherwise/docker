FROM openjdk:11

ENV DEBIAN_FRONTEND=noninteractive
ENV DOCKER_VERSION=19.03.13

RUN curl -sSLk https://download.docker.com/linux/static/stable/x86_64/docker-${DOCKER_VERSION}.tgz -o docker-${DOCKER_VERSION}.tgz

RUN tar -xf docker-${DOCKER_VERSION}.tgz && \
    cp docker/docker /usr/local/bin && \
    rm -rf docker && rm -f docker-${DOCKER_VERSION}.tgz
