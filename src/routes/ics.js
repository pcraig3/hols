const express = require('express')
const router = express.Router()
const ics = require('ics')
const createError = require('http-errors')
const {
  dbmw,
  getRequestYear,
  isProvinceId,
  requireFourDigitYear,
  requireTwoLetterProvinceId,
} = require('../utils/index')
const { getCurrentHolidayYear } = require('../dates/index')
const { ALLOWED_YEARS } = require('../config/vars.config')
const {
  startDate,
  endDate,
  getCurrentTimestamp,
  getTitle,
  getUid,
  getNationalDescription,
  getProvinceDescription,
  getObservedDateNote,
} = require('../utils/ics')
const { localizedName } = require('../i18n')
const { getHolidaysWithProvinces } = require('../queries')

// Read the mount prefix, not the URL path, so legacy /ics stays English.
router.use((req, res, next) => {
  res.locals.icsLocale = req.baseUrl === '/fr' ? 'fr' : 'en'
  next()
})

/**
 * Formats a national ICS event with localized text.
 * @param {Object} holiday
 * @param {'en'|'fr'} [locale='en']
 * @returns {Object}
 */
const formatNationalEvent = (holiday, locale = 'en') => {
  return {
    start: startDate(holiday.date),
    end: endDate(holiday.date),
    title: getTitle(holiday, locale),
    description: [
      getObservedDateNote(holiday, locale),
      getNationalDescription(holiday, locale),
    ].filter(Boolean).join('\n\n'),
    productId: `-//pcraig3//hols//${locale.toUpperCase()}`,
    uid: `${getUid(holiday)}@hols.ca`,
    timestamp: getCurrentTimestamp(),
  }
}

/**
 * Formats a provincial or federal ICS event with localized text.
 * @param {Object} holiday
 * @param {'en'|'fr'} [locale='en']
 * @returns {Object}
 */
const formatProvinceEvent = (holiday, locale = 'en') => {
  return {
    start: startDate(holiday.date),
    end: endDate(holiday.date),
    title: localizedName(holiday, locale),
    description: [
      getObservedDateNote(holiday, locale),
      getProvinceDescription(holiday, locale),
    ].filter(Boolean).join('\n\n'),
    productId: `-//pcraig3//hols//${locale.toUpperCase()}`,
    uid: `${getUid(holiday)}@hols.ca`,
    timestamp: getCurrentTimestamp(),
  }
}


const downloadICS = ({
  req,
  res,
  modifier = null,
  year = getCurrentHolidayYear(),
  contentDisposition = true,
  locale = 'en',
}) => {
  return (error, value) => {
    if (error) {
      throw new createError(500, `Error: creating events for route: ${req.path}`)
    }

    res.set({
      'Content-Type': 'text/calendar',
    })

    if (contentDisposition) {
      const filename = `canada-holidays-${modifier ? `${modifier}-` : ''}${year}${locale === 'fr' ? '-fr' : ''}.ics`

      res.set({
        'Content-disposition': `attachment; filename=${filename}`,
      })
    }

    return res.send(value)
  }
}

const _isBadYear = (year) => {
  return !ALLOWED_YEARS.find((y) => y === parseInt(year))
}

const _getParams = (req, res) => {
  const year = getRequestYear(req) || res.locals.year

  return {
    year,
    filenameYear: getRequestYear(req) ? year : `${year}-${parseInt(year) + 1}`,
    provinceId: req.params.provinceId,
    contentDisposition: req.query.cd && req.query.cd !== 'false' ? true : false,
  }
}

const getICSHolidays = (req, res, next) => {
  const getHolidays = (db, options) => {
    const holidays = getHolidaysWithProvinces(db, options)

    if (!getRequestYear(req)) {
      holidays.push(
        ...getHolidaysWithProvinces(db, {
          ...options,
          year: options.year + 1,
        }),
      )
    }

    return holidays
  }

  return dbmw(getHolidays)(req, res, next)
}

router.get(
  ['/ics', '/ics/:year'],
  requireFourDigitYear,
  getICSHolidays,
  (req, res) => {
    let { year, filenameYear, contentDisposition } = _getParams(req, res)
    if (_isBadYear(year)) return res.redirect('/')

    const holidays = res.locals.rows.map((h) => formatNationalEvent(h, res.locals.icsLocale))

    ics.createEvents(holidays, downloadICS({ req, res, year: filenameYear, contentDisposition, locale: res.locals.icsLocale }))
  },
)

router.get(
  ['/ics/federal', '/ics/federal/:year'],
  requireFourDigitYear,
  getICSHolidays,
  (req, res) => {
    let { year, filenameYear, contentDisposition } = _getParams(req, res)
    if (_isBadYear(year)) return res.redirect('/federal')

    const filteredRows = res.locals.rows.filter((h) => h.federal)
    const holidays = filteredRows.map((h) => formatProvinceEvent(h, res.locals.icsLocale))

    ics.createEvents(
      holidays,
      downloadICS({ req, res, modifier: 'federal', year: filenameYear, contentDisposition, locale: res.locals.icsLocale }),
    )
  },
)

router.get(
  ['/ics/:provinceId', '/ics/:provinceId/:year'],
  requireTwoLetterProvinceId,
  requireFourDigitYear,
  getICSHolidays,
  (req, res) => {
    let { year, filenameYear, provinceId, contentDisposition } = _getParams(req, res)
    if (!isProvinceId(provinceId) || _isBadYear(year)) {
      return res.redirect(`/provinces/${provinceId}`)
    }

    provinceId = provinceId.toUpperCase()
    const filteredRows = res.locals.rows.filter((h) => h.provinces.find((p) => p.id === provinceId))
    const holidays = filteredRows.map((h) => formatProvinceEvent(h, res.locals.icsLocale))

    ics.createEvents(
      holidays,
      downloadICS({ req, res, modifier: provinceId, year: filenameYear, contentDisposition, locale: res.locals.icsLocale }),
    )
  },
)

module.exports = router
