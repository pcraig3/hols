const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')
const Logo = require('./Logo')

const header = css`
  font-size: 0.9em;
  font-weight: 600;
  padding: ${theme.space.xs} ${theme.space.sm};

  @media (${theme.mq.md}) {
    padding: ${theme.space.sm} ${theme.space.lg};
    font-size: 1em;
  }
`
const main = css`
  section {
    position: relative;
    padding: 0 ${theme.space.lg} ${theme.space.md} ${theme.space.sm};

    @media (${theme.mq.md}) {
      padding: 0 ${theme.space.xxl} ${theme.space.xl} ${theme.space.lg};
    }
  }
`

const Layout = ({ color, children }) =>
  html`
    <div>
      <header class=${header}>
        <${Logo} color=${color} />
      </header>
      <main class=${main}>
        ${children}
      </main>
    </div>
  `

module.exports = Layout
