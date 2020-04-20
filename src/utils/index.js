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
    const _parseFederal = (req) => {
      if (req.query.federal !== undefined) {
        return req.query.federal
      }

      if (req.path === '/federal') {
        return 'true'
      }

      return undefined
    }

    const _parseYear = (req) => {
      const year = parseInt(req.query.year)

      if (![2019, 2020, 2021].includes(year)) {
        return getCurrentHolidayYear()
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

// returns true if province ID exists else false. Case insensitive.
const isProvinceId = (provinceId) => {
  return ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'].includes(
    provinceId.toUpperCase(),
  )
}

// middleware for returning "bad year" errors
const checkYearErr = (req, res, next) => {
  const year = parseInt(req.query.year)

  if (![2019, 2020, 2021].includes(year)) {
    res.status(400)
    next(
      createError(400, `Error: No holidays for “${year}”. Accepted years are: [2019, 2020, 2021].`),
    )
  }

  next()
}

// middleware for returning "province id doesn't exist" errors
const checkProvinceIdErr = (req, res, next) => {
  const provinceId = req.params.provinceId

  if (!isProvinceId(provinceId)) {
    res.status(400)
    next(
      createError(
        400,
        `Error: No province with id “${provinceId}”. Accepted province IDs are: [AB, BC, MB, NB, NL, NS, NT, NU, ON, PE, QC, SK, YT].`,
      ),
    )
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
  return arr.reduce(function (obj, item) {
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
    dateString = new Date(Date.now()).toISOString().substring(0, 10)
  }

  const nextDate = holidays.find((holiday) => {
    return holiday.date >= dateString
  }).date

  const nextHolidays = holidays.filter((holiday) => holiday.date === nextDate)

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
    dateString = new Date(Date.now()).toISOString().substring(0, 10)
  }

  return holidays.filter((holiday) => holiday.date >= dateString)
}

/**
 * This function returns the current year, except after December 26th it returns the next year
 */
const getCurrentHolidayYear = () => {
  const d = new Date(Date.now())

  // return the next year if Dec 26 or later
  if (d.getUTCMonth() === 11 && d.getUTCDate() >= 26) {
    return d.getUTCFullYear() + 1
  }

  return d.getUTCFullYear()
}

/**
 * This function returns a provinceId if one is passed in, the string 'federal', if federal exists and is truthy,
 * or undefined, if neither are there.
 *
 * @param { String } provinceId a string representing a province id
 * @param { boolean } federal a true or false whether we're on the federal page
 */
const getProvinceIdOrFederalString = ({ provinceId, federal } = {}) => {
  if (provinceId) {
    return provinceId
  }
  if (federal) {
    return 'federal'
  }

  return undefined
}

module.exports = {
  html,
  metaIfSHA,
  gaIfProd,
  array2Obj,
  dbmw,
  isProvinceId,
  checkProvinceIdErr,
  checkYearErr,
  nextHoliday,
  upcomingHolidays,
  getCurrentHolidayYear,
  getProvinceIdOrFederalString,
}
