const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const Nav = require('../Nav.js')

const renderNav = ({ route, locale } = {}) => {
  return cheerio.load(
    render(
      html`
        <${Nav} route=${route} locale=${locale} //>
      `,
    ),
  )
}

describe('Nav', () => {
  test('renders properly', () => {
    const $ = renderNav()
    expect($('nav').length).toBe(1)
    // links appear twice because technically we have 2 menus
    expect($('nav .links').text()).toEqual(
      'MenuAll regionsAboutAPIFeedbackAll regionsAboutAPIFeedback',
    )
  })

  test('renders active menu links', () => {
    const $ = renderNav({ route: '/about' })
    expect($('nav').length).toBe(1)
    // links appear twice because technically we have 2 menus
    expect($('nav .links .active').text()).toEqual('AboutAbout')
  })

  test('doesn’t render non-existent active menu links', () => {
    const $ = renderNav({ route: '/fake' })
    expect($('nav').length).toBe(1)
    expect($('nav .links .active').length).toBe(0)
  })
})

test('renders French labels and links', () => {
  const $ = renderNav({ locale: 'fr' })

  expect($('summary').text()).toEqual('Menu')

  expect($('nav .links').text()).toEqual(
    'MenuToutes les régionsÀ proposAPICommentaires' +
    'Toutes les régionsÀ proposAPICommentaires',
  )
  expect($('a[href="/fr/provinces"]')).toHaveLength(2)
  expect($('a[href="/fr/a-propos"]')).toHaveLength(2)
  expect($('a[href="/fr/api"]')).toHaveLength(2)
  expect($('a[href="/fr/commentaires"]')).toHaveLength(2)
})