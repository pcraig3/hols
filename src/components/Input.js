const { css } = require('emotion')
const { html } = require('../utils.js')

const input = css`
  label {
    display: block;
    margin-bottom: 10px;
  }

  input {
    font: 400 1em sans-serif;
    border: 2px solid black;
    width: 100%;
    height: 40px;
    margin-top: 0;
    padding: 5px;
    border-radius: 0;
    -webkit-appearance: none;

    &[type='number']::-webkit-inner-spin-button,
    &[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`

const Input = ({
  id,
  children,
  name = '',
  type = 'text',
  bold = true,
  style = {},
  ...props
}) =>
  html`
    <span class=${input}>
      <label style=${{ fontWeight: bold ? 700 : 400 }} for=${id}>
        ${children}
      </label>
      <input
        style=${{ ...style }}
        id=${id}
        name=${name || id}
        type=${type}
        ...${props}
      />
    </span>
  `

module.exports = Input
