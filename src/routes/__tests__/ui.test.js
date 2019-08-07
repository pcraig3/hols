const request = require('supertest')
const db = require('sqlite')
const Promise = require('bluebird')
const app = require('../../server.js')
const cheerio = require('cheerio')

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

  describe('Test / responses', () => {
    test('it should return 200', async () => {
      const response = await request(app).get('/')
      expect(response.statusCode).toBe(200)
    })

    test('it should return the h1, title, and meta tag', async () => {
      const response = await request(app).get('/')
      const $ = cheerio.load(response.text)
      expect($('h1').text()).toMatch(/^Canada’s next public holiday is/)
      expect($('title').text()).toEqual('Canada’s next public holiday — Holidays Canada')
      expect($('meta[name="description"]').attr('content')).toMatch(/^Canada’s next holiday is/)
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
      expect($('title').text()).toEqual('404 — Holidays Canada')
      expect($('meta[name="description"]').attr('content')).toEqual('Public holidays in Canada')
    })
  })
})
