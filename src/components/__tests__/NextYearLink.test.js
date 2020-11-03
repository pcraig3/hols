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
  expect($('a').text()).toEqual('Canada statutory holidays in 2021')
  expect($('a').attr('href')).toEqual('/2021')
})

test('NextYearLink displays federal text properly', () => {
  const $ = renderNextYearLink({ provinceName: 'Canada', year: 2020, federal: true })
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('Federal statutory holidays in 2021')
  expect($('a').attr('href')).toEqual('/federal/2021')
})

test('NextYearLink displays provincial text properly', () => {
  const $ = renderNextYearLink({ provinceName: 'Manitoba', provinceId: 'MB', year: 2020 })
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('Manitoba statutory holidays in 2021')
  expect($('a').attr('href')).toEqual('/province/MB/2021')
})

test('NextYearLink displays future link and text properly', () => {
  const $ = renderNextYearLink({ provinceName: 'Canada', year: 2021 })
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('Canada statutory holidays in 2022')
  expect($('a').attr('href')).toEqual('/2022')
})

test('NextYearLink displays past link and text properly', () => {
  const $ = renderNextYearLink({ provinceName: 'Canada', year: 2018, federal: true })
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('Federal statutory holidays in 2019')
  expect($('a').attr('href')).toEqual('/federal/2019')
})

// the component doesn't know anything about dates: it just adds one to the year integer
test('NextYearLink displays VERY future link and text properly', () => {
  const $ = renderNextYearLink({ provinceName: 'Nova Scotia', provinceId: 'NS', year: 5000 })
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('Nova Scotia statutory holidays in 5001')
  expect($('a').attr('href')).toEqual('/province/NS/5001')
})
