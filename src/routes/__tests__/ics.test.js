const request = require('supertest')
const db = require('sqlite')
const Promise = require('bluebird')
const app = require('../../server.js')
const { ALLOWED_YEARS } = require('../../config/vars.config')
const { getCurrentHolidayYear } = require('../../utils')

describe('Test ics responses', () => {
  const currentYear = getCurrentHolidayYear()
  const GOOD_YEARS = ALLOWED_YEARS.filter((y) => y !== currentYear)

  beforeAll(async () => {
    await Promise.resolve()
      // First, try to open the database
      .then(() => db.open('./database.sqlite', { Promise, cached: true })) // <=
      // Update db schema to the latest version using SQL-based migrations
      .then(() => db.migrate()) // <=
      // Display error message if something went wrong
      .catch((err) => console.error(err.stack)) // eslint-disable-line no-console
  })

  afterAll(() => {
    db.close()
  })

  describe('Test /ics response', () => {
    test('it should return 200', async () => {
      const response = await request(app).get('/ics')
      expect(response.statusCode).toBe(200)
    })
  })

  describe('Test /ics/federal response', () => {
    test('it should return 200', async () => {
      const response = await request(app).get('/ics/federal')
      expect(response.statusCode).toBe(200)
    })
  })

  describe('Test /ics/AB response', () => {
    test('it should return 200', async () => {
      const response = await request(app).get('/ics/AB')
      expect(response.statusCode).toBe(200)
    })
  })

  describe('Test /ics/AB/:year response', () => {
    const INVALID_YEARS = ['1', 'false', 'diplodocus']
    INVALID_YEARS.map((invalidYear) => {
      test(`it should return 404 for badly formatted year "/ics/AB/${invalidYear}"`, async () => {
        const response = await request(app).get(`/ics/AB/${invalidYear}`)
        expect(response.statusCode).toBe(404)
      })
    })

    const BAD_YEARS = ['2016', '2017', '2023', '2024']
    BAD_YEARS.map((badYear) => {
      test(`it should return 302 for unsupported year "/ics/AB/${badYear}"`, async () => {
        const response = await request(app).get(`/ics/AB/${badYear}`)
        expect(response.statusCode).toBe(302)
        expect(response.headers.location).toBe('/province/AB')
      })
    })

    test(`it should return 302 for current year "/ics/AB/${currentYear}"`, async () => {
      const response = await request(app).get(`/ics/AB/${currentYear}`)
      expect(response.statusCode).toBe(302)
      expect(response.headers.location).toBe('/ics/AB')
    })

    GOOD_YEARS.map((goodYear) => {
      test(`it should return 200 for supported year "/ics/AB/${goodYear}"`, async () => {
        const response = await request(app).get(`/ics/AB/${goodYear}`)
        expect(response.statusCode).toBe(200)
      })
    })
  })

  describe('Test /ics/fake response', () => {
    test('it should return 302', async () => {
      const response = await request(app).get('/ics/fake')
      expect(response.statusCode).toBe(302)
      expect(response.headers.location).toBe('/province/fake')
    })
  })
})
