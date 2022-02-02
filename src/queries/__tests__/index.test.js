const { _parseBoolean } = require('../index')

describe('Test _parseBoolean', () => {
  const yesFederal = ['1', 'true', 'TRUE', 'TrUe']
  yesFederal.map((val) => {
    test(`returns 1 for value: “${val}”`, () => {
      expect(_parseBoolean(val)).toBe(1)
    })
  })

  const noFederal = ['0', 'false', 'FALSE', 'FalSe']
  noFederal.map((val) => {
    test(`returns 0 for value: “${val}”`, () => {
      expect(_parseBoolean(val)).toBe(0)
    })
  })

  const invalidFederal = ['2', '-1', 'one', 'Yes', 't', 'f', '']
  invalidFederal.map((val) => {
    test(`returns null for value: “${val}”`, () => {
      expect(_parseBoolean(val)).toBe(null)
    })
  })
})
