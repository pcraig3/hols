const request = require('supertest')
const { initDB, getDB } = require('../../db.js')
const Promise = require('bluebird')
const app = require('../../server.js')
const { ALLOWED_YEARS } = require('../../config/vars.config')

describe('Test ics responses', () => {
  beforeAll(async () => {
    await Promise.resolve()
      // First, try to open the database
      .then(() => initDB())
      // Display error message if something went wrong
      .catch((err) => console.error(err.stack)) // eslint-disable-line no-console
  })

  afterAll(() => {
    getDB().close()
  })

  const noYearURLs = ['/ics', '/ics/federal', '/ics/AB']
  noYearURLs.map((url) => {
    describe(`Test "${url}" response`, () => {
      test('it should return 301 with current year in domain', async () => {
        const response = await request(app).get(url)
        expect(response.statusCode).toBe(301)
        expect(response.headers.location).toBe(`${url}/2020`)
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

    const BAD_YEARS = ['2016', '2017', '2023', '2024']
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

      const BAD_YEARS = ['2016', '2017', '2023', '2024']
      BAD_YEARS.map((badYear) => {
        test(`it should return 302 for unsupported year "/ics/${path}/${badYear}"`, async () => {
          const response = await request(app).get(`/ics/${path}/${badYear}`)
          expect(response.statusCode).toBe(302)
          const expectedPath = path && path !== 'federal' ? `/province/${path}` : `/${path}`
          expect(response.headers.location).toBe(expectedPath)
        })
      })

      ALLOWED_YEARS.map((goodYear) => {
        test(`it should return 200 for supported year "/ics/${path}/${goodYear}"`, async () => {
          const response = await request(app).get(`/ics/${path}/${goodYear}`)
          expect(response.statusCode).toBe(200)
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
