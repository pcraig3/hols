const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils.js')

const Layout = require('../Layout.js')

test('Layout wraps children with <main> element', () => {
  const $ = cheerio.load(
    render(
      html`
        <${Layout}><p>hello</p><//>
      `,
    ),
  )
  expect($('main').length).toBe(1)
  expect($('main').html()).toEqual('<p>hello</p>')
})
