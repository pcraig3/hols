
const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const AddHolidays = require('../AddHolidays')

const renderPage = (locale = 'en') => {
  const data = {
    year: 2027,
    locale,
    provinces: [
      { id: 'AB', nameEn: 'Alberta', nameFr: 'Alberta' },
      { id: 'ON', nameEn: 'Ontario', nameFr: 'Ontario' },
    ],
  }

  return cheerio.load(render(html`<${AddHolidays} data=${data} //>`))
}

describe('AddHolidays calendar links', () => {
  test.each([
    ['en', ''],
    ['fr', '/fr'],
  ])('renders the correct ICS URLs in %s', (locale, prefix) => {
    const $ = renderPage(locale)
    const baseUrl = `https://canada-holidays.ca${prefix}/ics`

    // Remote calendar subscriptions.
    expect($(`a[href="${baseUrl}"]`).length).toBe(1)
    expect($(`a[href="${baseUrl}/AB"]`).length).toBe(1)
    expect($(`a[href="${baseUrl}/ON"]`).length).toBe(1)

    // Calendar downloads.
    expect($(`a[href="${prefix}/ics?cd=true"]`).length).toBe(1)
    expect($(`a[href="${prefix}/ics/federal?cd=true"]`).length).toBe(1)
    expect($(`a[href="${prefix}/ics/AB?cd=true"]`).length).toBe(1)
    expect($(`a[href="${prefix}/ics/ON?cd=true"]`).length).toBe(1)
  })

  test('defaults to English', () => {
    const $ = renderPage()

    expect($('a[href="/ics?cd=true"]').length).toBe(1)
  })
})
