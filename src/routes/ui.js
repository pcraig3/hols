const express = require('express')
const router = express.Router()
const db = require('sqlite')
const renderPage = require('../pages/_document.js')
const { dbmw, upcomingHolidays, nextHoliday } = require('../utils')
const { getHolidaysWithProvinces } = require('../queries')
const { displayDate } = require('../dates')

router.get('/', dbmw(db, getHolidaysWithProvinces), (req, res) => {
  const holidays = upcomingHolidays(res.locals.rows)
  const nextHol = nextHoliday(holidays)

  const meta = `Canada’s next holiday is ${nextHol.nameEn} on ${displayDate(nextHol.date)}`

  return res.send(
    renderPage({
      pageComponent: 'Canada',
      title: 'Canada’s next public holiday',
      meta,
      props: { data: { holidays, nextHoliday: nextHol } },
    }),
  )
})

module.exports = router
