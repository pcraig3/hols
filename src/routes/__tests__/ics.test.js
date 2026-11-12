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

      test('it should return only one year when year is provided as a query parameter', async () => {
        const response = await request(app).get(`/ics?year=${currentYear}`)

        expect(response.statusCode).toBe(200)
        expect(getICSYears(response.text)).toEqual([currentYear])
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

    test('preserves the existing download filename until Phase 4', async () => {
      const english = await request(app).get('/ics/ON/2027?cd=true')
      const french = await request(app).get('/fr/ics/ON/2027?cd=true')

      expect(french.statusCode).toBe(200)
      expect(french.headers['content-disposition']).toBe(
        english.headers['content-disposition'],
      )
    })
  })

  describe('Test /ics/fake response', () => {
    test('it should return 404', async () => {
      const response = await request(app).get('/ics/fake')
      expect(response.statusCode).toBe(404)
    })
  })
})
