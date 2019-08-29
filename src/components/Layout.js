const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')

const main = css`
  section {
    min-height: 100vh;
    position: relative;
    padding: ${theme.space.md} ${theme.space.lg} ${theme.space.md} ${theme.space.sm};

    .bottom-link {
      position: absolute;
      left: ${theme.space.sm};
      bottom: ${theme.space.lg};
    }

    @media (${theme.mq.md}) {
      padding: ${theme.space.lg} ${theme.space.xxl} ${theme.space.lg} ${theme.space.lg};

      .bottom-link {
        left: ${theme.space.lg};
      }
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
