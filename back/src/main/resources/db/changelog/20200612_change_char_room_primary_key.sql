ALTER TABLE char_room RENAME TO chat_room;
ALTER TABLE chat_room ADD COLUMN chat_id VARCHAR;
ALTER TABLE chat_message DROP COLUMN chat_room_id;
ALTER TABLE chat_message ADD COLUMN chat_id VARCHAR;