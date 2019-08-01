const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cookieSession = require('cookie-session')
const renderPage = require('./pages/_document.js')
const { cookieSessionConfig } = require('./utils')
const Promise = require('bluebird')
const db = require('sqlite')

const app = express()

app
  .use(helmet())
  // both of these are needed to parse post request params
  .use(express.urlencoded({ extended: true }))
  .use(express.json())

// if NODE_ENV does not equal 'test', add a request logger
process.env.NODE_ENV !== 'test' && app.use(logger('dev'))

app.use(cookieSession(cookieSessionConfig))

app.get('/page/:page', (req, res) => {
  res.send(
    renderPage({
      pageComponent: 'Page',
      title: req.params.page,
      props: { name: req.params.page },
    }),
  )
})

const array2Obj = (arr, key = 'id') => {
  return arr.reduce(function(obj, item) {
    obj[item[key]] = item //a, b, c
    return obj
  }, {})
}

const getProvinces = () => {
  return db.all('SELECT * FROM Province ORDER BY id ASC;')
}

const getHolidays = () => {
  return db.all('SELECT * FROM Holiday ORDER BY id ASC;')
}

const getProvincesWithHolidays = async () => {
  const provinces = await db.all('SELECT * FROM Province ORDER BY id ASC;')
  provinces.map(p => (p.holidays = []))
  const provincesObj = array2Obj(provinces)

  const holidays = await db.all('SELECT * FROM Holiday ORDER BY id ASC;')
  const holidaysObj = array2Obj(holidays)

  const pcs = await db.all('SELECT * FROM ProvinceHoliday')

  pcs.map(pc => {
    provincesObj[pc.province_id].holidays.push(holidaysObj[pc.holiday_id])
  })

  return Object.values(provincesObj)
}

const dbmw = cb => {
  return async (req, res, next) => {
    try {
      res.locals.rows = await cb()
    } catch (err) {
      return next(err)
    }

    return next()
  }
}

app.get('/provinces', dbmw(getProvinces), (req, res) => {
  return res.send(
    renderPage({
      pageComponent: 'Provinces',
      title: 'Provinces',
      props: { data: { provinces: res.locals.rows } },
    }),
  )
})

app.get('/provinces.json', dbmw(getProvinces), (req, res) => {
  return res.send(res.locals.rows)
})

app.get('/holidays.json', dbmw(getHolidays), (req, res) => {
  return res.send(res.locals.rows)
})

app.get('/ph.json', dbmw(getProvincesWithHolidays), (req, res) => {
  return res.send(res.locals.rows)
})

app.get('/', (req, res) => {
  res.redirect(302, 'page/stuff')
})

// basic HTTP server via express:
const port = process.env.PORT || 3000

Promise.resolve()
  // First, try to open the database
  .then(() => db.open('./database.sqlite', { Promise })) // <=
  // Update db schema to the latest version using SQL-based migrations
  .then(() => db.migrate({ force: 'last' })) // <=
  // Display error message if something went wrong
  .catch(err => console.error(err.stack)) // eslint-disable-line no-console
  // Finally, launch the Node.js app
  .finally(() => {
    return app.listen(port, err => {
      if (err) throw err
      // eslint-disable-next-line no-console
      console.log(`Ready on http://localhost:${port}`)
    })
  })

// module.exports = app
