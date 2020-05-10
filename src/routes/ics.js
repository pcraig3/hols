const express = require('express')
const router = express.Router()
const ics = require('ics')
const createError = require('http-errors')
const { dbmw, isProvinceId, getCurrentHolidayYear, param2query } = require('../utils/index')
const { ALLOWED_YEARS } = require('../config/vars.config')
const {
  startDate,
  endDate,
  getTitle,
  getUid,
  getNationalDescription,
  getProvinceDescription,
} = require('../utils/ics')
const { getHolidaysWithProvinces } = require('../queries')

/**
 * Returns a NATIONAL event formatted in a way the ICS library understands
 * @param {obj} holiday a holiday object
 */
const formatNationalEvent = (holiday) => {
  return {
    start: startDate(holiday.date),
    end: endDate(holiday.date),
    title: getTitle(holiday),
    description: getNationalDescription(holiday),
    productId: '-//pcraig3//hols//EN',
    uid: `${getUid(holiday)}@hols.ca`,
  }
}

/**
 * Returns a PROVINCIAL or FEDERAL event formatted in a way the ICS library understands
 * @param {obj} holiday a holiday object
 */
const formatProvinceEvent = (holiday) => {
  return {
    start: startDate(holiday.date),
    end: endDate(holiday.date),
    title: holiday.nameEn,
    description: getProvinceDescription(holiday),
    productId: '-//pcraig3//hols//EN',
    uid: `${getUid(holiday)}@hols.ca`,
  }
}

const downloadICS = ({ req, res, modifier = null, year = getCurrentHolidayYear() }) => {
  return (error, value) => {
    if (error) {
      throw new createError(500, `Error: creating events for route: ${req.path}`)
    }

    res.set({
      'Content-Type': 'text/calendar',
      'Content-disposition': `attachment; filename=canada-holidays-${
        modifier ? `${modifier}-` : ''
      }${year}.ics`,
    })
    return res.send(value)
  }
}

router.get('/ics', (req, res) => res.redirect(301, `/ics/${getCurrentHolidayYear()}`))

router.get(
  '/ics/:year(\\d{4})',
  param2query('year'),
  dbmw(getHolidaysWithProvinces),
  (req, res) => {
    let year = ALLOWED_YEARS.find((y) => y === parseInt(req.query.year))
    if (!year) return res.redirect('/')

    const holidays = res.locals.rows.map((h) => formatNationalEvent(h))

    ics.createEvents(holidays, downloadICS({ req, res, year }))
  },
)

router.get('/ics/federal', (req, res) => {
  return res.redirect(301, `/ics/federal/${getCurrentHolidayYear()}`)
})

router.get(
  '/ics/federal/:year(\\d{4})',
  param2query('year'),
  dbmw(getHolidaysWithProvinces),
  (req, res) => {
    let year = ALLOWED_YEARS.find((y) => y === parseInt(req.query.year))
    if (!year) return res.redirect('/federal')

    const filteredRows = res.locals.rows.filter((h) => h.federal)
    const holidays = filteredRows.map((h) => formatProvinceEvent(h))

    ics.createEvents(holidays, downloadICS({ req, res, modifier: 'federal', year }))
  },
)

router.get('/ics/:provinceId(\\w{2})', (req, res) => {
  let provinceId = req.params.provinceId
  return isProvinceId(provinceId)
    ? res.redirect(301, `/ics/${provinceId}/${getCurrentHolidayYear()}`)
    : res.redirect(`/province/${provinceId}`) // if bad province ID, redirect will be to a 404 page
})

router.get(
  '/ics/:provinceId(\\w{2})/:year(\\d{4})',
  param2query('year'),
  dbmw(getHolidaysWithProvinces),
  (req, res) => {
    let provinceId = req.params.provinceId
    let year = ALLOWED_YEARS.find((y) => y === parseInt(req.query.year))
    if (!isProvinceId(provinceId) || !year) {
      return res.redirect(`/province/${provinceId}`)
    }

    provinceId = provinceId.toUpperCase()
    const filteredRows = res.locals.rows.filter((h) => h.provinces.find((p) => p.id === provinceId))
    const holidays = filteredRows.map((h) => formatProvinceEvent(h))

    ics.createEvents(holidays, downloadICS({ req, res, modifier: provinceId, year }))
  },
)

module.exports = router
