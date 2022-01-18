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

const _parseFederal = (federal) => {
  if (!federal) {
    return null
  }

  const yesFederal = ['1', 'true']
  const noFederal = ['0', 'false']

  federal = federal.toLowerCase()

  return yesFederal.includes(federal) ? 1 : noFederal.includes(federal) ? 0 : null
}

const getHolidays = (db, { holidayId, federal, year }) => {
  let holidays = []
  federal = _parseFederal(federal)

  if (holidayId) {
    holidays = _getHolidayById(db, holidayId)
  } else if (federal !== null) {
    holidays = _getFederalHolidays(db, federal)
  } else {
    holidays = _getHolidays(db)
  }

  return holidays
    .filter((holiday) => {
      // filter out holidays that didn't used to exist (truth and reconciliation days)
      const { firstOccurence } = holiday
      return firstOccurence ? parseInt(firstOccurence) <= year : true
    })
    .map((holiday) => {
      // format output for API
      const dateString = holiday.date
      holiday.date = getLiteralDate(dateString, year)
      holiday.observedDate = getObservedDate(dateString, year)
      delete holiday.firstOccurence
      return holiday
    })
}

const _getProvinceHolidays = (db) => {
  return db().prepare('SELECT * FROM ProvinceHoliday').all()
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

const getProvincesWithHolidays = (db, { provinceId, year }) => {
  const provincesObj = array2Obj(getProvinces(db, { provinceId }))
  Object.values(provincesObj).map((p) => (p.holidays = []))

  const holidaysObj = array2Obj(getHolidays(db, { year }))

  const phs = _getProvinceHolidays(db)

  phs.map((ph) => {
    if (provincesObj[ph.provinceId]) {
      provincesObj[ph.provinceId].holidays.push(holidaysObj[ph.holidayId])
    }
  })

  // mutates the object, adds a "nextHoliday" key
  getNextHoliday(Object.values(provincesObj))

  return Object.values(provincesObj)
}

const getHolidaysWithProvinces = (db, { holidayId, federal, year }) => {
  const holidaysObj = array2Obj(getHolidays(db, { holidayId, federal, year }))
  Object.values(holidaysObj).map((h) => (h.provinces = []))

  const provincesObj = array2Obj(getProvinces(db))

  const phs = _getProvinceHolidays(db)

  phs.map((ph) => {
    if (holidaysObj[ph.holidayId]) {
      holidaysObj[ph.holidayId].provinces.push(provincesObj[ph.provinceId])
    }
  })

  return Object.values(holidaysObj)
}

module.exports = {
  _parseFederal,
  getProvinces,
  getHolidays,
  getProvincesWithHolidays,
  getHolidaysWithProvinces,
}
