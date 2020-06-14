FROM ubuntu:18.04

ARG DB_SRV_ADDR

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /zabbix

RUN apt-get update
RUN apt-get install -y gcc make autoconf libcurl4 libssl-dev libldap2-dev curl libcurl4-openssl-dev postgresql-server-dev-all libxml2-dev unixodbc-dev libsnmp-dev libssh2-1-dev libopenipmi-dev libevent-dev telnet postgresql-client-10 wget

RUN wget https://cdn.zabbix.com/zabbix/sources/stable/5.0/zabbix-5.0.0.tar.gz
RUN tar -xf zabbix-5.0.0.tar.gz

RUN groupadd zabbix
RUN useradd -m -d /opt/zabbix -s /bin/bash -g zabbix zabbix
RUN useradd -m -d /opt/zabbix/server -s /bin/bash -g zabbix zabbix-server
RUN useradd -m -d /opt/zabbix/agent -s /bin/bash -g zabbix zabbix-agent

RUN cd zabbix-5.0.0 && ./configure --prefix=/opt/zabbix/server --enable-server \
--with-postgresql \
--with-libxml2 \
--with-unixodbc \
--with-net-snmp \
--with-ssh2 \
--with-openipmi \
--with-zlib \
--with-libpthread \
--with-libevent \
--with-openssl \
--with-ldap \
--with-libcurl \
--with-libpcre \
--with-iconv && make && make install

RUN cd zabbix-5.0.0 && ./configure --prefix=/opt/zabbix/agent --enable-agent \
--with-libxml2 \
--with-unixodbc \
--with-net-snmp \
--with-ssh2 \
--with-openipmi \
--with-zlib \
--with-libpthread \
--with-libevent \
--with-openssl \
--with-ldap \
--with-libcurl \
--with-libpcre \
--with-iconv

RUN rm -f zabbix-5.0.0.tar.gz && rm -rf zabbix-5.0.0

RUN mv /opt/zabbix/server/etc/zabbix_server.conf /opt/zabbix/server/etc/zabbix_server.conf_BACKUP

COPY ./files/zabbix_server.conf /opt/zabbix/server/etc/zabbix_server.conf

RUN sed -i "s/DB_SRV_ADDR/$DB_SRV_ADDR/g" /opt/zabbix/server/etc/zabbix_server.conf

RUN mkdir -p /opt/zabbix/server/log && mkdir -p /opt/zabbix/server/tmp

RUN chmod 750 /opt/zabbix

RUN find /opt/zabbix -mindepth 1 -exec chmod g-rwx,o-rwx {} \;
RUN find /opt/zabbix -exec chown -R zabbix:zabbix {} \;

RUN find /opt/zabbix/server -exec chmod g-rwx,o-rwx {} \;
RUN find /opt/zabbix/server -exec chown -R zabbix-server {} \;

RUN find /opt/zabbix/agent -exec chmod g-rwx,o-rwx {} \;
RUN find /opt/zabbix/agent -exec chown -R zabbix-agent {} \;

# RUN apt-get install -y iproute2 iputils-ping curl telnet net-tools
# CMD ip a

CMD ["/opt/zabbix/server/sbin/zabbix_server", "-f", "-c", "/opt/zabbix/server/etc/zabbix_server.conf"]
