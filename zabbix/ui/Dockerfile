FROM ubuntu:18.04

ARG DB_SRV_ADDR
ARG ZBX_SRV_ADDR

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /zabbix

RUN apt-get update
RUN apt-get install -y apache2 libapache2-mod-php php php-gd php-xml php-bcmath php-mbstring php-pgsql php-ldap wget

COPY ./files/php.ini /etc/php/7.2/apache2/php.ini
RUN chmod 644 /etc/php/7.2/apache2/php.ini

RUN wget https://cdn.zabbix.com/zabbix/sources/stable/5.0/zabbix-5.0.0.tar.gz
RUN tar -xf zabbix-5.0.0.tar.gz

RUN cp -R ./zabbix-5.0.0/ui/* /var/www/html
RUN rm -f /var/www/html/index.html

COPY ./files/zabbix.conf.php /var/www/html/conf/zabbix.conf.php
RUN chmod 644 /var/www/html/conf/zabbix.conf.php

RUN sed -i "s/DB_SRV_ADDR/$DB_SRV_ADDR/g" /var/www/html/conf/zabbix.conf.php
RUN sed -i "s/ZBX_SRV_ADDR/$ZBX_SRV_ADDR/g" /var/www/html/conf/zabbix.conf.php

# RUN apt-get install -y iproute2 iputils-ping curl telnet net-tools
# ip a

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
