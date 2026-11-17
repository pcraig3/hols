
const cheerio = require('cheerio')
const render = require('preact-render-to-string')

const { html } = require('../../utils')
const LanguageSwitcher = require('../LanguageSwitcher')

const alternatePaths = {
  'en-CA': '/about',
  'fr-CA': '/fr/a-propos',
  'x-default': '/about',
}

const renderSwitcher = (props = {}) =>
  cheerio.load(
    render(html`
      <${LanguageSwitcher} ...${props} />
    `),
  )

describe('LanguageSwitcher', () => {
  test('English page links to French', () => {
    const $ = renderSwitcher({
      locale: 'en',
      alternatePaths,
    })

    const link = $('.language-switcher a')

    expect(link.attr('href')).toBe('/fr/a-propos')
    expect(link.attr('lang')).toBe('fr')
    expect(link.attr('aria-label')).toBe('Français')
    expect(link.attr('translate')).toBe('no')

    expect($('.language-name').text()).toBe('Français')
    expect($('.language-code').text()).toBe('FR')
    expect($('.language-code').attr('title')).toBe('Français')
  })

  test('French page links to canonical English', () => {
    const $ = renderSwitcher({
      locale: 'fr',
      alternatePaths,
    })

    const link = $('.language-switcher a')

    expect(link.attr('href')).toBe('/about')
    expect(link.attr('lang')).toBe('en')
    expect(link.attr('aria-label')).toBe('English')

    expect($('.language-name').text()).toBe('English')
    expect($('.language-code').text()).toBe('EN')
  })

  test('does not render without alternate paths', () => {
    const $ = renderSwitcher({ locale: 'fr' })

    expect($('.language-switcher')).toHaveLength(0)
  })

  test('does not render when the other language is missing', () => {
    const $ = renderSwitcher({
      locale: 'en',
      alternatePaths: {
        'en-CA': '/about',
      },
    })

    expect($('.language-switcher')).toHaveLength(0)
  })
})
