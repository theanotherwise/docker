# EJBCA

## 

```bash
openssl req -newkey rsa:4096 \
            -x509 \
            -sha256 \
            -days 3650 \
            -nodes \
            -out server.crt \
            -keyout server.key
```

## Backup/restore `postgres` database

### Exmport 

#### Globals
```bash
docker exec -i --user postgres `docker ps -a | grep -i postgres | awk '{print $1}'` \
       pg_dumpall --username ejbca \
                  --globals-only \
                  --encoding 'UTF-8' \
                  --clean --no-owner --no-privileges --verbose > globals.sql
```

### Dump

#### Databases
```bash
docker exec -i --user postgres `docker ps -a | grep -i postgres | awk '{print $1}'` \
       pg_dump --username ejbca --dbname ejbca \
               --format t \
               --encoding 'UTF-8' \
               --create --blobs \
               --clean --no-owner --no-privileges --verbose > ejbca.sql
```

### Import

#### Database
```bash
docker exec -i --user postgres `docker ps -a | grep -i postgres | awk '{print $1}'` \
       psql --username ejbca < globals.sql
```

#### Globals
```bash
docker exec -i --user postgres `docker ps -a | grep -i postgres | awk '{print $1}'` \
       pg_restore --username ejbca --dbname ejbca \
                  --format t \
                  --clean --no-owner --no-privileges --verbose < ejbca.sql
```