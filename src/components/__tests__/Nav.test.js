const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const Nav = require('../Nav.js')

const renderNav = ({ route } = {}) => {
  return cheerio.load(
    render(
      html`
        <${Nav} route=${route} //>
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
