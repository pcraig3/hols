const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')
const Layout = require('../components/Layout.js')
const DateHtml = require('../components/DateHtml.js')
const NextHolidayBox = require('../components/NextHolidayBox.js')
const SummaryTable = require('../components/SummaryTable.js')

const styles = ({ accent = theme.color.red, focus = theme.color.focus } = {}) => css`
  a,
  a:visited {
    color: ${accent};

    &.up-arrow::after {
      content: ' ↑';
    }

    &.down-arrow::after {
      content: ' ↓';
    }

    &.right-arrow::after {
      content: ' →';
    }

    &:focus {
      outline-color: ${focus};
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

const Province = ({ data: { holidays, nextHoliday, provinceName = 'Canada', provinceId } = {} }) =>
  html`
    <${Layout}>
      <div class=${provinceId ? styles(theme.color[provinceId]) : styles()}>
        <section>
          <${NextHolidayBox} ...${{ nextHoliday, provinceName, provinceId }} />
          <span class="bottom-link"
            ><a href="#upcoming-holidays" class="down-arrow">Upcoming holidays</a></span
          >
          <span class="menu-link"><a href="#" class="right-arrow">All regions</a></span>
        </section>

        <section>
          <${SummaryTable}
            id="upcoming-holidays"
            title=${`Upcoming holidays in ${provinceName}`}
            rows=${createRows(holidays)}
          />
          <span class="bottom-link"><a href="#html" class="up-arrow">Back to top</a></span>
        </section>
      </div>
    <//>
  `

module.exports = Province
