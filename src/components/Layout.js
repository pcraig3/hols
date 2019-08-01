const { css } = require('emotion')
const { html } = require('../utils')

const main = css`
  max-width: 900px;
`

const Layout = ({ children }) =>
  html`
    <main class=${main}>
      ${children}
    </main>
  `

module.exports = Layout
