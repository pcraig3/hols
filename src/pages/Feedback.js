const { html } = require('../utils')
const Layout = require('../components/Layout.js')
const Content = require('../components/Content.js')
const Abbr = require('../components/Abbr.js')

const Feedback = () =>
  html`
    <${Layout} route="/feedback">
      <${Content}>
        <h1>Feedback</h1>
        <p>
          If you notice any wrong info or weird layouts, please${' '} get in touch. You’ll be
          helping lots of people out b/c of how crazy good my${' '}
          <${Abbr} title="Search Engine Optimization">SEO<//> is.
        </p>
        <p>
          On the other hand, if you <span role="img" aria-label="heart">❤️</span> my site and want
          to support me on Patreon, we can figure that out as well.
        </p>
        <p>
          Email me pls <span aria-hidden="true">👉</span>${' '}
          <a
            class="pcraig3"
            href="mailto:paul@pcraig3.ca?subject=Something is UP with canada-holidays.ca"
            >paul@pcraig3.ca</a
          >
        </p>
      <//>
    <//>
  `

module.exports = Feedback
