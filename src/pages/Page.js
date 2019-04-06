const { Component } = require('preact')
const { css } = require('emotion')
const { html } = require('../utils.js')
const polyglot = require('../i18n.js')
const Layout = require('../components/Layout.js')

const red = css`
  color: red;
`

class Page extends Component {
  makeExciting(str) {
    return `${str}!!`
  }

  render({ name, locale }) {
    const key = `${locale}.page_description`

    return html`
      <${Layout}>
        <div class="page">
          <h1 class=${red}>${this.makeExciting(name)}</h1>
          <p>${polyglot.t(key, { name })}.</p>
          <br />
          <a href=${`/${name}?locale=${locale == 'fr' ? 'en' : 'fr'}`}
            >${locale == 'fr' ? 'to English' : 'en français'}</a
          >
        </div>
      <//>
    `
  }
}

module.exports = Page
