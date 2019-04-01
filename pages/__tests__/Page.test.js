const render = require("preact-render-to-string");
const html = require("../../utils.js");
const polyglot = require("../../i18n.js");

const Page = require("../Page");

test("Page component has the name passed into it", () => {
  const pageString = render(
    html`<${Page} name="test" locale="en" polyglot=${polyglot} />`
  );
  expect(pageString).toContain('<h1 style="color: red;">test!!</h1>');
  expect(pageString).toContain("<p>This page is all about “test”.</p>");
});

test("Page component renders in French", () => {
  const pageString = render(
    html`<${Page} name="test" locale="fr" polyglot=${polyglot} />`
  );
  expect(pageString).toContain('<h1 style="color: red;">test!!</h1>');
  expect(pageString).toContain("<p>Cette page est au sujet de « test ».</p>");
});

test("Page component accepts no name", () => {
  const pageString = render(html`<${Page} locale="en" polyglot=${polyglot} />`);
  expect(pageString).toContain('<h1 style="color: red;">undefined!!</h1>');
  expect(pageString).toContain("<p>This page is all about “{{name}}”.</p>");
});
