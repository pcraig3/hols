const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')
const Layout = require('../components/Layout.js')
const DateHtml = require('../components/DateHtml.js')
const SummaryTable = require('../components/SummaryTable.js')

const accent = theme.color.red

const styles = css`
  a,
  a:visited {
    color: ${accent};
  }

  > section {
    min-height: 95vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .bottom-link {
      margin-top: ${theme.space.lg};
      margin-bottom: ${theme.space.lg};
    }
  }

  > section:first-of-type {
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
  const _provinces = holiday => {
    if (holiday.provinces.length === 13) {
      return 'National holiday'
    }

    return holiday.provinces.map(p => p.id).join(', ')
  }

  return holidays.map(holiday => {
    return {
      key: holiday.nameEn,
      value: html`
        <${DateHtml} dateString=${holiday.date} weekday=${true} //>
      `,
      value2: _provinces(holiday),
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
          <span class="bottom-link"><a href="#upcoming-holidays">All upcoming holidays ↓</a></span>
        </section>

        <section>
          <${SummaryTable}
            id="upcoming-holidays"
            title="Upcoming holidays in Canada"
            rows=${createRows(holidays)}
          />
          <span class="bottom-link"><a href="#html">Back to top ↑</a></span>
        </section>
      </div>
    <//>
  `

module.exports = Canada
