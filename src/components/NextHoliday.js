const { html } = require('../utils')
const DateHtml = require('./DateHtml.js')
const { displayDate } = require('../dates')

const screenReaderTitle = (nextHoliday, provinceName, federal) => {
  return `${provinceName}’${provinceName.slice(-1) === 's' ? '' : 's'} next ${
    federal ? 'federal ' : ''
  }statutory holiday is ${nextHoliday.nameEn}, on ${displayDate(nextHoliday.observedDate)}.`
}

const NextHoliday = ({ nextHoliday, provinceName = 'Canada', federal }) => {
  return html`
    <h1>
      <span class="visuallyHidden">${screenReaderTitle(nextHoliday, provinceName, federal)}</span>
      <div class="visible" aria-hidden="true">
        <div class="h1--xs">
          ${provinceName}’${provinceName.slice(-1) === 's' ? '' : 's'}
          ${' '}next${' '}${federal && 'federal '}holiday${' '.replace(/ /, '\u00a0')}is
        </div>
        <div class="h1--lg">
          <a href="#next-holiday-row"
            ><${DateHtml} data-event="true" data-action="next-holidays-row-link"
            data-label=${`next-holidays-row-link-${
              federal ? 'federal' : provinceName.replace(/\s+/g, '-').toLowerCase()
            }`}
            dateString=${nextHoliday.observedDate} //></a
          >
        </div>
        <div class="h1--md">
          ${nextHoliday.nameEn.replace(/ /, '\u00a0').replace(/Peoples Day/, 'Peoples\u00a0Day')}
        </div>
      </div>
    </h1>
  `
}

module.exports = NextHoliday
