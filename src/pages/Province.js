const { css } = require('@emotion/css')
const { html, pe2pei, getProvinceIdOrFederalString } = require('../utils')
const { theme, horizontalPadding, insideContainer } = require('../styles')
const { ALLOWED_YEARS } = require('../config/vars.config')
const Layout = require('../components/Layout.js')
const NextHolidayBox = require('../components/NextHolidayBox.js')
const ProvincePicker = require('../components/ProvincePicker.js')
const SummaryTable = require('../components/SummaryTable.js')
const CalButton = require('../components/CalButton.js')
const NextYearLink = require('../components/NextYearLink.js')
const ObservedDateKey = require('../components/ObservedDateKey')

const { External } = require('../components/Svg.js')

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

  .bottom-link__container.with-source {
    display: flex;
    flex-direction: column;
    margin-top: -${theme.space.xxl};

    @media (${theme.mq.md}) {
      flex-direction: row-reverse;
      justify-content: space-between;
      margin-top: 0;
    }

    .bottom-link:last-of-type {
      margin-right: ${theme.space.md};
    }
  }

  details {
    font-size: 1em;
    margin-top: 0;

    summary {
      &:focus,
      &:hover {
        > span {
          border-bottom: 3px solid ${accent};

          @media (${theme.mq.md}) {
            border-bottom: 5px solid ${accent};
          }
        }
      }
    }

    summary ~ * {
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
          <a href="/provinces/${p.id}" title="Holidays for ${p.nameEn}">${pe2pei(p.id)}</a>${i +
            1 ===
          holiday.provinces.length
            ? ''
            : ', '}
        `,
    )

    if (holiday.federal) {
      provincesHTML = html`
        <a href="/federal" title="Federal holidays">Federal holiday</a>${provincesHTML.length
          ? ', '
          : ''}${provincesHTML}
      `
    }
    return provincesHTML
  }

  const today = new Date(Date.now()).toISOString().slice(0, 10)
  let previousDate = null
  let nextFound = false

  return holidays.map((holiday) => {
    const row = {
      key: html`<${ObservedDateKey} holiday=${holiday} />`,
      value: holiday.nameEn,
      className: '',
    }

    if (!federal && holiday.provinces) {
      row.value2 = _provinces(holiday)
    }

    if (isCurrentYear) {
      row.className = holiday.observedDate < today ? 'past' : 'upcoming'

      if (nextFound === false && row.className === 'upcoming') {
        // add "next-holiday-row" id to first upcoming holiday
        row.id = 'next-holiday-row'
        nextFound = true
      }
    }

    if (previousDate === holiday.observedDate) {
      row.className += ' repeatDate'
    }

    previousDate = holiday.observedDate
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
    year = 2021,
    source = false,
  } = {},
}) => {
  const provinceIdOrFederal = getProvinceIdOrFederalString({ provinceId, federal })
  const isCurrentYear = !!nextHoliday
  return html`
    <${Layout} color=${federal ? 'federal' : provinceId}>
      <div class=${provinceIdOrFederal ? styles(theme.color[provinceIdOrFederal]) : styles()}>
        <section id="next-holiday">
          <${NextHolidayBox} ...${{ nextHoliday, provinceName, provinceId, federal, year }} />
          <${ProvincePicker} ...${{ provinceId, federal, year }}=/>
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
                  <span class="visuallyHidden"> statutory</span> holidays in ${year}
                </h2>
                <div>
                  <${CalButton} provinceId=${provinceId} federal=${federal} year=${year}
                  query=${'cd=true'} className=${'ghost'} //>
                </div>
              </div>`}
            <//>
            ${year < ALLOWED_YEARS[ALLOWED_YEARS.length - 1] &&
            html`<${NextYearLink}
              provinceName=${provinceName}
              provinceId=${provinceId}
              federal=${federal}
              year=${year}
            />`}
            <div class="bottom-link__container with-source">
              ${source
                ? html`<span class="bottom-link external-link"
                    >Source:${' '}<a
                      href=${source.link}
                      target="_blank"
                      rel="noopener"
                      data-event="true"
                      data-action="source-link"
                      data-label=${`source-link-${provinceIdOrFederal || 'canada'}`}
                      >${source.nameEn}<${External} /></a
                  ></span>`
                : html`<span class="bottom-link external-link"
                    ><a
                      href="/sources"
                      data-event="true"
                      data-action="source-link"
                      data-label="source-link-canada"
                      >All sources</a
                    ></span
                  >`}
              <span class="bottom-link"><a href="#html" class="up-arrow">Back to top</a></span>
            </div>
          </div>
        </section>
      </div>
    <//>
  `
}

module.exports = Province
