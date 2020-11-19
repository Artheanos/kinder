--liquibase formatted sql
DROP TABLE IF EXISTS dbo.ticket;

CREATE TABLE ticket(
    id          BIGSERIAL NOT NULL,
    title       VARCHAR UNIQUE NOT NULL,
    price       DOUBLE PRECISION NOT NULL,
    startDate   TIMESTAMP NOT NULL,
    endDate     TIMESTAMP NOT NULL,

    PRIMARY KEY(id)
)