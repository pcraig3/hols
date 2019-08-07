const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')
const Layout = require('../components/Layout.js')

const styles = css`
  h1 {
    font-size: 2.2em;
    margin-top: ${theme.space.sm};
  }
`

const Error = ({ data: { status, message } = {} }) =>
  html`
    <${Layout}>
      <div class=${styles}>
        <section>
          <div>
            <h1>Whoops — ${status}</h1>
            <p>
              ${message}
            </p>
          </div>
          <span class="bottom-link"></span>
          <a href="/">← back</a>
        </section>
      </div>
    <//>
  `

module.exports = Error
