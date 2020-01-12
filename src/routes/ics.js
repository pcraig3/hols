const express = require('express')
const router = express.Router()
const db = require('sqlite')
const ics = require('ics')
const createError = require('http-errors')
const { dbmw, isProvinceId, getCurrentHolidayYear } = require('../utils/index')
const {
  startDate,
  endDate,
  getTitle,
  getNationalDescription,
  getProvinceDescription,
} = require('../utils/ics')
const { getHolidaysWithProvinces } = require('../queries')

/**
 * Returns an event formatted in a way the ICS library understands
 * @param {obj} holiday a holiday object
 */
const formatNationalEvent = holiday => {
  return {
    start: startDate(holiday.date),
    end: endDate(holiday.date),
    title: getTitle(holiday),
    description: getNationalDescription(holiday),
    productId: '-//pcraig3//hols//EN',
    uid: `${new Date(holiday.date).getTime()}@hols.ca`,
  }
}

const formatProvinceEvent = holiday => {
  return {
    start: startDate(holiday.date),
    end: endDate(holiday.date),
    title: holiday.nameEn,
    description: getProvinceDescription(holiday),
    productId: '-//pcraig3//hols//EN',
    uid: `${new Date(holiday.date).getTime()}@hols.ca`,
  }
}

const downloadICS = (req, res, modifier = null) => {
  return (error, value) => {
    if (error) {
      throw new createError(500, `Error: creating events for route: ${req.path}`)
    }

    res.set({
      'Content-Type': 'text/calendar',
      'Content-disposition': `attachment; filename=canada-holidays-${
        modifier ? `${modifier}-` : ''
      }${getCurrentHolidayYear()}.ics`,
    })
    return res.send(value)
  }
}

router.get('/ics', dbmw(db, getHolidaysWithProvinces), (req, res) => {
  const holidays = res.locals.rows.map(h => formatNationalEvent(h))

  ics.createEvents(holidays, downloadICS(req, res))
})

router.get('/ics/federal', dbmw(db, getHolidaysWithProvinces), (req, res) => {
  const filteredRows = res.locals.rows.filter(h => h.federal)
  const holidays = filteredRows.map(h => formatProvinceEvent(h))

  ics.createEvents(holidays, downloadICS(req, res, 'federal'))
})

router.get('/ics/:provinceId', dbmw(db, getHolidaysWithProvinces), (req, res) => {
  let provinceId = req.params.provinceId
  if (!isProvinceId(provinceId)) {
    return res.redirect(`/province/${provinceId}`)
  }

  provinceId = provinceId.toUpperCase()
  const filteredRows = res.locals.rows.filter(h => {
    return h.provinces.find(p => p.id === provinceId)
  })
  const holidays = filteredRows.map(h => formatProvinceEvent(h))

  ics.createEvents(holidays, downloadICS(req, res, provinceId))
})

module.exports = router
