const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const NextYearLink = require('../NextYearLink.js')

const renderNextYearLink = (props = {}) => {
  return cheerio.load(render(html` <${NextYearLink} ...${props} //> `))
}

test('NextYearLink displays properly', () => {
  const $ = renderNextYearLink({ provinceName: 'Canada', year: 2020 })
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('Canada holidays in 2021')
  expect($('a').attr('href')).toEqual('/2021')
  expect($('a').attr('data-label')).toEqual('next-year-canada')
})

test('NextYearLink displays federal text properly', () => {
  const $ = renderNextYearLink({ provinceName: 'Canada', year: 2020, federal: true })
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('Federal holidays in 2021')
  expect($('a').attr('href')).toEqual('/federal/2021')
  expect($('a').attr('data-label')).toEqual('next-year-federal')
})

test('NextYearLink displays provincial text properly', () => {
  const $ = renderNextYearLink({ provinceName: 'Manitoba', provinceId: 'MB', year: 2020 })
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('Manitoba holidays in 2021')
  expect($('a').attr('href')).toEqual('/provinces/MB/2021')
  expect($('a').attr('data-label')).toEqual('next-year-MB')
})

test('NextYearLink displays future link and text properly', () => {
  const $ = renderNextYearLink({ provinceName: 'Canada', year: 2021 })
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('Canada holidays in 2022')
  expect($('a').attr('href')).toEqual('/2022')
  expect($('a').attr('data-label')).toEqual('next-year-canada')
})

test('NextYearLink displays past link and text properly', () => {
  const $ = renderNextYearLink({ provinceName: 'Canada', year: 2018, federal: true })
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('Federal holidays in 2019')
  expect($('a').attr('href')).toEqual('/federal/2019')
  expect($('a').attr('data-label')).toEqual('next-year-federal')
})

// the component doesn't know anything about dates: it just adds one to the year integer
test('NextYearLink displays VERY future link and text properly', () => {
  const $ = renderNextYearLink({ provinceName: 'Nova Scotia', provinceId: 'NS', year: 5000 })
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('Nova Scotia holidays in 5001')
  expect($('a').attr('href')).toEqual('/provinces/NS/5001')
  expect($('a').attr('data-label')).toEqual('next-year-NS')
})

test('NextYearLink displays French provincial text and URL', () => {
  const $ = renderNextYearLink({ provinceName: 'Québec', provinceId: 'QC', year: 2027, locale: 'fr' })
  expect($('a').text()).toBe('Jours fériés en 2028 — Québec')
  expect($('a').attr('href')).toBe('/fr/provinces/QC/2028')
})