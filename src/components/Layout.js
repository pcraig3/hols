const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')

const main = css`
  div > section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: ${theme.space.md} ${theme.space.lg} ${theme.space.md} ${theme.space.sm};

    @media (${theme.mq.md}) {
      padding: ${theme.space.lg} ${theme.space.xxl} ${theme.space.lg} ${theme.space.lg};
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

    .menu-link {
      background: white;
      position: fixed;
      bottom: 30px;
      right: 30px;

      @media (${theme.mq.md}) {
        right: 60px;
      }

      @media (${theme.mq.lg}) {
        left: calc(55% - 20px);
      }
    }
  }

  p {
    margin: 0 0 ${theme.space.lg} 0;
  }
`

const Layout = ({ children }) =>
  html`
    <main class=${main}>
      ${children}
    </main>
  `

module.exports = Layout
