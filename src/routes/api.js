const express = require('express')
const router = express.Router()
const db = require('sqlite')
const { dbmw } = require('../utils')
const { getProvincesWithHolidays, getHolidaysWithProvinces } = require('../queries')

router.get('/', (req, res) => {
  const protocol = req.get('host').includes('localhost') ? 'http' : 'https'

  res.send({
    message:
      'Hello / Bonjour! Welcome to the Canadian holidays API | Bienvenue dans l’API canadienne des jours fériés',
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

router.get('/provinces', dbmw(db, getProvincesWithHolidays), (req, res) => {
  return res.send({ provinces: res.locals.rows })
})

router.get('/holidays', dbmw(db, getHolidaysWithProvinces), (req, res) => {
  return res.send({ holidays: res.locals.rows })
})

module.exports = router
