const express = require('express')
const router = express.Router()
const db = require('sqlite')
const { dbmw } = require('../utils')
const { getProvincesWithHolidays, getHolidaysWithProvinces } = require('../queries')

router.get('/provinces', dbmw(db, getProvincesWithHolidays), (req, res) => {
  return res.send({ provinces: res.locals.rows })
})

router.get('/holidays', dbmw(db, getHolidaysWithProvinces), (req, res) => {
  return res.send({ holidays: res.locals.rows })
})

module.exports = router
