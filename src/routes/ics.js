const express = require('express')
const router = express.Router()
const db = require('sqlite')
const ics = require('ics')
const createError = require('http-errors')
const addDays = require('date-fns/addDays')
const { dbmw } = require('../utils')
const { getHolidaysWithProvinces } = require('../queries')

/**
 * Takes an ISO-formatted date string (1990-10-08), and returns an array with [year, month, day]
 * @param {string} dateString an ISO-formatted date string (1990-10-08)
 */
const startDate = dateString => dateString.split('-')

/**
 * Takes an ISO-formatted date string (1990-10-08), and returns an array with the [year, month, day] of the NEXT day
 * @param {*} dateString an ISO-formatted date string (1990-10-08)
 */
const endDate = dateString =>
  addDays(new Date(dateString), 1)
    .toISOString()
    .substring(0, 10)
    .split('-')

/**
 * Returns a description string for .ics files
 * If a national holiday, returns "National holiday" else a warning that the holiday isn't observed everywhere
 * @param {obj} holiday a holiday object containing a 'provinces' key
 */
const getDescription = holiday =>
  holiday.provinces.length === 13
    ? 'National holiday'
    : 'This is not a national holiday; it may not be observed in your region'

/**
 * Returns an event formatted in a way the ICS library understands
 * @param {obj} holiday a holiday object
 */
const formatEvent = holiday => {
  return {
    start: startDate(holiday.date),
    end: endDate(holiday.date),
    title: holiday.nameEn,
    description: getDescription(holiday),
    productId: '-//pcraig3//hols//EN',
    uid: `${new Date(holiday.date).getTime()}@hols.ca`,
  }
}

/*
 titles say which provinces observe
 write a test
 make the date thing a method
*/
router.get('/ics', dbmw(db, getHolidaysWithProvinces), (req, res) => {
  const holiday = res.locals.rows[1]

  ics.createEvent(formatEvent(holiday), (error, value) => {
    if (error) {
      throw new createError(500, 'Error: creating events for route: /ics')
    }

    res.set({
      'Content-Type': 'text/calendar',
      'Content-disposition': 'attachment; filename=newYear.ics',
    })
    return res.send(value)
  })
})

router.get('/ics/test', dbmw(db, getHolidaysWithProvinces), (req, res) => {
  const holiday = res.locals.rows[1]

  ics.createEvent(formatEvent(holiday), (error, value) => {
    if (error) {
      throw new createError(500, 'Error: creating events for route: /ics/test')
    }

    // eslint-disable-next-line no-console
    console.log(value)
  })

  return res.send('ok')
})

module.exports = router
