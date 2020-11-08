--liquibase formatted sql
CREATE SEQUENCE hibernate_sequence;
DROP TABLE IF EXISTS dbo.user;

CREATE TABLE users (
    id          BIGSERIAL NOT NULL,
    username    VARCHAR UNIQUE NOT NULL,
    name        VARCHAR NOT NULL,
    surname     VARCHAR NOT NULL,
    email       VARCHAR UNIQUE NOT NULL,
    password    VARCHAR NOT NULL,
    role        VARCHAR NOT NULL,

    PRIMARY KEY(id)
)