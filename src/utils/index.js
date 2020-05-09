const { h } = require('preact')
const htm = require('htm')
const validator = require('validator')
const createError = require('http-errors')
const { getDB } = require('../db')
const { ALLOWED_YEARS, PROVINCE_IDS } = require('../config/vars.config')

const html = htm.bind(h)

// Middleware

// takes a function that is a database query
// this middleware is a convience function so that we don't have to write
// "try / catch" in all our database query functions
const dbmw = (cb) => {
  return async (req, res, next) => {
    const _parseFederal = (req) => {
      if (req.query.federal !== undefined) {
        return req.query.federal
      }

      if (req.path && req.path.startsWith('/federal')) {
        return 'true'
      }

      return undefined
    }

    const _parseYear = (req) => {
      const year = parseInt(req.query.year)

      if (!ALLOWED_YEARS.includes(year)) {
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
      res.locals.rows = await cb(getDB(), options)
    } catch (err) {
      return next(err)
    }

    return next()
  }
}

// returns true if province ID exists else false. Case insensitive.
const isProvinceId = (provinceId) => {
  return PROVINCE_IDS.includes(provinceId.toUpperCase())
}

// middleware for returning "bad year" errors
const checkYearErr = (req, res, next) => {
  const year = parseInt(req.query.year)

  if (!ALLOWED_YEARS.includes(year)) {
    res.status(400)
    next(
      createError(
        400,
        `Error: No holidays for the year “${year}”. Accepted years are: [${ALLOWED_YEARS.join(
          ', ',
        )}].`,
      ),
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
        `Error: No province with id “${provinceId}”. Accepted province IDs are: [${PROVINCE_IDS.join(
          ', ',
        )}].`,
      ),
    )
  }

  next()
}

// middleware to redirect to permitted /:year endpoints for whitelisted query strings
const checkRedirectYear = (req, res, next) => {
  const year = req.query.year && parseInt(req.query.year)
  const GOOD_YEARS = ALLOWED_YEARS.filter((y) => y !== getCurrentHolidayYear())

  if (year && GOOD_YEARS.includes(year)) {
    return res.redirect(`${req.path === '/' ? '' : req.path}/${req.query.year}`)
  }

  next()
}

// middleware to redirect current year to the not !/:year endpoint
const checkRedirectIfCurrentYear = (req, res, next) => {
  if (getCurrentHolidayYear() === parseInt(req.query.year)) {
    let urlParts = req.path.split('/')
    urlParts.pop()
    return res.redirect(urlParts.join('/') || '/')
  }

  next()
}

// middleware to copy a request parameter into req.query
const param2query = (param) => {
  return (req, res, next) => {
    req.query[param] = req.params[param]
    next()
  }
}

// return a meta tag if a GITHUB_SHA environment variable exists
const metaIfSHA = () =>
  process.env.GITHUB_SHA &&
  `<meta name="keywords" content="GITHUB_SHA=${validator.escape(process.env.GITHUB_SHA)}" />`

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

const pe2pei = (provinceId) => (provinceId === 'PE' ? 'PEI' : provinceId)

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
  array2Obj,
  dbmw,
  isProvinceId,
  checkProvinceIdErr,
  checkYearErr,
  checkRedirectYear,
  checkRedirectIfCurrentYear,
  param2query,
  nextHoliday,
  upcomingHolidays,
  getCurrentHolidayYear,
  pe2pei,
  getProvinceIdOrFederalString,
}
