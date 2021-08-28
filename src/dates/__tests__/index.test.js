const { getLiteralDate, getObservedDate, getCurrentHolidayYear } = require('../index')

describe('Test getLiteralDate', () => {
  describe('for 2019', () => {
    const days2019 = [
      { str: 'January 1', iso: '2019-01-01' },
      { str: 'Third Monday in February', iso: '2019-02-18' },
      { str: 'Monday March 17', iso: '2019-03-17' },
      { str: 'Friday before Easter Day', iso: '2019-04-19' },
      { str: 'Monday after Easter Day', iso: '2019-04-22' },
      { str: 'Monday near April 23', iso: '2019-04-23' },
      { str: 'Monday before May 25', iso: '2019-05-20' },
      { str: 'June 21', iso: '2019-06-21' },
      { str: 'June 24', iso: '2019-06-24' },
      { str: 'Monday near June 24', iso: '2019-06-24' },
      { str: 'July 1', iso: '2019-07-01' },
      { str: 'Monday near July 12', iso: '2019-07-12' },
      { str: 'First Monday in August', iso: '2019-08-05' },
      { str: 'Third Monday in August', iso: '2019-08-19' },
      { str: 'First Monday in September', iso: '2019-09-02' },
      { str: 'Second Monday in October', iso: '2019-10-14' },
      { str: 'November 11', iso: '2019-11-11' },
      { str: 'December 25', iso: '2019-12-25' },
      { str: 'December 26', iso: '2019-12-26' },
    ]

    days2019.map((day) => {
      test(`returns correct 2019 ISO date string for: "${day.str}"`, () => {
        expect(getLiteralDate(day.str, 2019)).toEqual(day.iso)
      })
    })
  })

  describe('for 2020', () => {
    const days2020 = [
      { str: 'January 1', iso: '2020-01-01' },
      { str: 'Third Monday in February', iso: '2020-02-17' },
      { str: 'Monday March 17', iso: '2020-03-17' },
      { str: 'Friday before Easter Day', iso: '2020-04-10' },
      { str: 'Monday after Easter Day', iso: '2020-04-13' },
      { str: 'Monday near April 23', iso: '2020-04-23' },
      { str: 'Monday before May 25', iso: '2020-05-18' },
      { str: 'June 21', iso: '2020-06-21' },
      { str: 'June 24', iso: '2020-06-24' },
      { str: 'Monday near June 24', iso: '2020-06-24' },
      { str: 'July 1', iso: '2020-07-01' },
      { str: 'Monday near July 12', iso: '2020-07-12' },
      { str: 'First Monday in August', iso: '2020-08-03' },
      { str: 'Third Monday in August', iso: '2020-08-17' },
      { str: 'First Monday in September', iso: '2020-09-07' },
      { str: 'Second Monday in October', iso: '2020-10-12' },
      { str: 'November 11', iso: '2020-11-11' },
      { str: 'December 25', iso: '2020-12-25' },
      { str: 'December 26', iso: '2020-12-26' },
    ]

    days2020.map((day) => {
      test(`returns correct 2020 ISO date string for: "${day.str}"`, () => {
        expect(getLiteralDate(day.str, 2020)).toEqual(day.iso)
      })
    })
  })

  describe('for 2021', () => {
    const days2021 = [
      { str: 'January 1', iso: '2021-01-01' },
      { str: 'Third Monday in February', iso: '2021-02-15' },
      { str: 'Monday March 17', iso: '2021-03-17' },
      { str: 'Friday before Easter Day', iso: '2021-04-02' },
      { str: 'Monday after Easter Day', iso: '2021-04-05' },
      { str: 'Monday near April 23', iso: '2021-04-23' },
      { str: 'Monday before May 25', iso: '2021-05-24' },
      { str: 'June 21', iso: '2021-06-21' },
      { str: 'June 24', iso: '2021-06-24' },
      { str: 'Monday near June 24', iso: '2021-06-24' },
      { str: 'July 1', iso: '2021-07-01' },
      { str: 'Monday near July 12', iso: '2021-07-12' },
      { str: 'First Monday in August', iso: '2021-08-02' },
      { str: 'Third Monday in August', iso: '2021-08-16' },
      { str: 'First Monday in September', iso: '2021-09-06' },
      { str: 'September 30', iso: '2021-09-30' },
      { str: 'Second Monday in October', iso: '2021-10-11' },
      { str: 'November 11', iso: '2021-11-11' },
      { str: 'December 25', iso: '2021-12-25' },
      { str: 'December 26', iso: '2021-12-26' },
    ]

    days2021.map((day) => {
      test(`returns correct 2021 ISO date string for: "${day.str}"`, () => {
        expect(getLiteralDate(day.str, 2021)).toEqual(day.iso)
      })

      test(`DEFAULT returns correct ISO date string for: "${day.str}"`, () => {
        expect(getLiteralDate(day.str)).toEqual(day.iso)
      })
    })
  })
})

