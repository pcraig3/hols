const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cookieSession = require('cookie-session')
const db = require('sqlite')
const renderPage = require('./pages/_document.js')
const { cookieSessionConfig, dbmw, nextHoliday, upcomingHolidays } = require('./utils')
const { getProvinces, getHolidaysWithProvinces } = require('./queries')

const app = express()

app
  .use(helmet())
  // both of these are needed to parse post request params
  .use(express.urlencoded({ extended: true }))
  .use(express.json())

// if NODE_ENV does not equal 'test', add a request logger
process.env.NODE_ENV !== 'test' && app.use(logger('dev'))

app.use(cookieSession(cookieSessionConfig))

const apiRouter = require('./routes/api')
app.use('/api', apiRouter)

app.get('/page/:page', (req, res) => {
  res.send(
    renderPage({
      pageComponent: 'Page',
      title: req.params.page,
      props: { name: req.params.page },
    }),
  )
})

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

  return res.send(
    renderPage({
      pageComponent: 'Canada',
      title: 'Canada',
      props: { data: { holidays, nextHoliday: nextHoliday(holidays) } },
    }),
  )
})

module.exports = app
