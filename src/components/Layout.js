const { html } = require('../utils.js')

const Layout = ({ children }) =>
  html`
    <main>
      ${children}
    </main>
  `

module.exports = Layout
