--liquibase formatted sql
DROP TABLE IF EXISTS dbo.event;

CREATE TABLE event(
    id          BIGSERIAL NOT NULL,
    title       VARCHAR UNIQUE NOT NULL,
    addres      VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    startDate   TIMESTAMP NOT NULL,
    endDate     TIMESTAMP NOT NULL,
    capacity    INTEGER,
    state       VARCHAR NOT NULL,
    user_id     INTEGER NOT NULL,

    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES "user"(id) ON DELETE CASCADE
)