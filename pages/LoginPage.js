const html = require('../utils.js')
const { css } = require('emotion')
const Layout = require('../components/Layout.js')
const Input = require('../components/Input.js')
const DateOfBirth = require('../components/DateOfBirth.js')
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

/* eslint-disable no-irregular-whitespace */

const LoginPage = ({ data: { sin = '', ...props } = {} }) =>
  html`
    <${Layout}>
      <h1>Log in to see your tax-filing information</h1>
      <p>Please enter your Social Insurance Number and Date of Birth.</p>

      <form class=${form} method="post">
        <div>
          <${Input} id="sin" value=${sin}>SIN (Social Insurance Number)<//>
        </div>

        <div>
          <${DateOfBirth} ...${props} />
        </div>

        <${Button} style=${{ maxWidth: 150 }}>Login<//>
      </form>
    <//>
  `

module.exports = LoginPage
