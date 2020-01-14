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
      data-label=${`download-holidays-page-${provinceId || 'canada'}`}
      >Get ${provinceId || 'all'} holidays<//
    >
  `
}
const createRows = ({ provinces, year }) => {
  return provinces.map(p => {
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
          Download Canadian holidays and import them to your Outlook, iCal, or Google Calendar.
          (There are probably other calendars but those are the main ones.)
        </p>
        <p>Adding holidays to your calendar is easy.</p>
        <ol>
          <li>You can add all Canadian holidays or just those for your region</li>
          <li>Click to download an <code>.ics</code> file with the dates</li>
          <li>Double-click the file (or drag it into your preferred calendar)</li>
          <li>Done! <span role="img" aria-label="Happy cowboy">🤠</span></li>
        </ol>
        <p>
          You can also just peek at the <a href="/provinces">holidays for your region</a> and add
          them later.
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
        <span class="bottom-link"><a href="#html" class="up-arrow">Back to top</a></span>
      <//>
    <//>
  `
}

module.exports = AddHolidays
