const request = require('supertest')
const DB = require('@beenotung/better-sqlite3-helper')

const app = require('../../server.js')
const DBconfig = require('../../config/better-sqlite3-helper.config')
const { ALLOWED_YEARS } = require('../../config/vars.config')
const { getCurrentHolidayYear } = require('../../dates')

// The first call creates the global instance with your settings
DB(DBconfig)

describe('Test ics responses', () => {
  const currentYear = getCurrentHolidayYear()
  const realDateNow = Date.now

  afterEach(() => {
    Date.now = realDateNow
  })

  const mockDate = (dateString) => {
    Date.now = () => new Date(dateString).getTime()
  }

  const getICSYears = (ics) => {
    return [
      ...new Set(
        [...ics.matchAll(/DTSTART;VALUE=DATE:(\d{4})\d{4}/g)].map((match) =>
          parseInt(match[1]),
        ),
      ),
    ]
  }

  const noYearPaths = ['', '/federal', '/AB']
  noYearPaths.map((path) => {
    describe(`Test "/ics${path}" response`, () => {
      test('it should return holidays for the current and following year', async () => {
        mockDate(`${currentYear}-01-01`)
        const response = await request(app).get(`/ics${path}`)

        expect(response.statusCode).toBe(200)
        expect(response.headers['content-disposition']).toBeUndefined()
        expect(getICSYears(response.text)).toEqual([currentYear, currentYear + 1])
      })

      test('it should return a content-disposition header', async () => {
        mockDate(`${currentYear}-01-01`)
        const response = await request(app).get(`/ics${path}?cd=true`)
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-disposition']).toEqual(
          `attachment; filename=canada-holidays-${path ? `${path.substring(1)}-` : ''
          }${currentYear}-${currentYear + 1}.ics`,
        )
      })
    })
  })

  describe('Test /ics/:year response', () => {
    const INVALID_YEARS = ['1', 'false', 'diplodocus']
    INVALID_YEARS.map((invalidYear) => {
      test(`it should return 404 for badly formatted year "/ics/${invalidYear}"`, async () => {
        const response = await request(app).get(`/ics/${invalidYear}`)
        expect(response.statusCode).toBe(404)
      })
    })

    const BAD_YEARS = ['2012', '2039']
    BAD_YEARS.map((badYear) => {
      test(`it should return 302 for unsupported year "/ics/${badYear}"`, async () => {
        const response = await request(app).get(`/ics/${badYear}`)
        expect(response.statusCode).toBe(302)
        expect(response.headers.location).toBe('/')
      })
    })

    ALLOWED_YEARS.map((goodYear) => {
      test(`it should return 200 for supported year "/ics/${goodYear}"`, async () => {
        const response = await request(app).get(`/ics/${goodYear}`)

        expect(response.statusCode).toBe(200)
        expect(response.headers['content-disposition']).toBeUndefined()
        expect(getICSYears(response.text)).toEqual([goodYear])
      })

      test(`it should return a content-disposition header for "/ics/${goodYear}?cd=true"`, async () => {
        const response = await request(app).get(`/ics/${goodYear}?cd=true`)
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-disposition']).toEqual(
          `attachment; filename=canada-holidays-${goodYear}.ics`,
        )
      })
    })
  })

  describe('Test /ics/*/:year response', () => {
    const paths = ['AB', 'federal']
    paths.map((path) => {
      const INVALID_YEARS = ['1', 'false', 'diplodocus']
      INVALID_YEARS.map((invalidYear) => {
        test(`it should return 404 for badly formatted year "/ics/${path}/${invalidYear}"`, async () => {
          const response = await request(app).get(`/ics/${path}/${invalidYear}`)
          expect(response.statusCode).toBe(404)
        })
      })

      const BAD_YEARS = ['2012', '2039']
      BAD_YEARS.map((badYear) => {
        test(`it should return 302 for unsupported year "/ics/${path}/${badYear}"`, async () => {
          const response = await request(app).get(`/ics/${path}/${badYear}`)
          expect(response.statusCode).toBe(302)
          const expectedPath = path && path !== 'federal' ? `/provinces/${path}` : `/${path}`
          expect(response.headers.location).toBe(expectedPath)
        })
      })

      const goodYear = currentYear
      test(`it should return 200 for supported year "/ics/${path}/${goodYear}"`, async () => {
        const response = await request(app).get(`/ics/${path}/${goodYear}`)

        expect(response.statusCode).toBe(200)
        expect(response.headers['content-disposition']).toBeUndefined()
        expect(getICSYears(response.text)).toEqual([goodYear])
      })

      test(`it should return a content-disposition header for "/ics/${path}/${goodYear}?cd=true"`, async () => {
        const response = await request(app).get(`/ics/${path}/${goodYear}?cd=true`)
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-disposition']).toEqual(
          `attachment; filename=canada-holidays-${path}-${goodYear}.ics`,
        )
      })
    })
  })

  describe('Test ICS year query parameter', () => {
    const year = 2027
    const prefixes = ['', '/en', '/fr']
    const paths = ['', '/ON', '/federal']

    // Ignore timestamps generated separately for each request.
    const stableICS = (text) => text.replace(/^DTSTAMP:.*\r?\n/gm, '')

    const routes = prefixes.flatMap((prefix) =>
      paths.map((path) => `${prefix}/ics${path}`),
    )

    test.each(routes)('%s?year=2027 matches the explicit-year route', async (route) => {
      const queryResponse = await request(app).get(`${route}?year=${year}`)
      const pathResponse = await request(app).get(`${route}/${year}`)

      expect(queryResponse.statusCode).toBe(200)
      expect(pathResponse.statusCode).toBe(200)

      // The query parameter returns one year, not the default two.
      expect(getICSYears(queryResponse.text)).toEqual([year])

      // Events, translations, dates, and UIDs must match exactly.
      expect(stableICS(queryResponse.text)).toBe(stableICS(pathResponse.text))
    })

    test.each(prefixes)('explicit year takes precedence over query year under "%s"', async (prefix) => {
      const response = await request(app).get(`${prefix}/ics/ON/2027?year=2026`)

      expect(response.statusCode).toBe(200)
      expect(getICSYears(response.text)).toEqual([2027])
    })

    test.each(prefixes)('year query produces the correct download filename under "%s"', async (prefix) => {
      const queryResponse = await request(app).get(
        `${prefix}/ics/ON?year=2027&cd=true`,
      )
      const pathResponse = await request(app).get(
        `${prefix}/ics/ON/2027?cd=true`,
      )

      expect(queryResponse.statusCode).toBe(200)
      expect(pathResponse.statusCode).toBe(200)
      expect(queryResponse.headers['content-disposition']).toBe(
        pathResponse.headers['content-disposition'],
      )
    })
  })

  describe('Test /ics/:provinceId response', () => {
    test('it should accept lowercase province IDs', async () => {
      const response = await request(app).get('/ics/ab')
      expect(response.statusCode).toBe(200)
    })

    test('it should redirect an unsupported two-letter province ID', async () => {
      const response = await request(app).get('/ics/BA')
      expect(response.statusCode).toBe(302)
      expect(response.headers.location).toBe('/provinces/BA')
    })

    const INVALID_PROVINCE_IDS = ['A1', 'A_']

    INVALID_PROVINCE_IDS.map((provinceId) => {
      test(`it should return 404 for badly formatted province ID "/ics/${provinceId}"`, async () => {
        const response = await request(app).get(`/ics/${provinceId}`)
        expect(response.statusCode).toBe(404)
      })
    })
  })

  test('it should return 404 for a badly formatted province ID with a year', async () => {
    const response = await request(app).get(`/ics/A1/${ALLOWED_YEARS[0]}`)
    expect(response.statusCode).toBe(404)
  })

  describe('Test English ICS alias', () => {
    const paths = ['', '/ON', '/federal', '/2027', '/ON/2027', '/federal/2027']

    // Generated timestamps may differ between requests.
    const stableICS = (icsText) => icsText.replace(/^DTSTAMP:.*\r?\n/gm, '')

    test.each(paths)('/en/ics%s matches the existing English route', async (path) => {
      const legacy = await request(app).get(`/ics${path}`)
      const english = await request(app).get(`/en/ics${path}`)

      expect(legacy.statusCode).toBe(200)
      expect(english.statusCode).toBe(200)
      expect(stableICS(english.text)).toEqual(stableICS(legacy.text))
    })
  })

  describe('Test French ICS routes', () => {
    const paths = ['', '/ON', '/federal', '/2027', '/ON/2027', '/federal/2027']

    const getICSField = (text, field) =>
      text.split(/\r?\n/).filter((line) => line.startsWith(`${field}:`))

    test.each(paths)('/fr/ics%s preserves event identities and dates', async (path) => {
      const english = await request(app).get(`/ics${path}`)
      const french = await request(app).get(`/fr/ics${path}`)

      expect(english.statusCode).toBe(200)
      expect(french.statusCode).toBe(200)
      expect(french.headers['content-type']).toMatch(/^text\/calendar/)
      expect(french.headers['content-disposition']).toBeUndefined()

      expect(french.text).toContain('PRODID:-//pcraig3//hols//FR')

      // Translations must never change event identity or dates.
      for (const field of ['UID', 'DTSTART;VALUE=DATE', 'DTEND;VALUE=DATE']) {
        expect(getICSField(french.text, field)).toEqual(
          getICSField(english.text, field),
        )
      }

      expect(getICSYears(french.text)).toEqual(getICSYears(english.text))
    })

    test('Canada-wide calendar contains French holiday names', async () => {
      const response = await request(app).get('/fr/ics/2027')

      expect(response.statusCode).toBe(200)
      expect(response.text).toContain('SUMMARY:Jour de l’An')
      expect(response.text).toContain('DESCRIPTION:Jour férié national')
    })

    test('Federal calendar contains French holiday names', async () => {
      const response = await request(app).get('/fr/ics/federal/2027')

      expect(response.statusCode).toBe(200)
      expect(response.text).toContain('SUMMARY:Noël')
    })

    test('Provincial calendar contains French holiday names', async () => {
      const response = await request(app).get('/fr/ics/BC/2027')

      expect(response.statusCode).toBe(200)
      expect(response.text).toContain('SUMMARY:Jour de Colombie-Britannique')
      expect(response.text).toContain('DESCRIPTION:Observé')
    })
    
    test.each([
      '',
      '/ON',
      '/federal',
      '/2027',
      '/ON/2027',
      '/federal/2027',
    ])('adds -fr to French download filenames for /ics%s', async (path) => {
      const english = await request(app).get(`/ics${path}?cd=true`)
      const englishAlias = await request(app).get(`/en/ics${path}?cd=true`)
      const french = await request(app).get(`/fr/ics${path}?cd=true`)

      expect(english.statusCode).toBe(200)
      expect(englishAlias.statusCode).toBe(200)
      expect(french.statusCode).toBe(200)

      const englishFilename = english.headers['content-disposition']

      // Existing English filenames must remain unchanged.
      expect(englishAlias.headers['content-disposition']).toBe(englishFilename)

      // French filenames get a suffix immediately before .ics.
      expect(french.headers['content-disposition']).toBe(
        englishFilename.replace(/\.ics$/, '-fr.ics'),
      )
    })

    test.each(['', '/ON', '/federal'])(
      'does not add a download header to subscription feeds for /ics%s',
      async (path) => {
        for (const prefix of ['', '/en', '/fr']) {
          const response = await request(app).get(`${prefix}/ics${path}`)

          expect(response.statusCode).toBe(200)
          expect(response.headers['content-disposition']).toBeUndefined()
        }
      },
    )
  })

  describe('Test ICS observed-date descriptions', () => {
    // Remove ICS line folding before checking event text.
    const unfoldICS = (text) => text.replace(/\r?\n[ \t]/g, '')

    test.each([
      ['/ics/ON/2020', 'Boxing Day', 'Observed: Monday\\, December 28\\, 2020'],
      ['/en/ics/ON/2020', 'Boxing Day', 'Observed: Monday\\, December 28\\, 2020'],
      ['/fr/ics/ON/2020', 'Lendemain de Noël', 'Observé le lundi 28 décembre 2020.'],
    ])('includes the observed date in %s', async (path, title, note) => {
      const response = await request(app).get(path)

      expect(response.statusCode).toBe(200)

      const event = unfoldICS(response.text)
        .split('BEGIN:VEVENT')
        .find((section) => section.includes(`SUMMARY:${title}`))

      expect(event).toBeDefined()
      expect(event).toContain(note)
      expect(event).toContain('DESCRIPTION:')
    })
  })

  describe('Test /ics/fake response', () => {
    test('it should return 404', async () => {
      const response = await request(app).get('/ics/fake')
      expect(response.statusCode).toBe(404)
    })
  })
})
