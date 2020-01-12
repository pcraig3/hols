const request = require('supertest')
const db = require('sqlite')
const Promise = require('bluebird')
const app = require('../../server.js')

describe('Test ui responses', () => {
  beforeAll(async () => {
    await Promise.resolve()
      // First, try to open the database
      .then(() => db.open('./database.sqlite', { Promise, cached: true })) // <=
      // Update db schema to the latest version using SQL-based migrations
      .then(() => db.migrate()) // <=
      // Display error message if something went wrong
      .catch(err => console.error(err.stack)) // eslint-disable-line no-console
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
})
