const request = require('supertest')
const DB = require('@beenotung/better-sqlite3-helper')
const cheerio = require('cheerio')

const app = require('../../server.js')
const DBconfig = require('../../config/better-sqlite3-helper.config')
const { ALLOWED_YEARS } = require('../../config/vars.config')
const { getCurrentHolidayYear } = require('../../dates')

// The first call creates the global instance with your settings
DB(DBconfig)

describe('Test ui responses', () => {
  const currentYear = getCurrentHolidayYear()
  const nextYear = currentYear + 1
  const GOOD_YEARS = ALLOWED_YEARS.filter((y) => y !== currentYear)

  describe('Test / response', () => {
    test('it should return 200', async () => {
      const response = await request(app).get('/')
      expect(response.statusCode).toBe(200)
    })

    test('it should return the h1, title, meta tag, and canonical link', async () => {
      const response = await request(app).get('/')
      const $ = cheerio.load(response.text)
      expect($('h1').text()).toMatch(/^Canada’s next statutory holiday\u00a0is/)
      expect($('title').text()).toEqual(`Canadian statutory holidays in ${currentYear}`)
      expect($('meta[name="description"]').attr('content')).toMatch(
        /^Canada’s next stat holiday is/,
      )
      const regex = new RegExp(`See all \\d{1,2} statutory holidays in Canada in ${currentYear}`)
      expect($('meta[name="description"]').attr('content')).toMatch(regex)
      expect($('meta[name="description"]').attr('content')).toMatch(
        /^Canada’s next stat holiday is/,
      )
      expect($('link[rel="canonical"]').attr('href')).toEqual('https://canada-holidays.ca/')
    })

    test('it should return a CORS header', async () => {
      const response = await request(app).get('/')
      expect(response.headers['access-control-allow-origin']).toEqual('*')
    })
  })

  describe('Test /:year responses', () => {
    test(`it should return the h1, title, meta tag, and canonical link for ${nextYear}`, async () => {
      const response = await request(app).get(`/${nextYear}`)
      const $ = cheerio.load(response.text)
      expect($('h1').text()).toEqual(`Canadastatutory Holidays in ${nextYear}`)
      expect($('title').text()).toEqual(`Canadian statutory holidays in ${nextYear}`)
      const regex = new RegExp(`See all \\d{1,2} statutory holidays in Canada in ${nextYear}`)
      expect($('meta[name="description"]').attr('content')).toMatch(regex)
      expect($('link[rel="canonical"]').attr('href')).toEqual(
        `https://canada-holidays.ca/${nextYear}`,
      )
    })
  })

  describe('Test /provinces responses', () => {
    describe('Test /provinces GET response', () => {
      test('it should return 200', async () => {
        const response = await request(app).get('/provinces')
        expect(response.statusCode).toBe(200)
      })

      test('it should return the h1, title, meta tag, and canonical link', async () => {
        const response = await request(app).get('/provinces')
        const $ = cheerio.load(response.text)
        expect($('h1').text()).toEqual('All regions in Canada')
        expect($('title').text()).toEqual('All regions in Canada — Canada Holidays')
        expect($('meta[name="description"]').attr('content')).toEqual(
          'Upcoming stat holidays for all regions in Canada.',
        )
        expect($('link[rel="canonical"]').attr('href')).toEqual(
          'https://canada-holidays.ca/provinces',
        )
      })
    })

    describe('Test /provinces POST response', () => {
      test('it should return 302 to / for no params', async () => {
        const response = await request(app).post('/provinces')
        expect(response.statusCode).toBe(302)
        expect(response.headers.location).toBe('/')
      })

      describe('for param "region"', () => {
        test('it should return 302 to /federal for "federal"', async () => {
          const response = await request(app).post('/provinces').send({ region: 'federal' })
          expect(response.statusCode).toBe(302)
          expect(response.headers.location).toBe('/federal')
        })

        test('it should return 302 to /provinces/:id for a good param', async () => {
          const response = await request(app).post('/provinces').send({ region: 'AB' })
          expect(response.statusCode).toBe(302)
          expect(response.headers.location).toBe('/provinces/AB')
        })

        const params = [
          { region: 'AB', url: '/provinces/AB' },
          { region: 'ab', url: '/provinces/AB' },
          { region: 'Alberta', url: '/provinces/AL' },
          { region: 'a', url: '/provinces/A' },
          { region: '<script>', url: '/provinces/%3CS' },
          { region: 'https://evil.org', url: '/provinces/HT' },
          { region: 'false', url: '/provinces/FA' },
          { region: '1', url: '/provinces/1' },
        ]
        params.map((p) => {
          test(`it should return 302 to ${p.url} uppercased for param: '${p.region}'`, async () => {
            const response = await request(app).post('/provinces').send({ region: p.region })
            expect(response.statusCode).toBe(302)
            expect(response.headers.location).toBe(p.url)
          })
        })
      })

      describe('for param "year"', () => {
        test('it should return no year path for current year', async () => {
          const response = await request(app).post('/provinces').send({ year: currentYear })
          expect(response.statusCode).toBe(302)
          expect(response.headers.location).toBe('/')
        })

        GOOD_YEARS.map((year) => {
          test(`it should return a year path for a good year: "${year}`, async () => {
            const response = await request(app).post('/provinces').send({ year })
            expect(response.statusCode).toBe(302)
            expect(response.headers.location).toBe(`/${year}`)
          })
        })

        const BAD_YEARS = ['2013', '2014', '2032', '2033', '1', 'false', 'diplodocus']
        BAD_YEARS.map((badYear) => {
          test(`it should return no year path for an invalid year: "${badYear}`, async () => {
            const response = await request(app).post('/provinces').send({ badYear })
            expect(response.statusCode).toBe(302)
            expect(response.headers.location).toBe('/')
          })
        })

        describe('for param "region" AND param "year"', () => {
          const params = [
            { region: 'AB', year: '1000', url: '/provinces/AB' },
            { region: 'federal', year: '1000', url: '/federal' },
            { region: '', year: '1000', url: '/' },
            { region: 'AB', year: nextYear, url: `/provinces/AB/${nextYear}` },
            { region: 'federal', year: nextYear, url: `/federal/${nextYear}` },
            { region: '', year: nextYear, url: `/${nextYear}` },
            { region: 'AB', year: currentYear, url: '/provinces/AB' },
            { region: 'federal', year: currentYear, url: '/federal' },
            { region: '', year: currentYear, url: '/' },
          ]
          params.map((p) => {
            test(`it should return 302 to ${p.url} for params: region:'${p.region}' year:'${p.year}'`, async () => {
              const response = await request(app)
                .post('/provinces')
                .send({ region: p.region, year: p.year })
              expect(response.statusCode).toBe(302)
              expect(response.headers.location).toBe(p.url)
            })
          })
        })
      })
    })
  })

  describe('Test /provinces/:provinceId responses', () => {
    describe('for a good provinceId', () => {
      test('it should return 200', async () => {
        const response = await request(app).get('/provinces/MB')
        expect(response.statusCode).toBe(200)
      })

      test('it should return the h1, title, meta tag, and canonical response', async () => {
        const currentYearMB = getCurrentHolidayYear('MB')
        const response = await request(app).get('/provinces/MB')
        const $ = cheerio.load(response.text)
        expect($('h1').text()).toMatch(/^Manitoba’s next (?:statutory\s)*holiday\u00a0is/)
        expect($('title').text()).toEqual(
          `Manitoba (MB) statutory holidays in ${currentYearMB} — Canada Holidays`,
        )
        expect($('meta[name="description"]').attr('content')).toMatch(
          /^Manitoba’s next stat holiday is/,
        )
        const regex = new RegExp(
          `See all \\d{1,2} statutory holidays in Manitoba, Canada in ${currentYearMB}`,
        )
        expect($('meta[name="description"]').attr('content')).toMatch(regex)
        expect($('link[rel="canonical"]').attr('href')).toEqual(
          'https://canada-holidays.ca/provinces/MB',
        )
      })

      test('it should return 302 for a lowercased provinceId', async () => {
        const response = await request(app).get('/provinces/mb')
        expect(response.statusCode).toBe(302)
        expect(response.headers.location).toEqual('/provinces/MB')
      })
    })

    describe('Test /provinces/PEI response', () => {
      test('it should return 301', async () => {
        const response = await request(app).get('/provinces/PEI')
        expect(response.statusCode).toBe(301)
        expect(response.headers.location).toEqual('/provinces/PE')
      })

      test('it should return 301 for lowercased provinceId', async () => {
        const response = await request(app).get('/provinces/pei')
        expect(response.statusCode).toBe(301)
        expect(response.headers.location).toEqual('/provinces/PE')
      })

      test('it should return 301 with the year included', async () => {
        const response = await request(app).get('/provinces/PEI/2022')
        expect(response.statusCode).toBe(301)
        expect(response.headers.location).toEqual('/provinces/PE/2022')
      })
    })

    describe('Test /provinces/QB response', () => {
      test('it should return 301', async () => {
        const response = await request(app).get('/provinces/QB')
        expect(response.statusCode).toBe(301)
        expect(response.headers.location).toEqual('/provinces/QC')
      })

      test('it should return 301 for lowercased provinceId', async () => {
        const response = await request(app).get('/provinces/qb')
        expect(response.statusCode).toBe(301)
        expect(response.headers.location).toEqual('/provinces/QC')
      })

      test('it should return 301 with the year included', async () => {
        const response = await request(app).get('/provinces/QB/2022')
        expect(response.statusCode).toBe(301)
        expect(response.headers.location).toEqual('/provinces/QC/2022')
      })
    })

    describe('Test /provinces/:provinceId/:year responses', () => {
      const nextYearMB = getCurrentHolidayYear('MB') + 1

      test('it should return the h1, title, meta tag, and canonical link for MB next year', async () => {
        const response = await request(app).get(`/provinces/MB/${nextYearMB}`)
        const $ = cheerio.load(response.text)
        expect($('h1').text()).toEqual(`Manitobastatutory Holidays in ${nextYearMB}`)
        expect($('title').text()).toEqual(
          `Manitoba (MB) statutory holidays in ${nextYearMB} — Canada Holidays`,
        )
        const regex = new RegExp(
          `See all \\d{1,2} statutory holidays in Manitoba, Canada in ${nextYearMB}`,
        )
        expect($('meta[name="description"]').attr('content')).toMatch(regex)
        expect($('link[rel="canonical"]').attr('href')).toEqual(
          `https://canada-holidays.ca/provinces/MB/${nextYearMB}`,
        )
      })

      test('it should return 302 for a lowercased provinceId', async () => {
        const response = await request(app).get(`/provinces/mb/${nextYearMB}`)
        expect(response.statusCode).toBe(302)
        expect(response.headers.location).toEqual(`/provinces/MB/${nextYearMB}`)
      })
    })

    describe('Test /federal responses', () => {
      test('it should return 200', async () => {
        const response = await request(app).get('/federal')
        expect(response.statusCode).toBe(200)
      })

      test('it should return the h1, title, meta tag, and canonical link', async () => {
        const response = await request(app).get('/federal')
        const $ = cheerio.load(response.text)
        expect($('h1').text()).toMatch(/^Canada’s next federal statutory holiday\u00a0is/)
        expect($('title').text()).toEqual(`Federal statutory holidays in Canada in ${currentYear}`)
        expect($('meta[name="description"]').attr('content')).toMatch(
          /^Canada’s next federal stat holiday is/,
        )
        expect($('link[rel="canonical"]').attr('href')).toEqual(
          'https://canada-holidays.ca/federal',
        )
      })
    })

    describe('Test /federal/:year responses', () => {
      test('it should return the h1, title, meta tag, and canonical link for federal hols in 2021', async () => {
        const response = await request(app).get(`/federal/${nextYear}`)
        const $ = cheerio.load(response.text)
        expect($('h1').text()).toEqual(`CanadaFederal statutory holidays in ${nextYear}`)
        expect($('title').text()).toEqual(`Federal statutory holidays in Canada in ${nextYear}`)
        const regex = new RegExp(
          `See all \\d{1,2} federal statutory holidays in Canada in ${nextYear}`,
        )
        expect($('meta[name="description"]').attr('content')).toMatch(regex)
        expect($('link[rel="canonical"]').attr('href')).toEqual(
          `https://canada-holidays.ca/federal/${nextYear}`,
        )
      })
    })

    describe('Test /*/:year responses', () => {
      const URLS = ['', '/federal', '/provinces/ON']
      URLS.map((url) => {
        describe('for a good year', () => {
          GOOD_YEARS.map((year) => {
            test(`it should return 200 for url: "${url}" and year: "${year}"`, async () => {
              const response = await request(app).get(`${url}/${year}`)
              expect(response.statusCode).toBe(200)
            })
          })

          test(`it should return 302 to the province page for url: "${url}" and current year: "${currentYear}"`, async () => {
            const response = await request(app).get(`${url}/${currentYear}`)
            expect(response.statusCode).toBe(200)

            const $ = cheerio.load(response.text)
            expect($('link[rel="canonical"]').attr('href')).toEqual(
              `https://canada-holidays.ca${url || '/'}`,
            )
          })
        })

        describe('for an invalid year', () => {
          test('it should return a 400 along with the h1, title, meta tag, and canonical link', async () => {
            const response = await request(app).get(`${url}/1000`)
            const $ = cheerio.load(response.text)
            expect($('h1').text()).toEqual('400')
            expect($('p').text()).toMatch(
              `Error: No holidays for the year “1000”. Accepted years are: [${ALLOWED_YEARS.join(
                ', ',
              )}].`,
            )
            expect($('title').text()).toEqual('Error: 400 — Canada Holidays')
            expect($('meta[name="description"]').attr('content')).toEqual(
              'Error: No holidays for the year “1000”',
            )
            expect($('link[rel="canonical"]').length).toBe(0)
          })

          const INVALID_VALUES = [-1, 0, 1, 'pterodactyl']
          INVALID_VALUES.map((invalidValue) => {
            test(`it should return 400 for url: "${url}" and year: "${invalidValue}"`, async () => {
              const response = await request(app).get(`${url}/${invalidValue}`)
              expect(response.statusCode).toBe(404)
            })
          })

          const BAD_YEARS = [2012, 2013, 2034, 2035]
          BAD_YEARS.map((invalidYear) => {
            test(`it should return 400 for url: "${url}" and year: "${invalidYear}"`, async () => {
              const response = await request(app).get(`${url}/${invalidYear}`)
              expect(response.statusCode).toBe(400)
            })
          })
        })

        describe('with "year" query params', () => {
          const INVALID_YEARS = [-1, 0, 1, 2013, 2034, 'pterodactyl']
          INVALID_YEARS.map((invalidYear) => {
            test(`it should return 200 for url: "${url}" and a bad query param: "${invalidYear}"`, async () => {
              const response = await request(app).get(`${url}?year=${invalidYear}`)
              expect(response.statusCode).toBe(200)
              const $ = cheerio.load(response.text)
              expect($('h1').text()).toMatch(
                /^(Ontario|Canada)’s next (?:federal\s)*(?:statutory\s)*holiday/,
              )
            })
          })

          test(`it should return 200 for url: "${url}" and current year query param: "${currentYear}"`, async () => {
            const response = await request(app).get(`${url}?year=${currentYear}`)
            expect(response.statusCode).toBe(200)
            const $ = cheerio.load(response.text)
            expect($('h1').text()).toMatch(
              /^(Ontario|Canada)’s next (?:federal\s)*(?:statutory\s)*holiday/,
            )
          })

          GOOD_YEARS.map((year) => {
            test(`it should return 302 for url: "${url}" and other allowed years: "${year}"`, async () => {
              const response = await request(app).get(`${url}?year=${year}`)
              expect(response.statusCode).toBe(302)
              expect(response.headers.location).toEqual(`${url}/${year}`)
            })
          })
        })
      })
    })

    describe('Test /about response', () => {
      test('it should return 200', async () => {
        const response = await request(app).get('/about')
        expect(response.statusCode).toBe(200)
      })

      test('it should return the h1, title, meta tag, and canonical link', async () => {
        const response = await request(app).get('/about')
        const $ = cheerio.load(response.text)
        expect($('h1').text()).toEqual('About')
        expect($('title').text()).toEqual('About — Canada Holidays')
        expect($('meta[name="description"]').attr('content')).toEqual(
          'Check my sources, use the API, get in touch, etc.',
        )
        expect($('link[rel="canonical"]').attr('href')).toEqual('https://canada-holidays.ca/about')
      })
    })

    describe('Test /feedback response', () => {
      test('it should return 200', async () => {
        const response = await request(app).get('/feedback')
        expect(response.statusCode).toBe(200)
      })

      test('it should return the h1, title, meta tag, and canonical link', async () => {
        const response = await request(app).get('/feedback')
        const $ = cheerio.load(response.text)
        expect($('h1').text()).toEqual('Feedback')
        expect($('title').text()).toEqual('Feedback — Canada Holidays')
        expect($('meta[name="description"]').attr('content')).toEqual(
          'Reprt a problem, tell me I’m cool, or let’s just chat even.',
        )
        expect($('link[rel="canonical"]').attr('href')).toEqual(
          'https://canada-holidays.ca/feedback',
        )
      })
    })

    describe('Test /sources response', () => {
      test('it should return 200', async () => {
        const response = await request(app).get('/sources')
        expect(response.statusCode).toBe(200)
      })

      test('it should return the h1, title, meta tag, and canonical link', async () => {
        const response = await request(app).get('/sources')
        const $ = cheerio.load(response.text)
        expect($('h1').text()).toEqual('All sources')
        expect($('title').text()).toEqual('All sources — Canada Holidays')
        expect($('meta[name="description"]').attr('content')).toEqual(
          'Aggregated sources for Canadian statutory holidays. Canada’s holidays vary by region and industry, so here they are collected in one place.',
        )
        expect($('link[rel="canonical"]').attr('href')).toEqual(
          'https://canada-holidays.ca/sources',
        )
      })
    })

    describe('Test /add-holidays-to-calendar response', () => {
      test('it should return 200', async () => {
        const response = await request(app).get('/add-holidays-to-calendar')
        expect(response.statusCode).toBe(200)
      })

      test('it should return the h1, title, meta tag, and canonical link', async () => {
        const response = await request(app).get('/add-holidays-to-calendar')
        const $ = cheerio.load(response.text)
        expect($('h1').text()).toEqual('Add Canadian holidays to your calendar')
        expect($('title').text()).toEqual(
          'Add Canadian holidays to your calendar — Canada Holidays',
        )
        expect($('meta[name="description"]').attr('content')).toEqual(
          'Stream or download Canadian holidays and import them to your Outlook, iCal, or Google Calendar. Add all Canadian statutory holidays or just for your region.',
        )
        expect($('link[rel="canonical"]').attr('href')).toEqual(
          'https://canada-holidays.ca/add-holidays-to-calendar',
        )
      })
    })

    describe('Test /do-federal-holidays-apply-to-me response', () => {
      test('it should return 200', async () => {
        const response = await request(app).get('/do-federal-holidays-apply-to-me')
        expect(response.statusCode).toBe(200)
      })

      test('it should return the h1, title, meta tag, and canonical link', async () => {
        const response = await request(app).get('/do-federal-holidays-apply-to-me')
        const $ = cheerio.load(response.text)
        expect($('h1').text()).toEqual('Do federal holidays apply to me?')
        expect($('title').text()).toEqual('Do federal holidays apply to me? — Canada Holidays')
        expect($('meta[name="description"]').attr('content')).toEqual(
          'How to tell if you get federal holidays or provincial holidays in Canada.',
        )
        expect($('link[rel="canonical"]').attr('href')).toEqual(
          'https://canada-holidays.ca/do-federal-holidays-apply-to-me',
        )
      })
    })

    describe('Test /optional-holidays-in-canada response', () => {
      test('it should return 200', async () => {
        const response = await request(app).get('/optional-holidays-in-canada')
        expect(response.statusCode).toBe(200)
      })

      test('it should return the h1, title, meta tag, and canonical link', async () => {
        const response = await request(app).get('/optional-holidays-in-canada')
        const $ = cheerio.load(response.text)
        expect($('h1').text()).toEqual('Optional holidays in Canada')
        expect($('title').text()).toEqual('Optional holidays in Canada — Canada Holidays')
        expect($('meta[name="description"]').attr('content')).toEqual(
          'Optional holidays are commonly observed but not legally mandated. Your workplace may observe optional holidays.',
        )
        expect($('link[rel="canonical"]').attr('href')).toEqual(
          'https://canada-holidays.ca/optional-holidays-in-canada',
        )
      })
    })

    describe('for a bad province ID', () => {
      test('it should return 404', async () => {
        const response = await request(app).get('/allosaurus')
        expect(response.statusCode).toBe(404)
      })

      const yearPaths = ['', '/2021', '/1000']
      yearPaths.map((yearPath) => {
        test(`${
          !yearPath
            ? ''
            : yearPath.startsWith('/1')
            ? `and an invalid year ("${yearPath}") `
            : `and a good year ("${yearPath}") `
        }it should return the h1, title, and meta tag`, async () => {
          const response = await request(app).get(`/provinces/pangea${yearPath}`)
          const $ = cheerio.load(response.text)
          expect($('h1').text()).toEqual('400')
          expect($('p').text()).toEqual(
            'Error: No province with id “pangea”. Accepted province IDs are: [AB, BC, MB, NB, NL, NS, NT, NU, ON, PE, QC, SK, YT].',
          )
          expect($('title').text()).toEqual('Error: 400 — Canada Holidays')
          expect($('meta[name="description"]').attr('content')).toEqual(
            'Error: No province with id “pangea”',
          )
          expect($('link[rel="canonical"]').length).toBe(0)
        })
      })
      test('it should return the h1, title, and meta tag', async () => {
        const response = await request(app).get('/provinces/pangea')
        const $ = cheerio.load(response.text)
        expect($('h1').text()).toEqual('400')
        expect($('p').text()).toEqual(
          'Error: No province with id “pangea”. Accepted province IDs are: [AB, BC, MB, NB, NL, NS, NT, NU, ON, PE, QC, SK, YT].',
        )
        expect($('title').text()).toEqual('Error: 400 — Canada Holidays')
        expect($('meta[name="description"]').attr('content')).toEqual(
          'Error: No province with id “pangea”',
        )
        expect($('link[rel="canonical"]').length).toBe(0)
      })
    })
  })

  describe('Test 404 responses', () => {
    test('it should return 404', async () => {
      const response = await request(app).get('/allosaurus')
      expect(response.statusCode).toBe(404)
    })

    test('it should return the h1, title, and meta tag', async () => {
      const response = await request(app).get('/allosaurus')
      const $ = cheerio.load(response.text)
      expect($('h1').text()).toEqual('404')
      expect($('title').text()).toEqual('Error: 404 — Canada Holidays')
      expect($('meta[name="description"]').attr('content')).toEqual('Oopsie daisy')
      expect($('link[rel="canonical"]').length).toBe(0)
    })
  })

  describe('Test for external source links', () => {
    const sourceURLs = [
      '/',
      `/${nextYear}`,
      '/federal',
      `/federal/${nextYear}`,
      '/provinces/AB',
      `/provinces/AB/${nextYear}`,
    ]
    sourceURLs.map((url) => {
      test(`should return an external source for "${url}"`, async () => {
        const response = await request(app).get(url)
        const $ = cheerio.load(response.text)
        expect($('.bottom-link__container.with-source').length).toBe(1)
      })
    })
  })
})

describe('Test /province responses', () => {
  describe('Test /province GET response', () => {
    test('it should return 301', async () => {
      const response = await request(app).get('/province')
      expect(response.statusCode).toBe(301)
      expect(response.headers.location).toBe('/provinces')
    })
  })

  // should be enough
  const provinceIds = ['AB', 'BC', 'MB', 'NB', 'QC', 'YT']

  provinceIds.map((provinceId) => {
    describe(`Test /province/${provinceId} GET response`, () => {
      test('it should return 301', async () => {
        const response = await request(app).get(`/province/${provinceId}`)
        expect(response.statusCode).toBe(301)
        expect(response.headers.location).toBe(`/provinces/${provinceId}`)
      })
    })

    describe(`Test /province/${provinceId}/:year GET response`, () => {
      test('it should return 301', async () => {
        const response = await request(app).get(`/province/${provinceId}/2020`)
        expect(response.statusCode).toBe(301)
        expect(response.headers.location).toBe(`/provinces/${provinceId}/2020`)
      })
    })
  })
})
