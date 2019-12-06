const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')
const Logo = require('./Logo')

const header = css`
  padding: ${theme.space.xs} ${theme.space.md};

  @media (${theme.mq.md}) {
    padding: ${theme.space.xs} ${theme.space.lg};
  }
`
const main = css`
  section {
    position: relative;
    padding: 0 ${theme.space.lg} ${theme.space.md} ${theme.space.sm};

    .bottom-link {
      position: absolute;
      left: ${theme.space.sm};
      bottom: ${theme.space.lg};
    }

    @media (${theme.mq.md}) {
      padding: 0 ${theme.space.xxl} ${theme.space.lg} ${theme.space.lg};

      .bottom-link {
        left: ${theme.space.lg};
      }
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
