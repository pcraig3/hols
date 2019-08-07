const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')
const Layout = require('../components/Layout.js')
const DateHtml = require('../components/DateHtml.js')
const NextHolidayBox = require('../components/NextHolidayBox.js')
const SummaryTable = require('../components/SummaryTable.js')

const accent = theme.color.red

const styles = css`
  a,
  a:visited {
    color: ${accent};
  }

  > section:first-of-type {
    max-width: 100%;

    @media (${theme.mq.md}) {
      max-width: 80%;
    }
  }
`

const createRows = holidays => {
  return holidays.map(holiday => {
    return {
      key: html`
        <${DateHtml} dateString=${holiday.date} weekday=${true} //>
      `,
      value: holiday.nameEn,
    }
  })
}

const Province = ({ data: { province = {} } = {} }) =>
  html`
    <${Layout}>
      <div class=${styles}>
        <section>
          <${NextHolidayBox} nextHoliday=${province.nextHoliday} provinceName=${province.nameEn} />
          <span class="bottom-link"><a href="#upcoming-holidays">Upcoming holidays ↓</a></span>
        </section>

        <section>
          <${SummaryTable}
            id="upcoming-holidays"
            title=${`Upcoming holidays in ${province.nameEn}`}
            rows=${createRows(province.holidays)}
          />
          <span class="bottom-link"><a href="#html">Back to top ↑</a></span>
        </section>
      </div>
    <//>
  `

module.exports = Province
