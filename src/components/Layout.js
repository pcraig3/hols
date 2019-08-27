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

    .menu-link {
      background: white;
      position: fixed;
      bottom: ${theme.space.lg};
      right: 30px;

      @media (${theme.mq.md}) {
        right: 60px;
        bottom: 30px;
      }

      @media (${theme.mq.lg}) {
        left: calc(55% - 20px);
        margin-right: -20px;
      }
    }

    .menu-link--Canada {
      @media (${theme.mq.lg}) {
        left: calc(40% - 7px);
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
