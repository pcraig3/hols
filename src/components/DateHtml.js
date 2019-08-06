const { displayDate } = require('../dates')
const { html } = require('../utils')

const DateHtml = ({ dateString, weekday }) => {
  return html`
    <time datetime=${dateString}>${displayDate(dateString, weekday)}</time>
  `
}

module.exports = DateHtml
