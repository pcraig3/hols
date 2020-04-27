const express = require('express')
const apiRouter = express.Router()
const v1Router = express.Router()

const cors = require('cors')
const path = require('path')
const db = require('sqlite')
const createError = require('http-errors')
const renderPage = require('../pages/_document.js')
const { dbmw } = require('../utils')
const { getProvincesWithHolidays, getHolidaysWithProvinces } = require('../queries')

// Import the express-openapi-validator library
const OpenApiValidator = require('express-openapi-validator').OpenApiValidator
const spec = path.join(__dirname, '../../reference/Canada-Holidays-API.v1.yaml')

v1Router.use(cors())
// Serve the OpenAPI spec
v1Router.use('/spec', express.static(spec))

new OpenApiValidator({
  apiSpec: spec,
  validateRequests: true, // (default)
  validateResponses: true, // false by default
}).installSync(v1Router)

v1Router.get('/provinces', dbmw(db, getProvincesWithHolidays), (req, res) => {
  return res.send({ provinces: res.locals.rows })
})

v1Router.get('/provinces/:provinceId', dbmw(db, getProvincesWithHolidays), (req, res) => {
  return res.send({ province: res.locals.rows[0] })
})

v1Router.get('/holidays', dbmw(db, getHolidaysWithProvinces), (req, res) => {
  return res.send({ holidays: res.locals.rows })
})

v1Router.get('/holidays/:holidayId', dbmw(db, getHolidaysWithProvinces), (req, res) => {
  return res.send({ holiday: res.locals.rows[0] })
})

v1Router.get('/', (req, res) => {
  const protocol = req.get('host').includes('localhost') ? 'http' : 'https'

  res.send({
    message:
      'Hello / Bonjour! Welcome to the Canada Holidays API / Bienvenue dans l’API canadienne des jours fériés',
    _links: {
      self: {
        href: `${protocol}://${req.get('host')}/api/v1/`,
      },
      holidays: {
        href: `${protocol}://${req.get('host')}/api/v1/holidays`,
      },
      provinces: {
        href: `${protocol}://${req.get('host')}/api/v1/provinces`,
      },
    },
  })
})

apiRouter.get('/', (req, res) => {
  return res.send(
    renderPage({
      pageComponent: 'API',
      title: 'Canada Holidays API — Canada Holidays',
      docProps: {
        meta:
          'A free JSON API for Canada’s statutory holidays. Return all holidays or filter by a specific region.',
        path: req.path,
      },
    }),
  )
})

apiRouter.use('/v1', v1Router)

apiRouter.get('*', (req, res) => {
  res.status(404)
  throw new createError(404, `Error: Could not find route “${req.path}”`)
})

// eslint-disable-next-line no-unused-vars
apiRouter.use(function (err, req, res, next) {
  const status = err.status || res.statusCode
  return res.status(status).send({
    error: {
      status,
      message: err.toString() || err.message,
      timestamp: new Date(Date.now()).toISOString(),
    },
  })
})

module.exports = apiRouter
