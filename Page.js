const { h, Component } = require("preact");
const htm = require("htm");

const html = htm.bind(h);

// example component:
class Page extends Component {
  get style() {
    return {
      h1: {
        color: "red"
      }
    };
  }

  makeExciting(str) {
    return str + "!!";
  }

  render({ name, locale, polyglot }) {
    const key = `${locale}.page_description`;

    return html`
      <div class="page">
        <h1 style="${this.style.h1}">${this.makeExciting(name)}</h1>
        <p>${polyglot.t(key, { name })}.</p>
      </div>
    `;
  }
}

module.exports = Page;