describe('Test getObservedDate', () => {
  describe('for 2019', () => {
    const days2019 = [
      { str: 'January 1', iso: '2019-01-01' },
      { str: 'Third Monday in February', iso: '2019-02-18' },
      { str: 'Monday March 17', iso: '2019-03-18' },
      { str: 'Friday before Easter Day', iso: '2019-04-19' },
      { str: 'Monday after Easter Day', iso: '2019-04-22' },
      { str: 'Monday near April 23', iso: '2019-04-22' },
      { str: 'Monday before May 25', iso: '2019-05-20' },
      { str: 'June 21', iso: '2019-06-21' },
      { str: 'June 24', iso: '2019-06-24' },
      { str: 'Monday near June 24', iso: '2019-06-24' },
      { str: 'July 1', iso: '2019-07-01' },
      { str: 'Monday near July 12', iso: '2019-07-15' },
      { str: 'First Monday in August', iso: '2019-08-05' },
      { str: 'Third Monday in August', iso: '2019-08-19' },
      { str: 'First Monday in September', iso: '2019-09-02' },
      { str: 'Second Monday in October', iso: '2019-10-14' },
      { str: 'November 11', iso: '2019-11-11' },
      { str: 'December 25', iso: '2019-12-25' },
      { str: 'December 26', iso: '2019-12-26' },
    ]

    days2019.map((day) => {
      test(`returns correct 2019 ISO date string for: "${day.str}"`, () => {
        expect(getObservedDate(day.str, 2019)).toEqual(day.iso)
      })
    })
  })

  describe('for 2020', () => {
    const days2020 = [
      { str: 'January 1', iso: '2020-01-01' },
      { str: 'Third Monday in February', iso: '2020-02-17' },
      { str: 'Monday March 17', iso: '2020-03-16' },
      { str: 'Friday before Easter Day', iso: '2020-04-10' },
      { str: 'Monday after Easter Day', iso: '2020-04-13' },
      { str: 'Monday near April 23', iso: '2020-04-20' },
      { str: 'Monday before May 25', iso: '2020-05-18' },
      { str: 'Monday near June 24', iso: '2020-06-22' },
      { str: 'June 21', iso: '2020-06-21' },
      { str: 'June 24', iso: '2020-06-24' },
      { str: 'July 1', iso: '2020-07-01' },
      { str: 'Monday near July 12', iso: '2020-07-13' },
      { str: 'First Monday in August', iso: '2020-08-03' },
      { str: 'Third Monday in August', iso: '2020-08-17' },
      { str: 'First Monday in September', iso: '2020-09-07' },
      { str: 'Second Monday in October', iso: '2020-10-12' },
      { str: 'November 11', iso: '2020-11-11' },
      { str: 'December 25', iso: '2020-12-25' },
      { str: 'December 26', iso: '2020-12-28' },
    ]

    days2020.map((day) => {
      test(`returns correct 2020 ISO date string for: "${day.str}"`, () => {
        expect(getObservedDate(day.str, 2020)).toEqual(day.iso)
      })
    })
  })

  describe('for 2021', () => {
    const days2021 = [
      { str: 'January 1', iso: '2021-01-01' },
      { str: 'Third Monday in February', iso: '2021-02-15' },
      { str: 'Monday March 17', iso: '2021-03-15' },
      { str: 'Friday before Easter Day', iso: '2021-04-02' },
      { str: 'Monday after Easter Day', iso: '2021-04-05' },
      { str: 'Monday near April 23', iso: '2021-04-26' },
      { str: 'Monday before May 25', iso: '2021-05-24' },
      { str: 'June 21', iso: '2021-06-21' },
      { str: 'Monday near June 24', iso: '2021-06-21' },
      { str: 'June 24', iso: '2021-06-24' },
      { str: 'July 1', iso: '2021-07-01' },
      { str: 'Monday near July 12', iso: '2021-07-12' },
      { str: 'First Monday in August', iso: '2021-08-02' },
      { str: 'Third Monday in August', iso: '2021-08-16' },
      { str: 'First Monday in September', iso: '2021-09-06' },
      { str: 'September 30', iso: '2021-09-30' },
      { str: 'Second Monday in October', iso: '2021-10-11' },
      { str: 'November 11', iso: '2021-11-11' },
      { str: 'December 25', iso: '2021-12-27' },
      { str: 'December 26', iso: '2021-12-28' },
    ]

    days2021.map((day) => {
      test(`returns correct 2021 ISO date string for: "${day.str}"`, () => {
        expect(getObservedDate(day.str, 2021)).toEqual(day.iso)
      })

      test(`DEFAULT returns correct ISO date string for: "${day.str}"`, () => {
        expect(getObservedDate(day.str)).toEqual(day.iso)
      })
    })
  })

  describe('for 2022', () => {
    const days2022 = [
      { str: 'December 25', iso: '2022-12-26' },
      { str: 'December 26', iso: '2022-12-27' },
    ]

    days2022.map((day) => {
      test(`returns correct 2022 ISO date string for: "${day.str}"`, () => {
        expect(getObservedDate(day.str, 2022)).toEqual(day.iso)
      })
    })
  })

  describe('for 2023', () => {
    const days2023 = [
      { str: 'January 1', iso: '2023-01-02' },
      { str: 'Third Monday in February', iso: '2023-02-20' },
      { str: 'Monday March 17', iso: '2023-03-13' },
      { str: 'Friday before Easter Day', iso: '2023-04-07' },
      { str: 'Monday after Easter Day', iso: '2023-04-10' },
      { str: 'Monday near April 23', iso: '2023-04-24' },
      { str: 'Monday before May 25', iso: '2023-05-22' },
      { str: 'June 21', iso: '2023-06-21' },
      { str: 'Monday near June 24', iso: '2023-06-26' },
      { str: 'June 24', iso: '2023-06-26' }, // this one seems wrong
      { str: 'July 1', iso: '2023-07-03' },
      { str: 'Monday near July 12', iso: '2023-07-10' },
      { str: 'First Monday in August', iso: '2023-08-07' },
      { str: 'Third Monday in August', iso: '2023-08-21' },
      { str: 'First Monday in September', iso: '2023-09-04' },
      { str: 'September 30', iso: '2023-10-02' },
      { str: 'Second Monday in October', iso: '2023-10-09' },
      { str: 'November 11', iso: '2023-11-13' },
      { str: 'December 25', iso: '2023-12-25' },
      { str: 'December 26', iso: '2023-12-26' },
    ]

    days2023.map((day) => {
      test(`returns correct 2023 ISO date string for: "${day.str}"`, () => {
        expect(getObservedDate(day.str, 2023)).toEqual(day.iso)
      })
    })
  })

  describe('for 2024', () => {
    const days2024 = [
      { str: 'January 1', iso: '2024-01-01' },
      { str: 'Third Monday in February', iso: '2024-02-19' },
      { str: 'Monday March 17', iso: '2024-03-18' },
      { str: 'Friday before Easter Day', iso: '2024-03-29' },
      { str: 'Monday after Easter Day', iso: '2024-04-01' },
      { str: 'Monday near April 23', iso: '2024-04-22' },
      { str: 'Monday before May 25', iso: '2024-05-20' },
      { str: 'June 21', iso: '2024-06-21' },
      { str: 'Monday near June 24', iso: '2024-06-24' },
      { str: 'June 24', iso: '2024-06-24' }, // this one seems wrong
      { str: 'July 1', iso: '2024-07-01' },
      { str: 'Monday near July 12', iso: '2024-07-15' },
      { str: 'First Monday in August', iso: '2024-08-05' },
      { str: 'Third Monday in August', iso: '2024-08-19' },
      { str: 'First Monday in September', iso: '2024-09-02' },
      { str: 'September 30', iso: '2024-09-30' },
      { str: 'Second Monday in October', iso: '2024-10-14' },
      { str: 'November 11', iso: '2024-11-11' },
      { str: 'December 25', iso: '2024-12-25' },
      { str: 'December 26', iso: '2024-12-26' },
    ]

    days2024.map((day) => {
      test(`returns correct 2024 ISO date string for: "${day.str}"`, () => {
        expect(getObservedDate(day.str, 2024)).toEqual(day.iso)
      })
    })
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
    expect(getCurrentHolidayYear()).toEqual(2019)
  })

  test('returns 2020 for December 28th, 2020', () => {
    mockDate('2020-12-28')
    expect(getCurrentHolidayYear()).toEqual(2020)
  })

  test('returns 2021 for December 28th, 2020 for NB', () => {
    mockDate('2020-12-28')
    expect(getCurrentHolidayYear('NB')).toEqual(2021)
  })

  test('returns 2021 for December 28th, 2020 for ON', () => {
    mockDate('2020-12-28')
    expect(getCurrentHolidayYear('ON')).toEqual(2020)
  })

  // pretty sure this test is being skipped because it depends what time of day you run it
  test.skip('returns 2021 for December 29th, 2020', () => {
    mockDate('2020-12-29')
    expect(getCurrentHolidayYear()).toEqual(2020)
  })

  test('returns 2021 for December 29th, 2020 at 5 am', () => {
    mockDate('2020-12-29T05:00:00')
    expect(getCurrentHolidayYear()).toEqual(2021)
  })

  test('returns 2020 for December 31st, 2019', () => {
    mockDate('2019-12-31')
    expect(getCurrentHolidayYear()).toEqual(2020)
  })
})
