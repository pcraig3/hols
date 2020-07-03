const { html } = require('../utils')
const { css } = require('emotion')
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
      key: html`<a href="/province/${p.id}">${p.nameEn}</a>`,
      value: html`<span class="external-link"
        ><a href="${p.sourceLink}" target="_blank">${p.sourceEn}<${External} /></a
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
          Canada’s holidays vary by region and industry, so here they are collected in one place in
          reasonably friendly formats.
        </p>
        <p>
          If you’re here for the deep cuts, I have the${' '}
          <a
            href="https://github.com/pcraig3/hols/blob/master/README.md"
            title="Sources (including legislation) on Github"
            target="_blank"
            >links to the relevant legislation per region on GitHub</a
          >. (Probably you don’t need them.)
        </p>

        <${SummaryTable}
          title="Source for federally-regulated industries"
          rows=${[
            {
              key: html`<a href="/federal">Federal holidays</a>`,
              value: html`<span class="external-link"
                ><a
                  href="https://www.tpsgc-pwgsc.gc.ca/remuneration-compensation/services-paye-pay-services/paye-information-pay/vie-life/vie-conge-life-leave/conge-paye-holiday-pay-eng.html"
                  target="_blank"
                  >Statutory holiday pay, Canada.ca<${External} /></a
              ></span>`,
              className: summaryTableStyles,
            },
          ]}
        >
          <h2>Source for federally-regulated industries</h2>
          <p>
            11 holidays a year, plus Friday afternoons.
          </p>
        <//>

        <${SummaryTable}
          title="Sources for provinces and territories"
          rows=${createRows({ provinces })}
        >
          <h2>Sources for provinces and territories</h2>
          <p>
            Made in Canada, assembled by hand in Ottawa.
          </p>
        <//>

        <span class="bottom-link"><a href="#html" class="up-arrow">Back to top</a></span>
      <//>
    <//>
  `
}

module.exports = AddHolidays