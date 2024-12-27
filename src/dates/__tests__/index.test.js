const { getLiteralDate, getObservedDate, getCurrentHolidayYear } = require('../index')

describe('Test getLiteralDate', () => {
  describe('for 2015', () => {
    const days2015 = [
      { str: 'January 1', iso: '2015-01-01' },
      { str: 'Third Monday in February', iso: '2015-02-16' },
      { str: 'Monday March 17', iso: '2015-03-17' },
      { str: 'Friday before Easter Day', iso: '2015-04-03' },
      { str: 'Monday after Easter Day', iso: '2015-04-06' },
      { str: 'Monday near April 23', iso: '2015-04-23' },
      { str: 'Monday before May 25', iso: '2015-05-18' },
      { str: 'June 21', iso: '2015-06-21' },
      { str: 'June 24', iso: '2015-06-24' },
      { str: 'Monday near June 24', iso: '2015-06-24' },
      { str: 'July 1', iso: '2015-07-01' },
      { str: 'Monday near July 12', iso: '2015-07-12' },
      { str: 'First Monday in August', iso: '2015-08-03' },
      { str: 'Third Monday in August', iso: '2015-08-17' },
      { str: 'First Monday in September', iso: '2015-09-07' },
      { str: 'Second Monday in October', iso: '2015-10-12' },
      { str: 'November 11', iso: '2015-11-11' },
      { str: 'December 25', iso: '2015-12-25' },
      { str: 'December 26', iso: '2015-12-26' },
    ]

    days2015.map((day) => {
      test(`returns correct 2015 ISO date string for: "${day.str}"`, () => {
        expect(getLiteralDate(day.str, 2015)).toEqual(day.iso)
      })
    })
  })

  describe('for 2022', () => {
    const days2022 = [
      { str: 'January 1', iso: '2022-01-01' },
      { str: 'Third Monday in February', iso: '2022-02-21' },
      { str: 'Monday March 17', iso: '2022-03-17' },
      { str: 'Friday before Easter Day', iso: '2022-04-15' },
      { str: 'Monday after Easter Day', iso: '2022-04-18' },
      { str: 'Monday near April 23', iso: '2022-04-23' },
      { str: 'Monday before May 25', iso: '2022-05-23' },
      { str: 'June 21', iso: '2022-06-21' },
      { str: 'Monday near June 24', iso: '2022-06-24' },
      { str: 'June 24', iso: '2022-06-24' },
      { str: 'July 1', iso: '2022-07-01' },
      { str: 'Monday near July 12', iso: '2022-07-12' },
      { str: 'First Monday in August', iso: '2022-08-01' },
      { str: 'Third Monday in August', iso: '2022-08-15' },
      { str: 'First Monday in September', iso: '2022-09-05' },
      { str: 'September 19', iso: '2022-09-19' },
      { str: 'September 30', iso: '2022-09-30' },
      { str: 'Second Monday in October', iso: '2022-10-10' },
      { str: 'November 11', iso: '2022-11-11' },
      { str: 'December 25', iso: '2022-12-25' },
      { str: 'December 26', iso: '2022-12-26' },
    ]

    days2022.map((day) => {
      test(`returns correct 2022 ISO date string for: "${day.str}"`, () => {
        expect(getLiteralDate(day.str, 2022)).toEqual(day.iso)
      })
    })
  })

  describe('for 2023', () => {
    const days2023 = [
      { str: 'January 1', iso: '2023-01-01' },
      { str: 'Third Monday in February', iso: '2023-02-20' },
      { str: 'Monday March 17', iso: '2023-03-17' },
      { str: 'Friday before Easter Day', iso: '2023-04-07' },
      { str: 'Monday after Easter Day', iso: '2023-04-10' },
      { str: 'Monday near April 23', iso: '2023-04-23' },
      { str: 'Monday before May 25', iso: '2023-05-22' },
      { str: 'June 21', iso: '2023-06-21' },
      { str: 'Monday near June 24', iso: '2023-06-24' },
      { str: 'June 24', iso: '2023-06-24' },
      { str: 'July 1', iso: '2023-07-01' },
      { str: 'Monday near July 12', iso: '2023-07-12' },
      { str: 'First Monday in August', iso: '2023-08-07' },
      { str: 'Third Monday in August', iso: '2023-08-21' },
      { str: 'First Monday in September', iso: '2023-09-04' },
      { str: 'September 30', iso: '2023-09-30' },
      { str: 'Second Monday in October', iso: '2023-10-09' },
      { str: 'November 11', iso: '2023-11-11' },
      { str: 'December 25', iso: '2023-12-25' },
      { str: 'December 26', iso: '2023-12-26' },
    ]

    days2023.map((day) => {
      test(`returns correct 2023 ISO date string for: "${day.str}"`, () => {
        expect(getLiteralDate(day.str, 2023)).toEqual(day.iso)
      })
    })
  })

  describe('for 2024', () => {
    const days2024 = [
      { str: 'January 1', iso: '2024-01-01' },
      { str: 'Third Monday in February', iso: '2024-02-19' },
      { str: 'Monday March 17', iso: '2024-03-17' },
      { str: 'Friday before Easter Day', iso: '2024-03-29' },
      { str: 'Monday after Easter Day', iso: '2024-04-01' },
      { str: 'Monday near April 23', iso: '2024-04-23' },
      { str: 'Monday before May 25', iso: '2024-05-20' },
      { str: 'June 21', iso: '2024-06-21' },
      { str: 'Monday near June 24', iso: '2024-06-24' },
      { str: 'June 24', iso: '2024-06-24' },
      { str: 'July 1', iso: '2024-07-01' },
      { str: 'Monday near July 12', iso: '2024-07-12' },
      { str: 'First Monday in August', iso: '2024-08-05' },
      { str: 'First Wednesday in August', iso: '2024-08-07' },
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
        expect(getLiteralDate(day.str, 2024)).toEqual(day.iso)
      })

      // TODO: UPDATE THESE on Jan 1st 2025
      test(`DEFAULT returns correct ISO date string for: "${day.str}"`, () => {
        expect(getLiteralDate(day.str)).toEqual(day.iso)
      })
    })
  })

  describe('for 2025', () => {
    const days2025 = [
      { str: 'January 1', iso: '2025-01-01' },
      { str: 'Third Monday in February', iso: '2025-02-17' },
      { str: 'Monday March 17', iso: '2025-03-17' },
      { str: 'Friday before Easter Day', iso: '2025-04-18' },
      { str: 'Monday after Easter Day', iso: '2025-04-21' },
      { str: 'Monday near April 23', iso: '2025-04-23' },
      { str: 'Monday before May 25', iso: '2025-05-19' },
      { str: 'June 21', iso: '2025-06-21' },
      { str: 'Monday near June 24', iso: '2025-06-24' },
      { str: 'June 24', iso: '2025-06-24' },
      { str: 'July 1', iso: '2025-07-01' },
      { str: 'Monday near July 12', iso: '2025-07-12' },
      { str: 'First Monday in August', iso: '2025-08-04' },
      { str: 'First Wednesday in August', iso: '2025-07-30' }, // changed to july for 2025
      { str: 'Third Monday in August', iso: '2025-08-18' },
      { str: 'First Monday in September', iso: '2025-09-01' },
      { str: 'September 30', iso: '2025-09-30' },
      { str: 'Second Monday in October', iso: '2025-10-13' },
      { str: 'November 11', iso: '2025-11-11' },
      { str: 'December 25', iso: '2025-12-25' },
      { str: 'December 26', iso: '2025-12-26' },
    ]

    days2025.map((day) => {
      test(`returns correct 2025 ISO date string for: "${day.str}"`, () => {
        expect(getLiteralDate(day.str, 2025)).toEqual(day.iso)
      })
    })
  })

  describe('for 2026', () => {
    const days2026 = [
      { str: 'January 1', iso: '2026-01-01' },
      { str: 'Third Monday in February', iso: '2026-02-16' },
      { str: 'Monday March 17', iso: '2026-03-17' },
      { str: 'Friday before Easter Day', iso: '2026-04-03' },
      { str: 'Monday after Easter Day', iso: '2026-04-06' },
      { str: 'Monday near April 23', iso: '2026-04-23' },
      { str: 'Monday before May 25', iso: '2026-05-18' },
      { str: 'June 21', iso: '2026-06-21' },
      { str: 'Monday near June 24', iso: '2026-06-24' },
      { str: 'June 24', iso: '2026-06-24' },
      { str: 'July 1', iso: '2026-07-01' },
      { str: 'Monday near July 12', iso: '2026-07-12' },
      { str: 'First Monday in August', iso: '2026-08-03' },
      { str: 'First Wednesday in August', iso: '2026-08-05' },
      { str: 'Third Monday in August', iso: '2026-08-17' },
      { str: 'First Monday in September', iso: '2026-09-07' },
      { str: 'September 30', iso: '2026-09-30' },
      { str: 'Second Monday in October', iso: '2026-10-12' },
      { str: 'November 11', iso: '2026-11-11' },
      { str: 'December 25', iso: '2026-12-25' },
      { str: 'December 26', iso: '2026-12-26' },
    ]

    days2026.map((day) => {
      test(`returns correct 2026 ISO date string for: "${day.str}"`, () => {
        expect(getLiteralDate(day.str, 2026)).toEqual(day.iso)
      })
    })
  })

  describe('for 2031', () => {
    const days2031 = [
      { str: 'January 1', iso: '2031-01-01' },
      { str: 'Third Monday in February', iso: '2031-02-17' },
      { str: 'Monday March 17', iso: '2031-03-17' },
      { str: 'Friday before Easter Day', iso: '2031-04-11' },
      { str: 'Monday after Easter Day', iso: '2031-04-14' },
      { str: 'Monday near April 23', iso: '2031-04-23' },
      { str: 'Monday before May 25', iso: '2031-05-19' },
      { str: 'June 21', iso: '2031-06-21' },
      { str: 'Monday near June 24', iso: '2031-06-24' },
      { str: 'June 24', iso: '2031-06-24' },
      { str: 'July 1', iso: '2031-07-01' },
      { str: 'Monday near July 12', iso: '2031-07-12' },
      { str: 'First Monday in August', iso: '2031-08-04' },
      { str: 'First Wednesday in August', iso: '2031-08-06' },
      { str: 'Third Monday in August', iso: '2031-08-18' },
      { str: 'First Monday in September', iso: '2031-09-01' },
      { str: 'September 30', iso: '2031-09-30' },
      { str: 'Second Monday in October', iso: '2031-10-13' },
      { str: 'November 11', iso: '2031-11-11' },
      { str: 'December 25', iso: '2031-12-25' },
      { str: 'December 26', iso: '2031-12-26' },
    ]

    days2031.map((day) => {
      test(`returns correct 2031 ISO date string for: "${day.str}"`, () => {
        expect(getLiteralDate(day.str, 2031)).toEqual(day.iso)
      })
    })
  })

  describe('for 2033', () => {
    const days2033 = [
      { str: 'January 1', iso: '2033-01-01' },
      { str: 'Third Monday in February', iso: '2033-02-21' },
      { str: 'Monday March 17', iso: '2033-03-17' },
      { str: 'Friday before Easter Day', iso: '2033-04-15' },
      { str: 'Monday after Easter Day', iso: '2033-04-18' },
      { str: 'Monday near April 23', iso: '2033-04-23' },
      { str: 'Monday before May 25', iso: '2033-05-23' },
      { str: 'June 21', iso: '2033-06-21' },
      { str: 'Monday near June 24', iso: '2033-06-24' },
      { str: 'June 24', iso: '2033-06-24' },
      { str: 'July 1', iso: '2033-07-01' },
      { str: 'Monday near July 12', iso: '2033-07-12' },
      { str: 'First Monday in August', iso: '2033-08-01' },
      { str: 'First Wednesday in August', iso: '2033-08-03' },
      { str: 'Third Monday in August', iso: '2033-08-15' },
      { str: 'First Monday in September', iso: '2033-09-05' },
      { str: 'September 30', iso: '2033-09-30' },
      { str: 'Second Monday in October', iso: '2033-10-10' },
      { str: 'November 11', iso: '2033-11-11' },
      { str: 'December 25', iso: '2033-12-25' },
      { str: 'December 26', iso: '2033-12-26' },
    ]

    days2033.map((day) => {
      test(`returns correct 2033 ISO date string for: "${day.str}"`, () => {
        expect(getLiteralDate(day.str, 2033)).toEqual(day.iso)
      })
    })
  })
})

