const { getISODate } = require('../index')

describe('Test getISODate', () => {
  const days = [
    { str: 'January 1', iso: '2019-01-01' },
    { str: 'Third Monday in February', iso: '2019-02-18' },
    { str: 'March 17', iso: '2019-03-17' },
    { str: 'Friday before Easter Day', iso: '2019-04-19' },
    { str: 'Monday after Easter Day', iso: '2019-04-22' },
    { str: 'April 23', iso: '2019-04-23' },
    { str: 'Monday before May 25', iso: '2019-05-20' },
    { str: 'June 21', iso: '2019-06-21' },
    { str: 'June 24', iso: '2019-06-24' },
    { str: 'July 1', iso: '2019-07-01' },
    { str: 'July 12', iso: '2019-07-12' },
    { str: 'First Monday in August', iso: '2019-08-05' },
    { str: 'Third Friday in August', iso: '2019-08-16' },
    { str: 'Third Monday in August', iso: '2019-08-19' },
    { str: 'First Monday in September', iso: '2019-09-02' },
    { str: 'Second Monday in October', iso: '2019-10-14' },
    { str: 'November 11', iso: '2019-11-11' },
    { str: 'December 25', iso: '2019-12-25' },
    { str: 'December 26', iso: '2019-12-26' },
  ]

  days.map(day => {
    test(`returns correct ISO date string for: "${day.str}"`, () => {
      expect(getISODate(day.str)).toEqual(day.iso)
    })
  })
})
