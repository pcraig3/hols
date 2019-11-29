const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')
const Logo = require('./Logo')

const header = css`
  padding: ${theme.space.md};
  padding-top: ${theme.space.sm};

  @media (${theme.mq.md}) {
    padding-top: ${theme.space.md};
  }

  @media (${theme.mq.md}) {
    padding: ${theme.space.md} ${theme.space.lg};
  }
`
const main = css`
  section {
    min-height: 100vh;
    position: relative;
    padding: ${theme.space.md} ${theme.space.lg} ${theme.space.md} ${theme.space.sm};

    &:first-of-type {
      min-height: 90vh;
    }

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
