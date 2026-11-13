const { displayDate } = require('../dates')
const { html } = require('../utils')

const DateHtml = ({ dateString, weekday, locale = 'en', ...props }) => {
  return html`
    <time datetime=${dateString} ...${props}>${displayDate(dateString, { weekday, locale })}</time>
  `
}

module.exports = DateHtml
