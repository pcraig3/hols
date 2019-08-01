const { array2Obj } = require('../index')

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
