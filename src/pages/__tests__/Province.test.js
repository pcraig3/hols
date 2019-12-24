const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const Province = require('../Province.js')

const getProvince = () => {
  return { id: 'PE', nameEn: 'Prince Edward Island' }
}

const getNextHoliday = () => {
  return {
    id: 20,
    date: '2019-08-16',
    nameEn: 'Gold Cup Parade Day',
    federal: 0,
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

//   data: { holidays, nextHoliday, provinceName = 'Canada', provinceId, federal = false } = {},

describe('Province page', () => {
  test('renders h1 and h2', () => {
    const $ = renderPage({ nextHoliday: { nameEn: 'May Day' } })
    expect($('h1').length).toBe(1)
    expect($('h1').text()).toEqual('Canada’s next statutory holiday isAugust 16Gold Cup Parade Day')
    expect($('h2').length).toBe(1)
    expect($('h2').text()).toEqual('Canada statutory holidays in 2019')
  })
})
