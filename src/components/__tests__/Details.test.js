const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const Details = require('../Details.js')

test('Details displays summary and content properly', () => {
  expect(1).toBe(1)
  const $ = cheerio.load(
    render(
      html`
        <${Details} summary=${'What is universal basic income?'}
          ><p>Free cash for all citizens to guarantee a decent living standard.</p><//
        >
      `,
    ),
  )
  expect($('details').length).toBe(1)
  expect($('summary span').length).toBe(1)
  expect($('summary span').text()).toEqual('What is universal basic income?')
  expect($('summary + p').length).toBe(1)
  expect($('summary + p').text()).toEqual(
    'Free cash for all citizens to guarantee a decent living standard.',
  )
})
