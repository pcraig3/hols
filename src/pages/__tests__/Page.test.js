const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils.js')

const Page = require('../Page.js')

const renderPage = ({ name }) => {
  return cheerio.load(
    render(
      html`
        <${Page} ...${{ name }} />
      `,
    ),
  )
}

test('Page component has the name passed into it', () => {
  const $ = renderPage({ name: 'test' })
  expect($('h1').length).toBe(1)
  expect($('h1').text()).toEqual('test!!')
  expect($('p').text()).toEqual('This page is all about “test”.')
})

test('Page component accepts no name', () => {
  const $ = renderPage({})
  expect($('h1').length).toBe(1)
  expect($('h1').text()).toEqual('undefined!!')
  expect($('p').text()).toEqual('This page is all about “”.')
})
