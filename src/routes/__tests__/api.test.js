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

  test('it should return 302 for the /api path', async () => {
    const response = await request(app).get('/api/')
    expect(response.statusCode).toBe(302)
    expect(response.headers.location).toEqual('/api/v1/')
  })

  test('it should return a message for the /api/v1/ path', async () => {
    const response = await request(app).get('/api/v1/')
    expect(response.statusCode).toBe(200)

    let json = JSON.parse(response.text)
    expect(json.message).toMatch(/Hello \/ Bonjour!/)
    expect(Object.keys(json._links)).toEqual(['self', 'holidays', 'provinces'])
  })

  test('it should return all provinces for the /api/v1/provinces path', async () => {
    const response = await request(app).get('/api/v1/provinces')
    expect(response.statusCode).toBe(200)

    let { provinces } = JSON.parse(response.text)
    expect(provinces.length).toBe(13)

    provinces.map(province => {
      let provinceExpect = expectProvinceKeys()
      provinceExpect.nextHoliday = expect.objectContaining(expectHolidayKeys())
      expect(province).toEqual(expect.objectContaining(provinceExpect))
    })
  })
})
