const { html } = require('../utils')
const { css } = require('@emotion/css')
const Layout = require('../components/Layout.js')
const Content = require('../components/Content.js')
const Abbr = require('../components/Abbr.js')

const linkStyle = css`
  /* for obfuscating emails. Idea comes from https://mauriciorobayo.github.io/react-obfuscate-email/?path=/docs/react-obfuscate-email--mail */
  a > span.roe::after {
    content: '@';
  }
`

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
        <p className=${linkStyle}>
          Email me pls <span aria-hidden="true">👉</span>${' '}
          <span
            class="email--swap"
            data-email="cGF1bEBwY3JhaWcuY2E/c3ViamVjdD1Tb21ldGhpbmcgaXMgVVAgd2l0aCBjYW5hZGEtaG9saWRheXMuY2E="
            >“paul [a] pcraig [dot] ca”</span
          >
        </p>
      <//>
    <//>
  `

module.exports = Feedback
