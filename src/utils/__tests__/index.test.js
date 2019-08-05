const { array2Obj, nextHoliday } = require('../index')
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

  test('returns Saint Patrick’s Day for the beginning of March', () => {
    const dateString = '2019-03-01'
    expect(nextHoliday(holidays, dateString).nameEn).toEqual('Saint Patrick’s Day')
  })
})
