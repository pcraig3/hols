const cheerio = require('cheerio')
const render = require('preact-render-to-string')

const { html } = require('../../utils')
const Nav = require('../Nav.js')

const renderNav = ({ route, locale, alternatePaths } = {}) => {
  return cheerio.load(
    render(
      html`
        <${Nav} route=${route} locale=${locale} alternatePaths=${alternatePaths} //>
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
      'MenuRegionsAboutAPIFeedbackRegionsAboutAPIFeedback',
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

  test('renders French labels and links', () => {
    const $ = renderNav({ locale: 'fr' })

    expect($('summary').text()).toEqual('Menu')

    expect($('nav .links').text()).toEqual(
      'MenuRégionsÀ proposAPICommentaires' +
      'RégionsÀ proposAPICommentaires',
    )
    expect($('a[href="/fr/provinces"]')).toHaveLength(2)
    expect($('a[href="/fr/a-propos"]')).toHaveLength(2)
    expect($('a[href="/fr/api"]')).toHaveLength(2)
    expect($('a[href="/fr/commentaires"]')).toHaveLength(2)
  })

  test('renders the language switcher outside the primary links', () => {
    const $ = renderNav({
      locale: 'en',
      alternatePaths: {
        'en-CA': '/about',
        'fr-CA': '/fr/a-propos',
      },
    })

    expect($('.language-switcher')).toHaveLength(1)

    expect(
      $('.links .language-switcher'),
    ).toHaveLength(0)

    expect(
      $('.nav-actions .language-switcher a').attr('href'),
    ).toBe('/fr/a-propos')

    expect(
      $('.nav-actions .links'),
    ).toHaveLength(1)
  })

  test('French navigation links back to English', () => {
    const $ = renderNav({
      locale: 'fr',
      alternatePaths: {
        'en-CA': '/provinces',
        'fr-CA': '/fr/provinces',
      },
    })

    expect(
      $('.language-switcher a').attr('href'),
    ).toBe('/provinces')

    expect(
      $('.language-switcher a').attr('aria-label'),
    ).toBe('English')

    expect(
      $('.links a[href="/fr/provinces"]'),
    ).toHaveLength(2)
  })
})
