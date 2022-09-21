const { array2Obj } = require('../utils')
const { getObservedDate, getLiteralDate } = require('../dates')

const _getProvinces = (db) => db().prepare('SELECT * FROM Province ORDER BY id ASC;').all()

const _getProvinceById = (db, provinceId) => {
  return db().prepare('SELECT * FROM Province WHERE id = ? ORDER BY id ASC;').all(provinceId)
}

const getProvinces = (db, { provinceId } = {}) => {
  if (provinceId) {
    return _getProvinceById(db, provinceId)
  }

  return _getProvinces(db)
}

const _getHolidays = (db) => db().prepare('SELECT * FROM Holiday ORDER BY id ASC;').all()

const _getHolidayById = (db, holidayId) => {
  return db().prepare('SELECT * FROM Holiday WHERE id = ? ORDER BY id ASC;').all(holidayId)
}

const _getFederalHolidays = (db, federal) => {
  return db().prepare('SELECT * FROM Holiday WHERE federal = ? ORDER BY id ASC;').all(federal)
}

const _parseBoolean = (value) => {
  if (!value) {
    return null
  }

  const yes = ['1', 'true']
  const no = ['0', 'false']

  value = value.toLowerCase()

  return yes.includes(value) ? 1 : no.includes(value) ? 0 : null
}

const getHolidays = (db, { holidayId, federal, year }) => {
  let holidays = []
  federal = _parseBoolean(federal)

  if (holidayId) {
    holidays = _getHolidayById(db, holidayId)
  } else if (federal !== null) {
    holidays = _getFederalHolidays(db, federal)
  } else {
    holidays = _getHolidays(db)
  }

  return holidays
    .filter((holiday) => {
      // filter out holidays that didn't used to exist (truth and reconciliation day)
      const { firstOccurence } = holiday
      return firstOccurence ? parseInt(firstOccurence) <= year : true
    })
    .filter((holiday) => {
      // filter out holidays that are no longer observed (Day of Mourning)
      const { lastOccurence } = holiday
      return lastOccurence ? parseInt(lastOccurence) >= year : true
    })
    .map((holiday) => {
      // format output for API
      const dateString = holiday.date
      holiday.date = getLiteralDate(dateString, year)
      holiday.observedDate = getObservedDate(dateString, year)
      delete holiday.firstOccurence
      delete holiday.lastOccurence
      return holiday
    })
}

const _getProvinceHolidays = (db, { optional }) => {
  optional = _parseBoolean(optional)

  if (optional) {
    return db().prepare('SELECT * FROM ProvinceHoliday;').all()
  }

  return db().prepare('SELECT * FROM ProvinceHoliday WHERE optional = 0;').all()
}

const getNextHoliday = (provinces) => {
  // relies on the assumption that the dates are currently sorted earliest to latest
  provinces.map((province) => {
    province.nextHoliday = province.holidays.find((holiday) => {
      // compare iso strings: eg, "2019-09-04" >= "2019-08-04"
      return holiday.observedDate >= new Date(Date.now()).toISOString().substring(0, 10)
    })
  })
}

const getProvincesWithHolidays = (db, { provinceId, year, optional }) => {
  const provincesObj = array2Obj(getProvinces(db, { provinceId }))
  Object.values(provincesObj).map((p) => (p.holidays = []))

  const holidaysObj = array2Obj(getHolidays(db, { year }))

  const phs = _getProvinceHolidays(db, { optional })

  phs.map((ph) => {
    // if the holiday does not exist in holidaysObj, it was removed (probably it is too early or expired)
    if (provincesObj[ph.provinceId] && holidaysObj[ph.holidayId]) {
      if (ph.optional) {
        holidaysObj[ph.holidayId]['optional'] = 1
      }

      provincesObj[ph.provinceId].holidays.push(holidaysObj[ph.holidayId])
    }
  })

  // mutates the object, adds a "nextHoliday" key
  getNextHoliday(Object.values(provincesObj))

  return Object.values(provincesObj)
}

const getHolidaysWithProvinces = (db, { holidayId, federal, year, optional }) => {
  const holidaysObj = array2Obj(getHolidays(db, { holidayId, federal, year }))
  Object.values(holidaysObj).map((h) => (h.provinces = []))

  const provincesObj = array2Obj(getProvinces(db))

  const phs = _getProvinceHolidays(db, { optional })

  phs.map((ph) => {
    if (holidaysObj[ph.holidayId]) {
      if (ph.optional) {
        provincesObj[ph.provinceId]['optional'] = 1
      }
      holidaysObj[ph.holidayId].provinces.push(provincesObj[ph.provinceId])
    }
  })

  // loop through holidays and remove any with empty provinces that are not federal
  const holidays = Object.values(holidaysObj).filter((h) => {
    return h.provinces.length !== 0 || h.federal
  })

  return holidays
}

module.exports = {
  _parseBoolean,
  getProvinces,
  getHolidays,
  getProvincesWithHolidays,
  getHolidaysWithProvinces,
}
