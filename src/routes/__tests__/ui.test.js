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
      expect($('title').text()).toEqual('Canadian statutory holidays in 2020')
      expect($('meta[name="description"]').attr('content')).toMatch(
        /^Canada’s next stat holiday is/,
      )
      expect($('meta[name="description"]').attr('content')).toMatch(
        /See all statutory holidays in Canada in 2020./,
      )
    })
  })

  describe('Test /provinces responses', () => {
    describe('Test /provinces GET response', () => {
      test('it should return 200', async () => {
        const response = await request(app).get('/provinces')
        expect(response.statusCode).toBe(200)
      })

      test('it should return the h1, title, and meta tag', async () => {
        const response = await request(app).get('/provinces')
        const $ = cheerio.load(response.text)
        expect($('h1').text()).toEqual('All regions in Canada')
        expect($('title').text()).toEqual('All regions in Canada — Canada statutory holidays')
        expect($('meta[name="description"]').attr('content')).toEqual(
          'Upcoming stat holidays for all regions in Canada. See all federal statutory holidays in Canada in 2020.',
        )
      })
    })

    describe('Test /provinces POST response', () => {
      test('it should return 302 to / for no param', async () => {
        const response = await request(app).post('/provinces')
        expect(response.statusCode).toBe(302)
        expect(response.headers.location).toBe('/')
      })

      test('it should return 302 to /federal for "federal"', async () => {
        const response = await request(app)
          .post('/provinces')
          .send({ region: 'federal' })
        expect(response.statusCode).toBe(302)
        expect(response.headers.location).toBe('/federal')
      })

      test('it should return 302 to /province/:id for a good param', async () => {
        const response = await request(app)
          .post('/provinces')
          .send({ region: 'AB' })
        expect(response.statusCode).toBe(302)
        expect(response.headers.location).toBe('/province/AB')
      })

      const params = [
        { region: 'AB', url: '/province/AB' },
        { region: 'ab', url: '/province/AB' },
        { region: 'Alberta', url: '/province/AL' },
        { region: 'a', url: '/province/A' },
        { region: '<script>', url: '/province/%3CS' },
        { region: 'https://evil.org', url: '/province/HT' },
        { region: 'false', url: '/province/FA' },
        { region: '1', url: '/province/1' },
      ]
      params.map(p => {
        test(`it should return 302 to ${p.url} uppercased for param: '${p.region}'`, async () => {
          const response = await request(app)
            .post('/provinces')
            .send({ region: p.region })
          expect(response.statusCode).toBe(302)
          expect(response.headers.location).toBe(p.url)
        })
      })
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
        expect($('title').text()).toEqual('Manitoba (MB) statutory holidays in 2020')
        expect($('meta[name="description"]').attr('content')).toMatch(/^MB’s next stat holiday is/)
        expect($('meta[name="description"]').attr('content')).toMatch(
          /See all statutory holidays in Manitoba, Canada in 2020/,
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
        expect($('title').text()).toEqual('Federal statutory holidays in Canada in 2020')
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
        expect($('title').text()).toEqual('About — Canada statutory holidays')
        expect($('meta[name="description"]').attr('content')).toEqual(
          'Check my sources, use the API, get in touch, etc.',
        )
      })
    })

    describe('Test /feedback response', () => {
      test('it should return 200', async () => {
        const response = await request(app).get('/feedback')
        expect(response.statusCode).toBe(200)
      })

      test('it should return the h1, title, and meta tag', async () => {
        const response = await request(app).get('/feedback')
        const $ = cheerio.load(response.text)
        expect($('h1').text()).toEqual('Feedback')
        expect($('title').text()).toEqual('Feedback — Canada statutory holidays')
        expect($('meta[name="description"]').attr('content')).toEqual(
          'Reprt a problem, tell me I’m cool, or let’s just chat even.',
        )
      })
    })

    describe('Test /add-holidays-to-calendar response', () => {
      test('it should return 200', async () => {
        const response = await request(app).get('/add-holidays-to-calendar')
        expect(response.statusCode).toBe(200)
      })

      test('it should return the h1, title, and meta tag', async () => {
        const response = await request(app).get('/add-holidays-to-calendar')
        const $ = cheerio.load(response.text)
        expect($('h1').text()).toEqual('Add Canada’s 2020 holidays to your calendar')
        expect($('title').text()).toEqual(
          'Add Canada’s 2020 holidays to your calendar — Canada statutory holidays',
        )
        expect($('meta[name="description"]').attr('content')).toEqual(
          'Download Canadian holidays and import them to your Outlook, iCal, or Google Calendar. Add all Canadian statutory holidays or just for your region.',
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
          'Do federal holidays apply to me? — Canada statutory holidays',
        )
        expect($('meta[name="description"]').attr('content')).toEqual(
          'How to tell if you get federal holidays or provincial holidays in Canada.',
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
        expect($('title').text()).toEqual('Error: 400 — Canada statutory holidays')
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
      expect($('title').text()).toEqual('Error: 404 — Canada statutory holidays')
      expect($('meta[name="description"]').attr('content')).toEqual('Oopsie daisy')
    })
  })
})
