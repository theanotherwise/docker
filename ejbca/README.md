# EJBCA

# Create `postgres` dump
```bash
docker exec -it --user postgres c21979385bcb pg_dumpall -c -U ejbca > ejbca.sql
```