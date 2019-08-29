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
          <${MenuLink} provinceName=${provinceName} //>
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
      <script>
        function throttle(callback, limit) {
          var wait = false /* Initially, we're not waiting */
          return function() {
            /* We return a throttled function */
            if (!wait) {
              /* If we're not waiting */
              callback.call() /* Execute user's function */
              wait = true /* Prevent future invocations */
              setTimeout(function() {
                /* After a period of time */
                wait = false /* And allow future invocations */
              }, limit)
            }
          }
        }

        function updateCSSVar() {
          /* First we get the viewport height and we multiple it by 1% to get a value for a vh unit */
          let vh = window.innerHeight * 0.01
          /* Then we set the value in the --vh custom property to the root of the document */
          document.documentElement.style.setProperty('--vh', vh + 'px')
        }

        function ifLandscapeMode(cb) {
          return function() {
            /* you're in LANDSCAPE mode */
            if (window.matchMedia('(orientation: landscape)').matches) {
              cb()
            }
          }
        }

        /* We listen to the resize event every 5 milliseconds */
        window.addEventListener('resize', throttle(ifLandscapeMode(updateCSSVar), 5))
        updateCSSVar()
      </script>
    <//>
  `

module.exports = Province
