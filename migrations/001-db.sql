-- Up
CREATE TABLE Province (
  id CHAR(2) PRIMARY KEY,
  nameEn TEXT,
  nameFr TEXT,
  sourceLink TEXT DFEAULT null,
  sourceEn TEXT DEFAULT null
);

CREATE TABLE Holiday (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	date TEXT,
	nameEn TEXT,
	nameFr TEXT,
	federal BOOLEAN DEFAULT FALSE
);

CREATE TABLE ProvinceHoliday (
  id INTEGER PRIMARY KEY,
  provinceId CHAR(2),
  holidayId INTEGER,
  FOREIGN KEY(provinceId) REFERENCES Province(id),
  FOREIGN KEY(holidayId) REFERENCES Holiday(id)
);

INSERT INTO Province (id, nameEn, nameFr) VALUES ('AB', 'Alberta', 'Alberta');
INSERT INTO Province (id, nameEn, nameFr) VALUES ('BC', 'British Columbia', 'Colombie-Britannique');
INSERT INTO Province (id, nameEn, nameFr) VALUES ('MB', 'Manitoba', 'Manitoba');
INSERT INTO Province (id, nameEn, nameFr) VALUES ('NB', 'New Brunswick', 'Nouveau-Brunswick');
INSERT INTO Province (id, nameEn, nameFr) VALUES ('NL', 'Newfoundland and Labrador', 'Terre-Neuve-et-Labrador');
INSERT INTO Province (id, nameEn, nameFr) VALUES ('NS', 'Nova Scotia', 'Nouvelle-Écosse');
INSERT INTO Province (id, nameEn, nameFr) VALUES ('NT', 'Northwest Territories', 'Territoires du Nord-Ouest');
INSERT INTO Province (id, nameEn, nameFr) VALUES ('NU', 'Nunavut', 'Nunavut');
INSERT INTO Province (id, nameEn, nameFr) VALUES ('ON', 'Ontario', 'Ontario');
INSERT INTO Province (id, nameEn, nameFr) VALUES ('PE', 'Prince Edward Island', 'Île-du-Prince-Édouard');
INSERT INTO Province (id, nameEn, nameFr) VALUES ('QC', 'Quebec', 'Québec');
INSERT INTO Province (id, nameEn, nameFr) VALUES ('SK', 'Saskatchewan', 'Saskatchewan');
INSERT INTO Province (id, nameEn, nameFr) VALUES ('YT', 'Yukon', 'Yukon');

UPDATE Province SET sourceEn = 'General holidays in Alberta', sourceLink = 'https://www.alberta.ca/alberta-general-holidays.aspx#toc-1' WHERE id = 'AB';
UPDATE Province SET sourceEn = 'Statutory Holidays in British Columbia', sourceLink = 'https://www2.gov.bc.ca/gov/content/employment-business/employment-standards-advice/employment-standards/statutory-holidays#body' WHERE id = 'BC';
UPDATE Province SET sourceEn = 'General holidays in Manitoba', sourceLink = 'https://www.gov.mb.ca/labour/standards/doc,gen-holidays-after-april-30-07,factsheet.html#q12' WHERE id = 'MB';
UPDATE Province SET sourceEn = '10 prescribed days of rest', sourceLink = 'https://www2.gnb.ca/content/gnb/en/departments/elg/local_government/content/governance/content/days_of_rest_act/faq.html#2' WHERE id = 'NB';
UPDATE Province SET sourceEn = 'Public holidays in Newfoundland', sourceLink = 'https://gist.github.com/pcraig3/81dff348ddf52777c9f918c3032531bd' WHERE id = 'NL';
UPDATE Province SET sourceEn = 'Paid holidays in Nova Scotia', sourceLink = 'https://novascotia.ca/lae/employmentrights/holidaychart.asp' WHERE id = 'NS';
UPDATE Province SET sourceEn = 'Employment Standards, Northwest Territories', sourceLink = 'https://www.ece.gov.nt.ca/en/services/employment-standards/frequently-asked-questions' WHERE id = 'NT';
UPDATE Province SET sourceEn = 'Nunavut General Holidays', sourceLink = 'https://nu-lsco.ca/faq-s?tmpl=component&faqid=11' WHERE id = 'NU';
UPDATE Province SET sourceEn = 'Ontario Public holidays', sourceLink = 'https://www.ontario.ca/document/your-guide-employment-standards-act-0/public-holidays' WHERE id = 'ON';
UPDATE Province SET sourceEn = 'PEI Paid Holidays', sourceLink = 'https://www.princeedwardisland.ca/en/information/economic-growth-tourism-and-culture/paid-holidays' WHERE id = 'PE';
UPDATE Province SET sourceEn = 'Jours fériés, chômés et payés', sourceLink = 'https://www2.gouv.qc.ca/entreprises/portail/quebec/ressourcesh?lang=fr&g=ressourcesh&sg=personnel&t=o&e=2318829344:3908165687' WHERE id = 'QC';
UPDATE Province SET sourceEn = 'Saskatchewan Public Holidays', sourceLink = 'https://www.saskatchewan.ca/business/employment-standards/vacations-holidays-leaves-and-absences/public-statutory-holidays/list-of-saskatchewan-public-holidays' WHERE id = 'SK';
UPDATE Province SET sourceEn = 'Yukon statutory holiday dates', sourceLink = 'https://yukon.ca/en/doing-business/employer-responsibilities/find-yukon-statutory-holiday' WHERE id = 'YT';

INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('January 1', 'New Year’s Day', 'Jour de l’An');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('Third Monday in February', 'Louis Riel Day', 'Journée Louis Riel');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('Third Monday in February', 'Islander Day', 'Fête des Insulaires');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('Third Monday in February', 'Family Day', 'Fête de la famille');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('Third Monday in February', 'Heritage Day', 'Fête du Patrimoine');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('Monday March 17', 'Saint Patrick’s Day', 'Jour de la Saint-Patrick');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('Friday before Easter Day', 'Good Friday', 'Vendredi saint');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('Monday after Easter Day', 'Easter Monday', 'Lundi de Pâques');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('Monday near April 23', 'Saint George’s Day', 'Jour de St. George');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('Monday before May 25', 'National Patriots’ Day', 'Journée nationale des patriotes');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('Monday before May 25', 'Victoria Day', 'Fête de la Reine');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('June 21', 'National Indigenous Peoples Day', 'Journée nationale des peuples autochtones');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('June 24', 'Saint-Jean-Baptiste Day', 'Saint-Jean-Baptiste / Fête nationale du Québec');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('Monday after June 24', 'Discovery Day', 'Journée découverte');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('July 1', 'Canada Day', 'Fête du Canada');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('Monday near July 12', 'Orangemen’s Day', 'Fête des orangistes');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('First Monday in August', 'Civic Holiday', 'Premier lundi d’août');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('First Monday in August', 'British Columbia Day', 'Jour de Colombie-Britannique');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('First Monday in August', 'New Brunswick Day', 'Jour de Nouveau Brunswick');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('First Monday in August', 'Saskatchewan Day', 'Jour de Saskatchewan');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('First Wednesday in August', 'Regatta Day', 'Journée des régates');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('Third Monday in August', 'Discovery Day', 'Jour de la Découverte');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('First Monday in September', 'Labour Day', 'Fête du travail');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('Second Monday in October', 'Thanksgiving', 'Action de grâce');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('November 11', 'Remembrance Day', 'Jour du Souvenir');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('December 25', 'Christmas Day', 'Noël');
INSERT INTO Holiday (date, nameEn, nameFr) VALUES ('December 26', 'Boxing Day', 'Lendemain de Noël');

