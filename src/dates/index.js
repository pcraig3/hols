const Sugar = require('sugar-date')

const getISODate = dateString => {
  if (/First|Second|Third|Fourth/i.test(dateString)) {
    dateString = `The ${dateString}`
  }

  let date = Sugar.Date.create(dateString)

  return date.toISOString().substring(0, 10)
}

module.exports = { getISODate }
