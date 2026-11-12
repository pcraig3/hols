const {
  startDate,
  endDate,
  getCurrentTimestamp,
  getNationalDescription,
  getProvinceDescription,
  getObservedDateNote,
  getTitle,
  getUid,
} = require('../ics')

describe('Test startDate', () => {
  test('Returns [1979, 11, 07] for 1979-11-07', () => {
    const dateString = '1979-11-07'
    expect(startDate(dateString)).toEqual([1979, 11, 7])
  })
})

describe('Test endDate', () => {
  test('Returns [1979, 11, 08] for 1979-11-07', () => {
    const dateString = '1979-11-07'
    expect(endDate(dateString)).toEqual([1979, 11, 8])
  })

  // test month
  test('Returns [1979, 12, 01] for 1979-11-30', () => {
    const dateString = '1979-11-30'
    expect(endDate(dateString)).toEqual([1979, 12, 1])
  })

  // test year
  test('Returns [1980, 01, 01] for 1979-12-31', () => {
    const dateString = '1979-12-31'
    expect(endDate(dateString)).toEqual([1980, 1, 1])
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
    const provinces = ids.map((v) => {
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

describe('Test getUid', () => {
  test('Returns a hash for a holiday object', () => {
    const holiday = {
      observedDate: '2022-02-21',
      nameEn: 'Family Day',
    }
    const uid = getUid(holiday)
    expect(uid).toEqual('r+uDBpoFv1GNOoweYULVnz0lF8s=')
  })

  test('Different ids for different date, different title', () => {
    const holiday1 = {
      observedDate: '2022-02-21',
      nameEn: 'Family Day',
    }
    const holiday2 = {
      observedDate: '2022-10-10',
      nameEn: 'Thanksgiving',
    }

    expect(getUid(holiday1)).not.toEqual(getUid(holiday2))
  })

  test('Different ids for different date, same title', () => {
    const holiday1 = {
      observedDate: '2022-02-21',
      nameEn: 'Family Day',
    }
    const holiday2 = {
      observedDate: '2022-02-28',
      nameEn: 'Family Day',
    }

    expect(getUid(holiday1)).not.toEqual(getUid(holiday2))
  })

  test('Different ids for same date, different title', () => {
    const holiday1 = {
      observedDate: '2022-02-21',
      nameEn: 'Family Day',
    }
    const holiday2 = {
      observedDate: '2022-02-21',
      nameEn: 'Louis Riel Day',
    }

    expect(getUid(holiday1)).not.toEqual(getUid(holiday2))
  })

  test('Different ids for same date, same title, different provinces', () => {
    const holiday1 = {
      observedDate: '2022-02-21',
      nameEn: 'Family Day',
      provinces: [{ id: 'ON' }],
    }
    const holiday2 = {
      observedDate: '2022-02-21',
      nameEn: 'Family Day',
      provinces: [{ id: 'BC' }],
    }

    expect(getUid(holiday1)).not.toEqual(getUid(holiday2))
  })

  test('Different ids for same date, same title, one federal', () => {
    const holiday1 = {
      observedDate: '2022-02-21',
      nameEn: 'Family Day',
      federal: true,
    }
    const holiday2 = {
      observedDate: '2022-02-21',
      nameEn: 'Family Day',
      federal: false,
    }

    expect(getUid(holiday1)).not.toEqual(getUid(holiday2))
  })

  test('Same ids for same date, same title, same provinces', () => {
    const holiday1 = {
      observedDate: '2022-02-21',
      nameEn: 'Family Day',
      provinces: [{ id: 'ON' }],
    }
    const holiday2 = {
      observedDate: '2022-02-21',
      nameEn: 'Family Day',
      provinces: [{ id: 'ON' }],
    }

    expect(getUid(holiday1)).toEqual(getUid(holiday2))
  })

  test('Same ids for same date, same title, no provinces', () => {
    const holiday1 = {
      observedDate: '2022-02-21',
      nameEn: 'Family Day',
    }
    const holiday2 = {
      observedDate: '2022-02-21',
      nameEn: 'Family Day',
    }

    expect(getUid(holiday1)).toEqual(getUid(holiday2))
  })
})


describe('Test ICS localization', () => {
  const holiday = {
    nameEn: 'Family Day',
    nameFr: 'Fête de la famille',
    observedDate: '2022-02-21',
    provinces: [
      {
        id: 'AB',
        nameEn: 'Alberta',
        nameFr: 'Alberta',
      },
    ],
    federal: 1,
  }

  test('English remains the default', () => {
    expect(getTitle(holiday)).toBe('Family Day (AB, Federal)')
    expect(getProvinceDescription(holiday)).toBe(
      'Observed by Alberta and federal industries.',
    )
  })

  test('returns French holiday titles', () => {
    expect(getTitle(holiday, 'fr')).toBe('Fête de la famille (AB, Fédéral)')
  })

  test('returns French description for one province', () => {
    const provincialHoliday = { ...holiday, federal: 0 }

    expect(getProvinceDescription(provincialHoliday, 'fr')).toBe(
      'Observé dans la région suivante : Alberta.',
    )
  })

  test('returns French description for two provinces', () => {
    const multiProvinceHoliday = {
      ...holiday,
      federal: 0,
      provinces: [{ id: 'AB' }, { id: 'BC' }],
    }

    expect(getProvinceDescription(multiProvinceHoliday, 'fr')).toBe(
      'Observé dans les régions suivantes : AB et BC.',
    )
  })

  test('returns French description for three provinces', () => {
    const multiProvinceHoliday = {
      ...holiday,
      federal: 0,
      provinces: [{ id: 'AB' }, { id: 'BC' }, { id: 'MB' }],
    }

    expect(getProvinceDescription(multiProvinceHoliday, 'fr')).toBe(
      'Observé dans les régions suivantes : AB, BC et MB.',
    )
  })

  test('returns French description for federal-only holidays', () => {
    const federalHoliday = {
      ...holiday,
      provinces: [],
    }

    expect(getProvinceDescription(federalHoliday, 'fr')).toBe(
      'Observé dans les secteurs sous réglementation fédérale.',
    )
  })

  test('returns French description for one province and federal', () => {
    expect(getProvinceDescription(holiday, 'fr')).toBe(
      'Observé dans la région suivante : Alberta, ainsi que dans les secteurs sous réglementation fédérale.',
    )
  })

  test('returns French description for multiple provinces and federal', () => {
    const multiProvinceHoliday = {
      ...holiday,
      provinces: [{ id: 'AB' }, { id: 'BC' }],
    }

    expect(getProvinceDescription(multiProvinceHoliday, 'fr')).toBe(
      'Observé dans les régions suivantes : AB et BC, ainsi que dans les secteurs sous réglementation fédérale.',
    )
  })

  test('returns French national holiday descriptions', () => {
    const nationalHoliday = {
      ...holiday,
      provinces: Array(13).fill({}),
    }

    expect(getNationalDescription(nationalHoliday, 'fr')).toBe(
      'Jour férié national',
    )

    expect(getTitle(nationalHoliday, 'fr')).toBe('Fête de la famille')
  })

  test('returns French non-national holiday warnings', () => {
    expect(getNationalDescription(holiday, 'fr')).toBe(
      'Ce jour férié n’est pas national; il pourrait ne pas être observé dans votre région',
    )
  })

  test('UID does not change when the French name changes', () => {
    const differentTranslation = {
      ...holiday,
      nameFr: 'Autre nom français',
    }

    expect(getUid(holiday)).toBe(getUid(differentTranslation))
  })
})

describe('Test getCurrentDate', () => {
  const RealDate = Date

  afterEach(() => {
    global.Date = RealDate
  })

  const mockDate = (dateString) => {
    global.Date.now = () => new Date(dateString)
  }

  it('returns an array', () => {
    const result = getCurrentTimestamp()
    expect(typeof result === 'number').toBe(true)
  })

  it('returns the correct a unix timestamp for the given date', () => {
    mockDate('1990-10-08')
    const result = getCurrentTimestamp()
    expect(result).toBe(655344000000)
  })
})

describe('Test getObservedDateNote', () => {
  const holiday = {
    date: '2020-12-26',
    observedDate: '2020-12-28',
  }

  test('returns the observed date in English by default', () => {
    expect(getObservedDateNote(holiday)).toBe(
      'Observed: Monday, December 28, 2020',
    )
  })

  test('returns the observed date in French', () => {
    expect(getObservedDateNote(holiday, 'fr')).toBe(
      'Observé le lundi 28 décembre 2020.',
    )
  })

  test('returns nothing when the dates match', () => {
    const sameDayHoliday = {
      date: '2020-07-01',
      observedDate: '2020-07-01',
    }

    expect(getObservedDateNote(sameDayHoliday)).toBe('')
    expect(getObservedDateNote(sameDayHoliday, 'fr')).toBe('')
  })

  test('returns nothing when observedDate is missing', () => {
    expect(getObservedDateNote({ date: '2020-12-26' })).toBe('')
  })

  test('handles observed dates in the following year', () => {
    const newYearHoliday = {
      date: '2022-12-31',
      observedDate: '2023-01-02',
    }

    expect(getObservedDateNote(newYearHoliday, 'fr')).toBe(
      'Observé le lundi 2 janvier 2023.',
    )
  })
})
