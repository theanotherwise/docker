--
-- PostgreSQL database cluster dump
--

-- Started on 2020-08-06 23:54:36 UTC

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;



--
-- Drop roles
--

DROP ROLE ejbca;


--
-- Roles
--

CREATE ROLE ejbca;
ALTER ROLE ejbca WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'md59becc8bc5d71342ca37b84271abec87f';






-- Completed on 2020-08-06 23:54:36 UTC

--
-- PostgreSQL database cluster dump complete
--

