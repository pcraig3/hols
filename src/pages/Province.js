const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')
const Layout = require('../components/Layout.js')
const DateHtml = require('../components/DateHtml.js')
const NextHolidayBox = require('../components/NextHolidayBox.js')
const MenuLink = require('../components/MenuLink.js')
const SummaryTable = require('../components/SummaryTable.js')
const Button = require('../components/Button.js')

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

  div.past {
    > * {
      opacity: 0.45;
    }

    &:hover > * {
      opacity: 1;
    }
  }

  div.upcoming .key {
    color: ${accent};
  }

  div.upcoming ~ div.upcoming .key {
    color: black;
  }

  #toggle-past {
    margin-top: ${theme.space.sm};
    margin-bottom: ${theme.space.xl};
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

  const today = new Date().toISOString().slice(0, 10)

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

    row.className = holiday.date < today ? 'past' : 'upcoming'

    return row
  })
}

const Province = ({
  data: {
    holidays,
    nextHoliday,
    provinceName = 'Canada',
    provinceId,
    federal = false,
    year = 2019,
  } = {},
}) =>
  html`
    <${Layout} color=${federal ? 'federal' : provinceId}>
      <div
        class=${federal || provinceId
          ? styles(theme.color[federal ? 'federal' : provinceId])
          : styles()}
      >
        <section>
          <${NextHolidayBox} ...${{ nextHoliday, provinceName, provinceId, federal }} />
          <${MenuLink} canada=${!federal && provinceName === 'Canada'} //>
        </section>

        <section>
          <${SummaryTable}
            id=${`holidays-${year}`}
            title=${`${provinceName}${federal ? ' federal' : ''} statutory holidays in ${year}`}
            rows=${createRows(holidays, federal)}
          >
            <${Button}
              id="toggle-past"
              color=${federal || provinceId ? theme.color[federal ? 'federal' : provinceId] : {}}
              style="display: none;"
              data-event="true"
              data-label="toggle-past"
              >Show past holidays<//
            >
          <//>
          <span class="bottom-link"><a href="#html" class="up-arrow">Back to top</a></span>
        </section>
      </div>
      <script src="/js/province.js"></script>
    <//>
  `

module.exports = Province
