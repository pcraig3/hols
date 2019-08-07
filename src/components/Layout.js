const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')

const main = css`
  max-width: 900px;

  div > section {
    min-height: 91vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .bottom-link {
      margin-top: ${theme.space.lg};
      margin-bottom: 0;
      display: inline-block;
    }
  }
`

const Layout = ({ children }) =>
  html`
    <main class=${main}>
      ${children}
    </main>
  `

module.exports = Layout
