const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')
const Layout = require('../components/Layout.js')
const DateHtml = require('../components/DateHtml.js')
const SummaryTable = require('../components/SummaryTable.js')

const accent = theme.color.red

const styles = css`
  > section:first-of-type {
    min-height: 80vh;
    max-width: 80%;

    > div {
      border: ${theme.space.xs} solid ${accent};
      padding: ${theme.space.lg};
    }

    h1 {
      margin-top: 0;
      font-size: 1.8em;

      .hol-name {
        color: ${accent};
      }
    }
  }
`

const renderCelebreatingProvinces = provinces => {
  const isLastProvince = province => province.id === provinces[provinces.length - 1].id
  if (provinces.length === 1) {
    return html`
      <span>Celebrated by${' '}<span>${provinces[0].nameEn}</span>. </span>
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

const createRows = holidays => {
  return holidays.map(holiday => {
    return {
      key: holiday.nameEn,
      value: html`
        <${DateHtml} dateString=${holiday.date} weekday=${true} //>
      `,
    }
  })
}

const Canada = ({ data: { holidays, nextHoliday } = {} }) =>
  html`
    <${Layout}>
      <div class=${styles}>
        <section>
          <div>
            <h1>
              Canada’s next public holiday is <br /><span class="hol-name"
                >${nextHoliday.nameEn}</span
              ><br />
              on ${' '}
              <span><${DateHtml} dateString=${nextHoliday.date} //></span>
            </h1>
            ${renderCelebreatingProvinces(nextHoliday.provinces)}
          </div>
        </section>

        <div>
          <h3>All upcoming holidays ↓</h3>
          <${SummaryTable} title="Holidays" rows=${createRows(holidays)} />
        </div>
      </div>
    <//>
  `

module.exports = Canada
