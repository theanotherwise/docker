FROM ubuntu:bionic

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get dist-upgrade -y

RUN apt-get install -y net-tools bind9utils telnet

RUN apt-get install -y freeipa-server

RUN rm -rf /var/cache/apt/* && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /var/log/apt/*

RUN ipa-server-install

rm -f /var/lib/ipa/certs/httpd.crt
rm -f /var/lib/ipa/private/httpd.key

openssl req -newkey rsa:4096 \
            -x509 \
            -sha256 \
            -days 3650 \
            -nodes \
            -out /var/lib/ipa/certs/httpd.crt \
            -keyout /var/lib/ipa/private/httpd.key

*.ipa.localdomain