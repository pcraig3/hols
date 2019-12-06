const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const ProvincePicker = require('../ProvincePicker.js')

test('ProvincePicker renders properly', () => {
  const $ = cheerio.load(
    render(
      html`
        <${ProvincePicker} //>
      `,
    ),
  )
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('All regions in Canada')
})
