const { h } = require('preact')
const htm = require('htm')
const validator = require('validator')

const html = htm.bind(h)

// Middleware

// takes a function that is a database query
// this middleware is a convience function so that we don't have to write
// "try / catch" in all our database query functions
const dbmw = (db, cb) => {
  return async (req, res, next) => {
    // allow query parameters or url parameters to be passed in
    let options = {
      holidayId: req.params.holidayId,
      provinceId: req.params.provinceId,
      federal: req.query.federal,
    }

    try {
      res.locals.rows = await cb(db, options)
    } catch (err) {
      return next(err)
    }

    return next()
  }
}

// return a meta tag if a GITHUB_SHA environment variable exists
const metaIfSHA = () =>
  process.env.GITHUB_SHA &&
  `<meta name="keywords" content="GITHUB_SHA=${validator.escape(process.env.GITHUB_SHA)}" />`

// cookie session config
const halfAnHour = 1000 * 60 * 30
const sessionName = `hols-${process.env.COOKIE_SECRET ||
  Math.floor(new Date().getTime() / halfAnHour)}`

const cookieSessionConfig = {
  name: sessionName,
  secret: sessionName,
  cookie: {
    httpOnly: true,
    maxAge: halfAnHour,
    sameSite: true,
  },
}

/**
 * Function to take an array of objects and object of objects
 * with the keys being one of the inner-object values
 *
 * ie:
 * -> [{id: 'abc', name: 'Paul'}, {id: 'def', name: 'Joe'}, {id: 'ghi', name: 'Catrina'}]
 * -> {
 *   abc: {id: 'abc', name: 'Paul'},
 *   def: {id: 'def', name: 'Joe'},
 *   ghi: {id: 'ghi', name: 'Catrina'}
 *   }
 *
 * @param {*} arr an array of objects
 * @param {*} key the key whose value use as the top-level key
 */
const array2Obj = (arr, key = 'id') => {
  return arr.reduce(function(obj, item) {
    obj[item[key]] = item
    return obj
  }, {})
}

/**
 * This function takes an array of holidays and returns the closest upcoming
 * holiday that the most provinces celebrate
 *
 * @param {Array} holidays an array of holidays
 * @param {String} dateString an optional dateString
 */
const nextHoliday = (holidays, dateString) => {
  if (!dateString) {
    dateString = new Date().toISOString().substring(0, 10)
  }

  const nextDate = holidays.find(holiday => {
    return holiday.date >= dateString
  }).date

  const nextHolidays = holidays.filter(holiday => holiday.date === nextDate)

  nextHolidays.sort((h1, h2) => {
    if (h1.provinces.length <= h2.provinces.length) {
      return 1
    }

    return -1
  })

  return nextHolidays[0]
}

/**
 * This function takes an array of holidays and returns only the remaining upcoming holidays
 *
 * @param {Array} holidays an array of holidays
 * @param {String} dateString an optional dateString
 */
const upcomingHolidays = (holidays, dateString) => {
  if (!dateString) {
    dateString = new Date().toISOString().substring(0, 10)
  }

  return holidays.filter(holiday => holiday.date >= dateString)
}

module.exports = {
  html,
  metaIfSHA,
  cookieSessionConfig,
  array2Obj,
  dbmw,
  nextHoliday,
  upcomingHolidays,
}
