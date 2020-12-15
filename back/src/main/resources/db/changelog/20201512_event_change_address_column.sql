ALTER TABLE event RENAME addres TO address_id;
ALTER TABLE event ALTER COLUMN address_id TYPE INTEGER USING (address_id::integer);
ALTER TABLE event ADD FOREIGN KEY (address_id) REFERENCES Address(id);