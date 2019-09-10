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

  describe('Test / response', () => {
    test('it should return 200', async () => {
      const response = await request(app).get('/')
      expect(response.statusCode).toBe(200)
    })

    test('it should return the h1, title, and meta tag', async () => {
      const response = await request(app).get('/')
      const $ = cheerio.load(response.text)
      expect($('h1').text()).toMatch(/^Canada’s next statutory holiday is/)
      expect($('title').text()).toEqual(
        'Canada’s next statutory holiday — Canada statutory holidays 2019',
      )
      expect($('meta[name="description"]').attr('content')).toMatch(
        /^Canada’s next statutory holiday is/,
      )
    })
  })

  describe('Test /provinces response', () => {
    test('it should return 200', async () => {
      const response = await request(app).get('/provinces')
      expect(response.statusCode).toBe(200)
    })

    test('it should return the h1, title, and meta tag', async () => {
      const response = await request(app).get('/provinces')
      const $ = cheerio.load(response.text)
      expect($('h1').text()).toEqual('All regions in Canada')
      expect($('title').text()).toEqual('All regions in Canada — Canada statutory holidays 2019')
      expect($('meta[name="description"]').attr('content')).toEqual(
        'Upcoming holidays for all regions in Canada',
      )
    })
  })

  describe('Test /province/:provinceId responses', () => {
    describe('for a good provinceId', () => {
      test('it should return 200', async () => {
        const response = await request(app).get('/province/MB')
        expect(response.statusCode).toBe(200)
      })

      test('it should return the h1, title, and meta tag', async () => {
        const response = await request(app).get('/province/MB')
        const $ = cheerio.load(response.text)
        expect($('h1').text()).toMatch(/^Manitoba’s next statutory holiday is/)
        expect($('title').text()).toEqual(
          'Manitoba’s next statutory holiday — Canada statutory holidays 2019',
        )
        expect($('meta[name="description"]').attr('content')).toMatch(
          /^Manitoba’s next statutory holiday is/,
        )
      })
    })

    describe('Test /federal responses', () => {
      test('it should return 200', async () => {
        const response = await request(app).get('/federal')
        expect(response.statusCode).toBe(200)
      })

      test('it should return the h1, title, and meta tag', async () => {
        const response = await request(app).get('/federal')
        const $ = cheerio.load(response.text)
        expect($('h1').text()).toMatch(/^Canada’s next federal statutory holiday is/)
        expect($('title').text()).toEqual(
          'Canada’s next federal stat holiday — Canada statutory holidays 2019',
        )
        expect($('meta[name="description"]').attr('content')).toMatch(
          /^Canada’s next federal stat holiday is/,
        )
      })
    })

    describe('Test /about response', () => {
      test('it should return 200', async () => {
        const response = await request(app).get('/about')
        expect(response.statusCode).toBe(200)
      })

      test('it should return the h1, title, and meta tag', async () => {
        const response = await request(app).get('/about')
        const $ = cheerio.load(response.text)
        expect($('h1').text()).toEqual('About')
        expect($('title').text()).toEqual('About — Canada statutory holidays 2019')
        expect($('meta[name="description"]').attr('content')).toEqual(
          'Give feedback, use the API, etc',
        )
      })
    })

    describe('Test /do-federal-holidays-apply-to-me response', () => {
      test('it should return 200', async () => {
        const response = await request(app).get('/do-federal-holidays-apply-to-me')
        expect(response.statusCode).toBe(200)
      })

      test('it should return the h1, title, and meta tag', async () => {
        const response = await request(app).get('/do-federal-holidays-apply-to-me')
        const $ = cheerio.load(response.text)
        expect($('h1').text()).toEqual('Do federal holidays apply to me?')
        expect($('title').text()).toEqual(
          'Do federal holidays apply to me? — Canada statutory holidays 2019',
        )
        expect($('meta[name="description"]').attr('content')).toEqual(
          'How to tell if you get federal holidays or provincial holidays',
        )
      })
    })

    describe('for a bad province ID', () => {
      test('it should return 400', async () => {
        const response = await request(app).get('/allosaurus')
        expect(response.statusCode).toBe(404)
      })

      test('it should return the h1, title, and meta tag', async () => {
        const response = await request(app).get('/province/pangea')
        const $ = cheerio.load(response.text)
        expect($('h1').text()).toEqual('400')
        expect($('p').text()).toEqual(
          'Error: No province with id “pangea”. Accepted province IDs are: [AB, BC, MB, NB, NL, NS, NT, NU, ON, PE, QC, SK, YT].',
        )
        expect($('title').text()).toEqual('Error: 400 — Canada statutory holidays 2019')
        expect($('meta[name="description"]').attr('content')).toEqual(
          'Error: No province with id “pangea”',
        )
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
      expect($('title').text()).toEqual('Error: 404 — Canada statutory holidays 2019')
      expect($('meta[name="description"]').attr('content')).toEqual('Oopsie daisy')
    })
  })
})
