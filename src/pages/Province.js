const { css } = require('emotion')
const { html } = require('../utils')
const { theme, visuallyHidden, horizontalPadding, insideContainer } = require('../styles')
const Layout = require('../components/Layout.js')
const DateHtml = require('../components/DateHtml.js')
const NextHolidayBox = require('../components/NextHolidayBox.js')
const Picker = require('../components/Picker.js')
const SummaryTable = require('../components/SummaryTable.js')
const Button = require('../components/Button.js')

const styles = ({ accent = theme.color.red } = {}) => css`
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
`

const titleStyles = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  margin-top: ${theme.space.md};
  margin-bottom: ${theme.space.md};

  @media (${theme.mq.lg}) {
    flex-direction: row;
  }

  h2 {
    margin: 0;
    margin-bottom: 10px;
    font-size: 1.566em;
  }

  h2 + div {
    margin-bottom: ${theme.space.md};
  }

  button,
  a[role='button'] {
    text-align: left;
  }

  @media (${theme.mq.md}) {
    h2 {
      flex: 3;
    }

    h2 + div {
      flex: 2;
      text-align: right;
      margin-bottom: ${theme.space.lg};
    }

    button,
    a[role='button'] {
      min-width: 234px;
    }
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

    let provincesHTML = holiday.provinces.map(
      (p, i) =>
        html`
          <a href="/province/${p.id}" title="Holidays for ${p.nameEn}">${p.id}</a>${i + 1 ===
          holiday.provinces.length
            ? ''
            : ', '}
        `,
    )

    if (holiday.federal) {
      provincesHTML = html`
        <a href="/federal" title="Federal holidays">Federal</a>${provincesHTML.length
          ? ', '
          : ''}${provincesHTML}
      `
    }
    return provincesHTML
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
        <section id="next-holiday">
          <${NextHolidayBox} ...${{ nextHoliday, provinceName, provinceId, federal }} />
          <${Picker} ...${{ provinceId, federal }}=/>
        </section>

        <section class=${horizontalPadding}>
          <div class=${insideContainer}>
            <${SummaryTable}
              title=${getTitleString(provinceName, federal, year)}
              rows=${createRows(holidays, federal)}
            >
              <div class=${titleStyles}>
                <h2 id="holidays-table">
                  ${provinceName}${federal ? ' federal' : ''}
                  <span class=${visuallyHidden}> statutory</span> holidays in ${year}
                </h2>
                <div>
                  <${Button}
                    href=${federal ? '/ics/federal' : provinceId ? `/ics/${provinceId}` : '/ics'}
                    download=${federal
                      ? `canada-holidays-federal-${year}.ics`
                      : provinceId
                      ? `canada-holidays-${provinceId}-${year}.ics`
                      : `canada-holidays-${year}.ics`}
                    color=${federal || provinceId
                      ? theme.color[federal ? 'federal' : provinceId]
                      : {}}
                    data-event="true"
                    data-label="download-holidays"
                    >Add to your calendar<//
                  >
                </div>
              </div>
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
