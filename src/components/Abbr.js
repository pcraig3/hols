const { html } = require('../utils')
const { css } = require('@emotion/css')

const styles = css`
  &[title] {
    position: relative;
    cursor: help;

    /* ensure consistent styling across browsers */
    text-decoration: underline dotted;
  }

  &[title]:hover::after,
  &[title]:focus::after {
    content: attr(title);

    /* position tooltip like the native one */
    position: absolute;
    left: 0;
    top: -30px;
    width: auto;
    white-space: nowrap;

    /* style tooltip */
    background-color: #1e1e1e;
    color: #fff;
    border-radius: 3px;
    box-shadow: 1px 1px 5px 0 rgba(0, 0, 0, 0.4);
    font-size: 14px;
    padding: 3px 5px;
  }
`

const Abbr = ({ title, children }) => {
  return html`<abbr class=${styles} title=${title}>${children}</abbr>`
}

module.exports = Abbr
