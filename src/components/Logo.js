const { html } = require('../utils')
const { css } = require('emotion')
const { theme } = require('../styles')

const div = (color = 'federal') => css`
  position: relative;
  display: inline-block;

  a {
    color: ${theme.color.red};
    text-decoration: none;
    margin-left: -1px;

    &:hover,
    &:focus {
      > span:last-of-type {
        text-decoration: underline;
      }
    }

    &:focus {
      outline: 2px solid ${theme.color[color].focus};
      outline-offset: 8px;
    }
  }

  span:first-of-type {
    position: relative;
    color: transparent;
    margin-right: 4px;

    &:before {
      position: absolute;
      content: '';
      background-image: url('/favicon.png');
      background-size: contain;
      background-repeat: no-repeat;
      min-width: 100%;
      height: 100%;
      top: -1px;
    }

    @media (${theme.mq.md}) {
      margin-right: 6px;

      &:before {
        top: -2px;
      }
    }
  }
`

const Logo = ({ color }) => {
  return html`
    <div class=${div(color)}>
      <a href="/">
        <span aria-hidden="true">ch</span>
        <span>Canada Holidays</span></a
      >
    </div>
  `
}

module.exports = Logo
