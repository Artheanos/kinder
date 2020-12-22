--liquibase formatted sql
ALTER TABLE event ALTER COLUMN startdate TYPE TIMESTAMP USING (startdate::DATE);
ALTER TABLE event ALTER COLUMN enddate TYPE TIMESTAMP USING (enddate::DATE);