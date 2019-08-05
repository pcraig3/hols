const { css } = require('emotion')
const { html } = require('../utils')
const Layout = require('../components/Layout.js')

const styles = css`
  li {
    margin-bottom: 5px;
  }
`

const Canada = ({ data }) =>
  html`
    <${Layout}>
      <div class=${styles}>
        <div>
          <h1>Canada’s next public holiday is June 21</h1>
          <h2>Family Day</h2>
        </div>

        <div>
          <h3>All holidays ↓</h3>
          <ul>
            ${data.holidays.map(
              holiday => html`
                <li>${holiday.nameEn}</li>
              `,
            )}
          </ul>
        </div>
      </div>
    <//>
  `

module.exports = Canada
