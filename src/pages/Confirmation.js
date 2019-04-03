const { css } = require('emotion')
const { html } = require('../utils.js')
const Layout = require('../components/Layout.js')

const confirmationNumber = css`
  border: 2px solid black;
  padding: 40px 0;
  width: 400px;
  text-align: center;

  .confirmationNumber--title {
    margin-bottom: 20px;
  }

  .confirmationNumber {
    font: 400 1.8em monospace;
  }
`

const Confirmation = () =>
  html`
    <${Layout}>
      <div>
        <h1>Success! 🥳🙌</h1>
        <p>🌈 Good job, Matthew! 🌈</p>
        <p>
          Your 2018 taxes have been submitted and${' '}
          <strong>you will receive $1611.87 in benefit payments</strong>.
        </p>

        <div class=${confirmationNumber}>
          <div class="confirmationNumber--title">Confirmation number</div>
          <div class="confirmationNumber">5H3P9IO5816</div>
        </div>

        <p>
          Your Notice of Assessment will arrive in the mail in 4 to 6 weeks.
        </p>

        <br />
        <a href="/logout">Log out</a>
      </div>
    <//>
  `

module.exports = Confirmation
