const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const NextHoliday = require('../NextHoliday.js')

const renderNextHoliday = (props) => {
  return cheerio.load(render(html`<${NextHoliday} ...${props} //>`))
}

const getNextHoliday = ({ federal, observedDate } = {}) => {
  return {
    id: 20,
    date: '2019-08-16',
    observedDate: observedDate || '2019-08-16',
    nameEn: 'Gold Cup Parade Day',
    federal: federal ? 1 : 0,
    provinces: [{ id: 'PE', nameEn: 'Prince Edward Island' }],
  }
}

const sp2nbsp = (str) => str.replace(/ /, '\u00a0')

describe('NextHoliday', () => {
  test('renders next holiday for Canada page', () => {
    const nextHoliday = getNextHoliday()
    const $ = renderNextHoliday({ nextHoliday })

    expect($('h1').length).toBe(1)
    expect($('.h1--xs').text()).toEqual('Canada’s next statutory holiday\u00a0is')
    expect($('.h1--lg').text()).toEqual(`${sp2nbsp('August 16')}`)
    expect($('.h1--md').text()).toEqual(`${sp2nbsp(nextHoliday.nameEn)}`)
  })

  test('renders a province-specific intro for a PEI province page', () => {
    const nextHoliday = getNextHoliday()
    const $ = renderNextHoliday({ nextHoliday, provinceName: 'Prince Edward Island' })

    expect($('h1').length).toBe(1)
    expect($('.h1--xs').text()).toEqual('Prince Edward Island’s next statutory holiday\u00a0is')
  })

  test('renders a province-specific intro without the trailing "s" for NT province page', () => {
    const nextHoliday = getNextHoliday()
    const $ = renderNextHoliday({ nextHoliday, provinceName: 'Northwest Territories' })

    expect($('h1').length).toBe(1)
    expect($('.h1--xs').text()).toEqual('Northwest Territories’ next statutory holiday\u00a0is')
  })

  // renders for a federal page
  test('renders a federal-specific intro when "federal" is passed in', () => {
    const nextHoliday = getNextHoliday({ federal: true })
    const $ = renderNextHoliday({ nextHoliday, federal: true })

    expect($('h1').length).toBe(1)
    expect($('.h1--xs').text()).toEqual('Canada’s next federal statutory holiday\u00a0is')
  })

  //
  test('renders an asterisks if the observedDate is different than the literal date', () => {
    const nextHoliday = getNextHoliday({ observedDate: '2019-08-12' })
    const $ = renderNextHoliday({ nextHoliday })

    expect($('h1').length).toBe(1)
    expect($('.h1--lg').text()).toEqual(`${sp2nbsp('August 16*')}`)
  })
})
