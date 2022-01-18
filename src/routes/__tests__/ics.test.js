const request = require('supertest')
const DB = require('better-sqlite3-helper')

const app = require('../../server.js')
const { ALLOWED_YEARS } = require('../../config/vars.config')
const { getCurrentHolidayYear } = require('../../dates')

// The first call creates the global instance with your settings
DB({
  path: './data/sqlite3.db', // this is the default
  readonly: false, // read only
  fileMustExist: false, // throw error if database not exists
  WAL: true, // automatically enable 'PRAGMA journal_mode = WAL'
  migrate: {
    // disable completely by setting `migrate: false`
    force: 'last', // set to 'last' to automatically reapply the last migration-file
    table: 'migration', // name of the database table that is used to keep track
    migrationsPath: './migrations', // path of the migration-files
  },
})

describe('Test ics responses', () => {
  const currentYear = getCurrentHolidayYear()
  const RealDate = Date

  afterEach(() => {
    global.Date = RealDate
  })

  const mockDate = (dateString) => {
    global.Date.now = () => new Date(dateString)
  }

  const noYearPaths = ['', '/federal', '/AB']
  noYearPaths.map((path) => {
    describe(`Test "/ics${path}" response`, () => {
      test('it should return 200', async () => {
        mockDate(`${currentYear}-01-01`)
        const response = await request(app).get(`/ics${path}`)
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-disposition']).toBeUndefined()
      })

      test('it should return a content-disposition header', async () => {
        mockDate(`${currentYear}-01-01`)
        const response = await request(app).get(`/ics${path}?cd=true`)
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-disposition']).toEqual(
          `attachment; filename=canada-holidays-${
            path ? `${path.substring(1)}-` : ''
          }${currentYear}.ics`,
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

    const BAD_YEARS = ['2016', '2017', '2025', '2026']
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
      })

      test(`it should return 200 for supported year "/ics/${goodYear}"`, async () => {
        const response = await request(app).get(`/ics/${goodYear}`)
        expect(response.statusCode).toBe(200)
        expect(response.headers['content-disposition']).toBeUndefined()
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

      const BAD_YEARS = ['2016', '2017', '2025', '2026']
      BAD_YEARS.map((badYear) => {
        test(`it should return 302 for unsupported year "/ics/${path}/${badYear}"`, async () => {
          const response = await request(app).get(`/ics/${path}/${badYear}`)
          expect(response.statusCode).toBe(302)
          const expectedPath = path && path !== 'federal' ? `/provinces/${path}` : `/${path}`
          expect(response.headers.location).toBe(expectedPath)
        })
      })

      ALLOWED_YEARS.map((goodYear) => {
        test(`it should return 200 for supported year "/ics/${path}/${goodYear}"`, async () => {
          const response = await request(app).get(`/ics/${path}/${goodYear}`)
          expect(response.statusCode).toBe(200)
          expect(response.headers['content-disposition']).toBeUndefined()
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
  })

  describe('Test /ics/fake response', () => {
    test('it should return 404', async () => {
      const response = await request(app).get('/ics/fake')
      expect(response.statusCode).toBe(404)
    })
  })
})
