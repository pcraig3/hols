const { css } = require('@emotion/css')
const { html } = require('../utils')
const DateHtml = require('./DateHtml.js')
const { displayDate } = require('../dates')

const styles = css`
  display: flex;
  flex-direction: column;

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

const getTitle = (nextHoliday) => {
  return `${displayDate(nextHoliday.date)} (Observed: ${displayDate(nextHoliday.observedDate)})`
}

const NextHoliday = ({ nextHoliday, provinceName = 'Canada', federal }) => {
  const isOffset = nextHoliday.date !== nextHoliday.observedDate

  return html`
    <h1 class="${styles}">
      <div class="h1--xs">
        ${provinceName}’${provinceName.slice(-1) === 's' ? '' : 's'}
        ${' '}next${' '}${federal && 'federal '}${nextHoliday.optional
          ? ''
          : 'statutory '}holiday${' '.replace(/ /, '\u00a0')}is
      </div>
      <div class="h1--md">
        ${nextHoliday.nameEn.replace(/ /, '\u00a0').replace(/Peoples Day/, 'Peoples\u00a0Day')}
      </div>
      <span class="visuallyHidden">, on</span>
      <div class="h1--lg">
        <a
          id="next-holiday-link"
          href="#next-holiday-row"
          title="${isOffset && getTitle(nextHoliday)}"
          ><${DateHtml} data-event="true" data-action="next-holidays-row-link"
          data-label=${`next-holidays-row-link-${
            federal ? 'federal' : provinceName.replace(/\s+/g, '-').toLowerCase()
          }`}
          dateString=${nextHoliday.date} //>${isOffset && html`<sup aria-hidden="true">*</sup>`}
        </a>
      </div>
    </h1>
  `
}

module.exports = NextHoliday
