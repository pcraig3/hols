const { startDate, endDate, getDescription, getTitle } = require('../ics')

describe('Test startDate', () => {
  test('Returns [1979, 11, 07] for 1979-11-07', () => {
    const dateString = '1979-11-07'
    expect(startDate(dateString)).toEqual(['1979', '11', '07'])
  })
})

describe('Test endDate', () => {
  test('Returns [1979, 11, 08] for 1979-11-07', () => {
    const dateString = '1979-11-07'
    expect(endDate(dateString)).toEqual(['1979', '11', '08'])
  })

  // test month
  test('Returns [1979, 12, 01] for 1979-11-30', () => {
    const dateString = '1979-11-30'
    expect(endDate(dateString)).toEqual(['1979', '12', '01'])
  })

  // test year
  test('Returns [1980, 01, 01] for 1979-12-31', () => {
    const dateString = '1979-12-31'
    expect(endDate(dateString)).toEqual(['1980', '01', '01'])
  })
})

describe('Test getTitle', () => {
  const name = { nameEn: 'Fun holiday' }
  test('returns same title for a holiday with 13 provinces', () => {
    const holidayStub = { provinces: [...Array(13).keys()], ...name }
    expect(getTitle(holidayStub)).toMatch('Fun holiday')
  })

  // 0 provinces (should never happen)
  test('returns same title for a holiday with 0 provinces', () => {
    const holidayStub = { ...name }
    expect(getTitle(holidayStub)).toMatch('Fun holiday')
  })

  // 1 province
  test('returns title with 1 bracketed province ID for a holiday with 1 province', () => {
    const holidayStub = { provinces: [{ id: 'AB' }], ...name }
    expect(getTitle(holidayStub)).toMatch('Fun holiday (AB)')
  })

  // 1 province AND federal
  test('returns title with 1 bracketed province ID for a holiday with 1 province', () => {
    const holidayStub = { provinces: [{ id: 'AB' }], federal: 1, ...name }
    expect(getTitle(holidayStub)).toMatch('Fun holiday (AB, Federal)')
  })

  // 12 provinces
  test('returns title with 12 bracketed province IDs for a holiday with 12 provinces', () => {
    // missing "AB"
    const ids = ['BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT']
    const provinces = ids.map(v => {
      return { id: v }
    })
    const holidayStub = { provinces, ...name }
    expect(getTitle(holidayStub)).toMatch(
      'Fun holiday (BC, MB, NB, NL, NS, NT, NU, ON, PE, QC, SK, YT)',
    )
  })
})

describe('Test getDescription', () => {
  test('"National holiday" for a holiday with 13 provinces', () => {
    const holidayStub = { provinces: [...Array(13).keys()] }
    expect(getDescription(holidayStub)).toMatch('National holiday')
  })

  test('Not a national holiday for a holiday with 1 province', () => {
    const holidayStub = { provinces: [...Array(1).keys()] }
    expect(getDescription(holidayStub)).toMatch('This is not a national holiday')
  })

  test('Not a national holiday for a holiday with 12 provinces', () => {
    const holidayStub = { provinces: [...Array(12).keys()] }
    expect(getDescription(holidayStub)).toMatch('This is not a national holiday')
  })

  test('Not a national holiday for a holiday with 14 provinces', () => {
    const holidayStub = { provinces: [...Array(14).keys()] }
    expect(getDescription(holidayStub)).toMatch('This is not a national holiday')
  })

  test('Not a national holiday for an obj without a "provinces" key', () => {
    const holidayStub = {}
    expect(getDescription(holidayStub)).toMatch('This is not a national holiday')
  })
})
