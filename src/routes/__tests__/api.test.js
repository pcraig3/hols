const request = require('supertest')
const app = require('../../server.js')

describe('Test /api responses', () => {
  test('it should return 302 for the root path', async () => {
    const response = await request(app).get('/api/')
    expect(response.statusCode).toBe(302)
    expect(response.headers.location).toEqual('/api/v1/')
  })

  test('it should return a message for the /v1 path', async () => {
    const response = await request(app).get('/api/v1/')
    expect(response.statusCode).toBe(200)

    let json = JSON.parse(response.text)
    expect(json.message).toMatch(/Hello \/ Bonjour!/)
    expect(Object.keys(json._links)).toEqual(['self', 'holidays', 'provinces'])
  })
})
