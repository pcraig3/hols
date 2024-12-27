const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')
const { getCurrentHolidayYear } = require('../../dates')

const Province = require('../Province.js')

const getProvince = () => {
  return { id: 'NL', nameEn: 'Newfoundland and Labrador' }
}

const getNextHoliday = (year = getCurrentHolidayYear()) => {
  return {
    id: 27,
    observedDate: `${year}-12-28`,
    date: `${year}-12-26`,
    nameEn: 'Boxing Day',
    federal: 1,
    provinces: [getProvince()],
  }
}

const renderPage = (year) => {
  const _nextHoliday = getNextHoliday(year)
  return cheerio.load(
    render(
      html`
        <${Province}
          ...${{ data: { nextHoliday: _nextHoliday, holidays: [_nextHoliday], year } }}
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
    expect($('h2').text()).toEqual(`Canada statutory holidays in ${currentYear}`)
    // check the data label is lowercasing the province name
    expect($('.h1--lg a time').attr('data-label')).toEqual('next-holidays-row-link-canada')
    // check that the link to next year's holidays is visible
    expect($('a.link__next-year').text()).toEqual(`Canada statutory holidays in ${currentYear + 1}`)
  })

  test('renders #next-holiday-row id', () => {
    const $ = renderPage()
    expect($('h2#holidays-table').text()).toBe(`Canada statutory holidays in ${currentYear}`)
    expect($('#next-holiday-row').text()).toBe(
      'December 26, FridayObserved: December 28, SundayBoxing Day is observed on the Monday closest to December 26.Boxing Day Federal holiday, NL ',
    )
  })

  test('does not render next year link', () => {
    const $ = renderPage(2033)
    expect($('h1').length).toBe(1)
    expect($('h1').text()).toEqual(
      'Canada’s next statutory holiday\u00a0isBoxing\u00a0Day, onDecember\u00a026*',
    )
    expect($('h2').length).toBe(1)
    expect($('h2').text()).toEqual('Canada statutory holidays in 2033')
    // check that the link to next year's holidays is NOT visible
    expect($('a.link__next-year').length).toBe(0)
  })
})
