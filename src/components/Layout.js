const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')

const main = css`
  max-width: 900px;

  div > section {
    min-height: 99vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${theme.space.md};

    @media (${theme.mq.md}) {
      padding: ${theme.space.lg} 0 ${theme.space.lg} ${theme.space.lg};
    }

    .bottom-link {
      margin-top: ${theme.space.lg};
      margin-bottom: ${theme.space.sm};
      display: inline-block;

      @media (${theme.mq.md}) {
        margin-bottom: 0;
      }
    }

    &:first-of-type .bottom-link {
      margin-bottom: ${theme.space.xxl};

      @media (${theme.mq.md}) {
        margin-bottom: 0;
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
