const { html } = require('../utils')
const { css } = require('emotion')
const { theme, visuallyHidden } = require('../styles')
const Layout = require('../components/Layout.js')
const Content = require('../components/Content.js')
const Button = require('../components/Button.js')
const SummaryTable = require('../components/SummaryTable.js')

const summaryTableStyles = css`
  @media (${theme.mq.lg}) {
    .key {
      width: 55%;
    }

    .value {
      width: 45%;
      text-align: right;
      padding-right: ${theme.space.xs};
    }
  }
`

const downloadButton = ({ provinceId, year }) => {
  return html`
    <${Button}
      href=${`/ics${provinceId ? `/${provinceId}` : ''}`}
      download=${`canada-holidays-${provinceId ? `${provinceId}-` : ''}${year}.ics`}
      color=${provinceId && theme.color[provinceId]}
      data-event="true"
      data-action="page-download-holidays"
      data-label=${`page-download-holidays-${provinceId || 'canada'}`}
      >Get ${provinceId || 'all'} holidays<//
    >
  `
}
const createRows = ({ provinces, year }) => {
  return provinces.map((p) => {
    return {
      key: p.nameEn,
      value: downloadButton({ provinceId: p.id, year }),
      className: summaryTableStyles,
    }
  })
}

const AddHolidays = ({ data: { provinces, year } }) => {
  return html`
    <${Layout}>
      <${Content}>
        <h1>Add Canada’s ${year} holidays to your calendar</h1>
        <p>
          If you’re not sure how to import them,${' '}
          <a
            href="#import-holidays"
            aria-label="On-page link: import statutory holidays into your calendar"
            >there’s a little "how-to" further down</a
          >.
        </p>

        <${SummaryTable}
          title="Download all Canadian statutory holidays"
          rows=${[
            { key: 'Canada', value: downloadButton({ year }), className: summaryTableStyles },
          ]}
        >
          <h2>Download all Canadian <span class=${visuallyHidden}>statutory</span> holidays</h2>
          <p>For the Canadian completist.</p>
        <//>

        <${SummaryTable}
          title="Download federally-regulated statutory holidays"
          rows=${[
            {
              key: 'Federal holidays',
              value: downloadButton({ provinceId: 'federal', year }),
              className: summaryTableStyles,
            },
          ]}
        >
          <h2>
            Download federally-regulated <span class=${visuallyHidden}>statutory</span> holidays
          </h2>
          <p>
            For airline pilots, federal policy wonks, etc.${' '}
            <a href="/do-federal-holidays-apply-to-me">Find out if federal holidays apply to you</a
            >.
          </p>
        <//>

        <${SummaryTable} title="Regional holidays" rows=${createRows({ provinces, year })}>
          <h2>Download regional <span class=${visuallyHidden}>statutory</span> holidays</h2>
          <p>For regular folks or secessionists.</p>
        <//>

        <h2 id="import-holidays">
          Import <span class=${visuallyHidden}>statutory</span> holidays into your calendar
        </h2>
        <p>
          Download Canadian holidays and then import them to your Outlook, iCal, or Google Calendar.
        </p>
        <p>Adding holidays to your calendar is easy.</p>
        <ol>
          <li>Clicking a button on this page will download an <code>.ics</code> file for 2020</li>
          <li>Double-click the file (or drag it into your preferred calendar)</li>
          <li>Confirm you want to import ’em</li>
          <li>Done! <span role="img" aria-label="Happy cowboy">🤠</span></li>
        </ol>

        <br />
        <br />
        <span class="bottom-link"><a href="#html" class="up-arrow">Back to top</a></span>
      <//>
    <//>
  `
}

module.exports = AddHolidays
