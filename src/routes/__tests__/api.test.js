const request = require('supertest')
const { initDB, getDB } = require('../../db.js')
const Promise = require('bluebird')
const app = require('../../server.js')
const cheerio = require('cheerio')
const { ALLOWED_YEARS } = require('../../config/vars.config')

describe('Test /api responses', () => {
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

  const expectProvinceKeys = (withHolidays = true) => {
    const holidays = { holidays: expect.any(Array), nextHoliday: expect.any(Object) }
    return Object.assign(
      {},
      {
        id: expect.any(String),
        nameEn: expect.any(String),
        nameFr: expect.any(String),
      },
      withHolidays ? holidays : {},
    )
  }

  const expectHolidayKeys = (withProvinces = true) => {
    const provinces = { provinces: expect.any(Array) }

    return Object.assign(
      {},
      {
        id: expect.any(Number),
        date: expect.any(String),
        nameEn: expect.any(String),
        nameFr: expect.any(String),
        federal: expect.any(Number),
      },
      withProvinces ? provinces : {},
    )
  }

  describe('Verify CORS headers', () => {
    const corsUrls = [
      '/api/v1/',
      '/api/v1/spec',
      '/api/v1/provinces',
      '/api/v1/holidays',
      '/api/v1/provinces/AB',
      '/api/v1/holidays/1',
    ]
    corsUrls.map((url) => {
      test(`"${url}" should return a CORS header`, async () => {
        const response = await request(app).get(url)
        expect(response.headers['access-control-allow-origin']).toEqual('*')
      })
    })

    const noCorsUrls = ['/api', '/api/antarctosaurus']
    noCorsUrls.map((url) => {
      test(`"${url}" should NOT return a CORS header`, async () => {
        const response = await request(app).get(url)
        expect(response.headers['access-control-allow-origin']).toBe(undefined)
      })
    })
  })

  describe('Test /api/spec response', () => {
    test('it should return 200', async () => {
      const response = await request(app).get('/api/v1/spec')
      expect(response.statusCode).toBe(200)
      expect(response.headers['content-type']).toEqual('text/yaml; charset=UTF-8')
      expect(response.text).toMatch(/openapi: 3.0.0/)
    })
  })

  describe('Test /api response', () => {
    test('it should return 200', async () => {
      const response = await request(app).get('/api')
      expect(response.statusCode).toBe(200)
    })

    test('it should return the h1, title, and meta tag', async () => {
      const response = await request(app).get('/api')
      const $ = cheerio.load(response.text)
      expect($('h1').text()).toEqual('Canada Holidays API')
      expect($('title').text()).toEqual('Canada Holidays API — Canada Holidays')
      expect($('meta[name="description"]').attr('content')).toEqual(
        'A free JSON API for Canada’s statutory holidays. Return all holidays or filter by a specific region.',
      )
    })
  })

  test('for /api/v1/* not found path a 404 status', async () => {
    const response = await request(app).get('/api/v1/dinosaur')
    expect(response.statusCode).toBe(404)

    let { error } = JSON.parse(response.text)
    expect(error).toMatchObject({
      message: 'Error: not found',
      status: response.statusCode,
      timestamp: expect.any(String),
    })
  })

  test('for /api/v1/ path it should return a message ', async () => {
    const response = await request(app).get('/api/v1/')
    expect(response.statusCode).toBe(200)

    let json = JSON.parse(response.text)
    expect(json.message).toMatch(/Hello \/ Bonjour!/)
    expect(Object.keys(json._links)).toEqual(['self', 'holidays', 'provinces', 'spec'])
  })

  describe('for /api/v1/provinces path', () => {
    test('it should return all provinces', async () => {
      const response = await request(app).get('/api/v1/provinces')
      expect(response.statusCode).toBe(200)

      let { provinces } = JSON.parse(response.text)

      provinces.map((province) => {
        let provinceExpect = expectProvinceKeys()
        provinceExpect.nextHoliday = expect.objectContaining(expectHolidayKeys(false))
        expect(province).toEqual(expect.objectContaining(provinceExpect))
      })
    })

    test('it should return the right number of holidays per province', async () => {
      const provinceHolidayLength = {
        AB: 10,
        BC: 10,
        MB: 8,
        NB: 8,
        NL: 12,
        NS: 6,
        NT: 10,
        NU: 9,
        ON: 9,
        PE: 7,
        QC: 8,
        SK: 10,
        YT: 10,
      }

      const response = await request(app).get('/api/v1/provinces')
      expect(response.statusCode).toBe(200)

      let { provinces } = JSON.parse(response.text)
      expect(provinces.length).toBe(Object.keys(provinceHolidayLength).length)

      provinces.map((province) => {
        expect(`${province.id} ${province.holidays.length}`).toEqual(
          `${province.id} ${provinceHolidayLength[province.id]}`,
        )
      })
    })
  })

  describe('for /api/v1/provinces/:provinceId path', () => {
    test('it should return a province for a good ID: "NB"', async () => {
      const response = await request(app).get('/api/v1/provinces/NB')
      expect(response.statusCode).toBe(200)

      let { province } = JSON.parse(response.text)

      expect(province).toMatchObject({
        id: 'NB',
        nameEn: 'New Brunswick',
        nameFr: 'Nouveau-Brunswick',
        nextHoliday: expect.any(Object),
        holidays: expect.any(Array),
      })
    })

    const badIDs = ['nb', 'Nb', 'FAKE']
    badIDs.map((id) => {
      test(`it should return an error message for a bad ID: ${id}`, async () => {
        const response = await request(app).get(`/api/v1/provinces/${id}`)
        expect(response.statusCode).toBe(400)

        let { error } = JSON.parse(response.text)

        expect(error).toMatchObject({
          message:
            'Error: request.params.provinceId should be equal to one of the allowed values: AB, BC, MB, NB, NL, NS, NT, NU, ON, PE, QC, SK, YT',
          status: response.statusCode,
          timestamp: expect.any(String),
        })
      })
    })
  })

  describe('for /api/v1/holidays path', () => {
    test('it should return all holidays', async () => {
      const response = await request(app).get('/api/v1/holidays')
      expect(response.statusCode).toBe(200)

      let { holidays } = JSON.parse(response.text)

      holidays.map((holiday) => {
        expect(holiday).toEqual(expect.objectContaining(expectHolidayKeys()))
      })
    })

    const yesFederal = ['1', 'true']
    yesFederal.map((val) => {
      test(`it should return ONLY federal holidays for “?federal=${val}”`, async () => {
        const response = await request(app).get(`/api/v1/holidays?federal=${val}`)
        expect(response.statusCode).toBe(200)

        let { holidays } = JSON.parse(response.text)

        holidays.map((holiday) => {
          expect(holiday).toEqual(expect.objectContaining(expectHolidayKeys()))
          expect(holiday.federal).toBe(1)
        })
      })
    })

    const noFederal = ['0', 'false']
    noFederal.map((val) => {
      test(`it should return NO federal holidays for “?federal=${val}”`, async () => {
        const response = await request(app).get(`/api/v1/holidays?federal=${val}`)
        expect(response.statusCode).toBe(200)

        let { holidays } = JSON.parse(response.text)

        holidays.map((holiday) => {
          expect(holiday).toEqual(expect.objectContaining(expectHolidayKeys()))
          expect(holiday.federal).toBe(0)
        })
      })
    })

    describe('with ?years=', () => {
      ALLOWED_YEARS.map((year) => {
        test(`${year} it should return all holidays for ${year}`, async () => {
          const response = await request(app).get(`/api/v1/holidays?year=${year}`)
          expect(response.statusCode).toBe(200)

          let { holidays } = JSON.parse(response.text)

          holidays.map((holiday) => {
            expect(holiday.date.slice(0, 4)).toEqual(`${year}`)
          })
        })
      })

      let badYears = ['2017', '2023', '1', null, undefined, false, 'orange', 'christmas']
      badYears.map((year) => {
        test(`"${year}" it should return 400 with an error message`, async () => {
          const response = await request(app).get(`/api/v1/holidays?year=${year}`)
          expect(response.statusCode).toBe(400)

          let { error } = JSON.parse(response.text)
          expect(error.message).toMatch(
            /^Error: request.query.year should be (integer|>= 2018|<= 2022)/,
          )
        })
      })
    })
  })

  describe('for /api/v1/holidays/:holidayId path', () => {
    test('it should return a holiday for a good ID', async () => {
      const response = await request(app).get('/api/v1/holidays/17')
      expect(response.statusCode).toBe(200)

      let { holiday } = JSON.parse(response.text)

      expect(holiday).toMatchObject({
        id: 17,
        date: '2020-08-03',
        nameEn: 'Civic Holiday',
        nameFr: 'Premier lundi d’août',
        federal: 1,
        provinces: expect.any(Array),
      })
    })

    test('it should return an error message for a bad ID', async () => {
      const response = await request(app).get('/api/v1/holidays/1000')
      expect(response.statusCode).toBe(400)

      let { error } = JSON.parse(response.text)

      expect(error).toMatchObject({
        message: 'Error: request.params.holidayId should be <= 28',
        status: response.statusCode,
        timestamp: expect.any(String),
      })
    })

    describe('with ?years=', () => {
      ALLOWED_YEARS.map((year) => {
        test(`${year} it should a holiday with the right dateString`, async () => {
          const response = await request(app).get(`/api/v1/holidays/16?year=${year}`)
          expect(response.statusCode).toBe(200)

          let { holiday } = JSON.parse(response.text)

          expect(holiday.date.slice(0, 4)).toEqual(`${year}`)
        })
      })

      let badYears = ['2017', '2023', '1', null, undefined, false, 'orange', 'christmas']
      badYears.map((year) => {
        test(`"${year}" it should return 400 with an error message`, async () => {
          const response = await request(app).get(`/api/v1/holidays?year=${year}`)
          expect(response.statusCode).toBe(400)

          let { error } = JSON.parse(response.text)
          expect(error.message).toMatch(
            /^Error: request.query.year should be (integer|>= 2018|<= 2022)/,
          )
        })
      })
    })
  })
})
