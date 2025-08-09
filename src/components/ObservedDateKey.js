const Sugar = require('sugar-date')
const { html } = require('../utils')
const { displayDate } = require('../dates')
const DateHtml = require('./DateHtml.js')
const Details = require('./Details.js')
const { isSunday } = require('date-fns/isSunday')
const { isMonday } = require('date-fns/isMonday')

const _getContext = ({ nameEn, provinces = [], date }) => {
  if (
    nameEn === 'Boxing Day' &&
    (isSunday(Sugar.Date.create(date)) || isMonday(Sugar.Date.create(date)))
  ) {
    return html`<p>
      Because Christmas is observed on Monday, ${nameEn} is pushed to the following Tuesday.
    </p>`
  }

  if (
    nameEn === 'Day after New Year’s' &&
    (isSunday(Sugar.Date.create(date)) || isMonday(Sugar.Date.create(date)))
  ) {
    return html`<p>
      Because New Year’s is observed on Monday, the ${nameEn} is pushed to the following Tuesday.
    </p>`
  }

  if (provinces.length === 1 && ['NL', 'QC'].includes(provinces[0].id)) {
    return html`<p>${nameEn} is observed on the Monday closest to ${displayDate(date)}.</p>`
  }

  return html`<p>When ${nameEn} falls on a weekend, it is observed the following Monday.</p>`
}
const ObservedDateKey = ({ holiday: { nameEn, provinces, date, observedDate } = {} }) => {
  if (date !== observedDate) {
    return html`
      <${Details}
        className="provinces"
        summary=${html`<${DateHtml} dateString=${date} weekday=${true} //>`}
      >
        <div>
          <p><em>Observed:</em> <${DateHtml} dateString=${observedDate} weekday=${true} //></p>
          ${_getContext({ nameEn, provinces, date })}
        </div>
      <//>
    `
  }

  return html`<${DateHtml} dateString=${observedDate} weekday=${true} //>`
}

module.exports = ObservedDateKey
