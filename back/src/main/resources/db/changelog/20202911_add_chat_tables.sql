
CREATE TABLE char_room(
    id BIGSERIAL PRIMARY KEY,
    sender_id BIGINT NOT NULL,
    recipient_id BIGINT NOT NULL
);

CREATE TABLE chat_message(

    id BIGSERIAL PRIMARY KEY,
    chat_room_id BIGINT NOT NULL,
    sender_id BIGINT NOT NULL,
    recipient_id BIGINT NOT NULL,
    content VARCHAR NOT NULL,

    CONSTRAINT fk_char_room_id FOREIGN KEY (chat_room_id) REFERENCES char_room(id),
    CONSTRAINT fk_sender_id FOREIGN KEY (sender_id) REFERENCES "user"(id),
    CONSTRAINT fk_recipient_id FOREIGN KEY (recipient_id) REFERENCES "user"(id)
)