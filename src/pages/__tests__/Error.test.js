const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const Error = require('../Error.js')

const renderPage = ({ status, message }) => {
  return cheerio.load(
    render(
      html`
        <${Error} ...${{ data: { status, message } }} />
      `,
    ),
  )
}

describe('Error page', () => {
  test('renders status code and error message and status', () => {
    const $ = renderPage({ status: 999, message: 'bro you effed UP!' })
    expect($('h1').length).toBe(1)
    expect($('h1').text()).toEqual('999')
    expect($('p').length).toBe(1)
    expect($('p').text()).toEqual('bro you effed UP!')
    expect($('main a').length).toBe(1)
    expect($('main a').text()).toEqual('← Canada’s next public holiday')
    expect($('main a').attr('href')).toEqual('/')
  })
})
