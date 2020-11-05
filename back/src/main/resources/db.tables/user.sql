CREATE SEQUENCE hibernate_sequence;


CREATE TABLE "user" (
    id          BIGSERIAL NOT NULL,
    username    VARCHAR UNIQUE NOT NULL,
    name        VARCHAR,
    surname     VARCHAR,
    email       VARCHAR,
    password    VARCHAR,

    PRIMARY KEY(id)
)