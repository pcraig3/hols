const { array2Obj } = require('./utils')
const { getISODate } = require('./dates')

const getProvinces = db => {
  return db.all('SELECT * FROM Province ORDER BY id ASC;')
}

const getHolidays = db => {
  const holidays = db.all('SELECT * FROM Holiday ORDER BY id ASC;')

  return holidays.map(holiday => {
    holiday.date = getISODate(holiday.date_string)
    delete holiday.date_string
    return holiday
  })
}

const getProvincesWithHolidays = async db => {
  const provincesObj = array2Obj(await getProvinces(db))
  Object.values(provincesObj).map(p => (p.holidays = []))

  const holidaysObj = array2Obj(await getHolidays(db))

  const phs = await db.all('SELECT * FROM ProvinceHoliday')

  phs.map(ph => {
    provincesObj[ph.province_id].holidays.push(holidaysObj[ph.holiday_id])
  })

  return Object.values(provincesObj)
}

const getHolidaysWithProvinces = async db => {
  const holidaysObj = array2Obj(await getHolidays(db))
  Object.values(holidaysObj).map(h => (h.provinces = []))

  const provincesObj = array2Obj(await getProvinces(db))

  const phs = await db.all('SELECT * FROM ProvinceHoliday')

  phs.map(ph => {
    holidaysObj[ph.holiday_id].provinces.push(provincesObj[ph.province_id])
  })

  return Object.values(holidaysObj)
}

module.exports = { getProvinces, getHolidays, getProvincesWithHolidays, getHolidaysWithProvinces }
