const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')
const Layout = require('../components/Layout.js')
const DateHtml = require('../components/DateHtml.js')
const NextHolidayBox = require('../components/NextHolidayBox.js')
const MenuLink = require('../components/MenuLink.js')
const SummaryTable = require('../components/SummaryTable.js')

const styles = ({ accent = theme.color.red, focus = theme.color.focus } = {}) => css`
  section {
    min-height: calc(var(--vh, 1vh) * 100);
  }

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

const createRows = (holidays, federal) => {
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

    if (!federal && holiday.provinces) {
      row.value2 = _provinces(holiday)
    }

    return row
  })
}

const Province = ({
  data: { holidays, nextHoliday, provinceName = 'Canada', provinceId, federal = false } = {},
}) =>
  html`
    <${Layout}>
      <div
        class=${federal || provinceId
          ? styles(theme.color[federal ? 'federal' : provinceId])
          : styles()}
      >
        <section>
          <${NextHolidayBox} ...${{ nextHoliday, provinceName, provinceId, federal }} />
          <span class="bottom-link"
            ><a href="#upcoming-holidays" class="down-arrow">Upcoming holidays</a></span
          >
          <${MenuLink} canada=${!federal && provinceName === 'Canada'} //>
        </section>

        <section>
          <${SummaryTable}
            id="upcoming-holidays"
            title=${`Upcoming ${federal && 'federal'} holidays in ${provinceName}`}
            rows=${createRows(holidays, federal)}
          />
          <span class="bottom-link"><a href="#html" class="up-arrow">Back to top</a></span>
        </section>
      </div>
      <script src="/js/province.js"></script>
    <//>
  `

module.exports = Province
