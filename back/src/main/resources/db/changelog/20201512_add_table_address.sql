----liquibase formatted sql

CREATE TABLE address(
    id              BIGINT NOT NULL,
    address_name    VARCHAR NOT NULL,
    latitude        DOUBLE PRECISION,
    longitude       DOUBLE PRECISION,

     PRIMARY KEY(id)
)

