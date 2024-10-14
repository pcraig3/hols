const { html } = require('../utils')
const { css } = require('@emotion/css')
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
          >${' '}lists all 30 public holidays for all 13 provinces and territories in Canada,
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
        <h2>Features</h2>
        <ul>
          <li>Get all holidays with associated regions</li>
          <li>Get all regions with associated holidays</li>
          <li>Get federal holidays</li>
          <li>Get national holidays</li>
          <li>Get upcoming (“next”) holiday for each region</li>
          <li>
            Get holidays for past/future years: <code>2015</code>, ${' '}⋯${' '},${' '}
            <code>2024</code>, ${' '}⋯${' '}, <code>2031</code>.
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
              <a href="https://twitter.com/pcraig3" target="_blank" rel="noopener"
                >Dedicated support channel</a
              >
            </li>
            <li>Kind of bilingual (EN & FR)</li>
            <li>
              Basically compliant with the${' '}
              <a
                href="https://www.canada.ca/en/government/system/digital-government/modern-emerging-technologies/government-canada-standards-apis.html"
                target="_blank"
                >Government of Canada Standards on APIs</a
              >${' '} (<span aria-hidden="true">🤙</span>)
            </li>
            <li>
              <a href="https://github.com/pcraig3/hols" target="_blank" rel="noopener"
                >Open source</a
              >${' '}which is cool if you’re a nerd
            </li>
            <li>
              <a
                href="https://github.com/pcraig3/hols/blob/main/reference/Canada-Holidays-API.v1.yaml"
                target="_blank"
                rel="noopener"
                >Documented with an OpenAPI spec</a
              >${' '}which is <em>even more</em> cool for <em>even nerdier</em> nerds
            </li>
          </ul>
        <//>
        <p>Definitely use it for your billions of dollars mission-critical system.</p>

        <h2>Documentation</h2>
        <p>
          There's an OpenAPI spec at${' '}<a
            href="https://github.com/pcraig3/hols/blob/main/reference/Canada-Holidays-API.v1.yaml"
            target="_blank"
            rel="noopener"
            ><code>Canada-Holidays-API.v1.yaml</code></a
          >${' '}and a${' '}<a
            href="https://app.swaggerhub.com/apis/pcraig3/canada-holidays/"
            target="_blank"
            rel="noopener"
            >SwaggerHub</a
          >${' '}page where you can test the endpoints.
        </p>
        <p>
          There’s also a ${' '}<a
            title="API documentation"
            href="https://github.com/pcraig3/hols/blob/main/API.md"
            target="_blank"
            rel="noopener"
            >basic overview on GitHub</a
          >
          ${' '}if you’re a “read-the-first-and-last-chapter” kind of person.
        </p>

        <h2>Citations</h2>
        <p>
          I’ve collected references to${' '}<a href="/sources">all the sources</a>${' '}I’m using
          for each region in Canada, so data returned from the API should all be accurate.
        </p>
        <p>Mistaeks do happen, however — <a href="/feedback">lemme know</a> if you spot any.<//>

        <br />
        <br />
        <span class="bottom-link"><a href="#html" class="up-arrow">Back to top</a></span>
      <//>
    <//>
  `

module.exports = API
