const request = require('supertest')
const { initDB, getDB } = require('../db.js')
const Promise = require('bluebird')
const app = require('../server.js')

describe('Test server responses', () => {
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

  test('it should return 200 for the root path', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  })

  test('it should return 404 for a nonexistent path', async () => {
    const response = await request(app).get('/pterosaur')
    expect(response.statusCode).toBe(404)
  })

  test('it should return security-focused headers in reponses', async () => {
    const response = await request(app).get('/')

    /*
      More documentaion on each of these can be found here:
      - https://helmetjs.github.io/docs/
    */
    expect(response.headers['x-dns-prefetch-control']).toEqual('off')
    expect(response.headers['x-frame-options']).toEqual('SAMEORIGIN')
    expect(response.headers['strict-transport-security']).toEqual(
      'max-age=15552000; includeSubDomains',
    )
    expect(response.headers['x-download-options']).toEqual('noopen')
    expect(response.headers['x-content-type-options']).toEqual('nosniff')
    expect(response.headers['x-xss-protection']).toEqual('1; mode=block')

    expect(response.headers['x-powered-by']).toBeUndefined()
  })
})
