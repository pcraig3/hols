const { html } = require('../utils.js')
const { css } = require('emotion')
const Layout = require('../components/Layout.js')
const Input = require('../components/Input.js')
const Button = require('../components/Button.js')

const form = css`
  width: 100%;
  max-width: 450px;
  padding: 30px;
  margin-top: 50px;
  border: 2px solid #ddd;

  > div {
    margin-bottom: 40px;
  }
`

const loginButton = css`
  max-width: 150px;
`

const errorMessage = css`
  color: red;
`

const validationError = ({ param, msg }) => html`
  <span id=${`${param}-error`} class="${errorMessage}">
    ${msg}
  </span>
`

/* eslint-disable no-irregular-whitespace */

const Login = ({ data: { name = '', number = '' } = {}, errors = {} }) =>
  html`
    <${Layout}>
      <h1>Log in to see your name</h1>
      <p>Please enter your name in order to see the dashboard.</p>

      <form class=${form} method="post">
        <div>
          ${errors.name && validationError(errors.name)}
          <${Input} id="name" value=${name}>Name<//>
        </div>
        <div>
          ${errors.number && validationError(errors.number)}
          <${Input} id="number" value=${number}>Favourite number<//>
        </div>

        <${Button} style=${loginButton}>Log in<//>
      </form>
    <//>
  `

module.exports = Login
