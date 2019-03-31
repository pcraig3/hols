const express = require("express");
const { h, Component } = require("preact");
const render = require("preact-render-to-string");
const htm = require("htm");
const polyglot = require("./i18n.js");
const Page = require("./Page.js");

const html = htm.bind(h);

const app = express();

let locale = "en";

app.get("/locale/:locale", (req, res) => {
  locale = ["en", "fr"].includes(req.params.locale) ? req.params.locale : "en";
  const key = `${locale}.locale_description`;

  res.send(
    `<!DOCTYPE html><html lang=${locale}><body>
    <h1>${polyglot.t(key)}</h1>
    </body></html>`
  );
});

// on each request, render and return a component
app.get("/:page", (req, res) => {
  let markup = render(
    html`<${Page} name=${
      req.params.page
    } locale=${locale} polyglot=${polyglot} />`
  );
  // send it back wrapped up as an HTML5 document:
  res.send(`<!DOCTYPE html><html lang=${locale}><body>${markup}</body></html>`);
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
