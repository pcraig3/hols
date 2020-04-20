const { html } = require('../utils')
const { css } = require('emotion')
const DateHtml = require('./DateHtml.js')
const { theme, visuallyHidden } = require('../styles')

const styles = css`
  .h1--xs {
    font-size: 0.533em;
    font-weight: 400;
    margin-bottom: 5px;

    @media (${theme.mq.lg}) {
      font-weight: 300;
    }
  }

  .h1--lg {
    font-size: 1.3em;
    font-weight: 700;
  }

  .h1--md {
    font-size: 0.75em;
    font-weight: 400;

    @media (${theme.mq.lg}) {
      font-size: 0.83em;
      font-weight: 300;
    }
  }
`

const NextHoliday = ({ nextHoliday, provinceName = 'Canada', federal }) => {
  return html`
    <h1 class=${styles}>
      <div class="h1--xs">
        ${provinceName}’${provinceName.slice(-1) === 's' ? '' : 's'}
        ${' '}next${' '}${federal && 'federal '}<span class=${visuallyHidden}>statutory </span
        >holiday is
      </div>
      <div class="h1--lg"><${DateHtml} dateString=${nextHoliday.date} //></div>
      <div class="h1--md">${nextHoliday.nameEn.replace(/ /g, '\u00a0')}</div>
    </h1>
  `
}

module.exports = NextHoliday
