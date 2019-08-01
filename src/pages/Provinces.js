const { css } = require('emotion')
const { html } = require('../utils')
const Layout = require('../components/Layout.js')

const provinces = css`
  li {
    margin-bottom: 5px;
  }
`

const Provinces = ({ data }) =>
  html`
    <${Layout}>
      <div class=${provinces}>
        <h1>Canadian provinces and territories</h1>
        <p>In alphabetical order:</p>
        <ul>
          ${data.provinces.map(
            province => html`
              <li>${province.name_en}</li>
            `,
          )}
        </ul>
      </div>
    <//>
  `

module.exports = Provinces