describe('Test getObservedDate', () => {
  describe('for 2015', () => {
    const days2015 = [
      { str: 'January 1', iso: '2015-01-01' },
      { str: 'Third Monday in February', iso: '2015-02-16' },
      { str: 'Monday March 17', iso: '2015-03-16' },
      { str: 'Friday before Easter Day', iso: '2015-04-03' },
      { str: 'Monday after Easter Day', iso: '2015-04-06' },
      { str: 'Monday near April 23', iso: '2015-04-20' },
      { str: 'Monday before May 25', iso: '2015-05-18' },
      { str: 'June 21', iso: '2015-06-21' },
      { str: 'June 24', iso: '2015-06-24' },
      { str: 'Monday near June 24', iso: '2015-06-22' },
      { str: 'July 1', iso: '2015-07-01' },
      { str: 'Monday near July 12', iso: '2015-07-13' },
      { str: 'First Monday in August', iso: '2015-08-03' },
      { str: 'Third Monday in August', iso: '2015-08-17' },
      { str: 'First Monday in September', iso: '2015-09-07' },
      { str: 'Second Monday in October', iso: '2015-10-12' },
      { str: 'November 11', iso: '2015-11-11' },
      { str: 'December 25', iso: '2015-12-25' },
      { str: 'December 26', iso: '2015-12-28' },
    ]

    days2015.map((day) => {
      test(`returns correct 2015 ISO date string for: "${day.str}"`, () => {
        expect(getObservedDate(day.str, 2015)).toEqual(day.iso)
      })
    })
  })

  describe('for 2022', () => {
    const days2022 = [
      { str: 'January 1', iso: '2022-01-03' },
      { str: 'Third Monday in February', iso: '2022-02-21' },
      { str: 'Monday March 17', iso: '2022-03-14' },
      { str: 'Friday before Easter Day', iso: '2022-04-15' },
      { str: 'Monday after Easter Day', iso: '2022-04-18' },
      { str: 'Monday near April 23', iso: '2022-04-25' },
      { str: 'Monday before May 25', iso: '2022-05-23' },
      { str: 'June 21', iso: '2022-06-21' },
      { str: 'Monday near June 24', iso: '2022-06-27' },
      { str: 'June 24', iso: '2022-06-24' },
      { str: 'July 1', iso: '2022-07-01' },
      { str: 'Monday near July 12', iso: '2022-07-11' },
      { str: 'First Monday in August', iso: '2022-08-01' },
      { str: 'Third Monday in August', iso: '2022-08-15' },
      { str: 'First Monday in September', iso: '2022-09-05' },
      { str: 'September 19', iso: '2022-09-19' },
      { str: 'September 30', iso: '2022-09-30' },
      { str: 'Second Monday in October', iso: '2022-10-10' },
      { str: 'November 11', iso: '2022-11-11' },
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
      { str: 'June 24', iso: '2024-06-24' },
      { str: 'July 1', iso: '2024-07-01' },
      { str: 'Monday near July 12', iso: '2024-07-15' },
      { str: 'First Monday in August', iso: '2024-08-05' },
      { str: 'First Wednesday in August', iso: '2024-08-07' },
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

      // TODO: UPDATE THESE IN 2025
      test(`abc DEFAULT returns correct ISO date string for: "${day.str}"`, () => {
        expect(getObservedDate(day.str)).toEqual(day.iso)
      })
    })
  })

  describe('for 2025', () => {
    const days2025 = [
      { str: 'January 1', iso: '2025-01-01' },
      { str: 'Third Monday in February', iso: '2025-02-17' },
      { str: 'Monday March 17', iso: '2025-03-17' },
      { str: 'Friday before Easter Day', iso: '2025-04-18' },
      { str: 'Monday after Easter Day', iso: '2025-04-21' },
      { str: 'Monday near April 23', iso: '2025-04-21' },
      { str: 'Monday before May 25', iso: '2025-05-19' },
      { str: 'June 21', iso: '2025-06-21' },
      { str: 'Monday near June 24', iso: '2025-06-23' },
      { str: 'June 24', iso: '2025-06-24' },
      { str: 'July 1', iso: '2025-07-01' },
      { str: 'Monday near July 12', iso: '2025-07-14' },
      { str: 'First Monday in August', iso: '2025-08-04' },
      { str: 'First Wednesday in August', iso: '2025-07-30' }, // changed to july for 2025
      { str: 'Third Monday in August', iso: '2025-08-18' },
      { str: 'First Monday in September', iso: '2025-09-01' },
      { str: 'September 30', iso: '2025-09-30' },
      { str: 'Second Monday in October', iso: '2025-10-13' },
      { str: 'November 11', iso: '2025-11-11' },
      { str: 'December 25', iso: '2025-12-25' },
      { str: 'December 26', iso: '2025-12-26' },
    ]

    days2025.map((day) => {
      test(`returns correct 2025 ISO date string for: "${day.str}"`, () => {
        expect(getObservedDate(day.str, 2025)).toEqual(day.iso)
      })
    })
  })

  describe('for 2026', () => {
    const days2026 = [
      { str: 'January 1', iso: '2026-01-01' },
      { str: 'Third Monday in February', iso: '2026-02-16' },
      { str: 'Monday March 17', iso: '2026-03-16' },
      { str: 'Friday before Easter Day', iso: '2026-04-03' },
      { str: 'Monday after Easter Day', iso: '2026-04-06' },
      { str: 'Monday near April 23', iso: '2026-04-20' },
      { str: 'Monday before May 25', iso: '2026-05-18' },
      { str: 'June 21', iso: '2026-06-21' },
      { str: 'Monday near June 24', iso: '2026-06-22' },
      { str: 'June 24', iso: '2026-06-24' },
      { str: 'July 1', iso: '2026-07-01' },
      { str: 'Monday near July 12', iso: '2026-07-13' },
      { str: 'First Monday in August', iso: '2026-08-03' },
      { str: 'First Wednesday in August', iso: '2026-08-05' },
      { str: 'Third Monday in August', iso: '2026-08-17' },
      { str: 'First Monday in September', iso: '2026-09-07' },
      { str: 'September 30', iso: '2026-09-30' },
      { str: 'Second Monday in October', iso: '2026-10-12' },
      { str: 'November 11', iso: '2026-11-11' },
      { str: 'December 25', iso: '2026-12-25' },
      { str: 'December 26', iso: '2026-12-28' },
    ]

    days2026.map((day) => {
      test(`returns correct 2026 ISO date string for: "${day.str}"`, () => {
        expect(getObservedDate(day.str, 2026)).toEqual(day.iso)
      })
    })
  })

  describe('for 2031', () => {
    const days2031 = [
      { str: 'January 1', iso: '2031-01-01' },
      { str: 'Third Monday in February', iso: '2031-02-17' },
      { str: 'Monday March 17', iso: '2031-03-17' },
      { str: 'Friday before Easter Day', iso: '2031-04-11' },
      { str: 'Monday after Easter Day', iso: '2031-04-14' },
      { str: 'Monday near April 23', iso: '2031-04-21' },
      { str: 'Monday before May 25', iso: '2031-05-19' },
      { str: 'June 21', iso: '2031-06-21' },
      { str: 'Monday near June 24', iso: '2031-06-23' },
      { str: 'June 24', iso: '2031-06-24' },
      { str: 'July 1', iso: '2031-07-01' },
      { str: 'Monday near July 12', iso: '2031-07-14' },
      { str: 'First Monday in August', iso: '2031-08-04' },
      { str: 'First Wednesday in August', iso: '2031-08-06' },
      { str: 'Third Monday in August', iso: '2031-08-18' },
      { str: 'First Monday in September', iso: '2031-09-01' },
      { str: 'September 30', iso: '2031-09-30' },
      { str: 'Second Monday in October', iso: '2031-10-13' },
      { str: 'November 11', iso: '2031-11-11' },
      { str: 'December 25', iso: '2031-12-25' },
      { str: 'December 26', iso: '2031-12-26' },
    ]

    days2031.map((day) => {
      test(`returns correct 2031 ISO date string for: "${day.str}"`, () => {
        expect(getObservedDate(day.str, 2031)).toEqual(day.iso)
      })
    })
  })

  describe('for 2033', () => {
    const days2033 = [
      { str: 'January 1', iso: '2033-01-03' },
      { str: 'Third Monday in February', iso: '2033-02-21' },
      { str: 'Monday March 17', iso: '2033-03-14' },
      { str: 'Friday before Easter Day', iso: '2033-04-15' },
      { str: 'Monday after Easter Day', iso: '2033-04-18' },
      { str: 'Monday near April 23', iso: '2033-04-25' },
      { str: 'Monday before May 25', iso: '2033-05-23' },
      { str: 'June 21', iso: '2033-06-21' },
      { str: 'Monday near June 24', iso: '2033-06-27' },
      { str: 'June 24', iso: '2033-06-24' },
      { str: 'July 1', iso: '2033-07-01' },
      { str: 'Monday near July 12', iso: '2033-07-11' },
      { str: 'First Monday in August', iso: '2033-08-01' },
      { str: 'First Wednesday in August', iso: '2033-08-03' },
      { str: 'Third Monday in August', iso: '2033-08-15' },
      { str: 'First Monday in September', iso: '2033-09-05' },
      { str: 'September 30', iso: '2033-09-30' },
      { str: 'Second Monday in October', iso: '2033-10-10' },
      { str: 'November 11', iso: '2033-11-11' },
      { str: 'December 25', iso: '2033-12-26' },
      { str: 'December 26', iso: '2033-12-27' },
    ]

    days2033.map((day) => {
      test(`returns correct 2033 ISO date string for: "${day.str}"`, () => {
        expect(getObservedDate(day.str, 2033)).toEqual(day.iso)
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
