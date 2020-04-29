# Canada Holidays API

The <a href="https://canada-holidays.ca/api/v1/" target="_blank">Canada Holidays API</a> lists all 28 public holidays for all 13 provinces and territories in Canada, including federal holidays.

**👉 <a href="https://canada-holidays.ca/api/v1/" target="_blank">https://canada-holidays.ca/api/v1/</a>**

Features:

- Returns holidays with associated regions
- Returns regions with associated holidays
- Returns only federal holidays
- Returns only national holidays
- Returns "next" holiday for each region
- Returns holidays for years: `2018`, `2019`, `2020`, `2021`, `2022`

Plus(!) check out all these goodies you get for ✨ free ✨:

- It’s free (✨)
- <a href="https://twitter.com/pcraig3" target="_blank">Dedicated support channel</a>
- Kind of bilingual (EN & FR)
- Pretty much compliant with <a href="https://www.canada.ca/en/government/system/digital-government/modern-emerging-technologies/government-canada-standards-apis.html" target="_blank">the Government of Canada Standards on APIs</a> (heck yes 🤙)
- Open source which is cool if you’re a nerd
- Documented with an OpenAPI spec which is _even more_ cool for _even nerdier_ nerds

Definitely use it for your billions of dollars mission-critical system.

## Docs

If you know your way around a REST API with JSON responses, you’re in good shape. There's an OpenAPI spec describing the API, and a more prose-y overview if you keep reading. Both should be equivalent — the spec is more exact but the overview is easier to skim.

### OpenAPI (formerly Swagger)

<a href="https://swagger.io/docs/specification/about/" target="_blank">The OpenAPI Specification</a> is a broadly-adopted industry standard for describing APIs. The OpenAPI spec for this API is in a few places.

- <a href="https://github.com/pcraig3/hols/blob/master/reference/Canada-Holidays-API.v1.yaml" target="_blank">`Canada-Holidays-API.v1.yaml`</a> on GitHub
- At <a href="https://canada-holidays.ca/api/v1/spec" target="_blank">https://canada-holidays.ca/api/v1/spec</a>
- <a href="https://app.swaggerhub.com/apis/pcraig3/canada-holidays/" target="_blank">`canada-holidays`</a> on SwaggerHub

The SwaggerHub link includes an API explorer so you can give it a spin before you drive it off the lot.

### Overview

There are 5 endpoints. All are `GET` requests. As much as I know you would love to, it’s not yet possible to `PUT` additional public holidays. None of the fields ever return `null` values.

- [`/api/v1`](https://github.com/pcraig3/hols/blob/master/API.md#apiv1--root)
- [`/api/v1/provinces`](https://github.com/pcraig3/hols/blob/master/API.md#apiv1provinces--get-all-provinces-and-territories)
- [`/api/v1/provinces/{provinceId}`](https://github.com/pcraig3/hols/blob/master/API.md#apiv1provincesid--get-one-province-or-territory)
- [`/api/v1/holidays`](https://github.com/pcraig3/hols/blob/master/API.md#apiv1holidays--get-all-holidays)
- [`/api/v1/holidays/{holidayId}`](https://github.com/pcraig3/hols/blob/master/API.md#v1holidaysid--get-one-holiday)

#### Query parameters

There are 2 query parameters values you can use. Probably not on the root route but on others they will work.

1. `?year=2018|2019|2020|2021|2022`. Defaults to current year.
2. `?federal=true|1|false|0`. `true` or `1` returns only federal holidays; `false` or `0` returns _everything but_ federal holidays.

You can combine them and they will work (eg, `/api/v1/holidays?year=2021&federal=true`).

#### Routes

##### `/api/v1/` → root

Returns a welcome message and navigational links.

<details>
<summary>Example response</summary>

```json
{
  "_links": {
    "holidays": {
      "href": "url"
    },
    "self": {
      "href": "url"
    },
    "provinces": {
      "href": "url"
    },
    "spec": {
      "href": "url"
    }
  },
  "message": "welcome message"
}
```

</details>

##### `/api/v1/provinces` → GET all provinces and territories

Returns a list of provinces and territories in Canada. Each province or territory lists its associated holidays.

<details>
<summary>Example response</summary>

```json
{
  "provinces": [
    {
      "id": "AB",
      "nameEn": "Alberta",
      "nameFr": "Alberta",
      "holidays": [
        {
          "id": 1,
          "date": "2019-01-01",
          "nameEn": "New Year’s Day",
          "nameFr": "Jour de l’An",
          "federal": 1
        },
        ...
      ],
      "nextHoliday": {
        "id": 4,
        "date": "2019-02-18",
        "nameEn": "Family Day",
        "nameFr": "Fête de la famille",
        "federal": 0
      }
    },
    ...
  ]
}
```

</details>

##### `/api/v1/provinces/{provinceId}` → GET one province or territory

Returns one province or territory in Canada by [two-letter postal abbreviations](https://en.wikipedia.org/wiki/Canadian_postal_abbreviations_for_provinces_and_territories#Names_and_abbreviations). Must be uppercase. Returns [a `400` response](https://github.com/pcraig3/holidays-canada#errors) for invalid `provinceId`s.

<details>
<summary>Example response</summary>

```json
{
  "province": {
    "id": "AB",
    "nameEn": "Alberta",
    "nameFr": "Alberta",
    "holidays": [
      {
        "id": 1,
        "date": "2019-01-01",
        "nameEn": "New Year’s Day",
        "nameFr": "Jour de l’An",
        "federal": 1
      },
      ...
    ],
    "nextHoliday": {
      "id": 4,
      "date": "2019-02-18",
      "nameEn": "Family Day",
      "nameFr": "Fête de la famille",
      "federal": 0
    }
  }
}
```

</details>

##### `/api/v1/holidays` → GET all holidays

Returns a list of Canadian public holidays. Each holiday lists the regions that observe it.

<details>
<summary>Example response</summary>

```json
{
  "holidays": [
    {
      "id": 1,
      "date": "2019-01-01",
      "nameEn": "New Year’s Day",
      "nameFr": "Jour de l’An",
      "federal": 1,
      "provinces": [
        {
          "id": "AB",
          "nameEn": "Alberta",
          "nameFr": "Alberta"
        },
        ...
      ],
    },
    ...
  ]
}
```

</details>

##### `/v1/holidays/{holidayId}` → GET one holiday

Returns one Canadian statutory holiday by integer id. Returns [a `400` response](https://github.com/pcraig3/holidays-canada#errors) for invalid `holidayId`s.

<details>
<summary>Example response</summary>

```json
{
  "holiday": {
    "id": 1,
    "date": "2019-01-01",
    "nameEn": "New Year’s Day",
    "nameFr": "Jour de l’An",
    "federal": 1,
    "provinces": [
      {
        "id": "AB",
        "nameEn": "Alberta",
        "nameFr": "Alberta"
      },
      ...
    ]
  }
}
```

</details>

#### errors

Errors are returned for invalid url paths or bad `id` values.

<details>
<summary>Example response</summary>

```json
{
  "error": {
    "message": "error message",
    "status": 400,
    "timestamp": "2019-01-27T22:13:56.734Z"
  }
}
```

</details>

Easy.
