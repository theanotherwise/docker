FROM ubuntu:focal

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get dist-upgrade -y

RUN apt-get install -y net-tools bind9-utils telnet

RUN apt-get install postgresql -y

RUN rm -rf /var/cache/apt/* && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /var/log/apt/*

USER postgres

RUN /etc/init.d/postgresql start && \
     psql -c 'CREATE ROLE "application";' && \
     psql -c 'CREATE DATABASE "application";' && \
     psql -c 'ALTER DATABASE "application" OWNER TO "application";' && \
     psql -c 'GRANT ALL PRIVILEGES ON DATABASE "application" TO "application";' && \
     psql -c 'ALTER ROLE "application" LOGIN;' && \
     psql -c "ALTER ROLE \"application\" PASSWORD 'application';" && \
     psql -c 'ALTER DATABASE "application" SET search_path="application";' && \
     psql -d 'application' -c 'DROP SCHEMA "public";' && \
     psql -d 'application' -c 'CREATE SCHEMA "application"'\ && \
     psql -d 'application' -c 'ALTER SCHEMA "application" OWNER TO "application";' && \
     psql -d 'application' -c 'GRANT ALL PRIVILEGES ON SCHEMA "application" TO "application";'

RUN sed -i "s/#listen_addresses = 'localhost'/listen_addresses = 'database'/g" /etc/postgresql/12/main/postgresql.conf

COPY files/pg_hba.conf /etc/postgresql/12/main/pg_hba.conf

CMD ["/usr/lib/postgresql/12/bin/postgres", "-D", "/var/lib/postgresql/12/main", "-c", "config_file=/etc/postgresql/12/main/postgresql.conf"]
