const { html } = require('../utils')
const { css } = require('@emotion/css')
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

const styles3Columns = css`
  @media (${theme.mq.lg}) {
    left: calc(40% - 7px);
  }
`

const MenuLink = ({ canada }) => {
  return html`
    <span
      class=${canada
        ? css`
            ${styles} ${styles3Columns}
          `
        : styles}
      ><a href="/provinces" class="right-arrow">All regions</a></span
    >
  `
}

module.exports = MenuLink
