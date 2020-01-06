const addDays = require('date-fns/addDays')

/**
 * Takes an ISO-formatted date string (1990-10-08), and returns an array with [year, month, day]
 * @param {string} dateString an ISO-formatted date string (1990-10-08)
 */
const startDate = dateString => dateString.split('-')

/**
 * Takes an ISO-formatted date string (1990-10-08), and returns an array with the [year, month, day] of the NEXT day
 * @param {*} dateString an ISO-formatted date string (1990-10-08)
 */
const endDate = dateString =>
  addDays(new Date(dateString), 1)
    .toISOString()
    .substring(0, 10)
    .split('-')

/**
 * Returns a description string for .ics files
 * If a national holiday, returns "National holiday" else a warning that the holiday isn't observed everywhere
 * @param {obj} holiday a holiday object containing a 'provinces' key
 */
const getDescription = holiday =>
  holiday.provinces && holiday.provinces.length === 13
    ? 'National holiday'
    : 'This is not a national holiday; it may not be observed in your region'

module.exports = {
  startDate,
  endDate,
  getDescription,
}
