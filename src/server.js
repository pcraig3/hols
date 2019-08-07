const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cookieSession = require('cookie-session')
const db = require('sqlite')
const createError = require('http-errors')
const renderPage = require('./pages/_document.js')
const { cookieSessionConfig, dbmw, checkProvinceIdErr } = require('./utils')
const { getProvinces, getProvincesWithHolidays } = require('./queries')

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

const uiRouter = require('./routes/ui')
app.use(uiRouter)

app.get('/provinces', dbmw(db, getProvinces), (req, res) => {
  return res.send(
    renderPage({
      pageComponent: 'Provinces',
      title: 'Provinces',
      props: { data: { provinces: res.locals.rows } },
    }),
  )
})

app.get(
  '/province/:provinceId',
  dbmw(db, getProvincesWithHolidays),
  checkProvinceIdErr,
  (req, res) => {
    return res.send(res.locals.rows)
  },
)

app.get('*', (req, res) => {
  res.status(404)
  throw new createError(404, 'Oopsie daisy. Maybe head back to the home page? 👇')
})

// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
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

module.exports = app
