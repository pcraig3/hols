const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const Layout = require('../Layout.js')

test('Layout wraps children with <main> element', () => {
  const $ = cheerio.load(
    render(
      html`
        <${Layout}><p>hello</p><//>
      `,
    ),
  )
  expect($('main').length).toBe(1)
  expect($('main').html()).toEqual('<p>hello</p>')
})

test('Layout passes locale to shared chrome', () => {
  const $ = cheerio.load(
    render(
      html`<${Layout} locale="fr"><p>bonjour</p><//>`,
    ),
  )

  expect($('a[href="#content"]').text()).toBe('Aller au contenu principal')
  expect($('nav a').first().attr('href')).toBe('/fr/')
  expect($('nav').text()).toContain('Régions')
})

test('Layout passes alternate paths to the language switcher', () => {
  const $ = cheerio.load(
    render(html`
      <${Layout}
        locale="fr"
        alternatePaths=${{
          'en-CA': '/federal/2027',
          'fr-CA': '/fr/federal/2027',
        }}
      >
        <p>Bonjour</p>
      <//>
    `),
  )

  expect($('.language-switcher a').attr('href')).toBe('/federal/2027')
  expect($('.language-switcher a').attr('lang')).toBe('en')
  expect($('main').text()).toBe('Bonjour')
})
