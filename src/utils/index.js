const { h } = require('preact')
const htm = require('htm')
const validator = require('validator')
const createError = require('http-errors')

const html = htm.bind(h)

// Middleware

// takes a function that is a database query
// this middleware is a convience function so that we don't have to write
// "try / catch" in all our database query functions
const dbmw = (db, cb) => {
  return async (req, res, next) => {
    const _parseFederal = req => {
      if (req.query.federal !== undefined) {
        return req.query.federal
      }

      if (req.path === '/federal') {
        return 'true'
      }

      return undefined
    }

    const _parseYear = req => {
      const year = parseInt(req.query.year)

      if (![2019, 2020, 2021].includes(year)) {
        return new Date().getUTCFullYear()
      }

      return year
    }

    // allow query parameters or url parameters to be passed in
    let options = {
      holidayId: req.params.holidayId,
      provinceId: req.params.provinceId,
      federal: _parseFederal(req),
      year: _parseYear(req),
    }

    try {
      res.locals.rows = await cb(db, options)
    } catch (err) {
      return next(err)
    }

    return next()
  }
}

// middleware for returning "province id doesn't exist" errors
const checkProvinceIdErr = (req, res, next) => {
  const provinceMsg =
    'Accepted province IDs are: [AB, BC, MB, NB, NL, NS, NT, NU, ON, PE, QC, SK, YT].'
  if (!res.locals.rows.length) {
    res.status(400)
    next(createError(400, `Error: No province with id “${req.params.provinceId}”. ${provinceMsg}`))
  }

  next()
}

// return a meta tag if a GITHUB_SHA environment variable exists
const metaIfSHA = () =>
  process.env.GITHUB_SHA &&
  `<meta name="keywords" content="GITHUB_SHA=${validator.escape(process.env.GITHUB_SHA)}" />`

// return analytics scripts if "production" rather than dev
const gaIfProd = () =>
  process.env.NODE_ENV === 'production' &&
  `<script src="/js/ga.js"></script>
  <script async src='https://www.google-analytics.com/analytics.js'></script>
  `

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
  gaIfProd,
  array2Obj,
  dbmw,
  checkProvinceIdErr,
  nextHoliday,
  upcomingHolidays,
}
