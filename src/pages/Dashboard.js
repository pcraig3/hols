const { html } = require('../utils.js')
const { css } = require('emotion')
const Layout = require('../components/Layout.js')

const dashboard = css`
  position: relative;

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

const Dashboard = ({ data: { name = '' } = {} }) =>
  html`
    <${Layout}>
      <div class=${dashboard}>
        <h1>Dashboard</h1>
        <div>
          <p>Name</p>
          <p><pre>${name}</pre></p>
        </div>
        <br />

        <a class="logout" href="/logout">Log out</a>
      </div>
    </${Layout}>
  `

module.exports = Dashboard
