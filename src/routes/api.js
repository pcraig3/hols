const express = require('express')
const router = express.Router()
const db = require('sqlite')
const createError = require('http-errors')
const renderPage = require('../pages/_document.js')
const { dbmw, checkProvinceIdErr } = require('../utils')
const { getProvincesWithHolidays, getHolidaysWithProvinces } = require('../queries')

router.get('/v1/provinces', dbmw(db, getProvincesWithHolidays), (req, res) => {
  return res.send({ provinces: res.locals.rows })
})

router.get(
  '/v1/provinces/:provinceId',
  dbmw(db, getProvincesWithHolidays),
  checkProvinceIdErr,
  (req, res) => {
    return res.send({ province: res.locals.rows[0] })
  },
)

router.get('/v1/holidays', dbmw(db, getHolidaysWithProvinces), (req, res) => {
  return res.send({ holidays: res.locals.rows })
})

router.get('/v1/holidays/:holidayId', dbmw(db, getHolidaysWithProvinces), (req, res) => {
  if (!res.locals.rows.length) {
    res.status(404)
    throw new createError(404, `Error: No holiday with id “${req.params.holidayId}”`)
  }

  return res.send({ holiday: res.locals.rows[0] })
})

router.get('/v1/', (req, res) => {
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

router.get('/', (req, res) => {
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

router.get('*', (req, res) => {
  res.status(404)
  throw new createError(404, `Error: Could not find route “${req.path}”`)
})

// eslint-disable-next-line no-unused-vars
router.use(function (err, req, res, next) {
  return res.send({
    error: {
      status: res.statusCode,
      message: err.message,
      timestamp: new Date(Date.now()).toISOString(),
    },
  })
})

module.exports = router
