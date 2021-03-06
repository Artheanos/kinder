CREATE TABLE user_friend_request(
    user_id BIGINT NOT NULL,
    friend_id BIGINT NOT NULL,

    PRIMARY KEY (user_id, friend_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES "user"(id),
    CONSTRAINT fk_friend_id FOREIGN KEY (friend_id) REFERENCES "user"(id)
);