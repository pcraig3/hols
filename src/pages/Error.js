const { html } = require('../utils')
const Layout = require('../components/Layout.js')
const Content = require('../components/Content.js')

const Error = ({ data: { status, message } = {} }) =>
  html`
    <${Layout}>
      <${Content}>
        <h1>${status}</h1>
        <p>
          ${message}
        </p>
        <span class="bottom-link"
          ><a href="/"><span aria-hidden="true">←</span> Canada’s next public holiday</a></span
        >
      <//>
    <//>
  `

module.exports = Error
