const request = require('supertest')
const app = require('../../server.js')

const db = require('sqlite')
const Promise = require('bluebird')

describe('Test /api responses', () => {
  beforeAll(async () => {
    await Promise.resolve()
      // First, try to open the database
      .then(() => db.open('./database.sqlite', { Promise })) // <=
      // Update db schema to the latest version using SQL-based migrations
      .then(() => db.migrate({ force: 'last' })) // <=
      // Display error message if something went wrong
      .catch(err => console.error(err.stack)) // eslint-disable-line no-console
  })

  const expectProvinceKeys = () => {
    return Object.assign(
      {},
      {
        id: expect.any(String),
        nameEn: expect.any(String),
        nameFr: expect.any(String),
        holidays: expect.any(Array),
        nextHoliday: expect.any(Object),
      },
    )
  }

  const expectHolidayKeys = () => {
    return Object.assign(
      {},
      {
        id: expect.any(Number),
        date: expect.any(String),
        nameEn: expect.any(String),
        nameFr: expect.any(String),
        federal: expect.any(Number),
      },
    )
  }

  test('for /api path it should return a 302 status', async () => {
    const response = await request(app).get('/api/')
    expect(response.statusCode).toBe(302)
    expect(response.headers.location).toEqual('/api/v1/')
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

      provinces.map(province => {
        let provinceExpect = expectProvinceKeys()
        provinceExpect.nextHoliday = expect.objectContaining(expectHolidayKeys())
        expect(province).toEqual(expect.objectContaining(provinceExpect))
      })
    })

    test('it should return the right number of holidays per province', async () => {
      const provinceHolidayLength = {
        AB: 11,
        BC: 10,
        MB: 9,
        NB: 11,
        NL: 12,
        NS: 11,
        NT: 10,
        NU: 9,
        ON: 10,
        PE: 12,
        QC: 8,
        SK: 10,
        YT: 12,
      }

      const response = await request(app).get('/api/v1/provinces')
      expect(response.statusCode).toBe(200)

      let { provinces } = JSON.parse(response.text)
      expect(provinces.length).toBe(Object.keys(provinceHolidayLength).length)

      provinces.map(province => {
        expect(`${province.id} ${province.holidays.length}`).toEqual(
          `${province.id} ${provinceHolidayLength[province.id]}`,
        )
      })
    })
  })

  describe('for /api/v1/provinces/:provinceId path', () => {
    const goodNBs = ['nb', 'NB', 'nB']
    goodNBs.map(nb => {
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
  })
})
