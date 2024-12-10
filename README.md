# Canada Holidays

This is a fun little [express](https://expressjs.com/) app for Canada's statutory holidays. There's a frontend you can look at and an API you can use.

- The frontend is using [htm](https://github.com/developit/htm) server-rendered components. Very amusing.
- The backend API is pretty bare-metal: it's using an initial SQLite migration file stored in memory and then it does "db reads" and spits out JSON.

## Using the API

Please get in touch if you are using the API and you need something, because I can probably make it work better if I have enough real-life use-cases.

[Read the API docs](https://github.com/pcraig3/hols/blob/main/API.md).

There's an OpenAPI spec at [`Canada-Holidays-API.v1.yaml`](https://github.com/pcraig3/hols/blob/main/reference/Canada-Holidays-API.v1.yaml) and a <a href="https://app.swaggerhub.com/apis/pcraig3/canada-holidays/" target="_blank">SwaggerHub</a> page where you can test the endpoints.

## Getting started

### [Install `npm`](https://www.npmjs.com/get-npm)

`npm` is a javascript package manager. It downloads project dependencies and runs node applications.

You'll need node version `v14` or higher to run the app. (If you have an M1 Mac, you'll need `v15` or higher.)

### [Install `docker`](https://docs.docker.com/install/)

A docker container allows a developer to package up an application and all of its parts. This means we can build an app in any language, in any stack, and then run it anywhere — whether locally or on a server.

## Build and run with npm

Install the dependencies and run it. "npm run dev" runs the JS contact + minify step, and reruns it if anything changes.

Pretty slick. 😎

```bash
# install dependencies
npm install

# run application in 'dev' mode
# (ie, the server restarts when you save a file)
npm run dev

# manually run build to create /js/min/bundle.min.js file
npm run build

# run application in 'prod' mode (requires build step)
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
docker build -t pcraig3/hols:tag --build-arg GITHUB_SHA_ARG=<tag> .

# run the container
docker run -it -p 3000:3000 pcraig3/hols:tag
```

The container should be running at [http://localhost:3000/](http://localhost:3000/).

On a Mac, press `Control` + `C` to quit the running docker container.

### Push to Cloud Run

The [`main.yaml`](https://github.com/pcraig3/hols/blob/main/.github/workflows/main.yml) file contains instructions to deploy the service to [Cloud Run](https://cloud.google.com/run), or you can use the CLI command below to do it manually.

```
gcloud builds submit --tag gcr.io/{PROJECT}/{SERVICE}:{TAG} --build-arg GITHUB_SHA_ARG={TAG}
```

## Citations

| Region  | #   | Readable source                                                                                                                                                                                            | Legislation                                                                                                                                                                                                           |
| ------- | --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Federal | 12  | [Statutory holiday pay - Canada.ca](https://www.tpsgc-pwgsc.gc.ca/remuneration-compensation/services-paye-pay-services/paye-information-pay/vie-life/vie-conge-life-leave/conge-paye-holiday-pay-eng.html) | -                                                                                                                                                                                                                     |
| AB      | 9   | [General holidays in Alberta](https://www.alberta.ca/alberta-general-holidays.aspx#jumplinks-1)                                                                                                            | [Employment Standards Code](https://www.canlii.org/en/ab/laws/stat/rsa-2000-c-e-9/latest/rsa-2000-c-e-9.html#sec25)                                                                                                   |
| BC      | 10  | [Statutory Holidays in British Columbia](https://www2.gov.bc.ca/gov/content/employment-business/employment-standards-advice/employment-standards/statutory-holidays#body)                                  | [Entitlement to Statutory Holiday - Act Part 5, Section 44](https://www2.gov.bc.ca/gov/content/employment-business/employment-standards-advice/employment-standards/forms-resources/igm/esa-part-5-section-44#policy) |
| MB      | 9   | [What are the general holidays in Manitoba?](https://www.gov.mb.ca/labour/standards/doc,gen-holidays-after-april-30-07,factsheet.html#q12)                                                                 | [The Employment Standards Code](https://web2.gov.mb.ca/laws/statutes/ccsm/e110.php?lang=en#21)                                                                                                                        |
| NB      | 8   | [What are the 10 prescribed days of rest?](https://www2.gnb.ca/content/gnb/en/departments/elg/local_government/content/governance/content/days_of_rest_act/faq.html#2)                                     | [Employment Standards Act](http://laws.gnb.ca/en/ShowPdf/cs/E-7.2.pdf)                                                                                                                                                |
| NL      | 12  | [Clarification on public holidays in Newfoundland](https://gist.github.com/pcraig3/81dff348ddf52777c9f918c3032531bd)                                                                                       | [Labour Standards Act](https://assembly.nl.ca/legislation/sr/statutes/l02.htm#14_)                                                                                                                                    |
| NS      | 6   | [Holiday and Retail Closing Day Charts](https://novascotia.ca/lae/employmentrights/holidaychart.asp)                                                                                                       | [Labour Standards Code](https://novascotia.ca/lae/employmentrights/holidaychart.asp)                                                                                                                                  |
| NT      | 10  | [Employment Standards: Frequently Asked Questions](https://www.ece.gov.nt.ca/en/services/employment-standards/frequently-asked-questions#Statutory%20Holidays)                                             | [Employment Standards Act](https://www.justice.gov.nt.ca/en/files/legislation/employment-standards/employment-standards.a.pdf)                                                                                        |
| NU      | 10  | -                                                                                                                                                                                                          | [Labour Standards Act](https://nu-lsco.ca/faq-s?tmpl=component&faqid=11)                                                                                                                                              |
| ON      | 9   | [Public holidays](https://www.ontario.ca/document/your-guide-employment-standards-act-0/public-holidays)                                                                                                   | [Employment Standards Act](https://www.ontario.ca/laws/statute/00e41#BK0)                                                                                                                                             |
| PE      | 8   | [Paid Holidays](https://www.princeedwardisland.ca/en/information/economic-growth-tourism-and-culture/paid-holidays)                                                                                        | [Employment Standards Act](https://www.princeedwardisland.ca/sites/default/files/legislation/e-06-2-employment_standards_act.pdf)                                                                                     |
| QC      | 8   | [Jours fériés, chômés et payés](https://www2.gouv.qc.ca/entreprises/portail/quebec/ressourcesh?lang=fr&g=ressourcesh&sg=personnel&t=o&e=2318829344:3908165687)                                             | [Labour Standards Act](https://www.cnesst.gouv.qc.ca/en/working-conditions/leave/statutory-holidays/statutory-holidays)                                                                                               |
| SK      | 10  | [List of Saskatchewan Public Holidays](https://www.saskatchewan.ca/business/employment-standards/public-statutory-holidays/list-of-saskatchewan-public-holidays)                                           | [The Saskatchewan Employment Act](https://publications.saskatchewan.ca/#/products/70351)                                                                                                                              |
| YK      | 10  | [Find a Yukon statutory holiday](https://yukon.ca/en/doing-business/employer-responsibilities/find-yukon-statutory-holiday)                                                                                | [Employment Standards Act](http://www.gov.yk.ca/legislation/acts/emst_c.pdf)                                                                                                                                          |
