const { html } = require('../utils')
const { css } = require('@emotion/css')
const { theme } = require('../styles')
const Layout = require('../components/Layout.js')
const Content = require('../components/Content.js')
const SummaryTable = require('../components/SummaryTable.js')
const { External } = require('../components/Svg.js')

const summaryTableStyles = css`
  .key a {
    color: ${theme.color.grey};
    font-weight: 600;
  }

  @media (${theme.mq.lg}) {
    .key {
      width: 50%;
    }

    .value {
      width: 50%;
      text-align: left;
      padding-right: ${theme.space.xs};
    }
  }
`

const createRows = ({ provinces }) => {
  return provinces.map((p) => {
    return {
      key: html`<a href="/provinces/${p.id}">${p.nameEn}</a>`,
      value: html`<span class="external-link"
        ><a href="${p.sourceLink}" target="_blank" rel="noopener">${p.sourceEn}<${External} /></a
      ></span>`,
      className: summaryTableStyles,
    }
  })
}

const AddHolidays = ({ data: { provinces } }) => {
  return html`
    <${Layout}>
      <${Content}>
        <h1>All sources</h1>
        <p>
          Canada’s holidays vary by region and industry, so here they are in reasonably friendly
          formats.
        </p>
        <p>
          (I can also offer <a href="#legislation">unfriendly formats</a> for the holiday scholar.)
        </p>

        <${SummaryTable}
          title="Federally-regulated industries"
          rows=${[
            {
              key: html`<a href="/federal">Federal holidays</a>`,
              value: html`<span class="external-link"
                ><a
                  href="https://www.tpsgc-pwgsc.gc.ca/remuneration-compensation/services-paye-pay-services/paye-information-pay/vie-life/vie-conge-life-leave/conge-paye-holiday-pay-eng.html"
                  target="_blank"
                  rel="noopener"
                  >Statutory holiday pay, Canada.ca<${External} /></a
              ></span>`,
              className: summaryTableStyles,
            },
          ]}
        >
          <h2>Federally-regulated industries</h2>
          <p>11 holidays a year, plus Friday afternoons.</p>
        <//>

        <${SummaryTable} title="Provinces and territories" rows=${createRows({ provinces })}>
          <h2>Provinces and territories</h2>
          <p>Made in Canada, assembled by hand in Ottawa.</p>
        <//>

        <h2 id="legislation" tabindex="-1">Public holiday legislation</h2>
        <p>
          If you’re a legal eagle, I’ve collected${' '}
          <a
            href="https://github.com/pcraig3/hols#citations"
            title="Sources (including legislation) on Github"
            target="_blank"
            rel="noopener"
            data-event="true"
            data-action="all-sources-link"
            data-label="all-sources-link-canada"
            >links to the relevant legislation per region</a
          >. Fill yer boots, as they say.
        </p>

        <br />
        <br />
        <span class="bottom-link"><a href="#html" class="up-arrow">Back to top</a></span>
      <//>
    <//>
  `
}

module.exports = AddHolidays
