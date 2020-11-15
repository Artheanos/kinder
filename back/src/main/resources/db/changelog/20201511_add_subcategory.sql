--liquibase formatted sql
DROP TABLE IF EXISTS dbo.subcategory;

CREATE TABLE subcategory(
    id          BIGSERIAL NOT NULL,
    title       VARCHAR UNIQUE NOT NULL,

    PRIMARY KEY(id)
)