UPDATE Holiday SET federal = 1 WHERE nameEn = 'New Year’s Day';
UPDATE Holiday SET federal = 1 WHERE nameEn = 'Good Friday';
UPDATE Holiday SET federal = 1 WHERE nameEn = 'Easter Monday';
UPDATE Holiday SET federal = 1 WHERE nameEn = 'Victoria Day';
UPDATE Holiday SET federal = 1 WHERE nameEn = 'Canada Day';
UPDATE Holiday SET federal = 1 WHERE nameEn = 'Civic Holiday';
UPDATE Holiday SET federal = 1 WHERE nameEn = 'Labour Day';
UPDATE Holiday SET federal = 1 WHERE nameEn = 'Thanksgiving';
UPDATE Holiday SET federal = 1 WHERE nameEn = 'Remembrance Day';
UPDATE Holiday SET federal = 1 WHERE nameEn = 'Christmas Day';
UPDATE Holiday SET federal = 1 WHERE nameEn = 'Boxing Day';

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'January 1' AND nameEn = 'New Year’s Day')), 'AB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'January 1' AND nameEn = 'New Year’s Day')), 'BC');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'January 1' AND nameEn = 'New Year’s Day')), 'MB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'January 1' AND nameEn = 'New Year’s Day')), 'NB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'January 1' AND nameEn = 'New Year’s Day')), 'NL');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'January 1' AND nameEn = 'New Year’s Day')), 'NT');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'January 1' AND nameEn = 'New Year’s Day')), 'NS');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'January 1' AND nameEn = 'New Year’s Day')), 'NU');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'January 1' AND nameEn = 'New Year’s Day')), 'ON');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'January 1' AND nameEn = 'New Year’s Day')), 'PE');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'January 1' AND nameEn = 'New Year’s Day')), 'QC');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'January 1' AND nameEn = 'New Year’s Day')), 'SK');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'January 1' AND nameEn = 'New Year’s Day')), 'YT');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Third Monday in February' AND nameEn = 'Louis Riel Day')), 'MB');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Third Monday in February' AND nameEn = 'Islander Day')), 'PE');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Third Monday in February' AND nameEn = 'Family Day')), 'AB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Third Monday in February' AND nameEn = 'Family Day')), 'BC');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Third Monday in February' AND nameEn = 'Family Day')), 'NB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Third Monday in February' AND nameEn = 'Family Day')), 'ON');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Third Monday in February' AND nameEn = 'Family Day')), 'SK');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Third Monday in February' AND nameEn = 'Heritage Day')), 'NS');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Monday March 17' AND nameEn = 'Saint Patrick’s Day')), 'NL');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Friday before Easter Day' AND nameEn = 'Good Friday')), 'AB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Friday before Easter Day' AND nameEn = 'Good Friday')), 'BC');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Friday before Easter Day' AND nameEn = 'Good Friday')), 'MB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Friday before Easter Day' AND nameEn = 'Good Friday')), 'NB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Friday before Easter Day' AND nameEn = 'Good Friday')), 'NL');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Friday before Easter Day' AND nameEn = 'Good Friday')), 'NT');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Friday before Easter Day' AND nameEn = 'Good Friday')), 'NS');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Friday before Easter Day' AND nameEn = 'Good Friday')), 'NU');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Friday before Easter Day' AND nameEn = 'Good Friday')), 'ON');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Friday before Easter Day' AND nameEn = 'Good Friday')), 'PE');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Friday before Easter Day' AND nameEn = 'Good Friday')), 'QC');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Friday before Easter Day' AND nameEn = 'Good Friday')), 'SK');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Friday before Easter Day' AND nameEn = 'Good Friday')), 'YT');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Monday near April 23' AND nameEn = 'Saint George’s Day')), 'NL');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Monday before May 25' AND nameEn = 'National Patriots’ Day')), 'QC');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Monday before May 25' AND nameEn = 'Victoria Day')), 'AB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Monday before May 25' AND nameEn = 'Victoria Day')), 'BC');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Monday before May 25' AND nameEn = 'Victoria Day')), 'MB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Monday before May 25' AND nameEn = 'Victoria Day')), 'NT');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Monday before May 25' AND nameEn = 'Victoria Day')), 'NU');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Monday before May 25' AND nameEn = 'Victoria Day')), 'ON');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Monday before May 25' AND nameEn = 'Victoria Day')), 'SK');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Monday before May 25' AND nameEn = 'Victoria Day')), 'YT');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'June 21' AND nameEn = 'National Indigenous Peoples Day')), 'NT');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'June 21' AND nameEn = 'National Indigenous Peoples Day')), 'YT');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Monday after June 24' AND nameEn = 'Discovery Day')), 'NL');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'June 24' AND nameEn = 'Saint-Jean-Baptiste Day')), 'QC');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'July 1' AND nameEn = 'Canada Day')), 'AB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'July 1' AND nameEn = 'Canada Day')), 'BC');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'July 1' AND nameEn = 'Canada Day')), 'MB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'July 1' AND nameEn = 'Canada Day')), 'NB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'July 1' AND nameEn = 'Canada Day')), 'NL');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'July 1' AND nameEn = 'Canada Day')), 'NT');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'July 1' AND nameEn = 'Canada Day')), 'NS');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'July 1' AND nameEn = 'Canada Day')), 'NU');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'July 1' AND nameEn = 'Canada Day')), 'ON');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'July 1' AND nameEn = 'Canada Day')), 'PE');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'July 1' AND nameEn = 'Canada Day')), 'QC');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'July 1' AND nameEn = 'Canada Day')), 'SK');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'July 1' AND nameEn = 'Canada Day')), 'YT');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Monday near July 12' AND nameEn = 'Orangemen’s Day')), 'NL');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'First Monday in August' AND nameEn = 'British Columbia Day')), 'BC');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'First Monday in August' AND nameEn = 'Civic Holiday')), 'NT');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'First Monday in August' AND nameEn = 'Civic Holiday')), 'NU');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'First Monday in August' AND nameEn = 'Saskatchewan Day')), 'SK');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'First Monday in August' AND nameEn = 'New Brunswick Day')), 'NB');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'First Wednesday in August' AND nameEn = 'Regatta Day')), 'NL');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Third Monday in August' AND nameEn = 'Discovery Day')), 'YT');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'First Monday in September' AND nameEn = 'Labour Day')), 'AB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'First Monday in September' AND nameEn = 'Labour Day')), 'BC');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'First Monday in September' AND nameEn = 'Labour Day')), 'MB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'First Monday in September' AND nameEn = 'Labour Day')), 'NB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'First Monday in September' AND nameEn = 'Labour Day')), 'NL');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'First Monday in September' AND nameEn = 'Labour Day')), 'NT');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'First Monday in September' AND nameEn = 'Labour Day')), 'NS');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'First Monday in September' AND nameEn = 'Labour Day')), 'NU');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'First Monday in September' AND nameEn = 'Labour Day')), 'ON');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'First Monday in September' AND nameEn = 'Labour Day')), 'PE');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'First Monday in September' AND nameEn = 'Labour Day')), 'QC');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'First Monday in September' AND nameEn = 'Labour Day')), 'SK');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'First Monday in September' AND nameEn = 'Labour Day')), 'YT');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Second Monday in October' AND nameEn = 'Thanksgiving')), 'AB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Second Monday in October' AND nameEn = 'Thanksgiving')), 'BC');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Second Monday in October' AND nameEn = 'Thanksgiving')), 'MB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Second Monday in October' AND nameEn = 'Thanksgiving')), 'NT');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Second Monday in October' AND nameEn = 'Thanksgiving')), 'NU');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Second Monday in October' AND nameEn = 'Thanksgiving')), 'ON');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Second Monday in October' AND nameEn = 'Thanksgiving')), 'QC');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Second Monday in October' AND nameEn = 'Thanksgiving')), 'SK');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'Second Monday in October' AND nameEn = 'Thanksgiving')), 'YT');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'November 11' AND nameEn = 'Remembrance Day')), 'AB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'November 11' AND nameEn = 'Remembrance Day')), 'BC');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'November 11' AND nameEn = 'Remembrance Day')), 'NB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'November 11' AND nameEn = 'Remembrance Day')), 'NL');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'November 11' AND nameEn = 'Remembrance Day')), 'NT');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'November 11' AND nameEn = 'Remembrance Day')), 'NU');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'November 11' AND nameEn = 'Remembrance Day')), 'PE');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'November 11' AND nameEn = 'Remembrance Day')), 'SK');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'November 11' AND nameEn = 'Remembrance Day')), 'YT');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'December 25' AND nameEn = 'Christmas Day')), 'AB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'December 25' AND nameEn = 'Christmas Day')), 'BC');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'December 25' AND nameEn = 'Christmas Day')), 'MB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'December 25' AND nameEn = 'Christmas Day')), 'NB');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'December 25' AND nameEn = 'Christmas Day')), 'NL');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'December 25' AND nameEn = 'Christmas Day')), 'NT');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'December 25' AND nameEn = 'Christmas Day')), 'NS');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'December 25' AND nameEn = 'Christmas Day')), 'NU');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'December 25' AND nameEn = 'Christmas Day')), 'ON');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'December 25' AND nameEn = 'Christmas Day')), 'PE');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'December 25' AND nameEn = 'Christmas Day')), 'QC');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'December 25' AND nameEn = 'Christmas Day')), 'SK');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'December 25' AND nameEn = 'Christmas Day')), 'YT');

INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'December 26' AND nameEn = 'Boxing Day')), 'NL');
INSERT INTO ProvinceHoliday (holidayId, provinceId) VALUES ((SELECT id FROM Holiday WHERE (date = 'December 26' AND nameEn = 'Boxing Day')), 'ON');

-- Down
DROP TABLE ProvinceHoliday;
DROP TABLE Holiday;
DROP TABLE Province;
