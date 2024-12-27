# Canada Holidays API

The <a href="https://canada-holidays.ca/api/v1/" target="_blank">Canada Holidays API</a> lists all 31 public holidays for all 13 provinces and territories in Canada, including federal holidays.

**👉 <a href="https://canada-holidays.ca/api/v1/" target="_blank">https://canada-holidays.ca/api/v1/</a>**

Features:

- Returns holidays with associated regions
- Returns regions with associated holidays
- Returns only federal holidays
- Returns only national holidays
- Returns "next" holiday for each region
- Returns holidays for years: `2014`, …, `2025`, … `2033`

Plus(!) check out all these goodies you get for ✨ free ✨:

- It’s free (✨)
- <a href="https://twitter.com/pcraig3" target="_blank">Dedicated support channel</a>
- Kind of bilingual (EN & FR)
- Pretty much compliant with <a href="https://www.canada.ca/en/government/system/digital-government/modern-emerging-technologies/government-canada-standards-apis.html" target="_blank">the Government of Canada Standards on APIs</a> (heck yes 🤙)
- Open source which is cool if you’re a nerd
- Documented with an OpenAPI spec which is _even more_ cool for _even nerdier_ nerds

Definitely use it for your billions of dollars mission-critical system.

## Docs

If you know your way around a REST API with JSON responses, you’re in good shape. There's an OpenAPI spec describing the API, and a brief overview below.

### OpenAPI (formerly Swagger)

<a href="https://swagger.io/docs/specification/about/" target="_blank">The OpenAPI Specification</a> is industry standard for describing APIs. The OpenAPI spec for this API is in a few places.

- <a href="https://github.com/pcraig3/hols/blob/main/reference/Canada-Holidays-API.v1.yaml" target="_blank">`Canada-Holidays-API.v1.yaml`</a> on GitHub
- At <a href="https://canada-holidays.ca/api/v1/spec" target="_blank">https://canada-holidays.ca/api/v1/spec</a>
- <a href="https://app.swaggerhub.com/apis/pcraig3/canada-holidays/" target="_blank">`canada-holidays`</a> on SwaggerHub

The SwaggerHub link includes an API explorer so you can give it a spin before you drive it off the lot.

### Basic overview

There are 5 endpoints. All are `GET` requests. Regrettably, it’s not yet possible to `PUT` additional public holidays.

- `/api/v1`
- `/api/v1/provinces`
- `/api/v1/provinces/{provinceId}`
- `/api/v1/holidays`
- `/api/v1/holidays/{holidayId}`

Response keys never contain `null` values.

#### Query parameters

There are 2 (½) query parameters values you can use. Probably not on the root route but on others they will work.

1. `year`: Takes a single year from the following: `2014`, `2015`, `2016`, `2017`, `2018`, `2019`, `2020`, `2021`, `2022`, `2023`, `2024`, `2025`, `2026`, `2027`, `2028`, `2029`, `2030`, `2031`, `2032`, `2033`. Defaults to the current year.
   - Example: `?year=2026`
2. `federal`. `true` or `1` to return _only_ federal holidays; `false` or `0` to return _everything but_ federal holidays.
   - Example: `?federal=true`

You can combine them and they will work (eg, `/api/v1/holidays?year=2021&federal=true`).

##### 'Optional' query parameter

There is 1 optional query parameter that currently applies to Alberta, British Columbia, Manitoba, New Brunswick, Nova Scotia, Nunavut, and Ontario. <a href="https://www.alberta.ca/alberta-general-holidays.aspx#jumplinks-2" target="_blank">Alberta's official holidays page lists "optional" holidays</a>, and <a href="https://www2.gov.bc.ca/gov/content/health/practitioner-professional-resources/msp/claim-submission-payment/designated-holidays-and-close-off-dates" target="_blank">British Columbia</a>, <a href="https://www.gov.mb.ca/labour/standards/doc,gen-holidays-after-april-30-07,factsheet.html#q13" target="_blank">Manitoba</a>, <a href="https://www2.gnb.ca/content/gnb/en/departments/elg/local_government/content/governance/content/days_of_rest_act/faq.html#2" target="_blank">New Brunswick</a>, <aa href="https://novascotia.ca/lae/employmentrights/holidaychart.asp" target="_blank">Nova Scotia</a>, and <a href="https://www.ontario.ca/document/your-guide-employment-standards-act-0/public-holidays" target="_blank">Ontario</a> (ctrl+f "Remembrance Day") do something similar, so I am making them available via the API. <a href="https://gov.nu.ca/justice/news/national-day-truth-and-reconciliation" target="_blank">Nunavut has a public service holiday</a> for Truth and Reconciliation Day, so it’s basically an optional holiday (not everyone gets it).

- `optional`: `true` or `1` includes optional holidays; `false` or `0` doesn’t. By default, optional holidays are not included (equivalent to `?optional=false`).

That should be enough to get you started. Remember, the design goal here is _simple_.
