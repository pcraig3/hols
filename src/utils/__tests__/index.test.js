const {
  array2Obj,
  nextHoliday,
  upcomingHolidays,
  getCanonical,
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

describe('Test getCanonical', () => {
  const mockDate = (dateString) => {
    global.Date.now = () => new Date(dateString)
  }

  test('returns path for no parameters', () => {
    expect(getCanonical({ path: '/' })).toBe('/')
  })

  test('returns false for error', () => {
    expect(getCanonical({ error: true, path: '/' })).toBe(false)
  })

  test('returns path for not currentYear', () => {
    mockDate('2020-01-01')
    expect(getCanonical({ year: 2019, path: '/2019' })).toBe('/2019')
  })

  test('returns path with NO year for currentYear', () => {
    mockDate('2020-01-01')
    expect(getCanonical({ year: 2020, path: '/2020' })).toBe('/')
  })

  test('returns path with year for currentYear after Boxing Day', () => {
    mockDate('2020-12-30')
    expect(getCanonical({ year: 2020, path: '/2020' })).toBe('/2020')
  })

  test('returns path with NO year for currentYear on Boxing Day', () => {
    mockDate('2020-12-28')
    expect(getCanonical({ year: 2020, path: '/2020', provinceId: 'ON' })).toBe('/')
  })

  test('returns path with NO year for currentYear on Boxing Day for province WITH Boxing Day', () => {
    mockDate('2020-12-28')
    expect(getCanonical({ year: 2020, path: '/2020', provinceId: 'ON' })).toBe('/')
  })

  test('returns path with year for currentYear before Boxing Day for province WITHOUT Boxing Day', () => {
    mockDate('2020-12-28')
    expect(getCanonical({ year: 2020, path: '/2020', provinceId: 'AB' })).toBe('/2020')
  })

  test('returns path with NO year for next year for province WITHOUT Boxing Day', () => {
    mockDate('2020-12-28')
    expect(getCanonical({ year: 2021, path: '/2021', provinceId: 'AB' })).toBe('/')
  })
})
