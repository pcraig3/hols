const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const Provinces = require('../Provinces.js')

const renderPage = ({ provinces, locale = 'en' }) => {
  return cheerio.load(
    render(
      html`
        <${Provinces} ...${{ data: { provinces, locale } }} />
      `,
    ),
  )
}

const province = {
  id: 'BC',
  nameEn: 'British Columbia',
  nameFr: 'Colombie-Britannique',
}

describe('Provinces component', () => {
  test('renders English by default', () => {
    const $ = renderPage({ provinces: [province] })

    expect($('main h1').length).toBe(1)
    expect($('main h1').text()).toEqual('All regions in Canada')

    expect($('main li').length).toBe(1)
    expect($('main li').text().trim()).toBe('British Columbia')

    expect($('main a[href="/provinces/BC"]').length).toBe(1)
  })

  test('renders French', () => {
    const $ = renderPage({
      provinces: [province],
      locale: 'fr',
    })

    expect($('main h1').text()).toEqual('Toutes les régions du Canada')

    expect($('main li').length).toBe(1)
    expect($('main li').text().trim()).toBe('Colombie-Britannique')

    // Province detail pages are not localized yet.
    expect($('main a[href="/provinces/BC"]').length).toBe(1)

    // This supporting page is already localized.
    expect(
      $('main a[href="/fr/les-jours-feries-federaux-sappliquent-ils-a-moi"]').length,
    ).toBe(1)
  })

  test('has no provinces passed into it', () => {
    const $ = renderPage({ provinces: [] })

    expect($('main h1').length).toBe(1)
    expect($('main li').length).toBe(0)
  })

  test('has several provinces passed into it', () => {
    const $ = renderPage({
      provinces: [
        { id: 'AB', nameEn: 'Aurora', nameFr: 'Aurore' },
        { id: 'AK', nameEn: 'Alaska', nameFr: 'Alaska' },
        {
          id: 'FL',
          nameEn: 'French Labrador',
          nameFr: 'Labrador français',
        },
      ],
    })

    expect($('main li').length).toBe(3)
    expect($('main li').text()).toContain('Aurora')
    expect($('main li').text()).toContain('Alaska')
    expect($('main li').text()).toContain('French Labrador')
  })
})
