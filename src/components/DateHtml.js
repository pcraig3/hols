const { displayDate } = require('../dates')
const { html } = require('../utils')

const DateHtml = ({ dateString }) => {
  return html`
    <time datetime=${dateString}>${displayDate(dateString)}</time>
  `
}

module.exports = DateHtml
