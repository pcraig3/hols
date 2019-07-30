-- Up
CREATE TABLE Province (id CHAR(2) PRIMARY KEY, name_en VARCHAR(100), name_fr VARCHAR(100));

INSERT INTO Province (id, name_en, name_fr) VALUES ('AB', 'Alberta', 'Alberta');
INSERT INTO Province (id, name_en, name_fr) VALUES ('BC', 'British Columbia', 'Colombie-Britannique');
INSERT INTO Province (id, name_en, name_fr) VALUES ('MB', 'Manitoba', 'Manitoba');
INSERT INTO Province (id, name_en, name_fr) VALUES ('NB', 'New Brunswick', 'Nouveau-Brunswick');
INSERT INTO Province (id, name_en, name_fr) VALUES ('NL', 'Newfoundland and Labrador', 'Terre-Neuve-et-Labrador');
INSERT INTO Province (id, name_en, name_fr) VALUES ('NS', 'Nova Scotia', 'Nouvelle-Écosse');
INSERT INTO Province (id, name_en, name_fr) VALUES ('NT', 'Northwest Territories', 'Territoires du Nord-Ouest');
INSERT INTO Province (id, name_en, name_fr) VALUES ('NU', 'Nunavut', 'Nunavut');
INSERT INTO Province (id, name_en, name_fr) VALUES ('ON', 'Ontario', 'Ontario');
INSERT INTO Province (id, name_en, name_fr) VALUES ('PE', 'Prince Edward Island', 'Île-du-Prince-Édouard');
INSERT INTO Province (id, name_en, name_fr) VALUES ('QC', 'Quebec', 'Québec');
INSERT INTO Province (id, name_en, name_fr) VALUES ('SK', 'Saskatchewan', 'Saskatchewan');
INSERT INTO Province (id, name_en, name_fr) VALUES ('YT', 'Yukon', 'Yukon');

-- Down
DROP TABLE Province;
