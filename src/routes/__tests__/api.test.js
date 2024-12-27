const request = require('supertest')
const DB = require('@beenotung/better-sqlite3-helper')
const cheerio = require('cheerio')

const app = require('../../server.js')
const DBconfig = require('../../config/better-sqlite3-helper.config')
const { ALLOWED_YEARS } = require('../../config/vars.config')
const { getCurrentHolidayYear } = require('../../dates')

// The first call creates the global instance with your settings
DB(DBconfig)

describe('Test /api responses', () => {
  const currentYear = getCurrentHolidayYear()

  const expectProvinceKeys = (withHolidays = true) => {
    const holidays = { holidays: expect.any(Array), nextHoliday: expect.any(Object) }
    return Object.assign(
      {},
      {
        id: expect.any(String),
        nameEn: expect.any(String),
        nameFr: expect.any(String),
        sourceLink: expect.any(String),
        sourceEn: expect.any(String),
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
        observedDate: expect.any(String),
        nameEn: expect.any(String),
        nameFr: expect.any(String),
        federal: expect.any(Number),
        date: expect.any(String),
      },
      withProvinces ? provinces : {},
    )
  }

  describe('Verify CORS headers', () => {
    const corsUrls = [
      '/api',
      '/api/fake',
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
      message: 'Not Found: not found',
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
        AB: 9,
        BC: 11,
        MB: 9,
        NB: 8,
        NL: 12,
        NS: 6,
        NT: 11,
        NU: 10,
        ON: 9,
        PE: 8,
        QC: 8,
        SK: 10,
        YT: 11,
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

      let expected = {
        id: 'NB',
        nameEn: 'New Brunswick',
        nameFr: 'Nouveau-Brunswick',
        holidays: expect.any(Array),
      }

      const year = new Date(Date.now()).getUTCFullYear()
      if (year === getCurrentHolidayYear('NB')) expected['nextHoliday'] = expect.any(Object)

      expect(province).toMatchObject(expected)
    })

    const badIDs = ['nb', 'Nb', 'FAKE']
    badIDs.map((id) => {
      test(`it should return an error message for a bad ID: ${id}`, async () => {
        const response = await request(app).get(`/api/v1/provinces/${id}`)
        expect(response.statusCode).toBe(400)

        let { error } = JSON.parse(response.text)

        expect(error).toMatchObject({
          message:
            'Bad Request: request/params/provinceId must be equal to one of the allowed values: AB, BC, MB, NB, NL, NS, NT, NU, ON, PE, QC, SK, YT',
          status: response.statusCode,
          timestamp: expect.any(String),
        })
      })
    })

    describe('with optional holidays', () => {
      const optionalProvinces = [
        {
          province: 'AB',
          statTotal: 9,
          optionalTotal: 13,
        },
        {
          province: 'BC',
          statTotal: 11,
          optionalTotal: 13,
        },
        {
          province: 'MB',
          statTotal: 9,
          optionalTotal: 13,
        },
        {
          province: 'NB',
          statTotal: 8,
          optionalTotal: 11,
        },
        {
          province: 'NS',
          statTotal: 6,
          optionalTotal: 9,
        },
        {
          province: 'NU',
          statTotal: 10,
          optionalTotal: 11,
        },
        {
          province: 'ON',
          statTotal: 9,
          optionalTotal: 12,
        },
      ]

      optionalProvinces.map((op) => {
        test(`it should NOT return optional holidays with ?optional=false for a good ID: ${op.province}`, async () => {
          const response = await request(app).get(`/api/v1/provinces/${op.province}?optional=false`)
          expect(response.statusCode).toBe(200)

          let { province } = JSON.parse(response.text)
          expect(province.holidays.length).toBe(op.statTotal)
        })

        test(`it should return optional holidays with ?optional=true for a good ID: ${op.province}`, async () => {
          const response = await request(app).get(`/api/v1/provinces/${op.province}?optional=true`)
          expect(response.statusCode).toBe(200)

          let { province } = JSON.parse(response.text)
          expect(province.holidays.length).toBe(op.optionalTotal)
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

    describe('with ?federal=', () => {
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
    })

    describe('with ?optional=', () => {
      const yesOptional = ['1', 'true']
      yesOptional.map((val) => {
        test(`it should return Terry Fox Day and Heritage Day for “?optional=${val}”`, async () => {
          const response = await request(app).get(`/api/v1/holidays?optional=${val}`)
          expect(response.statusCode).toBe(200)

          let { holidays } = JSON.parse(response.text)

          // Heritage Day
          // Note: there are 2 Heritage Days, but the nameFr of the NS one is "Fête du Patrimoine"
          const heritageDay = holidays.find(
            (h) => h.nameEn === 'Heritage Day' && h.nameFr === 'Jour d’Héritage',
          )
          expect(heritageDay.id).toBe(22)
          expect(heritageDay).toMatchObject({
            id: 22,
            date: heritageDay.date,
            nameEn: 'Heritage Day',
            nameFr: 'Jour d’Héritage',
            federal: 0,
            observedDate: heritageDay.observedDate,
            provinces: expect.any(Array),
          })

          let [heritageDayYear, heritageDayMonth] = heritageDay.date.split('-')
          expect(`${heritageDayYear}-${heritageDayMonth}`).toBe(`${currentYear}-08`)

          expect(heritageDay.provinces.length).toBe(1)
          expect(heritageDay.provinces[0].nameEn).toBe('Alberta')
          expect(heritageDay.provinces[0].optional).toBe(1)

          // Terry Fox Day
          // Note: There is only 1 Terry Fox Day, so all good
          const terryFoxDay = holidays.find(
            (h) => h.nameEn === 'Terry Fox Day' && h.nameFr === 'Journée Terry Fox',
          )
          expect(terryFoxDay.id).toBe(23)
          expect(terryFoxDay).toMatchObject({
            id: 23,
            date: terryFoxDay.date,
            nameEn: 'Terry Fox Day',
            nameFr: 'Journée Terry Fox',
            federal: 0,
            observedDate: terryFoxDay.observedDate,
            provinces: expect.any(Array),
          })

          let [terryFoxYear, terryFoxMonth] = terryFoxDay.date.split('-')
          expect(`${terryFoxYear}-${terryFoxMonth}`).toBe(`${currentYear}-08`)

          expect(terryFoxDay.provinces.length).toBe(1)
          expect(terryFoxDay.provinces[0].nameEn).toBe('Manitoba')
          expect(terryFoxDay.provinces[0].optional).toBe(1)
        })
      })

      const noOptional = ['0', 'false']
      noOptional.map((val) => {
        test(`it should NOT return Terry Fox Day and Heritage Day for “?optional=${val}”`, async () => {
          const response = await request(app).get(`/api/v1/holidays?optional=${val}`)
          expect(response.statusCode).toBe(200)

          let { holidays } = JSON.parse(response.text)

          // Heritage Day is no longer here
          const heritageDay = holidays.find(
            (h) => h.nameEn === 'Heritage Day' && h.date === '2022-08-01',
          )
          expect(heritageDay).not.toBeDefined()

          // Terry Fox Day is no longer here
          const terryFoxDay = holidays.find(
            (h) => h.nameEn === 'Terry Fox Day' && h.date === '2022-08-01',
          )
          expect(terryFoxDay).not.toBeDefined()
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
            expect(holiday.observedDate.slice(0, 4)).toEqual(`${year}`)
          })
        })
      })

      let badYears = ['2013', '2034', '1', null, undefined, false, 'orange', 'christmas']
      badYears.map((year) => {
        test(`"${year}" it should return 400 with an error message`, async () => {
          const response = await request(app).get(`/api/v1/holidays?year=${year}`)
          expect(response.statusCode).toBe(400)

          let { error } = JSON.parse(response.text)
          expect(error.message).toMatch(
            /^Bad Request: request\/query\/year must be (integer|>= 2014|<= 2033)/,
          )
        })
      })
    })
  })

  describe('with firstOccurence ?years=', () => {
    let validYears = [2021, 2022]
    validYears.map((year) => {
      test(`it should return Truth and Reconciliation Day for ${year}`, async () => {
        const response = await request(app).get(`/api/v1/holidays?year=${year}`)
        expect(response.statusCode).toBe(200)

        let { holidays } = JSON.parse(response.text)

        const h = holidays.find(
          (holiday) => holiday.nameEn === 'National Day for Truth and Reconciliation',
        )
        expect(h.nameEn).toMatch('National Day for Truth and Reconciliation')
      })
    })

    let invalidYears = [2020, 2019]
    invalidYears.map((year) => {
      test(`it should NOT return Truth and Reconciliation Day for ${year}`, async () => {
        const response = await request(app).get(`/api/v1/holidays?year=${year}`)
        expect(response.statusCode).toBe(200)

        let { holidays } = JSON.parse(response.text)

        const h = holidays.find(
          (holiday) => holiday.nameEn === 'National Day for Truth and Reconciliation',
        )
        expect(h).toBeUndefined()
      })
    })
  })

  describe('with lastOccurence ?years=', () => {
    let validYears = [2022]
    validYears.map((year) => {
      test(`it should return Day of Mourning for ${year}`, async () => {
        const response = await request(app).get(`/api/v1/holidays?year=${year}`)
        expect(response.statusCode).toBe(200)

        let { holidays } = JSON.parse(response.text)

        const h = holidays.find(
          (holiday) => holiday.nameEn === 'Day of Mourning for Queen Elizabeth II',
        )
        expect(h.nameEn).toMatch('Day of Mourning for Queen Elizabeth II')
      })
    })

    let invalidYears = [2021, 2023]
    invalidYears.map((year) => {
      test(`it should NOT return Truth and Reconciliation Day for ${year}`, async () => {
        const response = await request(app).get(`/api/v1/holidays?year=${year}`)
        expect(response.statusCode).toBe(200)

        let { holidays } = JSON.parse(response.text)

        const h = holidays.find(
          (holiday) => holiday.nameEn === 'Day of Mourning for Queen Elizabeth II',
        )
        expect(h).toBeUndefined()
      })
    })
  })

  describe('for /api/v1/holidays/:holidayId path', () => {
    test('it should return a holiday for a good ID: 33', async () => {
      const response = await request(app).get('/api/v1/holidays/33')
      expect(response.statusCode).toBe(200)

      let { holiday } = JSON.parse(response.text)

      expect(holiday).toMatchObject({
        id: 33,
        date: `${currentYear}-12-26`,
        nameEn: 'Boxing Day',
        nameFr: 'Lendemain de Noël',
        federal: 1,
        observedDate: `${currentYear}-12-26`,
        provinces: expect.any(Array),
      })
    })

    describe('with optional provinces', () => {
      test('it should NOT return optional provinces for a good ID: 33', async () => {
        const response = await request(app).get('/api/v1/holidays/33?optional=false')
        expect(response.statusCode).toBe(200)

        let { holiday } = JSON.parse(response.text)
        expect(holiday.provinces.length).toBe(2)
      })

      test('it should return optional provinces for a good ID: 33', async () => {
        const response = await request(app).get('/api/v1/holidays/33?optional=true')
        expect(response.statusCode).toBe(200)

        let { holiday } = JSON.parse(response.text)
        expect(holiday.provinces.length).toBe(7)
      })
    })

    test('it should return an error message for a bad ID', async () => {
      const response = await request(app).get('/api/v1/holidays/1000')
      expect(response.statusCode).toBe(400)

      let { error } = JSON.parse(response.text)

      expect(error).toMatchObject({
        message: 'Bad Request: request/params/holidayId must be <= 33',
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

          expect(holiday.observedDate.slice(0, 4)).toEqual(`${year}`)
        })
      })

      let badYears = ['2013', '2034', '1', null, undefined, false, 'orange', 'christmas']
      badYears.map((year) => {
        test(`"${year}" it should return 400 with an error message`, async () => {
          const response = await request(app).get(`/api/v1/holidays?year=${year}`)
          expect(response.statusCode).toBe(400)

          let { error } = JSON.parse(response.text)
          expect(error.message).toMatch(
            /^Bad Request: request\/query\/year must be (integer|>= 2014|<= 2033)/,
          )
        })
      })
    })
  })
})
