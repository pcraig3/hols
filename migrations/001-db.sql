-- Up
CREATE TABLE Province (
  id CHAR(2) PRIMARY KEY,
  name_en TEXT,
  name_fr TEXT
);

CREATE TABLE Holiday (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	date_string TEXT,
	name_en TEXT,
	name_fr TEXT,
	federal BOOLEAN DEFAULT FALSE
);

CREATE TABLE ProvinceHoliday (
  id INTEGER PRIMARY KEY,
  province_id CHAR(2),
  holiday_id INTEGER,
  FOREIGN KEY(province_id) REFERENCES Province(id),
  FOREIGN KEY(holiday_id) REFERENCES Holiday(id)
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

INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('January 1', 'New Year’s Day', 'Jour de l’An');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('Third Monday in February', 'Louis Riel Day', 'Journée Louis Riel');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('Third Monday in February', 'Islander Day', 'Fête des Insulaires');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('Third Monday in February', 'Family Day', 'Fête de la famille');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('Third Monday in February', 'Heritage Day', 'Fête du Patrimoine');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('March 17', 'Saint Patrick’s Day', 'Jour de la Saint-Patrick');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('Friday before Easter Day', 'Good Friday', 'Vendredi saint');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('Monday after Easter Day', 'Easter Monday', 'Lundi de Pâques');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('April 23', 'Saint George’s Day', 'Jour de St. George');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('Monday before May 25', 'National Patriots’ Day', 'Journée nationale des patriotes');
INSERT INTO Holiday (date_string, name_en, name_fr) VALUES ('Monday before May 25', 'Victoria Day', 'Fête de la Reine');
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

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Friday before Easter Day' AND name_en = 'Good Friday')), 'AB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Friday before Easter Day' AND name_en = 'Good Friday')), 'BC');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Friday before Easter Day' AND name_en = 'Good Friday')), 'MB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Friday before Easter Day' AND name_en = 'Good Friday')), 'NB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Friday before Easter Day' AND name_en = 'Good Friday')), 'NL');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Friday before Easter Day' AND name_en = 'Good Friday')), 'NT');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Friday before Easter Day' AND name_en = 'Good Friday')), 'NS');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Friday before Easter Day' AND name_en = 'Good Friday')), 'NU');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Friday before Easter Day' AND name_en = 'Good Friday')), 'ON');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Friday before Easter Day' AND name_en = 'Good Friday')), 'PE');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Friday before Easter Day' AND name_en = 'Good Friday')), 'QC');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Friday before Easter Day' AND name_en = 'Good Friday')), 'SK');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Friday before Easter Day' AND name_en = 'Good Friday')), 'YT');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Monday after Easter Day' AND name_en = 'Easter Monday')), 'AB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Monday after Easter Day' AND name_en = 'Easter Monday')), 'PE');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'April 23' AND name_en = 'Saint George’s Day')), 'NL');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Monday before May 25' AND name_en = 'National Patriots’ Day')), 'QC');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Monday before May 25' AND name_en = 'Victoria Day')), 'AB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Monday before May 25' AND name_en = 'Victoria Day')), 'BC');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Monday before May 25' AND name_en = 'Victoria Day')), 'MB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Monday before May 25' AND name_en = 'Victoria Day')), 'NB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Monday before May 25' AND name_en = 'Victoria Day')), 'NT');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Monday before May 25' AND name_en = 'Victoria Day')), 'NS');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Monday before May 25' AND name_en = 'Victoria Day')), 'NU');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Monday before May 25' AND name_en = 'Victoria Day')), 'ON');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Monday before May 25' AND name_en = 'Victoria Day')), 'PE');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Monday before May 25' AND name_en = 'Victoria Day')), 'SK');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Monday before May 25' AND name_en = 'Victoria Day')), 'YT');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'June 21' AND name_en = 'National Aboriginal Day')), 'NT');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'June 21' AND name_en = 'National Aboriginal Day')), 'YT');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'June 24' AND name_en = 'Discovery Day / National Holiday')), 'NL');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'June 24' AND name_en = 'Discovery Day / National Holiday')), 'QC');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'June 24' AND name_en = 'Discovery Day / National Holiday')), 'YT');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'July 1' AND name_en = 'Canada Day')), 'AB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'July 1' AND name_en = 'Canada Day')), 'BC');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'July 1' AND name_en = 'Canada Day')), 'MB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'July 1' AND name_en = 'Canada Day')), 'NB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'July 1' AND name_en = 'Canada Day')), 'NL');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'July 1' AND name_en = 'Canada Day')), 'NT');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'July 1' AND name_en = 'Canada Day')), 'NS');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'July 1' AND name_en = 'Canada Day')), 'NU');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'July 1' AND name_en = 'Canada Day')), 'ON');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'July 1' AND name_en = 'Canada Day')), 'PE');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'July 1' AND name_en = 'Canada Day')), 'QC');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'July 1' AND name_en = 'Canada Day')), 'SK');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'July 1' AND name_en = 'Canada Day')), 'YT');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'July 12' AND name_en = 'Orangemen’s Day')), 'NL');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in August' AND name_en = 'Civic Holiday')), 'BC');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in August' AND name_en = 'Civic Holiday')), 'MB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in August' AND name_en = 'Civic Holiday')), 'NL');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in August' AND name_en = 'Civic Holiday')), 'NT');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in August' AND name_en = 'Civic Holiday')), 'NU');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in August' AND name_en = 'Civic Holiday')), 'ON');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in August' AND name_en = 'Civic Holiday')), 'SK');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in August' AND name_en = 'Heritage Day')), 'AB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in August' AND name_en = 'Heritage Day')), 'YT');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in August' AND name_en = 'New Brunswick Day')), 'NB');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in August' AND name_en = 'Natal Day')), 'NS');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Third Friday in August' AND name_en = 'Gold Cup Parade Day')), 'PE');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Third Monday in August' AND name_en = 'Discovery Day')), 'YT');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in September' AND name_en = 'Labour Day')), 'AB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in September' AND name_en = 'Labour Day')), 'BC');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in September' AND name_en = 'Labour Day')), 'MB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in September' AND name_en = 'Labour Day')), 'NB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in September' AND name_en = 'Labour Day')), 'NL');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in September' AND name_en = 'Labour Day')), 'NT');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in September' AND name_en = 'Labour Day')), 'NS');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in September' AND name_en = 'Labour Day')), 'NU');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in September' AND name_en = 'Labour Day')), 'ON');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in September' AND name_en = 'Labour Day')), 'PE');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in September' AND name_en = 'Labour Day')), 'QC');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in September' AND name_en = 'Labour Day')), 'SK');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'First Monday in September' AND name_en = 'Labour Day')), 'YT');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Second Monday in October' AND name_en = 'Thanksgiving')), 'AB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Second Monday in October' AND name_en = 'Thanksgiving')), 'BC');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Second Monday in October' AND name_en = 'Thanksgiving')), 'MB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Second Monday in October' AND name_en = 'Thanksgiving')), 'NB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Second Monday in October' AND name_en = 'Thanksgiving')), 'NL');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Second Monday in October' AND name_en = 'Thanksgiving')), 'NT');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Second Monday in October' AND name_en = 'Thanksgiving')), 'NS');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Second Monday in October' AND name_en = 'Thanksgiving')), 'NU');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Second Monday in October' AND name_en = 'Thanksgiving')), 'ON');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Second Monday in October' AND name_en = 'Thanksgiving')), 'PE');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Second Monday in October' AND name_en = 'Thanksgiving')), 'QC');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Second Monday in October' AND name_en = 'Thanksgiving')), 'SK');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'Second Monday in October' AND name_en = 'Thanksgiving')), 'YT');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'November 11' AND name_en = 'Armistice Day')), 'NL');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'November 11' AND name_en = 'Remembrance Day')), 'AB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'November 11' AND name_en = 'Remembrance Day')), 'BC');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'November 11' AND name_en = 'Remembrance Day')), 'NB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'November 11' AND name_en = 'Remembrance Day')), 'NT');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'November 11' AND name_en = 'Remembrance Day')), 'NS');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'November 11' AND name_en = 'Remembrance Day')), 'NU');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'November 11' AND name_en = 'Remembrance Day')), 'PE');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'November 11' AND name_en = 'Remembrance Day')), 'SK');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'November 11' AND name_en = 'Remembrance Day')), 'YT');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'December 25' AND name_en = 'Christmas Day')), 'AB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'December 25' AND name_en = 'Christmas Day')), 'BC');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'December 25' AND name_en = 'Christmas Day')), 'MB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'December 25' AND name_en = 'Christmas Day')), 'NB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'December 25' AND name_en = 'Christmas Day')), 'NL');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'December 25' AND name_en = 'Christmas Day')), 'NT');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'December 25' AND name_en = 'Christmas Day')), 'NS');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'December 25' AND name_en = 'Christmas Day')), 'NU');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'December 25' AND name_en = 'Christmas Day')), 'ON');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'December 25' AND name_en = 'Christmas Day')), 'PE');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'December 25' AND name_en = 'Christmas Day')), 'QC');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'December 25' AND name_en = 'Christmas Day')), 'SK');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'December 25' AND name_en = 'Christmas Day')), 'YT');

INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'December 26' AND name_en = 'Boxing Day')), 'AB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'December 26' AND name_en = 'Boxing Day')), 'NB');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'December 26' AND name_en = 'Boxing Day')), 'NS');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'December 26' AND name_en = 'Boxing Day')), 'ON');
INSERT INTO ProvinceHoliday (holiday_id, province_id) VALUES ((SELECT id FROM Holiday WHERE (date_string = 'December 26' AND name_en = 'Boxing Day')), 'PE');

-- Down
DROP TABLE ProvinceHoliday;
DROP TABLE Holiday;
DROP TABLE Province;
