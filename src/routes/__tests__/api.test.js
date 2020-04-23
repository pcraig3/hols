const request = require('supertest')
const db = require('sqlite')
const Promise = require('bluebird')
const app = require('../../server.js')
const cheerio = require('cheerio')
const { ALLOWED_YEARS } = require('../../config/vars.config')
const { getCurrentHolidayYear } = require('../../utils')

describe('Test /api responses', () => {
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

  describe('Test /api response', () => {
    test('it should return 200', async () => {
      const response = await request(app).get('/api')
      expect(response.statusCode).toBe(200)
    })

    test('it should return the h1, title, and meta tag', async () => {
      const response = await request(app).get('/api')
      const $ = cheerio.load(response.text)
      expect($('h1').text()).toEqual('Holidays API')
      expect($('title').text()).toEqual('Holidays API — Canada statutory holidays')
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
      message: 'Error: Could not find route “/v1/dinosaur”',
      status: response.statusCode,
      timestamp: expect.any(String),
    })
  })

  test('for /api/v1/ path it should return a message ', async () => {
    const response = await request(app).get('/api/v1/')
    expect(response.statusCode).toBe(200)

    let json = JSON.parse(response.text)
    expect(json.message).toMatch(/Hello \/ Bonjour!/)
    expect(Object.keys(json._links)).toEqual(['self', 'holidays', 'provinces'])
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
    const goodNBs = ['nb', 'NB', 'nB']
    goodNBs.map((nb) => {
      test(`it should a province for a good ID: ${nb}`, async () => {
        const response = await request(app).get(`/api/v1/provinces/${nb}`)
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
    })

    test('it should return an error message for a bad ID', async () => {
      const response = await request(app).get('/api/v1/provinces/FAKE')
      expect(response.statusCode).toBe(400)

      let { error } = JSON.parse(response.text)

      expect(error).toMatchObject({
        message:
          'Error: No province with id “FAKE”. Accepted province IDs are: [AB, BC, MB, NB, NL, NS, NT, NU, ON, PE, QC, SK, YT].',
        status: response.statusCode,
        timestamp: expect.any(String),
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

    const yesFederal = ['1', 'true', 'TRUE', 'tRuE']
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

    const noFederal = ['0', 'false', 'FALSE', 'FaLSe']
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
        test(`${year} it should return all holidays for ${getCurrentHolidayYear()} with the current year`, async () => {
          const response = await request(app).get(`/api/v1/holidays?year=${year}`)
          expect(response.statusCode).toBe(200)

          let { holidays } = JSON.parse(response.text)

          holidays.map((holiday) => {
            expect(holiday.date.slice(0, 4)).toEqual(getCurrentHolidayYear().toString())
          })
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
      expect(response.statusCode).toBe(404)

      let { error } = JSON.parse(response.text)

      expect(error).toMatchObject({
        message: 'Error: No holiday with id “1000”',
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
        test(`${year} it should a holiday with the current year`, async () => {
          const response = await request(app).get(`/api/v1/holidays/16?year=${year}`)
          expect(response.statusCode).toBe(200)

          let { holiday } = JSON.parse(response.text)
          expect(holiday.date.slice(0, 4)).toEqual(getCurrentHolidayYear().toString())
        })
      })
    })
  })
})
