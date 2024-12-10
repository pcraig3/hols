const Sugar = require('sugar-date')
const easterDay = require('@jsbits/easter-day')
const { format } = require('date-fns/format')
const { addMinutes } = require('date-fns/addMinutes')
const { addHours } = require('date-fns')
const { addDays } = require('date-fns/addDays')
const { getISODay } = require('date-fns/getISODay')
const { differenceInDays } = require('date-fns/differenceInDays')
const { startOfDay } = require('date-fns/startOfDay')
const { isAfter } = require('date-fns/isAfter')
const { formatDistance } = require('date-fns/formatDistance')

const _getISODayInt = (weekday) => {
  if (weekday === 'Monday') {
    return 1
  }

  if (weekday === 'Tuesday') {
    return 2
  }

  if (weekday === 'Friday') {
    return 5
  }

  throw new Error(`Weekday not parsable: ${weekday}`)
}

const _getBeforePosition = ({ weekdayInt, anchorDate }) => {
  let count = -1

  // addDays to the current anchorDay until the day of the week matches
  while (weekdayInt !== getISODay(addDays(anchorDate, count))) {
    count--
  }

  return count
}

const _getAfterPosition = ({ weekdayInt, anchorDate }) => {
  let count = 1

  // addDays to the current anchorDay until the day of the week matches
  while (weekdayInt !== getISODay(addDays(anchorDate, count))) {
    count++
  }

  return count
}

const _getDayCount = ({ position, weekday, anchorDate }) => {
  const weekdayInt = _getISODayInt(weekday)
  let before = _getBeforePosition({ weekdayInt, anchorDate })
  let after = _getAfterPosition({ weekdayInt, anchorDate })

  switch (position) {
    case 'before':
      return before
    case 'after':
      return after
    case 'near':
      if (before === -7) {
        return 0
      }
      return Math.abs(before) <= after ? before : after
    default:
      throw new Error(`Date string position not parsable: ${position}`)
  }
}

const _parseRelativeDates = (dateString) => {
  let [weekday, position, ...anchorDate] = dateString.split(' ')

  let year = anchorDate[anchorDate.length - 1]
  anchorDate = anchorDate.join(' ')

  if (anchorDate.includes('Easter')) {
    anchorDate = easterDay(year)
  } else {
    anchorDate = Sugar.Date.create(anchorDate)
    // Add 1 hour to account for weird timezone thing where sometimes the date is the day before at 23:00
    anchorDate = addHours(anchorDate, 1)
  }

  const count = _getDayCount({ position, weekday, anchorDate })

  return addDays(anchorDate, count)
}

// returns a Date object
const _getDate = (dateString, year) => {
  let date
  dateString = `${dateString} ${year}`

  if (/First|Second|Third|Fourth/i.test(dateString)) {
    dateString = `The ${dateString}`
  }

  // Regatta Day 2025 was moved to accommodate 2025 Canada Games
  if (dateString === 'The First Wednesday in August 2025') {
    dateString = 'July 30 2025'
  }

  if (/before|after|near/i.test(dateString)) {
    date = _parseRelativeDates(dateString)
  } else {
    date = Sugar.Date.create(dateString)
  }

  // Test for invalid dates
  if (isNaN(date)) {
    throw new Error(`Date string not parsable: ${dateString}`)
  }

  // https://stackoverflow.com/a/52352512
  // const date = new Date(date.valueOf() - date.getTimezoneOffset() * 60 * 1000)

  return date
}

const getLiteralDate = (dateString, year = new Date(Date.now()).getUTCFullYear()) => {
  const endsWithNumber = !!parseInt(dateString.slice(-2))
  dateString =
    endsWithNumber && !/May/i.test(dateString)
      ? dateString.split(' ').slice(-2).join(' ')
      : dateString

  return _getDate(dateString, year).toISOString().substring(0, 10)
}

const getObservedDate = (dateString, year = new Date(Date.now()).getUTCFullYear()) => {
  let date = _getDate(dateString, year)

  // If Boxing Day is on a Sunday or Monday, move to Tuesday (Christmas will be Monday)
  if ([1, 7].includes(getISODay(date)) && /December 26/i.test(dateString)) {
    date = _parseRelativeDates(`Tuesday after ${dateString} ${year}`)
  }

  // If it lands on a Saturday or Sunday (and not National Aboriginal Day) move to Monday
  if ([6, 7].includes(getISODay(date)) && !/June 21/i.test(dateString)) {
    date = _parseRelativeDates(`Monday after ${dateString} ${year}`)
  }

  return date.toISOString().substring(0, 10)
}

const space2Nbsp = (str) => str.replace(/ /g, ' ')

const displayDate = (dateString, weekday = false) => {
  dateString = Sugar.Date.create(dateString)
  let msg = space2Nbsp(format(dateString, 'MMMM d'))

  return weekday ? `${msg}, ${format(dateString, 'EEEE')}` : msg
}

const relativeDate = (dateString) => {
  const daysOffset = differenceInDays(
    Sugar.Date.create(dateString),
    startOfDay(new Date(Date.now())),
  )

  switch (daysOffset) {
    case 0:
      return 'That’s today!'
    case 1:
      return 'That’s tomorrow!'
    default:
      return `That’s in ${formatDistance(
        Sugar.Date.create(dateString),
        startOfDay(new Date(Date.now())),
      )}`
  }
}

/**
 * This function returns the current year, except after December 26th it returns the next year
 */
const getCurrentHolidayYear = (region = undefined) => {
  const d = new Date(Date.now())
  const regions = [undefined, 'federal', 'NL', 'ON']
  let lastObservedHoliday

  lastObservedHoliday = regions.includes(region)
    ? getObservedDate('December 26') // Boxing day
    : getObservedDate('December 25') // Christmas day

  // 24 hours - 1 minute
  lastObservedHoliday = addMinutes(Sugar.Date.create(lastObservedHoliday), 1439)

  // return the next year if after Boxing day
  if (isAfter(d, lastObservedHoliday)) {
    return d.getUTCFullYear() + 1
  }

  return d.getUTCFullYear()
}

module.exports = {
  getCurrentHolidayYear,
  getLiteralDate,
  getObservedDate,
  displayDate,
  relativeDate,
}
