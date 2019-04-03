const { css } = require('emotion')
const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')

const welcome = css`
  li {
    margin-bottom: 5px;
  }
`

const Welcome = () =>
  html`
    <${Layout}>
      <div class=${welcome}>
        <h1>Claim tax benefits (CTB)</h1>
        <p>File your taxes to receive your benefits.</p>

        <p>You will need to know:</p>
        <ul>
          <li>Your Social Insurance Number</li>
          <li>Your Date of Birth</li>
        </ul>

        <p>
          Then, you will see the information CRA has on file about you. If it is
          up to date, you will be able to file your return immediately.
        </p>

        <a href="/login">Get started →</a>
      </div>
    <//>
  `

module.exports = Welcome
