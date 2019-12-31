const { css } = require('emotion')
const { html } = require('../utils')
const { theme, horizontalPadding } = require('../styles')
const Nav = require('./Nav')

const header = css`
  ${horizontalPadding};
  padding-top: calc(${theme.space.xs} + 3px);
  padding-bottom: ${theme.space.xs};

  @media (${theme.mq.md}) {
    padding-top: ${theme.space.sm};
    padding-bottom: ${theme.space.sm};
  }
`
const main = css`
  section {
    position: relative;
    padding-bottom: ${theme.space.md};

    @media (${theme.mq.md}) {
      padding-bottom: ${theme.space.xl};
    }
  }
`

const Layout = ({ color, children }) =>
  html`
    <div>
      <header class=${header}>
        <${Nav} color=${color} //>
      </header>
      <main class=${main}>
        ${children}
      </main>
    </div>
  `

module.exports = Layout
