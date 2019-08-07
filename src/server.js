const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cookieSession = require('cookie-session')
const db = require('sqlite')
const renderPage = require('./pages/_document.js')
const { cookieSessionConfig, dbmw, nextHoliday, upcomingHolidays } = require('./utils')
const { getProvinces, getHolidaysWithProvinces } = require('./queries')
const { displayDate } = require('./dates')

const app = express()

app
  .use(helmet())
  // both of these are needed to parse post request params
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(express.static('public'))

// if NODE_ENV does not equal 'test', add a request logger
process.env.NODE_ENV !== 'test' && app.use(logger('dev'))

app.use(cookieSession(cookieSessionConfig))

const apiRouter = require('./routes/api')
app.use('/api', apiRouter)

app.get('/provinces', dbmw(db, getProvinces), (req, res) => {
  return res.send(
    renderPage({
      pageComponent: 'Provinces',
      title: 'Provinces',
      props: { data: { provinces: res.locals.rows } },
    }),
  )
})

app.get('/', dbmw(db, getHolidaysWithProvinces), (req, res) => {
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

module.exports = app
