const { html } = require('../utils')
const { css } = require('@emotion/css')
const { theme } = require('../styles')
const Layout = require('../components/Layout.js')
const Content = require('../components/Content.js')
const SummaryTable = require('../components/SummaryTable.js')
const CalButton = require('../components/CalButton.js')
const { getCurrentHolidayYear } = require('../dates')

const headerStyles = css`
  h2 {
    font-size: 1.3em;
  }

  h3 {
    font-size: 1.05em;
  }

  .push-down {
    margin-bottom: calc(${theme.space.xl} + ${theme.space.xl});
  }
`

const summaryTableStylesUrls = css`
  @media (${theme.mq.lg}) {
    .key {
      width: 33%;
    }

    .value {
      width: 66%;
      text-align: right;
      padding-right: ${theme.space.xs};
    }
  }
`

const summaryTableStylesButtons = css`
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

const createRows = ({ provinces, year }) => {
  return provinces.map((p) => {
    return {
      key: p.nameEn,
      value: CalButton({
        year,
        provinceId: p.id,
        text: `Get ${p.id} holidays`,
        download: true,
        eventName: 'page-download-holidays',
      }),
      className: summaryTableStylesButtons,
    }
  })
}

const AddHolidays = ({ data: { provinces, year } }) => {
  return html`
    <${Layout}>
      <${Content} className=${headerStyles}>
        <h1>Add Canadian holidays to your calendar</h1>
        <p>There are 2 ways to add holidays to your calendar:</p>
        <ul>
          <li>Adding a “remote calendar” URL that will keep itself updated.</li>
          <li>
            Downloading the holidays locally and importing them into your preferred calendar
            program.
          </li>
        </ul>

        <${SummaryTable}
          title="Stream Canadian statutory holidays"
          rows=${[
            {
              key: 'Canada',
              value: html`<a href="https://canada-holidays.ca/ics?cd=true"
                >https://canada-holidays.ca/ics</a
              >`,
              className: summaryTableStylesUrls,
            },
            {
              key: 'Alberta',
              value: html`<a href="https://canada-holidays.ca/ics/AB?cd=true"
                >https://canada-holidays.ca/ics/AB</a
              >`,
              className: summaryTableStylesUrls,
            },
            {
              key: 'Ontario',
              value: html`<a href="https://canada-holidays.ca/ics/ON?cd=true"
                >https://canada-holidays.ca/ics/ON</a
              >`,
              className: summaryTableStylesUrls,
            },
            {
              key: 'etc.',
              value: html`https://canada-holidays.ca/ics/<code>[regionID]</code>`,
              className: summaryTableStylesUrls,
            },
          ]}
        >
          <h2>Import holidays with “remote calendar” URL</h2>

          <p>
            If you use Outlook, iCal, or Google Calendar, you can import holidays directly from a
            URL. Holidays for ${year} will be added immediately and ${year + 1}’s will be added
            automatically before the end of the year.
          </p>

          <p>
            If you only want holidays for your region, replace${' '}
            <a
              href="https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/completing-slips-summaries/financial-slips-summaries/return-investment-income-t5/provincial-territorial-codes.html"
              target="_blank"
              rel="noopener"
              >your two-character regional code</a
            >${' '} (eg, “AB”, “ON”) with your province or territory.
          </p>
        <//>

        <h2>Download holidays</h2>
        <p class="push-down">
          If you’re not sure how to import them after downloading,${' '}
          <a
            href="#import-holidays"
            aria-label="On-page link: import statutory holidays into your calendar"
            >there’s a little "how-to" further down</a
          >.
        </p>

        <${SummaryTable}
          title="Download all Canadian statutory holidays"
          rows=${[
            {
              key: 'Canada',
              value: CalButton({
                year,
                text: 'Get all holidays',
                download: true,
                eventName: 'page-download-holidays',
              }),
              className: summaryTableStylesButtons,
            },
          ]}
        >
          <h3>Download all Canadian <span class="visuallyHidden">statutory</span> holidays</h3>
          <p>For the Canadian completist.</p>
        <//>

        <${SummaryTable}
          title="Download federally-regulated statutory holidays"
          rows=${[
            {
              key: 'Federal holidays',
              value: CalButton({
                year,
                text: 'Get federal holidays',
                federal: true,
                download: true,
                eventName: 'page-download-holidays',
              }),
              className: summaryTableStylesButtons,
            },
          ]}
        >
          <h3>
            Download federally-regulated <span class="visuallyHidden">statutory</span> holidays
          </h3>
          <p>
            For airline pilots, federal policy wonks, etc.${' '}
            <a href="/do-federal-holidays-apply-to-me">Find out if federal holidays apply to you</a
            >.
          </p>
        <//>

        <${SummaryTable} title="Regional holidays" rows=${createRows({ provinces, year })}>
          <h3>Download regional <span class="visuallyHidden">statutory</span> holidays</h3>
          <p>For regular folks or secessionists.</p>
        <//>

        <h3 id="import-holidays">
          Import <span class="visuallyHidden">statutory</span> holidays into your calendar
        </h3>
        <p>
          Download Canadian holidays and then import them to your Outlook, iCal, or Google Calendar.
        </p>
        <p>Adding holidays to your calendar is easy.</p>
        <ol>
          <li>
            Clicking a button on this page will download an <code>.ics</code> file for
            ${getCurrentHolidayYear()}
          </li>
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
