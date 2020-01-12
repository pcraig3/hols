const { html } = require('../utils')
const { css } = require('emotion')
const { theme } = require('../styles')
const { Expand, Collapse, Download } = require('./Svg')

const styles = ({ accent = theme.color.red, focus = theme.color.focus } = {}) => css`
  margin: 0;
  width: auto;
  display: inline-block;
  overflow: visible;
  background: transparent;
  font: inherit;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;
  border-radius: 1px;
  text-decoration: none;

  border: 2px solid ${accent};
  border-bottom: none;
  box-shadow: 0 4px ${accent};

  color: ${accent};
  padding: 3px 5px;
  cursor: pointer;

  &:hover,
  &:focus {
    color: white !important;
    background-color: ${accent};
    box-shadow: 0 4px black;
  }

  &:focus {
    outline: 3px dashed ${focus} !important;
    outline-offset: 8px !important;
  }

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  &:active {
    box-shadow: 0 1px black;
    transform: translateY(3px);
  }

  svg {
    height: 16px;
    width: 16px;
    margin-right: 7px;
    fill: ${accent};

    @media (${theme.mq.md}) {
      height: 18.5px;
      width: 18.5px;
    }

    @media (${theme.mq.lg}) {
      height: 20px;
      width: 20px;
      margin-right: 9px;
    }
  }

  &:hover,
  &:focus {
    svg {
      fill: #ffffff;
    }
  }

  &[data-show='false'] {
    svg.arrows--collapse {
      display: none;
    }
  }

  &[data-show='true'] {
    svg.arrows--expand {
      display: none;
    }
  }
`

const NativeButton = ({ children, color = {}, ...props }) => {
  return html`
    <button class=${styles(color)} ...${props}>${children}</button>
  `
}

const LinkButton = ({ children, color = {}, ...props }) => {
  return html`
    <a class=${styles(color)} role="button" draggable="false" ...${props}>${children}</a>
  `
}

const Button = ({ children, color = {}, ...props }) => {
  return props.href
    ? html`
        <${LinkButton} color=${color} ...${props}><${Download} //><span>${children}</span><//>
      `
    : html`
        <${NativeButton} color=${color} ...${props}
          ><${Expand} //><${Collapse} //><span>${children}</span><//
        >
      `
}

module.exports = Button
