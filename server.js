const express = require("express");
const { h, Component } = require("preact");
const render = require("preact-render-to-string");
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

  render({ name }) {
    return html`
      <div class="page">
        <h1 style="${this.style.h1}">${this.makeExciting(name)}</h1>
        <p>This page is all about ${name}.</p>
      </div>
    `;
  }
}

const app = express();

// on each request, render and return a component
app.get("/:page", (req, res) => {
  let markup = render(html`<${Page} name=${req.params.page} />`);
  // send it back wrapped up as an HTML5 document:
  res.send(`<!DOCTYPE html><html><body>${markup}</body></html>`);
});

app.get("/", (req, res) => {
  res.redirect(302, "/index");
});

// basic HTTP server via express:
const port = 3000;
app.listen(port, err => {
  if (err) throw err;
  console.log(`Ready on http://localhost:${port}`);
});
