const { getISODate } = require('../index')

describe('Test getISODate', () => {
  const days = [
    { str: 'January 1', iso: '2019-01-01' },
    { str: 'Third Monday in February', iso: '2019-02-18' },
    { str: 'March 17', iso: '2019-03-17' },
    /* 'Friday before Easter Day',
    'Monday after Easter Day',
    'April 23',
    'Monday on or before May 24',
    'Monday on or before May 24',
    'June 21',
    'June 24',
    'July 1',
    'July 12',
    'The First Monday in August',
    'The First Monday in August',
    'The First Monday in August',
    'The First Monday in August',
    'The Third Friday in August',
    'The Third Monday in August',
    'The First Monday in September',
    'The Second Monday in October',
    'November 11',
    'November 11',
    'December 25',
    'December 26', */
  ]

  days.map(day => {
    test(`returns correct ISO date string for: "${day.str}"`, () => {
      expect(getISODate(day.str)).toEqual(day.iso)
    })
  })
})
