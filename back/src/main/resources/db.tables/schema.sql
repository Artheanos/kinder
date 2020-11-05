CREATE SEQUENCE hibernate_sequence;


CREATE TABLE words (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    word varchar(50) NOT NULL
)