const express = require('express')
const router = express.Router()
const ics = require('ics')
const createError = require('http-errors')
const { dbmw, isProvinceId, param2query } = require('../utils/index')
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
} = require('../utils/ics')
const { getHolidaysWithProvinces } = require('../queries')

/**
 * Returns a NATIONAL event formatted in a way the ICS library understands
 * @param {obj} holiday a holiday object
 */
const formatNationalEvent = (holiday) => {
  return {
    start: startDate(holiday.date),
    end: endDate(holiday.date),
    title: getTitle(holiday),
    description: getNationalDescription(holiday),
    productId: '-//pcraig3//hols//EN',
    uid: `${getUid(holiday)}@hols.ca`,
    timestamp: getCurrentTimestamp(),
  }
}

/**
 * Returns a PROVINCIAL or FEDERAL event formatted in a way the ICS library understands
 * @param {obj} holiday a holiday object
 */
const formatProvinceEvent = (holiday) => {
  return {
    start: startDate(holiday.date),
    end: endDate(holiday.date),
    title: holiday.nameEn,
    description: getProvinceDescription(holiday),
    productId: '-//pcraig3//hols//EN',
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
}) => {
  return (error, value) => {
    if (error) {
      throw new createError(500, `Error: creating events for route: ${req.path}`)
    }

    res.set({
      'Content-Type': 'text/calendar',
    })

    if (contentDisposition) {
      res.set({
        'Content-disposition': `attachment; filename=canada-holidays-${
          modifier ? `${modifier}-` : ''
        }${year}.ics`,
      })
    }

    return res.send(value)
  }
}

const _isBadYear = (year) => {
  return !ALLOWED_YEARS.find((y) => y === parseInt(year))
}

const _getParams = (req, res) => {
  return {
    year: req.query.year || res.locals.year,
    provinceId: req.params.provinceId,
    contentDisposition: req.query.cd && req.query.cd !== 'false' ? true : false,
  }
}

router.get(
  ['/ics', '/ics/:year(\\d{4})'],
  param2query('year'),
  dbmw(getHolidaysWithProvinces),
  (req, res) => {
    let { year, contentDisposition } = _getParams(req, res)
    if (_isBadYear(year)) return res.redirect('/')

    const holidays = res.locals.rows.map((h) => formatNationalEvent(h))

    ics.createEvents(holidays, downloadICS({ req, res, year, contentDisposition }))
  },
)

router.get(
  ['/ics/federal', '/ics/federal/:year(\\d{4})'],
  param2query('year'),
  dbmw(getHolidaysWithProvinces),
  (req, res) => {
    let { year, contentDisposition } = _getParams(req, res)
    if (_isBadYear(year)) return res.redirect('/federal')

    const filteredRows = res.locals.rows.filter((h) => h.federal)
    const holidays = filteredRows.map((h) => formatProvinceEvent(h))

    ics.createEvents(
      holidays,
      downloadICS({ req, res, modifier: 'federal', year, contentDisposition }),
    )
  },
)

router.get(
  ['/ics/:provinceId(\\w{2})', '/ics/:provinceId(\\w{2})/:year(\\d{4})'],
  param2query('year'),
  dbmw(getHolidaysWithProvinces),
  (req, res) => {
    let { year, provinceId, contentDisposition } = _getParams(req, res)
    if (!isProvinceId(provinceId) || _isBadYear(year)) {
      return res.redirect(`/provinces/${provinceId}`)
    }

    provinceId = provinceId.toUpperCase()
    const filteredRows = res.locals.rows.filter((h) => h.provinces.find((p) => p.id === provinceId))
    const holidays = filteredRows.map((h) => formatProvinceEvent(h))

    ics.createEvents(
      holidays,
      downloadICS({ req, res, modifier: provinceId, year, contentDisposition }),
    )
  },
)

module.exports = router
