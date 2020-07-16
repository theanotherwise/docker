FROM ubuntu:focal

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get dist-upgrade -y && \
    apt-get install postgresql -y

USER postgres

RUN /etc/init.d/postgresql start && \
     psql -c 'CREATE ROLE "seems-legal";' && \
     psql -c 'CREATE DATABASE "seems-legal";' && \
     psql -c 'ALTER DATABASE "seems-legal" OWNER TO "seems-legal";' && \
     psql -c 'GRANT ALL PRIVILEGES ON DATABASE "seems-legal" TO "seems-legal";' && \
     psql -c 'ALTER ROLE "seems-legal" LOGIN;' && \
     psql -c "ALTER ROLE \"seems-legal\" PASSWORD 'seems-legal';" && \
     psql -c 'ALTER DATABASE "seems-legal" SET search_path="seems-legal";' && \
     psql -d 'seems-legal' -c 'DROP SCHEMA "public";' && \
     psql -d 'seems-legal' -c 'CREATE SCHEMA "seems-legal"'\ && \
     psql -d 'seems-legal' -c 'ALTER SCHEMA "seems-legal" OWNER TO "seems-legal";' && \
     psql -d 'seems-legal' -c 'GRANT ALL PRIVILEGES ON SCHEMA "seems-legal" TO "seems-legal";'

CMD ["/usr/lib/postgresql/12/bin/postgres", "-D", "/var/lib/postgresql/12/main", "-c", "config_file=/etc/postgresql/12/main/postgresql.conf"]
