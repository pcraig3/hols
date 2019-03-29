const Page = require("./Page");
const render = require("preact-render-to-string");
const { h } = require("preact");
const htm = require("htm");

const html = htm.bind(h);

test("Page component has the name passed into it", () => {
  const pageString = render(html`<${Page} name="test" />`);
  expect(pageString).toContain('<h1 style="color: red;">test!!</h1>');
  expect(pageString).toContain("<p>This page is all about test.</p>");
});

test("Page component accepts no name", () => {
  const pageString = render(html`<${Page} />`);
  expect(pageString).toContain('<h1 style="color: red;">undefined!!</h1>');
  expect(pageString).toContain("<p>This page is all about .</p>");
});
