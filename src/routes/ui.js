const express = require('express')
const router = express.Router()
const db = require('sqlite')
const createError = require('http-errors')
const renderPage = require('../pages/_document.js')
const { dbmw, checkProvinceIdErr, upcomingHolidays, nextHoliday } = require('../utils')
const { getHolidaysWithProvinces, getProvincesWithHolidays } = require('../queries')
const { displayDate } = require('../dates')

const getMeta = (holiday, provinceName = 'Canada') =>
  `${provinceName}’s next holiday is ${holiday.nameEn} on ${displayDate(holiday.date)}`

router.get('/', dbmw(db, getHolidaysWithProvinces), (req, res) => {
  const holidays = upcomingHolidays(res.locals.rows)
  const nextHol = nextHoliday(holidays)

  return res.send(
    renderPage({
      pageComponent: 'Canada',
      title: 'Canada’s next public holiday',
      meta: getMeta(nextHol),
      props: { data: { holidays, nextHoliday: nextHol } },
    }),
  )
})

router.get(
  '/province/:provinceId',
  dbmw(db, getProvincesWithHolidays),
  checkProvinceIdErr,
  (req, res) => {
    const province = res.locals.rows[0]
    province.holidays = upcomingHolidays(province.holidays)

    return res.send(
      renderPage({
        pageComponent: 'Province',
        title: `${province.nameEn}’s next public holiday`,
        meta: getMeta(province.nextHoliday, province.name_en),
        props: { data: { province } },
      }),
    )
  },
)

router.get('*', (req, res) => {
  res.status(404)
  throw new createError(404, 'Oopsie daisy. Maybe head back to the home page? 👇')
})

// eslint-disable-next-line no-unused-vars
router.use(function(err, req, res, next) {
  return res.send(
    renderPage({
      pageComponent: 'Error',
      title: `${res.statusCode}`,
      props: {
        data: {
          status: res.statusCode,
          message: err.message,
        },
      },
    }),
  )
})

module.exports = router
