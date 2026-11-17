const { css } = require('@emotion/css')

const { displayDate } = require('../dates')
const { getTranslator, localizedName } = require('../i18n')
const { html } = require('../utils')
const DateHtml = require('./DateHtml.js')

const styles = css`
  display: flex;
  flex-direction: column;

  span[class^="h1"] {
    display: block;
  }

  .h1--xs {
    order: 1;
  }

  .h1--md {
    order: 3;
  }

  .h1--lg {
    order: 2;

    a {
      position: relative;
    }

    sup {
      position: absolute;
      top: -25%;
    }
  }
`

const getTitle = (nextHoliday, locale) => {
  const t = getTranslator(locale)

  return `${displayDate(nextHoliday.date, { locale })} (${t('components.nextHoliday.observed')} ${displayDate(nextHoliday.observedDate, { locale })})`
}

const NextHoliday = ({ nextHoliday, provinceName = 'Canada', federal, locale = 'en' }) => {
  const t = getTranslator(locale)
  const regionLabel = locale === 'fr' ? provinceName : `${provinceName}’${provinceName.endsWith('s') ? '' : 's'}`
  const isOffset = nextHoliday.date !== nextHoliday.observedDate
  const holidayType = nextHoliday.optional ? '' : 'statutory '

  const introKey = federal
    ? 'components.nextHoliday.federal'
    : provinceName === 'Canada'
      ? 'components.nextHoliday.canada'
      : 'components.nextHoliday.province'

  const holidayName = localizedName(nextHoliday, locale)

  return html`
    <h1 class="${styles}">
      <span class="h1--xs">
        ${t(introKey, { regionLabel, holidayType })}
      </span>
      <span class="h1--md">
        ${holidayName.replace(/ /, '\u00a0').replace(/Peoples Day/, 'Peoples\u00a0Day')}
      </span>
      <span class="visuallyHidden">${t('components.nextHoliday.on')}</span>
      <span class="h1--lg">
        <a
          id="next-holiday-link"
          href="#next-holiday-row"
          title="${isOffset && getTitle(nextHoliday, locale)}"
          ><${DateHtml} data-event="true" data-action="next-holidays-row-link"
          data-label=${`next-holidays-row-link-${
            federal ? 'federal' : provinceName.replace(/\s+/g, '-').toLowerCase()
          }`}
          locale=${locale} dateString=${nextHoliday.date} //>${isOffset && html`<sup aria-hidden="true">*</sup>`}
        </a>
      </span>
    </h1>
  `
}

module.exports = NextHoliday
