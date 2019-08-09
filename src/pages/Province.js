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
  const _provinces = holiday => {
    if (holiday.provinces.length === 13) {
      return 'National holiday'
    }

    return holiday.provinces.map(
      (p, i) =>
        html`
          <a href="/province/${p.id}" title="Holidays for ${p.nameEn}">${p.id}</a>${i + 1 ===
          holiday.provinces.length
            ? ''
            : ', '}
        `,
    )
  }

  return holidays.map(holiday => {
    const row = {
      key: html`
        <${DateHtml} dateString=${holiday.date} weekday=${true} //>
      `,
      value: holiday.nameEn,
    }

    if (holiday.provinces) {
      row.value2 = _provinces(holiday)
    }

    return row
  })
}

const Province = ({ data: { holidays, nextHoliday, provinceName = 'Canada' } = {} }) =>
  html`
    <${Layout}>
      <div class=${styles}>
        <section>
          <${NextHolidayBox} nextHoliday=${nextHoliday} provinceName=${provinceName} />
          <span class="bottom-link"><a href="#upcoming-holidays">Upcoming holidays ↓</a></span>
        </section>

        <section>
          <${SummaryTable}
            id="upcoming-holidays"
            title=${`Upcoming holidays in ${provinceName}`}
            rows=${createRows(holidays)}
          />
          <span class="bottom-link"><a href="#html">Back to top ↑</a></span>
        </section>
      </div>
    <//>
  `

module.exports = Province
