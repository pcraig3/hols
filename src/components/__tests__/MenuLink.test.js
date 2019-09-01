const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const MenuLink = require('../MenuLink.js')

test('MenuLink displays link properly', () => {
  expect(1).toBe(1)
  const $ = cheerio.load(
    render(
      html`
        <${MenuLink} canada=${false} //>
      `,
    ),
  )
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('All regions')
})
