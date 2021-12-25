const { h } = require('preact')
const db = require('sqlite')
const htm = require('htm')
const validator = require('validator')
const createError = require('http-errors')
const { ALLOWED_YEARS, PROVINCE_IDS } = require('../config/vars.config')
const { getCurrentHolidayYear } = require('../dates')

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
        const region = _parseFederal(req) ? 'federal' : req.params.provinceId
        res.locals.year = getCurrentHolidayYear(region)
        return res.locals.year
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
  const GOOD_YEARS = ALLOWED_YEARS.filter((y) => y !== getCurrentHolidayYear(req.params.provinceId))

  if (year && GOOD_YEARS.includes(year)) {
    return res.redirect(`${req.path === '/' ? '' : req.path}/${req.query.year}`)
  }

  next()
}

/**
 * Middleware to check if this page should have a canonical link
 * If it is an error page, not a canonical link
 * If the path includes the year and the year is the same as the currentYear, return the `/` domain (without the year)
 * Otherwise, return the path
 * @param {error} string errors thrown (like 500, 404, whatever)
 * @param {path} string URL path after .ca. Minimum is "/"
 * @param {provinceId} provinceId two letter acronym id of province. "undefined" if Canada or federal
 * @param {year} int the year parameter passed into the URL string
 */
const getCanonical = ({ error, path, provinceId, year }) => {
  if (error) return false

  if (path.includes(year) && year === getCurrentHolidayYear(provinceId)) {
    let urlParts = path.split('/')
    urlParts.pop()
    return urlParts.join('/') || '/'
  }

  return path
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
 * Function that returns the path to the opengraph image to use
 * If it is a province or a "federal" page, use those images. Otherwise, show the generic Canada image
 * @param {String} redion a proper name string like "Prince Edward Island"
 * @param {String} id an acronym ID like "PE"
 */
const getOgImagePath = ({ region, id }) => {
  if (id) return `/img/og-${id.toLowerCase()}.png`
  if (region === 'Federal') return '/img/og-federal.png'
  return '/img/og-canada.png'
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
    return holiday.observedDate >= dateString
  }).observedDate

  const nextHolidays = holidays.filter((holiday) => holiday.observedDate === nextDate)

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

  return holidays.filter((holiday) => holiday.observedDate >= dateString)
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
  getOgImagePath,
  array2Obj,
  dbmw,
  isProvinceId,
  checkProvinceIdErr,
  checkYearErr,
  checkRedirectYear,
  getCanonical,
  param2query,
  nextHoliday,
  upcomingHolidays,
  pe2pei,
  getProvinceIdOrFederalString,
}
