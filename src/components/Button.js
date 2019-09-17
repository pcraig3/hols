const { html } = require('../utils')
const { css } = require('emotion')
const { theme } = require('../styles')

const styles = ({ accent = theme.color.red, focus = theme.color.focus } = {}) => css`
  margin: 0;
  width: auto;
  overflow: visible;
  background: transparent;
  font: inherit;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;
  border-radius: 1px;

  border: 2px solid ${accent};
  border-bottom: none;
  box-shadow: 0 4px ${accent};

  color: ${accent};
  padding: 3px 5px;
  cursor: pointer;

  &:hover,
  &:focus {
    color: white;
    background-color: ${accent};
    box-shadow: 0 4px black;
  }

  &:focus {
    outline: 2px dashed ${focus};
    outline-offset: 6px;
  }

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  &:active {
    box-shadow: 0 1px black;
    transform: translateY(3px);
  }
`

const Button = ({ children, id, type = 'button', color = {} }) => {
  return html`
    <button class=${styles(color)} id=${id} type=${type}>
      ${children}
    </button>
  `
}

module.exports = Button
