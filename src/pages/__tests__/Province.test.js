const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const Province = require('../Province.js')

const getProvince = () => {
  return { id: 'NL', nameEn: 'Newfoundland and Labrador' }
}

const getNextHoliday = () => {
  return {
    id: 27,
    observedDate: '2020-12-28',
    nameEn: 'Boxing Day',
    federal: 1,
    provinces: [getProvince()],
  }
}

const renderPage = () => {
  const _nextHoliday = getNextHoliday()
  return cheerio.load(
    render(
      html`
        <${Province} ...${{ data: { nextHoliday: _nextHoliday, holidays: [_nextHoliday] } }} />
      `,
    ),
  )
}

describe('Province page', () => {
  test('renders h1 and h2', () => {
    const $ = renderPage()
    expect($('h1').length).toBe(1)
    expect($('h1 span:last-of-type').text()).toEqual(
      'Canada’s next holiday\u00a0isDecember 28Boxing Day',
    )
    expect($('h2').length).toBe(1)
    expect($('h2').text()).toEqual('Canada statutory holidays in 2020')
    // check the data label is lowercasing the province name
    expect($('.h1--lg a time').attr('data-label')).toEqual('next-holidays-row-link-canada')
  })

  test('renders #next-holiday-row id', () => {
    const $ = renderPage()
    expect($('h2#holidays-table').text()).toBe('Canada statutory holidays in 2020')
    expect($('#next-holiday-row').text()).toBe(' December 28, Monday Boxing DayFederal holiday, NL')
  })
})
