--liquibase formatted sql
ALTER TABLE event ALTER COLUMN startdate TYPE TIMESTAMP USING (startdate::TIMESTAMP );
ALTER TABLE event ALTER COLUMN enddate TYPE TIMESTAMP USING (enddate::TIMESTAMP);