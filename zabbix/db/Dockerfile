FROM ubuntu:18.04

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /zabbix

RUN apt-get update
RUN apt-get install -y postgresql wget

RUN wget https://cdn.zabbix.com/zabbix/sources/stable/5.0/zabbix-5.0.0.tar.gz
RUN tar -xf zabbix-5.0.0.tar.gz

COPY ./files/pg_hba.conf /etc/postgresql/10/main/pg_hba.conf

RUN cat /etc/postgresql/10/main/pg_hba.conf

RUN chmod 640 /etc/postgresql/10/main/pg_hba.conf && chown postgres:postgres /etc/postgresql/10/main/pg_hba.conf

RUN echo "listen_addresses = '*'" >> /etc/postgresql/10/main/postgresql.conf

USER postgres

RUN /etc/init.d/postgresql start && \
     psql -c "CREATE ROLE \"zabbix-server\";" && \
     psql -c "CREATE DATABASE \"zabbix-server\";" && \
     psql -c "ALTER DATABASE \"zabbix-server\" OWNER TO \"zabbix-server\";" && \
     psql -c "GRANT ALL PRIVILEGES ON DATABASE \"zabbix-server\" TO \"zabbix-server\";" && \
     psql -c "ALTER ROLE \"zabbix-server\" LOGIN;" && \
     psql -c "ALTER ROLE \"zabbix-server\" PASSWORD 'zabbix-server';" && \
     psql -c "ALTER DATABASE \"zabbix-server\" SET search_path=\"zabbix-server\";" && \
     psql -d "zabbix-server" -c "DROP SCHEMA \"public\";" && \
     psql -d "zabbix-server" -c "CREATE SCHEMA \"zabbix-server\";" && \
     psql -d "zabbix-server" -c "ALTER SCHEMA \"zabbix-server\" OWNER TO \"zabbix-server\";" && \
     psql -d "zabbix-server" -c "GRANT ALL PRIVILEGES ON SCHEMA \"zabbix-server\" TO \"zabbix-server\";" && \
     PGPASSWORD="zabbix-server" psql -h localhost -U "zabbix-server" "zabbix-server" < /zabbix/zabbix-5.0.0/database/postgresql/schema.sql && \
     PGPASSWORD="zabbix-server" psql -h localhost -U "zabbix-server" "zabbix-server" < /zabbix/zabbix-5.0.0/database/postgresql/images.sql && \
     PGPASSWORD="zabbix-server" psql -h localhost -U "zabbix-server" "zabbix-server" < /zabbix/zabbix-5.0.0/database/postgresql/data.sql

# RUN rm -f zabbix-5.0.0.tar.gz && rm -rf zabbix-5.0.0

# RUN apt-get install -y iproute2 iputils-ping curl telnet net-tools
# RUN ip a

CMD ["/usr/lib/postgresql/10/bin/postgres", "-D", "/var/lib/postgresql/10/main", "-c", "config_file=/etc/postgresql/10/main/postgresql.conf"]
