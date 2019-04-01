const render = require('preact-render-to-string')
const html = require('../../utils.js')

const Layout = require('../Layout.js')

test('Layout wraps children with <main> element', () => {
  const markup = render(
    html`
      <${Layout}><p>hello</p><//>
    `,
  )
  expect(markup.startsWith('<main>')).toBe(true)
  expect(markup.endsWith('</main>')).toBe(true)
})

test('Layout includes children', () => {
  const markup = render(
    html`
      <${Layout}><p>hello</p><//>
    `,
  )
  expect(markup).toContain('<p>hello</p>')
})
