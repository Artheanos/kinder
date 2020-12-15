ALTER TABLE event ADD photo_id int;
ALTER TABLE event ADD FOREIGN KEY (photo_id) REFERENCES Photo(id);