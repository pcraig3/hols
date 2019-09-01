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
            <h1>${status}</h1>
            <p>
              ${message}
            </p>
          </div>
          <span class="bottom-link"
            ><a href="/"><span aria-hidden="true">←</span> Canada’s next public holiday</a></span
          >
        </section>
      </div>
    <//>
  `

module.exports = Error
