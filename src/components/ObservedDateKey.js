const Sugar = require('sugar-date')
const { html } = require('../utils')
const { displayDate } = require('../dates')
const { getTranslator, localizedName } = require('../i18n')
const DateHtml = require('./DateHtml.js')
const Details = require('./Details.js')
const { isSunday } = require('date-fns/isSunday')
const { isMonday } = require('date-fns/isMonday')

const _getContext = ({ holiday, locale }) => {
  const { nameEn, provinces = [], date } = holiday
  const name = localizedName(holiday, locale)
  const t = getTranslator(locale)

  if (
    nameEn === 'Boxing Day' &&
    (isSunday(Sugar.Date.create(date)) || isMonday(Sugar.Date.create(date)))
  ) {
    return html`<p>${t('components.observedDateKey.boxingDay', { holidayName: name })}</p>`
  }

  if (
    nameEn === 'Day after New Year’s' &&
    (isSunday(Sugar.Date.create(date)) || isMonday(Sugar.Date.create(date)))
  ) {
    return html`<p>${t('components.observedDateKey.afterNewYears', { holidayName: name })}</p>`
  }

  if (provinces.length === 1 && ['NL', 'QC'].includes(provinces[0].id)) {
    return html`
      <p>
        ${t('components.observedDateKey.closestMonday', {
          holidayName: name,
          date: displayDate(date, { locale }),
        })}
      </p>
    `
  }

  return html`<p>${t('components.observedDateKey.weekend', { holidayName: name })}</p>`
}

const ObservedDateKey = ({ holiday, locale = 'en' }) => {
  const { date, observedDate } = holiday
  const t = getTranslator(locale)

  if (date !== observedDate) {
    return html`
      <${Details}
        className="provinces"
        summary=${html`
          <${DateHtml}
            dateString=${date}
            weekday=${true}
            locale=${locale}
          />
        `}
      >
        <div>
          <p>
            <em>${t('components.observedDateKey.observed')}</em>
            ${' '}
            <${DateHtml}
              dateString=${observedDate}
              weekday=${true}
              locale=${locale}
            />
          </p>

          ${_getContext({ holiday, locale })}
        </div>
      <//>
    `
  }

  return html`
    <${DateHtml}
      dateString=${observedDate}
      weekday=${true}
      locale=${locale}
    />
  `
}

module.exports = ObservedDateKey
