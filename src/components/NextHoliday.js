const { html } = require('../utils')
const DateHtml = require('./DateHtml.js')
const { visuallyHidden } = require('../styles')

const NextHoliday = ({ nextHoliday, provinceName = 'Canada', federal }) => {
  return html`
    <h1>
      <div class="h1--xs">
        ${provinceName}’${provinceName.slice(-1) === 's' ? '' : 's'}
        ${' '}next${' '}${federal && 'federal '}<span class=${visuallyHidden}>statutory </span
        >holiday is
      </div>
      <div class="h1--lg"><${DateHtml} dateString=${nextHoliday.observedDate} //></div>
      <div class="h1--md">
        ${nextHoliday.nameEn.replace(/ /, '\u00a0').replace(/Peoples Day/, 'Peoples\u00a0Day')}
      </div>
    </h1>
  `
}

module.exports = NextHoliday
