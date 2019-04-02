const html = require('../utils.js')
const Layout = require('../components/Layout.js')
const Input = require('../components/Input.js')
const DateOfBirth = require('../components/DateOfBirth.js')
const Button = require('../components/Button.js')

const formStyle = {
  width: '100%',
  maxWidth: 450,
  padding: 30,
  marginTop: 50,
  border: '2px solid #DDD',
}

const formElementContainerStyle = {
  marginBottom: 40,
}

/* eslint-disable no-irregular-whitespace */

const LoginPage = () =>
  html`
    <${Layout}>
      <h1>Log in to see your tax-filing information</h1>
      <p>Please enter your Social Insurance Number and Date of Birth.</p>

      <form style=${formStyle}>
        <div style=${formElementContainerStyle}>
          <${Input} id="sin">SIN (Social Insurance Number)<//>
        </div>

        <div style=${formElementContainerStyle}>
          <${DateOfBirth} />
        </div>

        <${Button} style=${{ maxWidth: 150 }}>Login<//>
      </form>
    <//>
  `

module.exports = LoginPage
