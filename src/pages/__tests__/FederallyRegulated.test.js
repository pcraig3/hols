const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const FederallyRegulated = require('../FederallyRegulated.js')

const renderPage = () => {
  return cheerio.load(
    render(
      html`
        <${FederallyRegulated} />
      `,
    ),
  )
}

describe('FederallyRegulated page', () => {
  test('renders title and first paragraph', () => {
    const $ = renderPage()
    expect($('h1').length).toBe(1)
    expect($('h1').text()).toEqual('Do federal holidays apply to me?')
    expect($('h1 + p').text()).toEqual(
      'Probably not. Most Canadian workers will get provincial holidays off, not federal ones.',
    )
  })
})
