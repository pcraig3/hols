const { css } = require('emotion')
const { html } = require('../utils')
const { theme, visuallyHidden, horizontalPadding, insideContainer } = require('../styles')
const Layout = require('../components/Layout.js')
const DateHtml = require('../components/DateHtml.js')
const NextHolidayBox = require('../components/NextHolidayBox.js')
const ProvincePicker = require('../components/ProvincePicker.js')
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

  h2 {
    margin: 0;
    padding-top: ${theme.space.md};
    padding-bottom: ${theme.space.xl};
    font-size: 1.566em;
  }

  div.past {
    > * {
      opacity: 0.6;
    }

    &:hover > * {
      opacity: 1;
    }
  }

  div.upcoming .key {
    color: ${accent};
  }

  @media (${theme.mq.lg}) {
    div.upcoming ~ div.upcoming .key {
      color: ${theme.color.grey};
    }
  }

  #toggle-past {
    margin-top: ${theme.space.sm};
    margin-bottom: ${theme.space.xl};
  }
`

const getTitleString = (provinceName, federal, year) => {
  return `
    ${provinceName}${federal ? ' federal' : ''} statutory holidays in ${year}
  `
}

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

  const today = new Date(Date.now()).toISOString().slice(0, 10)
  var previousDate = null

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

    if (previousDate === holiday.date) {
      row.className += ' repeatDate'
    }

    previousDate = holiday.date
    return row
  })
}

const ifPastHolidays = (holidays = []) => {
  // there must be at least 6 past holidays before the button appears
  const minimum = 6
  const today = new Date(Date.now()).toISOString().slice(0, 10)
  if (!holidays[minimum]) {
    return false
  }

  return holidays[minimum].date < today
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
    <${Layout} color=${federal ? 'federal' : provinceId} route=${federal ? '/federal' : undefined}>
      <div
        class=${federal || provinceId
          ? styles(theme.color[federal ? 'federal' : provinceId])
          : styles()}
      >
        <section>
          <${NextHolidayBox} ...${{ nextHoliday, provinceName, provinceId, federal }} />
          <${ProvincePicker} //>
        </section>

        <section class=${horizontalPadding}>
          <div class=${insideContainer}>
            <${SummaryTable}
              title=${getTitleString(provinceName, federal, year)}
              rows=${createRows(holidays, federal)}
            >
              <h2 id="holidays-table">
                ${provinceName}${federal ? ' federal' : ''}
                <span class=${visuallyHidden}> statutory</span> holidays in ${year}
              </h2>
              ${ifPastHolidays(holidays) &&
                html`
                  <${Button}
                    id="toggle-past"
                    color=${federal || provinceId
                      ? theme.color[federal ? 'federal' : provinceId]
                      : {}}
                    style="display: none;"
                    data-event="true"
                    data-label="toggle-past"
                    >Show past holidays<//
                  >
                `}
            <//>
            <span class="bottom-link"><a href="#html" class="up-arrow">Back to top</a></span>
          </div>
        </section>
        ${ifPastHolidays(holidays) &&
          html`
            <script src="/js/province.js"></script>
          `}
      </div>
    <//>
  `

module.exports = Province
