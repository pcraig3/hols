const html = require('../utils.js')
const Layout = require('../components/Layout.js')
const Input = require('../components/Input.js')
const DateOfBirth = require('../components/DateOfBirth.js')

const formStyle = {
  width: '100%',
  maxWidth: 400,
  marginTop: 50,
}

const formElementContainerStyle = {
  marginBottom: 30,
}

const LoginPage = () =>
  html`
    <${Layout}>
      <h1>Log in to see your tax-filing information</h1>
      <p>Please enter your Social Insurance Number and Date of Birth.</p>

      <form style=${formStyle}>
        <div style=${formElementContainerStyle}>
          <${Input} id="sin">SIN (Social Insurance Number)<//>
        </div>

        <div style=${formElementContainerStyle}>
          <${DateOfBirth} />
        </div>

        <button type="submit">Login</button>
      </form>
    <//>
  `

module.exports = LoginPage
