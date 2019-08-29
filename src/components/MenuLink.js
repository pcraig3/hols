const { html } = require('../utils')
const { css } = require('emotion')
const { theme } = require('../styles')

const styles = css`
  position: fixed;
  bottom: ${theme.space.lg};
  right: 30px;
  z-index: 100;

  a {
    background: white;
    padding: ${theme.space.xs} 0 ${theme.space.xs} ${theme.space.xs};
    margin-left: -${theme.space.xs};

    &:focus {
      outline-offset: -${theme.space.xxs};
    }

    @media (${theme.mq.md}) {
      padding: ${theme.space.sm};
      margin-left: -${theme.space.sm};

      &:focus {
        outline-offset: -${theme.space.xs};
      }
    }
  }

  @media (${theme.mq.md}) {
    right: 60px;
    bottom: 30px;
  }

  @media (${theme.mq.lg}) {
    left: calc(55% - 20px);
    margin-right: -20px;
  }
`

const stylesCanada = css`
  @media (${theme.mq.lg}) {
    left: calc(40% - 7px);
  }
`

const DateHtml = ({ provinceName }) => {
  return html`
    <span
      class=${provinceName === 'Canada'
        ? css`
            ${styles} ${stylesCanada}
          `
        : styles}
      ><a href="/provinces" class="right-arrow">All regions</a></span
    >
  `
}

module.exports = DateHtml
