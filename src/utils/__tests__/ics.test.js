const {
  startDate,
  endDate,
  getNationalDescription,
  getProvinceDescription,
  getTitle,
} = require('../ics')

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

describe('Test getNationalDescription', () => {
  test('"National holiday" for a holiday with 13 provinces', () => {
    const holidayStub = { provinces: [...Array(13).keys()] }
    expect(getNationalDescription(holidayStub)).toMatch('National holiday')
  })

  test('Not a national holiday for a holiday with 1 province', () => {
    const holidayStub = { provinces: [...Array(1).keys()] }
    expect(getNationalDescription(holidayStub)).toMatch('This is not a national holiday')
  })

  test('Not a national holiday for a holiday with 12 provinces', () => {
    const holidayStub = { provinces: [...Array(12).keys()] }
    expect(getNationalDescription(holidayStub)).toMatch('This is not a national holiday')
  })

  test('Not a national holiday for a holiday with 14 provinces', () => {
    const holidayStub = { provinces: [...Array(14).keys()] }
    expect(getNationalDescription(holidayStub)).toMatch('This is not a national holiday')
  })

  test('Not a national holiday for an obj without a "provinces" key', () => {
    const holidayStub = {}
    expect(getNationalDescription(holidayStub)).toMatch('This is not a national holiday')
  })
})

describe('Test getProvinceDescription', () => {
  test('"National holiday" for a holiday with 13 provinces', () => {
    const holidayStub = { provinces: [...Array(13).keys()] }
    expect(getProvinceDescription(holidayStub)).toMatch('National holiday')
  })

  test('"National holiday" for an obj without a "provinces" key', () => {
    const holidayStub = {}
    expect(getProvinceDescription(holidayStub)).toMatch('National holiday')
  })

  // 1 province
  test('Description for 1 province', () => {
    const holidayStub = { provinces: [{ id: 'AB', nameEn: 'Alberta' }] }
    expect(getProvinceDescription(holidayStub)).toMatch('Observed by Alberta.')
  })

  // 1 federal
  test('Description for federal holiday', () => {
    const holidayStub = { provinces: [], federal: 1 }
    expect(getProvinceDescription(holidayStub)).toMatch('Observed by federal industries.')
  })

  // 1 province 1 federal
  test('Description for 1 province and federal', () => {
    const holidayStub = { provinces: [{ id: 'AB', nameEn: 'Alberta' }], federal: 1 }
    expect(getProvinceDescription(holidayStub)).toMatch(
      'Observed by Alberta and federal industries.',
    )
  })

  // 2 provinces
  test('Description for 2 provinces', () => {
    const holidayStub = { provinces: [{ id: 'AB' }, { id: 'BC' }] }
    expect(getProvinceDescription(holidayStub)).toMatch('Observed by AB and BC.')
  })

  // 3 provinces
  test('Description for 3 provinces', () => {
    const holidayStub = { provinces: [{ id: 'AB' }, { id: 'BC' }, { id: 'MB' }] }
    expect(getProvinceDescription(holidayStub)).toMatch('Observed by AB, BC, and MB.')
  })

  // 3 provinces 1 federal
  test('Description for 3 provinces and federal', () => {
    const holidayStub = { provinces: [{ id: 'AB' }, { id: 'BC' }, { id: 'MB' }], federal: 1 }
    expect(getProvinceDescription(holidayStub)).toMatch(
      'Observed by AB, BC, MB, and federal industries.',
    )
  })
})
