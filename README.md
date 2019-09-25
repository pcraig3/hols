# hols

This is a fun little node app for Canada's public holidays. There's a frontend you can look at and an API you can use.

- The frontend is written using [htm](https://github.com/developit/htm) on the server. Very amusing.
- The backend API is pretty bare-metal: it's using an initial SQLite thing and then it does "db reads" and spits out rows.

## Using the API

Please get in touch if you are using the API, because I can probably make it work better if I have real-life use-cases.

[Read the API docs](https://github.com/pcraig3/hols/blob/master/API.md).

## Getting started

### [Install `npm`](https://www.npmjs.com/get-npm)

`npm` is a javascript package manager. It downloads project dependencies and runs node applications.

You'll need node version `v10.15.0` or higher to run the app.

### [Install `docker`](https://docs.docker.com/install/)

A docker container allows a developer to package up an application and all of its parts. This means we can build an app in any language, in any stack, and then run it anywhere — whether locally or on a server.

## Build and run with npm

Guess what? There is **no build step**. Just install the dependencies and run it.

Pretty slick. 😎

```bash
# install dependencies
npm install

# run application in 'dev' mode
# (ie, the server restarts when you save a file)
npm run dev

# run application in 'prod' mode
npm start
```

The app should be running at [http://localhost:3000/](http://localhost:3000/).

On a Mac, press `Control` + `C` to quit the running application.

### Run tests with npm

```bash
# run unit tests
npm test

# run linting
npm run lint
```

#### unit tests

Since we are still using components as interface, this makes testing really easily. On the server, we render out our components as strings that we send to the browser, but when we run tests, we want to do a bit more than that. Looking for values in big strings is pretty ugly.

Instead, using [`cheerio`](https://cheerio.js.org/), we can load in a string like `"<main><p>hello</p></main>"` and then traverse it using jQuery selector syntax. So we can write assertions against stuff like `$('main > p').text()`, which is far better than string testing.

## Build and run as a Docker container

```bash
# build an image locally
docker build -t pcraig3/hols .

# run the container
docker run -it -p 3000:3000 pcraig3/hols
```

The container should be running at [http://localhost:3000/](http://localhost:3000/).

On a Mac, press `Control` + `C` to quit the running docker container.

## Citations

- AB: 9 https://www.alberta.ca/alberta-general-holidays.aspx
- BC: 10 https://www2.gov.bc.ca/gov/content/employment-business/employment-standards-advice/employment-standards/statutory-holidays
- MB: 8 https://www.gov.mb.ca/labour/standards/doc,gen-holidays-after-april-30-07,factsheet.html#q12
- NB: 8 https://www2.gnb.ca/content/dam/gnb/Departments/petl-epft/PDF/es/FactSheets/PublicHolidaysVacation.pdf
- NL: 9 https://www.newfoundlandlabrador.com/about-this-place/nl-facts
- NS: 6 https://novascotia.ca/lae/employmentrights/holidaychart.asp
- NT: 10 https://www.ece.gov.nt.ca/en/services/employment-standards/frequently-asked-questions
- NU: 9 http://nu-lsco.ca/faq-s?tmpl=component&faqid=11
- ON: 9 https://www.ontario.ca/document/your-guide-employment-standards-act-0/public-holidays
- PE: 7 https://www.princeedwardisland.ca/en/information/workforce-and-advanced-learning/paid-holidays
- QE: 8 https://www.educaloi.qc.ca/en/capsules/public-holidays
- SK: 10 https://www.saskatchewan.ca/business/employment-standards/vacations-holidays-leaves-and-absences/public-statutory-holidays/list-of-saskatchewan-public-holidays
- YT: 10 https://yukon.ca/en/doing-business/employer-responsibilities/find-yukon-statutory-holiday
