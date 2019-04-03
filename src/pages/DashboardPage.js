const { html } = require('../utils.js')
const { css } = require('emotion')
const Layout = require('../components/Layout.js')

const dashboard = css`
  > div {
    margin-bottom: 30px;
  }

  p {
    padding: 0;
    margin: 0;
    margin-bottom: 10px;
  }

  pre {
    margin: 0;
    font-size: 1.1em;
    display: inline-block;
    border: 2px solid grey;
    padding: 5px 10px 3px;
    background-color: #f9f9f9;
  }
`

const Dashboard = ({ data: { sin, dobDay, dobMonth, dobYear } = {} }) =>
  html`
    <${Layout}>
      <div class=${dashboard}>
        <h1>Dashboard</h1>
        <div>
          <p>Name</p>
          <p><pre>Matthew Morris</pre></p>
        </div>
        <div>
          <p>Social Insurance Number</p>
          <p><pre>${sin}</pre></p>
        </div>
        <div>
          <p>Date of Birth</p>
          <p><pre>${`${dobDay}-${dobMonth}-${dobYear}`}</pre></p>
        </div>
        <div>
          <p>Address</p>
          <p><pre>
380 Lewis St
Ottawa
Ontario
K2P 2P6
          </pre></p>
        </div>

        <br />
        <a href="/logout">Log out</a>
      </div>
    </${Layout}>
  `

module.exports = Dashboard
