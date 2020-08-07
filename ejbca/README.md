# EJBCA

## Backup/restore `postgres` database

### Dump 

#### Globals
```bash
docker exec -i --user postgres `docker ps -a | grep -i postgres | awk '{print $1}'` \
       pg_dumpall --username ejbca \
                  --globals-only 
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

### Restore

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