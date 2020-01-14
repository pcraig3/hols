const { html } = require('../utils')
const Layout = require('../components/Layout.js')
const Content = require('../components/Content.js')

const Feedback = () =>
  html`
    <${Layout}>
      <${Content}>
        <h1>Holidays API</h1>
        <p>
          <a href="/">canada-holidays.ca</a> is powered by a JSON API that returns Canada’s
          statutory holidays, and you can use it too.${' '}
        </p>
        <p>
          <span aria-hidden="true">👉</span>${' '}

          <a href="https://canada-holidays.ca/api/v1/" target="_blank"
            >https://canada-holidays.ca/api/v1/</a
          >
          ${' '}<span aria-hidden="true">👈</span>
        </p>
        <p>Features:</p>
        <ul>
          <li>Return holidays with associated regions</li>
          <li>Return regions with associated holidays</li>
          <li>Filter by federal holidays</li>
          <li>Filter by national holidays</li>
          <li>Free forever</li>
          <li>It’s pretty good</li>
          <li>Kind of bilingual (EN & FR)</li>
          <li>
            Nearly compliant with the${' '}
            <a
              href="https://www.canada.ca/en/government/system/digital-government/modern-emerging-technologies/government-canada-standards-apis.html"
              target="_blank"
              >Government of Canada Standards on APIs</a
            >${' '} (heck yes <span aria-hidden="true">🤙</span>)
          </li>
          <li>
            <a href="https://github.com/pcraig3/hols" target="_blank">Open source</a> which is cool
            if you’re a nerd
          </li>
        </ul>
        <p>Definitely use it for your billions of dollars mission-critical system.</p>

        <h2>Documentation</h2>
        <p>
          <a
            title="API documentation"
            href="https://github.com/pcraig3/hols/blob/master/API.md"
            target="_blank"
            >Documentation is here</a
          >; it’s pretty good. (see point 5 above.)
        </p>

        <h2>Citations</h2>
        <p>
          Scraped the data from the Wikipedia article “<a
            href="https://en.wikipedia.org/wiki/Public_holidays_in_Canada"
            >Public holidays in Canada</a
          >” that knows about which provinces observe which holidays and vice-versa. And${' '}
          <em>then</em>${' '}I even${' '}
          <a href="https://github.com/pcraig3/hols/#citations" title="Citations" target="_blank"
            >double-checked</a
          >${' '} so we should be all good.
        </p>
        <p>Mistaeks do happen, so <a href="/feedback">lemme know</a>.<//>
      <//>
    <//>
  `

module.exports = Feedback
