const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')
const DateHtml = require('./DateHtml.js')
const { relativeDate } = require('../dates')

const styles = ({ accent = theme.color.red } = {}) => css`
  border: ${theme.space.xs} solid ${accent};
  padding: ${theme.space.md} ${theme.space.sm};
  margin: -${theme.space.md};
  background-color: ${accent};
  color: white;

  @media (${theme.mq.md}) {
    margin: 0;
    padding: ${theme.space.lg};
    background-color: transparent;
    color: black;
  }

  h1 {
    margin: 0;
    font-size: 1.8em;

    time {
      color: white;
    }

    @media (${theme.mq.sm}) {
      font-size: 1.8em;
    }

    @media (${theme.mq.md}) {
      time {
        color: ${accent};
      }
    }
  }

  h1 + p {
    margin-bottom: 0;
    margin-top: ${theme.space.xl};
  }

  time {
    display: inline-block;
    min-width: 80%;
  }
`

const renderCelebreatingProvinces = provinces => {
  const isLastProvince = province => province.id === provinces[provinces.length - 1].id
  if (provinces.length === 1) {
    return html`
      <p>Celebrated by${' '}<a href=${`/province/${provinces[0].id}`}>${provinces[0].nameEn}</a></p>
    `
  }

  return html`
    <p>
      Celebrated by
      ${provinces.map(
        p => html`
          ${isLastProvince(p) ? ' and ' : ' '}<span>${p.id}</span>${isLastProvince(p) ? '' : ','}
        `,
      )}
    </p>
  `
}

const renderRelativeDate = dateString => {
  return html`
    <p>${relativeDate(dateString)}</p>
  `
}

const nextHolidayBox = ({ nextHoliday, provinceName = 'Canada', provinceId }) => {
  return html`
    <div class=${provinceId ? styles(theme.color[provinceId]) : styles()}>
      <h1>
        ${provinceName}’s next public holiday is${' '}
        <span class="hol-name">${nextHoliday.nameEn}</span>
        ${' '}on${' '}<${DateHtml} dateString=${nextHoliday.date} //>
      </h1>
      ${nextHoliday.provinces
        ? renderCelebreatingProvinces(nextHoliday.provinces)
        : renderRelativeDate(nextHoliday.date)}
    </div>
  `
}

module.exports = nextHolidayBox