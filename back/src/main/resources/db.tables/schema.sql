DROP TABLE IF EXISTS dbo.words;

CREATE TABLE words (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    word VARCHAR(50) NOT NULL
)