--liquibase formatted sql
DROP TABLE IF EXISTS dbo.user_event;

CREATE TABLE user_event (
    user_id     INTEGER NOT NULL,
    event_id    INTEGER NOT NULL,

    PRIMARY KEY(user_id,event_id),
    FOREIGN KEY(user_id) REFERENCES "user"(id) ON DELETE CASCADE,
    FOREIGN KEY(event_id) REFERENCES event(id) ON DELETE CASCADE
)

