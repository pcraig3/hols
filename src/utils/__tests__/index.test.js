const {
  array2Obj,
  nextHoliday,
  upcomingHolidays,
  getCurrentHolidayYear,
  isProvinceId,
  pe2pei,
  getProvinceIdOrFederalString,
} = require('../index')
const holidays = require('./data.skip')

describe('Test array2Obj', () => {
  let arr = [
    { id: 'abc', name: 'Paul' },
    { id: 'def', name: 'Joe' },
    { id: 'ghi', name: 'Catrina' },
  ]

  test('returns object with id field as keys', () => {
    let obj = {
      abc: { id: 'abc', name: 'Paul' },
      def: { id: 'def', name: 'Joe' },
      ghi: { id: 'ghi', name: 'Catrina' },
    }

    expect(array2Obj(arr)).toEqual(obj)
  })

  test('returns object with another field as keys', () => {
    let obj = {
      Paul: { id: 'abc', name: 'Paul' },
      Joe: { id: 'def', name: 'Joe' },
      Catrina: { id: 'ghi', name: 'Catrina' },
    }

    expect(array2Obj(arr, 'name')).toEqual(obj)
  })
})

describe('Test nextHoliday', () => {
  test('returns New Year’s Day for beginning of year', () => {
    const dateString = '2019-01-01'
    expect(nextHoliday(holidays, dateString).nameEn).toEqual('New Year’s Day')
  })

  test('returns Family Day for second day of year', () => {
    const dateString = '2019-01-02'
    expect(nextHoliday(holidays, dateString).nameEn).toEqual('Family Day')
  })

  test('returns Saint Patrick’s Day for March 1st', () => {
    const dateString = '2019-03-01'
    expect(nextHoliday(holidays, dateString).nameEn).toEqual('Saint Patrick’s Day')
  })
})

describe('Test upcomingHolidays', () => {
  beforeEach(() => {
    expect(holidays.length).toBe(6)
  })

  test('returns all holidays for the beginning of the year', () => {
    const dateString = '2019-01-01'
    expect(upcomingHolidays(holidays, dateString).length).toEqual(6)
  })

  test('returns one less holidays for the second day of the year', () => {
    const dateString = '2019-01-02'
    expect(upcomingHolidays(holidays, dateString).length).toEqual(5)
  })

  test('returns one less holidays for February 18th', () => {
    const dateString = '2019-02-18'
    expect(upcomingHolidays(holidays, dateString).length).toEqual(5)
  })

  test('returns one holiday for February 19th', () => {
    const dateString = '2019-02-19'
    expect(upcomingHolidays(holidays, dateString).length).toEqual(1)
  })

  test('returns no holidays for April 1st', () => {
    const dateString = '2019-04-01'
    expect(upcomingHolidays(holidays, dateString).length).toEqual(0)
  })
})

describe('Test getCurrentHolidayYear', () => {
  const RealDate = Date

  afterEach(() => {
    global.Date = RealDate
  })

  const mockDate = (dateString) => {
    global.Date.now = () => new Date(dateString)
  }

  test('returns the current year for 2019', () => {
    mockDate('2019-01-01')
    expect(getCurrentHolidayYear()).toEqual(2019)
  })

  test('returns the current year for 2020', () => {
    mockDate('2020-01-01')
    expect(getCurrentHolidayYear()).toEqual(2020)
  })

  test('returns 2019 for December 25th, 2019', () => {
    mockDate('2019-12-25')
    expect(getCurrentHolidayYear()).toEqual(2019)
  })

  test('returns 2020 for December 26th, 2019', () => {
    mockDate('2019-12-26')
    expect(getCurrentHolidayYear()).toEqual(2020)
  })

  test('returns 2020 for December 31st, 2019', () => {
    mockDate('2019-12-31')
    expect(getCurrentHolidayYear()).toEqual(2020)
  })
})

describe('Test isProvinceId', () => {
  test('returns true for a real province id', () => {
    expect(isProvinceId('AB')).toBe(true)
  })

  test('returns true for a real province id (lowercase)', () => {
    expect(isProvinceId('ab')).toBe(true)
  })

  test('returns false for a non-province id', () => {
    expect(isProvinceId('hawaii')).toBe(false)
  })
})

describe('Test pe2pei', () => {
  test('returns "PEI" for "PE"', () => {
    expect(pe2pei('PE')).toBe('PEI')
  })

  test('returns original string for anything else', () => {
    expect(pe2pei('ON')).toBe('ON')
  })
})

describe('Test getProvinceIdOrFederalString', () => {
  test('returns undefined for no parameters', () => {
    expect(getProvinceIdOrFederalString()).toBe(undefined)
  })

  test('returns undefined for an empty object', () => {
    expect(getProvinceIdOrFederalString({})).toBe(undefined)
  })

  test('returns the provinceID for a provinceID', () => {
    expect(getProvinceIdOrFederalString({ provinceId: 'ON' })).toEqual('ON')
  })

  test('returns "federal" string for a federal boolean', () => {
    expect(getProvinceIdOrFederalString({ federal: true })).toBe('federal')
  })

  test('returns the provinceID for a provinceID and federal', () => {
    expect(getProvinceIdOrFederalString({ provinceId: 'ON', federal: true })).toEqual('ON')
  })
})
