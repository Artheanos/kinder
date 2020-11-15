ALTER TABLE subcategory
ADD category_id INTEGER NOT NULL;

ALTER TABLE subcategory
ADD FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE;

