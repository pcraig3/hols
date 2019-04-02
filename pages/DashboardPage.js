const html = require('../utils.js')
const Layout = require('../components/Layout.js')
const { css } = require('emotion')

const dashboard = css`
  code {
    font-size: 1.1em;
    display: inline-block;
    border: 2px solid grey;
    padding: 5px 10px 3px;
    background-color: #f9f9f9;
    margin-bottom: 20px;
  }
`

const Dashboard = ({ data: { sin, dobDay, dobMonth, dobYear } = {} }) =>
  html`
    <${Layout}>
      <div class=${dashboard}>
      <h1>Dashboard</h1>
      <p>Social Insurance Number</p>
      <p><code>${sin}</code></p>
      <p>Date of Birth</p> 
      <p><code>${`${dobDay}-${dobMonth}-${dobYear}`}</code></p>
      <br />
      <a href="/logout">Log out</a>
      </div>
    </${Layout}>
  `

module.exports = Dashboard
