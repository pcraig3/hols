const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const Provinces = require('../Provinces.js')

const renderPage = ({ provinces }) => {
  return cheerio.load(
    render(
      html`
        <${Provinces} ...${{ data: { provinces } }} />
      `,
    ),
  )
}

describe('Provinces component', () => {
  test('has one province passed into it', () => {
    const $ = renderPage({ provinces: [{ name_en: 'Aurora' }] })
    expect($('h1').length).toBe(1)
    expect($('h1').text()).toEqual('Canadian provinces and territories')
    expect($('li').length).toBe(1)
    expect($('li').text()).toBe('Aurora')
  })

  test('has no provinces passed into it', () => {
    const $ = renderPage({ provinces: [] })
    expect($('h1').length).toBe(1)
    expect($('li').length).toBe(0)
  })

  test('has several provinces passed into it', () => {
    const $ = renderPage({
      provinces: [{ name_en: 'Aurora' }, { name_en: 'Alaska' }, { name_en: 'French Labrador' }],
    })
    expect($('h1').length).toBe(1)
    expect($('li').length).toBe(3)
    expect($('li').text()).toBe('AuroraAlaskaFrench Labrador')
  })
})
