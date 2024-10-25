const { html } = require('../utils')
const { css } = require('@emotion/css')
const { theme } = require('../styles')
const { Expand, Collapse, CalendarDownload } = require('./Svg')

const styles = ({ accent = theme.color.red, focus = theme.color.focus } = {}) => css`
  margin: 0;
  width: auto;
  display: inline-block;
  overflow: visible;
  background: transparent;
  font: inherit;
  font-size: 1em;
  line-height: 1.33;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;
  border-radius: 1px;
  text-decoration: none;

  color: ${accent} !important;
  padding: 3px 5px;
  cursor: pointer;

  &.ghost {
    text-decoration: underline;
  }

  &:not(.ghost) {
    border: 2px solid ${accent};
    border-bottom: none;
    box-shadow: 0 4px ${accent};
    border-radius: 0;

    &.hover-color,
    &:hover,
    &:focus {
      box-shadow: 0 4px black;
    }

    &:focus {
      outline: 3px dashed ${focus} !important;
      outline-offset: 8px !important;
    }

    &:active {
      box-shadow: 0 1px black;
    }
  }

  &.hover-color,
  &:hover,
  &:focus {
    color: white !important;
    background-color: ${accent};
  }

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  &:active {
    transform: translateY(3px);
  }

  svg {
    height: 19.5px;
    width: 19.5px;
    margin-right: 7px;
    padding-right: 1.5px;
    fill: ${accent};
    vertical-align: text-bottom;

    @media (${theme.mq.md}) {
      height: 22px;
      width: 22px;
    }

    @media (${theme.mq.lg}) {
      paddiing-right: 0;
      height: 24px;
      width: 24px;
      margin-right: 11px;
    }
  }

  &.hover-color,
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

const NativeButton = ({ children, color = {}, className = '', ...props }) => {
  return html`
    <button class=${`${className ? `${className} ` : ''}${styles(color)}`} ...${props}>
      ${children}
    </button>
  `
}

const LinkButton = ({ children, color = {}, className = '', ...props }) => {
  return html`
    <a
      class=${`${className ? `${className} ` : ''}${styles(color)}`}
      role="button"
      draggable="false"
      ...${props}
      >${children}</a
    >
  `
}

const Button = ({ children, color = {}, ...props }) => {
  return props.href
    ? html`
        <${LinkButton} color=${color} ...${props}>
          <${CalendarDownload} />
          <span>${children}</span>
        <//>
      `
    : html`
        <${NativeButton} color=${color} type="button" ...${props}>
          ${props.expand
            ? html`
                <${Expand} />
                <${Collapse} />
              `
            : ''}
          <span>${children}</span><//
        >
      `
}

module.exports = Button
