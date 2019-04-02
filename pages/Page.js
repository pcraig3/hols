const { Component } = require('preact')
const html = require('../utils.js')
const { css } = require('emotion')
const Layout = require('../components/Layout.js')

const red = css`
  color: red;
`

// example component:
class Page extends Component {
  makeExciting(str) {
    return str + '!!'
  }

  render({ name, locale, polyglot }) {
    const key = `${locale}.page_description`

    return html`
      <${Layout}>
        <div class="page">
          <h1 class=${red}>${this.makeExciting(name)}</h1>
          <p>${polyglot.t(key, { name })}.</p>
        </div>
      <//>
    `
  }
}

module.exports = Page
