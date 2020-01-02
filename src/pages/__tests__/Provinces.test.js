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
    const $ = renderPage({ provinces: [{ nameEn: 'Aurora' }] })
    expect($('main h1').length).toBe(1)
    expect($('main h1').text()).toEqual('All regions in Canada')
    expect($('main li').length).toBe(1)
    expect($('main li').text()).toBe('Aurora')
  })

  test('has no provinces passed into it', () => {
    const $ = renderPage({ provinces: [] })
    expect($('main h1').length).toBe(1)
    expect($('main li').length).toBe(0)
  })

  test('has several provinces passed into it', () => {
    const $ = renderPage({
      provinces: [{ nameEn: 'Aurora' }, { nameEn: 'Alaska' }, { nameEn: 'French Labrador' }],
    })
    expect($('main h1').length).toBe(1)
    expect($('main li').length).toBe(3)
    expect($('main li').text()).toBe('AuroraAlaskaFrench Labrador')
  })
})
