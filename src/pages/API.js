const { html } = require('../utils')
const { css } = require('emotion')
const { theme } = require('../styles')
const Layout = require('../components/Layout.js')
const Content = require('../components/Content.js')
const Details = require('../components/Details.js')

const linkStyle = css`
  text-decoration: none;
`

const detailsStyle = css`
  font-size: 1em !important;
  margin-bottom: ${theme.space.md};

  ul {
    padding-left: 25px !important;

    @media (${theme.mq.md}) {
      padding-left: 35px !important;
    }
  }
`

const API = () =>
  html`
    <${Layout} route="/api">
      <${Content}>
        <h1>Canada Holidays API</h1>
        <p>
          The ${' '}<a href="https://canada-holidays.ca/api/v1/" target="_blank"
            >Canada Holidays API</a
          >${' '}lists all 28 public holidays for all 13 provinces and territories in Canada,
          including federal holidays.
        </p>
        <p>
          <span aria-hidden="true">👉</span>${' '}
          <strong
            ><a class=${linkStyle} href="https://canada-holidays.ca/api/v1/" target="_blank"
              >https://canada-holidays.ca/api/v1/</a
            ></strong
          >
          ${' '}
        </p>
        <p>Features:</p>
        <ul>
          <li>Return holidays with associated regions</li>
          <li>Return regions with associated holidays</li>
          <li>Returns federal holidays</li>
          <li>Returns national holidays</li>
          <li>Returns “next” holiday for each region</li>
          <li>
            Returns holidays for multiple years: <code>2018</code>, <code>2019</code>,${' '}
            <code>2020</code>, <code>2021</code>, <code>2022</code>.
          </li>
        </ul>
        <${Details}
          summary="Plus(!!!) check out all the goodies you get for free"
          className=${detailsStyle}
          data-event="true"
          data-label="api-features"
        >
          <ul>
            <li>It’s free (<span aria-hidden="true">✨</span>)</li>
            <li>
              <a href="https://twitter.com/pcraig3" target="_blank">Dedicated support channel</a>
            </li>
            <li>Kind of bilingual (EN & FR)</li>
            <li>
              Pretty much compliant with the${' '}
              <a
                href="https://www.canada.ca/en/government/system/digital-government/modern-emerging-technologies/government-canada-standards-apis.html"
                target="_blank"
                >Government of Canada Standards on APIs</a
              >${' '} (heck yes <span aria-hidden="true">🤙</span>)
            </li>
            <li>
              <a href="https://github.com/pcraig3/hols" target="_blank">Open source</a> which is
              cool if you’re a nerd
            </li>
            <li>
              <a
                href="https://github.com/pcraig3/hols/blob/master/reference/Canada-Holidays-API.v1.yaml"
                target="_blank"
                >Documented with an OpenAPI spec</a
              >${' '}which is <em>even more</em> cool for <em>even nerdier</em> nerds
            </li>
          </ul>
        <//>
        <p>Definitely use it for your billions of dollars mission-critical system.</p>

        <h2>Documentation</h2>
        <p>
          There's an OpenAPI spec at${' '}<a
            href="https://github.com/pcraig3/hols/blob/master/reference/Canada-Holidays-API.v1.yaml"
            target="_blank"
            ><code>Canada-Holidays-API.v1.yaml</code></a
          >${' '}and a${' '}<a
            href="https://app.swaggerhub.com/apis/pcraig3/canada-holidays/"
            target="_blank"
            >SwaggerHub</a
          >${' '}page where you can test the endpoints.
        </p>
        <p>
          Otherwise, the${' '}<a
            title="API documentation"
            href="https://github.com/pcraig3/hols/blob/master/API.md"
            target="_blank"
            >documentation on GitHub</a
          >
          ${' '}is pretty good.
        </p>

        <h2>Citations</h2>
        <p>
          Scraped the data from the Wikipedia article “<a
            href="https://en.wikipedia.org/wiki/Public_holidays_in_Canada"
            >Public holidays in Canada</a
          >” that tables out which provinces observe which holidays and vice-versa. And${' '}
          <em>then</em>${' '}I even${' '}
          <a href="https://github.com/pcraig3/hols/#citations" title="Citations" target="_blank"
            >double-checked</a
          >${' '} so we should be all good.
        </p>
        <p>Mistaeks do happen, so <a href="/feedback">lemme know</a>.<//>
      <//>
    <//>
  `

module.exports = API
