const { array2Obj } = require('./utils')
const { getISODate } = require('./dates')

const _getProvinces = db => db.all('SELECT * FROM Province ORDER BY id ASC;')

const _getProvinceById = (db, provinceId) => {
  return db.all('SELECT * FROM Province WHERE id = ? ORDER BY id ASC;', [provinceId.toUpperCase()])
}

const getProvinces = (db, { provinceId } = {}) => {
  if (provinceId) {
    return _getProvinceById(db, provinceId)
  }

  return _getProvinces(db)
}

const _getHolidays = db => db.all('SELECT * FROM Holiday ORDER BY id ASC;')

const _getHolidayById = (db, holidayId) => {
  return db.all('SELECT * FROM Holiday WHERE id = ? ORDER BY id ASC;', [holidayId])
}

const _getFederalHolidays = (db, federal) => {
  return db.all('SELECT * FROM Holiday WHERE federal = ? ORDER BY id ASC;', [federal])
}

const _parseFederal = federal => {
  if (!federal) {
    return null
  }

  const yesFederal = ['1', 'true']
  const noFederal = ['0', 'false']

  federal = federal.toLowerCase()

  return yesFederal.includes(federal) ? 1 : noFederal.includes(federal) ? 0 : null
}

const getHolidays = (db, holidayId, federal) => {
  let holidays = []
  federal = _parseFederal(federal)

  if (holidayId) {
    holidays = _getHolidayById(db, holidayId)
  } else if (federal !== null) {
    holidays = _getFederalHolidays(db, federal)
  } else {
    holidays = _getHolidays(db)
  }

  return holidays.map(holiday => {
    holiday.date = getISODate(holiday.date)
    return holiday
  })
}

const getProvinceHolidays = db => {
  return db.all('SELECT * FROM ProvinceHoliday')
}

const getNextHoliday = provinces => {
  // relies on the assumption that the dates are currently sorted earliest to latest
  provinces.map(province => {
    province.nextHoliday = province.holidays.find(holiday => {
      // compare iso strings: eg, "2019-09-04" >= "2019-08-04"
      return holiday.date >= new Date().toISOString().substring(0, 10)
    })
  })
}

const getProvincesWithHolidays = async (db, { provinceId }) => {
  const provincesObj = array2Obj(await getProvinces(db, { provinceId }))
  Object.values(provincesObj).map(p => (p.holidays = []))

  const holidaysObj = array2Obj(await getHolidays(db))

  const phs = await getProvinceHolidays(db)

  phs.map(ph => {
    if (provincesObj[ph.provinceId]) {
      provincesObj[ph.provinceId].holidays.push(holidaysObj[ph.holidayId])
    }
  })

  // mutates the object, adds a "nextHoliday" key
  getNextHoliday(Object.values(provincesObj))

  return Object.values(provincesObj)
}

const getHolidaysWithProvinces = async (db, { holidayId, federal }) => {
  const holidaysObj = array2Obj(await getHolidays(db, holidayId, federal))
  Object.values(holidaysObj).map(h => (h.provinces = []))

  const provincesObj = array2Obj(await getProvinces(db))

  const phs = await getProvinceHolidays(db)

  phs.map(ph => {
    if (holidaysObj[ph.holidayId]) {
      holidaysObj[ph.holidayId].provinces.push(provincesObj[ph.provinceId])
    }
  })

  return Object.values(holidaysObj)
}

module.exports = { getProvinces, getHolidays, getProvincesWithHolidays, getHolidaysWithProvinces }
