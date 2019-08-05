const { _parseFederal } = require('../index')

describe('Test _parseFederal', () => {
  const yesFederal = ['1', 'true', 'TRUE', 'TrUe']
  yesFederal.map(val => {
    test(`returns 1 for value: “${val}”`, () => {
      expect(_parseFederal(val)).toBe(1)
    })
  })

  const noFederal = ['0', 'false', 'FALSE', 'FalSe']
  noFederal.map(val => {
    test(`returns 0 for value: “${val}”`, () => {
      expect(_parseFederal(val)).toBe(0)
    })
  })

  const invalidFederal = ['2', '-1', 'one', 'Yes', '']
  invalidFederal.map(val => {
    test(`returns null for value: “${val}”`, () => {
      expect(_parseFederal(val)).toBe(null)
    })
  })
})
