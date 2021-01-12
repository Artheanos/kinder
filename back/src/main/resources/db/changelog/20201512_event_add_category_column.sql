ALTER TABLE event ADD category_id int;
ALTER TABLE event ADD FOREIGN KEY (category_id) REFERENCES Category(id);