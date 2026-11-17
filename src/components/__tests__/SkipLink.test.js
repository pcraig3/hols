const cheerio = require('cheerio')
const render = require('preact-render-to-string')

const { html } = require('../../utils')
const SkipLink = require('../SkipLink.js')

test('SkipLink displays link properly', () => {
  const $ = cheerio.load(render(html`<${SkipLink} //>`))
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('Skip to main content')
  expect($('a').attr('href')).toEqual('#content')
})

test('SkipLink displays French text', () => {
  const $ = cheerio.load(render(html`<${SkipLink} locale="fr" />`))
  expect($('a').text()).toEqual('Aller au contenu principal')
  expect($('a').attr('href')).toEqual('#content')
})