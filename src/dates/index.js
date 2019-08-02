const Sugar = require('sugar-date')
const easterDay = require('@jsbits/easter-day')
var addDays = require('date-fns/addDays')
var getISODay = require('date-fns/getISODay')

const _getISODayInt = weekday => {
  if (weekday === 'Monday') {
    return 1
  }

  if (weekday === 'Friday') {
    return 5
  }

  throw new Error(`Weekday not parsable: ${weekday}`)
}

const _parseRelativeDates = dateString => {
  let [weekday, position, ...anchorDate] = dateString.split(' ')

  anchorDate = anchorDate.join(' ')

  if (anchorDate.includes('Easter')) {
    anchorDate = easterDay(2019)
  } else {
    anchorDate = Sugar.Date.create(anchorDate)
  }

  weekday = _getISODayInt(weekday)
  position = position === 'before' ? -1 : 1

  let count = 0
  // addDays to the current anchorDay until the day of the week matches
  while (weekday !== getISODay(addDays(anchorDate, position * count))) {
    count++
  }

  return addDays(anchorDate, position * count)
}

const getISODate = dateString => {
  let date

  if (/First|Second|Third|Fourth/i.test(dateString)) {
    dateString = `The ${dateString}`
  }

  if (/before|after/i.test(dateString)) {
    date = _parseRelativeDates(dateString)
  } else {
    date = Sugar.Date.create(dateString)
  }

  // Test for invalid dates
  if (isNaN(date)) {
    throw new Error(`Date string not parsable: ${dateString}`)
  }

  return date.toISOString().substring(0, 10)
}

module.exports = { getISODate }
