const { array2Obj } = require('./utils')

const getProvinces = db => {
  return db.all('SELECT * FROM Province ORDER BY id ASC;')
}

const getHolidays = db => {
  return db.all('SELECT * FROM Holiday ORDER BY id ASC;')
}

const getProvincesWithHolidays = async db => {
  const provinces = await getProvinces(db)
  provinces.map(p => (p.holidays = []))
  const provincesObj = array2Obj(provinces)

  const holidays = await getHolidays(db)
  const holidaysObj = array2Obj(holidays)

  const pcs = await db.all('SELECT * FROM ProvinceHoliday')

  pcs.map(pc => {
    provincesObj[pc.province_id].holidays.push(holidaysObj[pc.holiday_id])
  })

  return Object.values(provincesObj)
}

module.exports = { getProvinces, getHolidays, getProvincesWithHolidays }
