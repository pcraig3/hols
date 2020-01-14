# hols API

Canada has public holidays, but when are they? UK people know when [UK bank holidays](https://www.gov.uk/bank-holidays) are — Canadians who can’t yet move to Liverpool still deserve to know when they can sleep in.

This is an API that lists

- all 27 public holidays in Canada
- all 13 provinces and territories in Canada
- which provinces/territories observe which holidays
- which holidays are federal holidays
- returns holidays for years: 2019, 2020, 2021
- (TODO: more years)

I scraped the data from [the Canadian holidays page on Wikipedia](https://en.wikipedia.org/wiki/Public_holidays_in_Canada), so if you notice an issue, please edit the page yourself and then [email me](mailto:paul@pcraig3.ca) so that I know.

This is a node API, so it's pretty straightforward. Using an SQL migrations file, we put all our data into an in-memory SQLite database and then we do reads.

The [Government of Canada API guidance](https://www.canada.ca/en/government/publicservice/modernizing/government-canada-standards-apis.html) wants a slightly more rigourous API design, but "design with users" is actually the first rule and none of them have complained yet. ([Be the first](mailto:paul@pcraig3.ca)!)

## Docs

There are 5 endpoints.
All are `GET` requests.
As much as users would like to, it’s not yet possible to `PUT` additional public holidays.
None of the fields ever return `null` values.

- [`/api/v1`](https://github.com/pcraig3/hols/blob/master/API.md#apiv1--root)
- [`/api/v1/provinces`](https://github.com/pcraig3/hols/blob/master/API.md#apiv1provinces--get-all-provinces-and-territories)
- [`/api/v1/provinces/{id}`](https://github.com/pcraig3/hols/blob/master/API.md#apiv1provincesid--get-one-province-or-territory)
- [`/api/v1/holidays`](https://github.com/pcraig3/hols/blob/master/API.md#apiv1holidays--get-all-holidays)
- [`/api/v1/holidays/{id}`](https://github.com/pcraig3/hols/blob/master/API.md#v1holidaysid--get-one-holiday)

### Filters

There are 2 filter values you can use. Probably not on the root route but on others they will work.

1. `?year=2019|2020|2021`. Defaults to current year.
2. `?federal=true|false`. `true` returns only federal holidays; `false` returns _everything but_ federal holidays.

You can combine them and they will work (eg, `/api/v1/holidays?year=2021&federal=true`).

### Routes

#### `/api/v1/` → root

Returns a welcome message and links to the lists of data.

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
    }
  },
  "message": "welcome message"
}
```

</details>

#### `/api/v1/provinces` → GET all provinces and territories

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

#### `/api/v1/provinces/{id}` → GET one province or territory

Returns one province or territory in Canada by [two-letter postal abbreviations](https://en.wikipedia.org/wiki/Canadian_postal_abbreviations_for_provinces_and_territories#Names_and_abbreviations). Case insensitive. Returns [a `400` response](https://github.com/pcraig3/holidays-canada#errors) for invalid `id`s.

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

#### `/api/v1/holidays` → GET all holidays

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

#### `/v1/holidays/{id}` → GET one holiday

Returns one Canadian statutory holiday by integer id. Returns [a `404` response](https://github.com/pcraig3/holidays-canada#errors) for invalid `id`s.

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

### errors

Errors are thrown for invalid url paths or bad `id` values.

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
