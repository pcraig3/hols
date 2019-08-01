-- Up
CREATE TABLE Province (
  id CHAR(2) PRIMARY KEY,
  name_en TEXT,
  name_fr TEXT
);

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

CREATE TABLE Holiday (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	date_string TEXT,
	name_en TEXT,
	name_fr TEXT,
	federal BOOLEAN DEFAULT FALSE
);

INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('January 1', 'New Year’s Day', 'Jour de l’An');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('Third Monday in February', 'Louis Riel Day', 'Journée Louis Riel');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('Third Monday in February', 'Islander Day', 'Fête des Insulaires');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('Third Monday in February', 'Family Day', 'Fête de la famille');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('Third Monday in February', 'Heritage Day', 'Fête du Patrimoine');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('March 17', 'Saint Patrick’s Day', 'Jour de la Saint-Patrick');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('Friday before Easter Day', 'Good Friday', 'Vendredi saint');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('Monday after Easter Day', 'Easter Monday', 'Lundi de Pâques');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('April 23', 'Saint George’s Day', 'Jour de St. George');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('Monday on or before May 24', 'National Patriots’ Day', 'Journée nationale des patriotes');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('Monday on or before May 24', 'Victoria Day', 'Fête de la Reine');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('June 21', 'National Aboriginal Day', 'Journée nationale des Autochthones');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('June 24', 'Discovery Day / National Holiday', 'Journée découverte / Fête nationale du Québec / Saint-Jean-Baptiste');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('July 1', 'Canada Day', 'Fête du Canada');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('July 12', 'Orangemen’s Day', 'Fête des orangistes');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('First Monday in August', 'Civic Holiday', 'Premier lundi d’août');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('First Monday in August', 'Heritage Day', 'Fête du patrimoine');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('First Monday in August', 'New Brunswick Day', 'Jour de Nouveau Brunswick');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('First Monday in August', 'Natal Day', 'Jour de la Fondation');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('Third Friday in August', 'Gold Cup Parade Day', 'Défilé de la Coupe d’or');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('Third Monday in August', 'Discovery Day', 'Jour de la Découverte');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('First Monday in September', 'Labour Day', 'Fête du travail');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('Second Monday in October', 'Thanksgiving', 'Action de grâce');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('November 11', 'Armistice Day', 'Jour de l’Armistice');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('November 11', 'Remembrance Day', 'Jour du Souvenir');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('December 25', 'Christmas Day', 'Noël');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('December 26', 'Boxing Day', 'Lendemain de Noël');

UPDATE Holiday SET federal = 1 WHERE name_en = 'New Year’s Day';
UPDATE Holiday SET federal = 1 WHERE name_en = 'Good Friday';
UPDATE Holiday SET federal = 1 WHERE name_en = 'Easter Monday';
UPDATE Holiday SET federal = 1 WHERE name_en = 'Victoria Day';
UPDATE Holiday SET federal = 1 WHERE name_en = 'Canada Day';
UPDATE Holiday SET federal = 1 WHERE name_en = 'Civic Holiday';
UPDATE Holiday SET federal = 1 WHERE name_en = 'Labour Day';
UPDATE Holiday SET federal = 1 WHERE name_en = 'Thanksgiving';
UPDATE Holiday SET federal = 1 WHERE name_en = 'Remembrance Day';
UPDATE Holiday SET federal = 1 WHERE name_en = 'Christmas Day';
UPDATE Holiday SET federal = 1 WHERE name_en = 'Boxing Day';


CREATE TABLE ProvinceHoliday (
  id INTEGER PRIMARY KEY,
  province_id CHAR(2),
  holiday_id INTEGER,
  FOREIGN KEY(province_id) REFERENCES Province(id),
  FOREIGN KEY(holiday_id) REFERENCES Holiday(id)
);

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'January 1' AND name_en = 'New Year’s Day')), 'AB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'January 1' AND name_en = 'New Year’s Day')), 'BC');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'January 1' AND name_en = 'New Year’s Day')), 'MB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'January 1' AND name_en = 'New Year’s Day')), 'NB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'January 1' AND name_en = 'New Year’s Day')), 'NL');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'January 1' AND name_en = 'New Year’s Day')), 'NT');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'January 1' AND name_en = 'New Year’s Day')), 'NS');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'January 1' AND name_en = 'New Year’s Day')), 'NU');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'January 1' AND name_en = 'New Year’s Day')), 'ON');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'January 1' AND name_en = 'New Year’s Day')), 'PE');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'January 1' AND name_en = 'New Year’s Day')), 'QC');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'January 1' AND name_en = 'New Year’s Day')), 'SK');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'January 1' AND name_en = 'New Year’s Day')), 'YT');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Third Monday in February' AND name_en = 'Louis Riel Day')), 'MB');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Third Monday in February' AND name_en = 'Islander Day')), 'PE');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Third Monday in February' AND name_en = 'Family Day')), 'AB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Third Monday in February' AND name_en = 'Family Day')), 'BC');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Third Monday in February' AND name_en = 'Family Day')), 'NB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Third Monday in February' AND name_en = 'Family Day')), 'ON');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Third Monday in February' AND name_en = 'Family Day')), 'SK');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Third Monday in February' AND name_en = 'Heritage Day')), 'NS');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'March 17' AND name_en = 'Saint Patrick’s Day')), 'NL');

-- Down
DROP TABLE ProvinceHoliday;
DROP TABLE Holiday;
DROP TABLE Province;
