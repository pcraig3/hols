const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')
const DateHtml = require('./DateHtml.js')

const accent = theme.color.red

const styles = css`
  border: ${theme.space.xs} solid ${accent};
  padding: ${theme.space.md} ${theme.space.sm};
  margin: -${theme.space.md};

  @media (${theme.mq.md}) {
    margin: 0;
    padding: ${theme.space.lg};
  }

  h1 {
    margin-top: 0;
    font-size: 1.8em;

    .hol-name {
      color: ${accent};
    }

    @media (${theme.mq.sm}) {
      font-size: 1.8em;
    }
  }
`

const renderCelebreatingProvinces = provinces => {
  const isLastProvince = province => province.id === provinces[provinces.length - 1].id
  if (provinces.length === 1) {
    return html`
      <span>Celebrated by${' '}<span>${provinces[0].nameEn}</span>.</span>
    `
  }

  return html`
    <span
      >Celebrated by
      ${provinces.map(
        p => html`
          ${isLastProvince(p) ? ' and ' : ' '}<span>${p.id}</span>${isLastProvince(p) ? '.' : ','}
        `,
      )}
    </span>
  `
}

const nextHolidayBox = ({ nextHoliday }) => {
  return html`
    <div class=${styles}>
      <h1>
        Canada’s next public holiday is${' '}
        <br />
        <span class="hol-name">${nextHoliday.nameEn}</span>
        <br />
        ${' '}on${' '}
        <span><${DateHtml} dateString=${nextHoliday.date} //></span>
      </h1>
      ${renderCelebreatingProvinces(nextHoliday.provinces)}
    </div>
  `
}

module.exports = nextHolidayBox
