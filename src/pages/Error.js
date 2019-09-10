const { html } = require('../utils')
const { contentPageStyles } = require('../styles')
const Layout = require('../components/Layout.js')

const Error = ({ data: { status, message } = {} }) =>
  html`
    <${Layout}>
      <div class=${contentPageStyles}>
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
