--liquibase formatted sql
DROP TABLE IF EXISTS dbo.event_subcategory;

CREATE TABLE event_subcategory (
    event_id     INTEGER NOT NULL,
    subcategory_id    INTEGER NOT NULL,

    PRIMARY KEY(event_id, subcategory_id),
    FOREIGN KEY(subcategory_id) REFERENCES subcategory(id) ON DELETE CASCADE,
    FOREIGN KEY(event_id) REFERENCES event(id) ON DELETE CASCADE
)