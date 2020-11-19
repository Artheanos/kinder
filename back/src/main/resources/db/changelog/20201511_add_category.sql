--liquibase formatted sql
DROP TABLE IF EXISTS dbo.category;

CREATE TABLE category(
    id          BIGSERIAL NOT NULL,
    title       VARCHAR UNIQUE NOT NULL,
    description VARCHAR,

    PRIMARY KEY(id)
)