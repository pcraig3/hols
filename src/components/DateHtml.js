const { displayDate } = require('../dates')
const { html } = require('../utils')

const DateHtml = ({ dateString, weekday, ...props }) => {
  return html`<time datetime=${dateString} ...${props}>${displayDate(dateString, weekday)}</time>`
}

module.exports = DateHtml
