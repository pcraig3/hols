-- Up
CREATE TABLE Category (id INTEGER PRIMARY KEY, name TEXT);
CREATE TABLE Post (id INTEGER PRIMARY KEY, categoryId INTEGER, title TEXT,
  CONSTRAINT Post_fk_categoryId FOREIGN KEY (categoryId)
    REFERENCES Category (id) ON UPDATE CASCADE ON DELETE CASCADE);
INSERT INTO Category (id, name) VALUES (1, 'Business');
INSERT INTO Category (id, name) VALUES (2, 'Technology');
INSERT INTO Category (id, name) VALUES (3, 'Media Studies');

-- Down
DROP TABLE Category
DROP TABLE Post;