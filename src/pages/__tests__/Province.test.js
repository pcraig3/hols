const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')
const { getCurrentHolidayYear } = require('../../dates')

const Province = require('../Province.js')

const getProvince = () => {
  return {
    id: 'NL',
    nameEn: 'Newfoundland and Labrador',
    nameFr: 'Terre-Neuve-et-Labrador',
  }
}

const getNextHoliday = (year = getCurrentHolidayYear()) => {
  return {
    id: 27,
    observedDate: `${year}-12-28`,
    date: `${year}-12-26`,
    nameEn: 'Boxing Day',
    nameFr: 'Lendemain de Noël',
    federal: 1,
    provinces: [getProvince()],
  }
}

const renderPage = ({ year, locale = 'en', source = false } = {}) => {
  const _nextHoliday = getNextHoliday(year)

  return cheerio.load(
    render(
      html`
        <${Province}
          data=${{
            nextHoliday: _nextHoliday,
            holidays: [_nextHoliday],
            year,
            locale,
            source,
          }}
        />
      `,
    ),
  )
}

describe('Province page', () => {
  const currentYear = getCurrentHolidayYear()

  test('renders h1 and h2', () => {
    const $ = renderPage()
    expect($('h1').length).toBe(1)
    expect($('h1').text()).toEqual(
      'Canada’s next statutory holiday\u00a0isBoxing\u00a0Day, onDecember\u00a026*',
    )
    expect($('h2').length).toBe(1)
    expect($('h2').text()).toEqual(`Canada holidays in ${currentYear}`)
    // check the data label is lowercasing the province name
    expect($('.h1--lg a time').attr('data-label')).toEqual('next-holidays-row-link-canada')
    // check that the link to next year's holidays is visible
    expect($('a.link__next-year').text()).toEqual(`Canada holidays in ${currentYear + 1}`)
  })

  test('renders #next-holiday-row id', () => {
    const $ = renderPage()
    expect($('h2#holidays-table').text()).toBe(`Canada holidays in ${currentYear}`)
    expect($('#next-holiday-row').text()).toBe(
      'December 26, SaturdayObserved: December 28, MondayBoxing Day is observed on the Monday closest to December 26.Boxing Day Federal holiday, NL ',
    )
  })

  test('does not render next year link', () => {
    const $ = renderPage({ year: 2038 })
    expect($('h1').length).toBe(1)
    expect($('h1').text()).toEqual(
      'Canada’s next statutory holiday\u00a0isBoxing\u00a0Day, onDecember\u00a026*',
    )
    expect($('h2').length).toBe(1)
    expect($('h2').text()).toEqual('Canada holidays in 2038')
    // check that the link to next year's holidays is NOT visible
    expect($('a.link__next-year').length).toBe(0)
  })

  test('renders the holiday table in French', () => {
    const $ = renderPage({ locale: 'fr' })

    expect($('#holidays-table').text()).toContain('Jours fériés')

    expect($('#next-holiday-row .value').text()).toContain(
      'Lendemain de Noël',
    )

    expect($('#next-holiday-row .value2').text()).toContain(
      'Jour férié fédéral',
    )

    expect($('#next-holiday-row time').first().text()).toContain(
      '26\u00a0décembre',
    )
  })

  test('uses the French source when available', () => {
    const $ = renderPage({
      locale: 'fr',
      source: {
        sourceEn: 'Public holidays',
        sourceFr: 'Jours fériés',
        sourceLinkEn: 'https://example.com/en',
        sourceLinkFr: 'https://example.com/fr',
      },
    })

    expect($('.h1--xs').text()).toBe('Le prochain jour férié au Canada est')
    expect($('.h1--md').text()).toContain('Lendemain de Noël')

    const sourceLink = $('a[data-action="source-link"]')

    expect(sourceLink.text()).toContain('Jours fériés')
    expect(sourceLink.attr('href')).toBe('https://example.com/fr')
    expect(sourceLink.attr('lang')).toBe('fr')
    
  })
})
