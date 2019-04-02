const html = require('../utils.js')
const Layout = require('../components/Layout.js')

const codeStyle = {
  fontSize: '1.1em',
  display: 'inline-block',
  border: '2px solid grey',
  padding: '5px 10px 3px',
  backgroundColor: '#F9F9F9',
  marginBottom: 20,
}

const Dashboard = ({ data: { sin, dobDay, dobMonth, dobYear } = {} }) =>
  html`
    <${Layout}>
      <h1>Dashboard</h1>
      <p>Social Insurance Number</p>
      <p><code style=${codeStyle}>${sin}</code></p>
      <p>Date of Birth</p> 
      <p><code style=${codeStyle}>${`${dobDay}-${dobMonth}-${dobYear}`}</code></p>
      <br />
      <a href="/logout">Log out</a>
    </${Layout}>
  `

module.exports = Dashboard
