const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const Error = require('../Error.js')

const renderPage = ({ status, message, locale }) => {
  return cheerio.load(
    render(
      html`
        <${Error} ...${{ data: { status, message, locale } }} />
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

test('Error page renders French shared error navigation', () => {
  const $ = renderPage({
    status: 404,
    message: 'Something went wrong',
    locale: 'fr',
  })

  expect($('h1').text()).toEqual('404')

  // We deliberately are not translating raw error messages.
  expect($('p').text()).toEqual(
    'Something went wrong',
  )

  expect($('main a').text()).toEqual(
    '← Prochain jour férié au Canada',
  )

  expect($('main a').attr('href')).toEqual('/fr/')

  expect(
    $('a[href="#content"]').text(),
  ).toEqual('Aller au contenu principal')
})
