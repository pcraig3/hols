const { css } = require('@emotion/css')
const { html } = require('../utils')
const { getTranslator, localizedName } = require('../i18n')
const DateHtml = require('./DateHtml.js')
const { displayDate } = require('../dates')

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
  return `${displayDate(nextHoliday.date, { locale })} (${getTranslator(locale)('components.observedDateKey.observed')} ${displayDate(nextHoliday.observedDate, { locale })})`
}

const NextHoliday = ({ nextHoliday, provinceName = 'Canada', federal, locale = 'en' }) => {
  const t = getTranslator(locale)
  const regionLabel = locale === 'fr' ? provinceName : `${provinceName}’${provinceName.endsWith('s') ? '' : 's'}`
  const isOffset = nextHoliday.date !== nextHoliday.observedDate

  return html`
    <h1 class="${styles}">
      <span class="h1--xs">
        ${t(`components.nextHoliday.${federal ? 'federal' : provinceName === 'Canada' ? 'canada' : 'province'}`, { regionLabel, holidayType: nextHoliday.optional ? '' : 'statutory ' })}
      </span>
      <span class="h1--md">
        ${localizedName(nextHoliday, locale).replace(/ /, '\u00a0').replace(/Peoples Day/, 'Peoples\u00a0Day')}
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
