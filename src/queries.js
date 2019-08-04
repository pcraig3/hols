const { array2Obj } = require('./utils')
const { getISODate } = require('./dates')

const getProvinces = db => {
  return db.all('SELECT * FROM Province ORDER BY id ASC;')
}

const getHolidays = db => {
  const holidays = db.all('SELECT * FROM Holiday ORDER BY id ASC;')

  return holidays.map(holiday => {
    holiday.date = getISODate(holiday.date)
    return holiday
  })
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

const getProvincesWithHolidays = async db => {
  const provincesObj = array2Obj(await getProvinces(db))
  Object.values(provincesObj).map(p => (p.holidays = []))

  const holidaysObj = array2Obj(await getHolidays(db))

  const phs = await db.all('SELECT * FROM ProvinceHoliday')

  phs.map(ph => {
    provincesObj[ph.provinceId].holidays.push(holidaysObj[ph.holidayId])
  })

  // mutates the object, adds a "nextHoliday" key
  getNextHoliday(Object.values(provincesObj))

  return Object.values(provincesObj)
}

const getHolidaysWithProvinces = async db => {
  const holidaysObj = array2Obj(await getHolidays(db))
  Object.values(holidaysObj).map(h => (h.provinces = []))

  const provincesObj = array2Obj(await getProvinces(db))

  const phs = await db.all('SELECT * FROM ProvinceHoliday')

  phs.map(ph => {
    holidaysObj[ph.holidayId].provinces.push(provincesObj[ph.provinceId])
  })

  return Object.values(holidaysObj)
}

module.exports = { getProvinces, getHolidays, getProvincesWithHolidays, getHolidaysWithProvinces }
