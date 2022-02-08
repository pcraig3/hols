const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const Abbr = require('../Abbr.js')

test('Abbr displays title and children correctly', () => {
  const $ = cheerio.load(render(html`<${Abbr} title=${'Prince Edward Island'}>PEI<//>`))
  expect($('abbr').length).toBe(1)
  expect($('abbr').attr('title')).toEqual('Prince Edward Island')
  expect($('abbr').text()).toEqual('PEI')
})
