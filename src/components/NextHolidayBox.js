const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')
const DateHtml = require('./DateHtml.js')
const { relativeDate } = require('../dates')

const styles = ({ accent = theme.color.red } = {}) => css`
  padding: ${theme.space.xl} ${theme.space.lg};
  background-color: ${accent};
  color: white;
  margin: -${theme.space.lg} -${theme.space.lg} 0 -${theme.space.lg};

  @media (${theme.mq.sm}) {
    min-height: 65vh;
  }

  @media (${theme.mq.md}) {
    font-size: 3vw;
    margin-right: -${theme.space.xxl};
    min-height: 70vh;
  }

  @media (${theme.mq.lg}) {
    font-size: 3vw;
  }

  h1 {
    .h1--intro {
      font-size: 50%;
      font-weight: 400;
    }

    .h1--date {
      font-size: 130%;
      font-weight: 700;
    }

    .h1--name {
      font-size: 80%;
      font-weight: 500;
    }

    div {
      margin-bottom: 3px;
    }
  }

  h1,
  p {
    width: 100%;

    @media (${theme.mq.md}) {
      width: 70%;
      max-width: 850px;
    }
  }

  h1 + p {
    margin-bottom: 0;
    margin-top: ${theme.space.xl};
    font-size: 80%;

    + p {
      margin-top: ${theme.space.xl};
    }
  }

  a,
  a:visited {
    color: white;
  }
`

const renderCelebratingProvinces = provinces => {
  if (provinces.length === 1) {
    return html`
      <p>Celebrated by${' '}<a href=${`/province/${provinces[0].id}`}>${provinces[0].nameEn}</a></p>
    `
  }

  if (provinces.length === 13) {
    return html`
      <p>Celebrated by${' '}<a href="/provinces">all provinces and territories</a></p>
    `
  }

  const isLastProvince = province => province.id === provinces[provinces.length - 1].id

  return html`
    <p>
      Celebrated by
      ${provinces.map(
        p => html`
          ${isLastProvince(p) ? ' and ' : ' '}<a href=${`/province/${p.id}`}>${p.id}</a
          >${isLastProvince(p) ? '' : ','}
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

const nextHolidayBox = ({ nextHoliday, provinceName = 'Canada', provinceId, federal }) => {
  return html`
    <div
      class=${federal || provinceId
        ? styles(theme.color[federal ? 'federal' : provinceId])
        : styles()}
    >
      <h1>
        <div class="h1--intro">
          ${provinceName}’s next${' '}${federal && 'federal '}statutory holiday is
        </div>
        <div class="h1--date"><${DateHtml} dateString=${nextHoliday.date} //></div>
        <div class="h1--name">${nextHoliday.nameEn.replace(/ /g, '\u00a0')}</div>
      </h1>
      ${nextHoliday.provinces && !federal
        ? renderCelebratingProvinces(nextHoliday.provinces)
        : renderRelativeDate(nextHoliday.date)}
      ${federal &&
        html`
          <p>
            <a href="/do-federal-holidays-apply-to-me">Find out who gets federal stat holidays</a>.
          </p>
        `}
    </div>
  `
}

module.exports = nextHolidayBox
