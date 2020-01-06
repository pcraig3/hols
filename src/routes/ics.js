const express = require('express')
const router = express.Router()
const db = require('sqlite')
const ics = require('ics')
const createError = require('http-errors')
const { dbmw } = require('../utils/index')
const { startDate, endDate, getTitle, getDescription } = require('../utils/ics')
const { getHolidaysWithProvinces } = require('../queries')

/**
 * Returns an event formatted in a way the ICS library understands
 * @param {obj} holiday a holiday object
 */
const formatEvent = holiday => {
  return {
    start: startDate(holiday.date),
    end: endDate(holiday.date),
    title: getTitle(holiday),
    description: getDescription(holiday),
    productId: '-//pcraig3//hols//EN',
    uid: `${new Date(holiday.date).getTime()}@hols.ca`,
  }
}

/*
 titles say which provinces observe
 make the date thing a method
*/
router.get('/ics', dbmw(db, getHolidaysWithProvinces), (req, res) => {
  const holiday = res.locals.rows[3]

  ics.createEvent(formatEvent(holiday), (error, value) => {
    if (error) {
      throw new createError(500, `Error: creating events for route: ${req.path}`)
    }

    res.set({
      'Content-Type': 'text/calendar',
      'Content-disposition': 'attachment; filename=canada-holidays-2020.ics',
    })
    return res.send(value)
  })
})

router.get('/ics/test', dbmw(db, getHolidaysWithProvinces), (req, res) => {
  const formattedEvents = [res.locals.rows[1]].map(h => formatEvent(h))

  ics.createEvents(formattedEvents, (error, value) => {
    if (error) {
      throw new createError(500, `Error: creating events for route: ${req.path}`)
    }

    // eslint-disable-next-line no-console
    console.log(value)
  })

  return res.send('ok')
})

module.exports = router
