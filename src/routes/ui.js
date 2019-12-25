const express = require('express')
const router = express.Router()
const db = require('sqlite')
const createError = require('http-errors')
const renderPage = require('../pages/_document.js')
const { dbmw, checkProvinceIdErr, nextHoliday } = require('../utils')
const { getProvinces, getHolidaysWithProvinces, getProvincesWithHolidays } = require('../queries')
const { displayDate } = require('../dates')

const getMeta = holiday => `${holiday.nameEn} on ${displayDate(holiday.date)}`

router.get('/', dbmw(db, getHolidaysWithProvinces), (req, res) => {
  const holidays = res.locals.rows
  const nextHol = nextHoliday(holidays)

  const meta = `Canada’s next stat holiday is ${getMeta(
    nextHol,
  )}. See all statutory holidays in Canada in 2019.`

  return res.send(
    renderPage({
      pageComponent: 'Province',
      title: 'Canadian statutory holidays in 2019',
      docProps: { meta, path: req.path },
      props: { data: { holidays, nextHoliday: nextHol } },
    }),
  )
})

router.get(
  '/province/:provinceId',
  dbmw(db, getProvincesWithHolidays),
  checkProvinceIdErr,
  (req, res) => {
    const year = new Date(Date.now()).getUTCFullYear()
    const { holidays, nextHoliday, nameEn: provinceName, id: provinceId } = res.locals.rows[0]

    const meta = `${provinceId}’s next stat holiday is ${getMeta(
      nextHoliday,
    )}. See all statutory holidays in ${provinceName}, Canada in ${year}.`

    return res.send(
      renderPage({
        pageComponent: 'Province',
        title: `${provinceName} (${provinceId}) statutory holidays in ${year}`,
        docProps: { meta, path: req.path },
        props: {
          data: { holidays, nextHoliday, provinceName, provinceId, year },
        },
      }),
    )
  },
)

router.get('/federal', dbmw(db, getHolidaysWithProvinces), (req, res) => {
  const holidays = res.locals.rows
  const nextHol = nextHoliday(holidays)

  const meta = `Canada’s next federal stat holiday is ${getMeta(
    nextHol,
  )}. See all federal statutory holidays in Canada in 2019.`

  return res.send(
    renderPage({
      pageComponent: 'Province',
      title: 'Federal statutory holidays in Canada in 2019',
      docProps: { meta, path: req.path },
      props: { data: { holidays, nextHoliday: nextHol, federal: true } },
    }),
  )
})

router.get('/provinces', dbmw(db, getProvinces), (req, res) => {
  return res.send(
    renderPage({
      pageComponent: 'Provinces',
      title: 'All regions in Canada — Canada statutory holidays',
      docProps: {
        meta:
          'Upcoming stat holidays for all regions in Canada. See all federal statutory holidays in Canada in 2019.',
        path: req.path,
      },
      props: { data: { provinces: res.locals.rows } },
    }),
  )
})

router.get('/province', (req, res) => res.redirect(302, '/provinces'))

router.get('/do-federal-holidays-apply-to-me', (req, res) => {
  return res.send(
    renderPage({
      pageComponent: 'FederallyRegulated',
      title: 'Do federal holidays apply to me? — Canada statutory holidays',
      docProps: {
        meta: 'How to tell if you get federal holidays or provincial holidays in Canada.',
        path: req.path,
      },
    }),
  )
})

router.get('/about', dbmw(db, getHolidaysWithProvinces), (req, res) => {
  const nextHol = nextHoliday(res.locals.rows)

  return res.send(
    renderPage({
      pageComponent: 'About',
      title: 'About — Canada statutory holidays',
      docProps: {
        meta: 'Give feedback, use the API, get in touch, report a proble, etc.',
        path: req.path,
      },
      props: { data: { nextHoliday: nextHol } },
    }),
  )
})

router.get('*', (req, res) => {
  res.status(404)
  throw new createError(404, 'Oopsie daisy. Maybe head back to the home page? 👇')
})

// eslint-disable-next-line no-unused-vars
router.use(function(err, req, res, next) {
  return res.send(
    renderPage({
      pageComponent: 'Error',
      title: `Error: ${res.statusCode} — Canada statutory holidays`,
      docProps: { meta: err.message.split('.')[0], path: req.path },
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
