const { css } = require('emotion')
const { html, getProvinceIdOrFederalString } = require('../utils')
const { theme, visuallyHidden, horizontalPadding, insideContainer } = require('../styles')
const Layout = require('../components/Layout.js')
const DateHtml = require('../components/DateHtml.js')
const NextHolidayBox = require('../components/NextHolidayBox.js')
const ProvincePicker = require('../components/ProvincePicker.js')
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
    margin-top: ${theme.space.lg};

    h2 {
      flex: 3;
    }

    h2 + div {
      flex: 2;
      text-align: right;
      margin-top: 6px;
      margin-bottom: ${theme.space.lg};
    }

    button,
    a[role='button'] {
      min-width: 234px;
    }
  }

  @media (${theme.mq.lg}) {
    flex-direction: row;
  }
`

const getTitleString = (provinceName, federal, year) => {
  return `
    ${provinceName}${federal ? ' federal' : ''} statutory holidays in ${year}
  `
}

const createRows = (holidays, federal, isCurrentYear) => {
  const _provinces = (holiday) => {
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
  let previousDate = null

  return holidays.map((holiday) => {
    const row = {
      key: html` <${DateHtml} dateString=${holiday.date} weekday=${true} //> `,
      value: holiday.nameEn,
      className: '',
    }

    if (!federal && holiday.provinces) {
      row.value2 = _provinces(holiday)
    }

    if (isCurrentYear) {
      row.className = holiday.date < today ? 'past' : 'upcoming'
    }

    if (previousDate === holiday.date) {
      row.className += ' repeatDate'
    }

    previousDate = holiday.date
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
    year = 2020,
  } = {},
}) => {
  const provinceIdOrFederal = getProvinceIdOrFederalString({ provinceId, federal })
  const isCurrentYear = !!nextHoliday
  return html`
    <${Layout} color=${federal ? 'federal' : provinceId}>
      <div class=${provinceIdOrFederal ? styles(theme.color[provinceIdOrFederal]) : styles()}>
        <section id="next-holiday">
          <${NextHolidayBox} ...${{ nextHoliday, provinceName, provinceId, federal, year }} />
          <${ProvincePicker} ...${{ provinceId, federal }}=/>
        </section>

        <section class=${horizontalPadding}>
          <div class=${insideContainer}>
            <${SummaryTable}
              title=${getTitleString(provinceName, federal, year)}
              rows=${createRows(holidays, federal, isCurrentYear)}
            >
              ${nextHoliday &&
              html` <div class=${titleStyles}>
                <h2 id="holidays-table">
                  ${provinceName}${federal ? ' federal' : ''}
                  <span class=${visuallyHidden}> statutory</span> holidays in ${year}
                </h2>
                <div>
                  <${Button}
                    href=${federal ? '/ics/federal' : provinceId ? `/ics/${provinceId}` : '/ics'}
                    download=${provinceIdOrFederal
                      ? `canada-holidays-${provinceIdOrFederal}-${year}.ics`
                      : `canada-holidays-${year}.ics`}
                    color=${provinceIdOrFederal ? theme.color[provinceIdOrFederal] : {}}
                    className=${'ghost'}
                    data-event="true"
                    data-action="download-holidays"
                    data-label=${`download-holidays-${provinceIdOrFederal || 'canada'}`}
                    >Add to your calendar<//
                  >
                </div>
              </div>`}
            <//>
            <span class="bottom-link"><a href="#html" class="up-arrow">Back to top</a></span>
          </div>
        </section>
      </div>
    <//>
  `
}

module.exports = Province
