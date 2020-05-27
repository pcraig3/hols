const { getLiteralDate, getObservedDate } = require('../index')

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
      { str: 'Monday June 24', iso: '2019-06-24' },
      { str: 'June 24', iso: '2019-06-24' },
      { str: 'July 1', iso: '2019-07-01' },
      { str: 'Monday near July 12', iso: '2019-07-12' },
      { str: 'First Monday in August', iso: '2019-08-05' },
      { str: 'Third Friday in August', iso: '2019-08-16' },
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
      { str: 'Monday June 24', iso: '2020-06-24' },
      { str: 'June 24', iso: '2020-06-24' },
      { str: 'July 1', iso: '2020-07-01' },
      { str: 'Monday near July 12', iso: '2020-07-12' },
      { str: 'First Monday in August', iso: '2020-08-03' },
      { str: 'Third Monday in August', iso: '2020-08-17' },
      { str: 'Third Friday in August', iso: '2020-08-21' },
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

      test(`DEFAULT returns correct ISO date string for: "${day.str}"`, () => {
        expect(getLiteralDate(day.str)).toEqual(day.iso)
      })
    })
  })

  describe('for 2021', () => {
    const days2020 = [
      { str: 'January 1', iso: '2021-01-01' },
      { str: 'Third Monday in February', iso: '2021-02-15' },
      { str: 'Monday March 17', iso: '2021-03-17' },
      { str: 'Friday before Easter Day', iso: '2021-04-02' },
      { str: 'Monday after Easter Day', iso: '2021-04-05' },
      { str: 'Monday near April 23', iso: '2021-04-23' },
      { str: 'Monday before May 25', iso: '2021-05-24' },
      { str: 'June 21', iso: '2021-06-21' },
      { str: 'Monday June 24', iso: '2021-06-24' },
      { str: 'June 24', iso: '2021-06-24' },
      { str: 'July 1', iso: '2021-07-01' },
      { str: 'Monday near July 12', iso: '2021-07-12' },
      { str: 'First Monday in August', iso: '2021-08-02' },
      { str: 'Third Monday in August', iso: '2021-08-16' },
      { str: 'Third Friday in August', iso: '2021-08-20' },
      { str: 'First Monday in September', iso: '2021-09-06' },
      { str: 'Second Monday in October', iso: '2021-10-11' },
      { str: 'November 11', iso: '2021-11-11' },
      { str: 'December 25', iso: '2021-12-25' },
      { str: 'December 26', iso: '2021-12-26' },
    ]

    days2020.map((day) => {
      test(`returns correct 2021 ISO date string for: "${day.str}"`, () => {
        expect(getLiteralDate(day.str, 2021)).toEqual(day.iso)
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
      { str: 'Monday June 24', iso: '2019-06-24' },
      { str: 'June 24', iso: '2019-06-24' },
      { str: 'July 1', iso: '2019-07-01' },
      { str: 'Monday near July 12', iso: '2019-07-15' },
      { str: 'First Monday in August', iso: '2019-08-05' },
      { str: 'Third Friday in August', iso: '2019-08-16' },
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
      { str: 'June 21', iso: '2020-06-21' },
      { str: 'Monday June 24', iso: '2020-06-22' },
      { str: 'June 24', iso: '2020-06-24' },
      { str: 'July 1', iso: '2020-07-01' },
      { str: 'Monday near July 12', iso: '2020-07-13' },
      { str: 'First Monday in August', iso: '2020-08-03' },
      { str: 'Third Monday in August', iso: '2020-08-17' },
      { str: 'Third Friday in August', iso: '2020-08-21' },
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

      test(`DEFAULT returns correct ISO date string for: "${day.str}"`, () => {
        expect(getObservedDate(day.str)).toEqual(day.iso)
      })
    })
  })

  describe('for 2021', () => {
    const days2020 = [
      { str: 'January 1', iso: '2021-01-01' },
      { str: 'Third Monday in February', iso: '2021-02-15' },
      { str: 'Monday March 17', iso: '2021-03-15' },
      { str: 'Friday before Easter Day', iso: '2021-04-02' },
      { str: 'Monday after Easter Day', iso: '2021-04-05' },
      { str: 'Monday near April 23', iso: '2021-04-26' },
      { str: 'Monday before May 25', iso: '2021-05-24' },
      { str: 'June 21', iso: '2021-06-21' },
      { str: 'Monday June 24', iso: '2021-06-21' },
      { str: 'June 24', iso: '2021-06-24' },
      { str: 'July 1', iso: '2021-07-01' },
      { str: 'Monday near July 12', iso: '2021-07-12' },
      { str: 'First Monday in August', iso: '2021-08-02' },
      { str: 'Third Monday in August', iso: '2021-08-16' },
      { str: 'Third Friday in August', iso: '2021-08-20' },
      { str: 'First Monday in September', iso: '2021-09-06' },
      { str: 'Second Monday in October', iso: '2021-10-11' },
      { str: 'November 11', iso: '2021-11-11' },
      { str: 'December 25', iso: '2021-12-27' },
      { str: 'December 26', iso: '2021-12-28' },
    ]

    days2020.map((day) => {
      test(`returns correct 2021 ISO date string for: "${day.str}"`, () => {
        expect(getObservedDate(day.str, 2021)).toEqual(day.iso)
      })
    })
  })

  describe('for 2022', () => {
    const days2020 = [
      { str: 'December 25', iso: '2022-12-26' },
      { str: 'December 26', iso: '2022-12-27' },
    ]

    days2020.map((day) => {
      test(`returns correct 2022 ISO date string for: "${day.str}"`, () => {
        expect(getObservedDate(day.str, 2022)).toEqual(day.iso)
      })
    })
  })
})
