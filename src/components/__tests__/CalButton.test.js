const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const CalButton = require('../CalButton.js')

const renderCalButton = (props = {}) => {
  return cheerio.load(render(html` <${CalButton} ...${props} //> `))
}

test('CalButton renders properly with no properties', () => {
  const $ = renderCalButton()
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('Add to your calendar')
  expect($('a').attr('href')).toEqual('/ics')
  expect($('a').attr('download')).toBeUndefined()
  expect($('a').attr('data-action')).toEqual('download-holidays')
  expect($('a').attr('data-label')).toEqual('download-holidays-canada')
})

test('CalButton renders properly for federal holidays for 2019', () => {
  const $ = renderCalButton({ federal: true, year: 2019, text: 'Download 2019 federal holidays' })
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('Download 2019 federal holidays')
  expect($('a').attr('href')).toEqual('/ics/federal/2019')
  expect($('a').attr('download')).toBeUndefined()
  expect($('a').attr('data-action')).toEqual('download-holidays')
  expect($('a').attr('data-label')).toEqual('download-holidays-federal-2019')
})

test('CalButton renders properly for provincial holidays for 2021 and a classname', () => {
  const $ = renderCalButton({ provinceId: 'PE', year: 2021, className: 'torosaurus' })
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('Add to your calendar')
  expect($('a').attr('href')).toEqual('/ics/PE/2021')
  expect($('a').attr('download')).toBeUndefined()
  expect($('a').attr('data-action')).toEqual('download-holidays')
  expect($('a').attr('data-label')).toEqual('download-holidays-PE-2021')
  expect($('a').attr('class')).toMatch(/^torosaurus/)
})

test('CalButton renders properly with a download attribute', () => {
  const $ = renderCalButton({ provinceId: 'ON', download: true })
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('Add to your calendar')
  expect($('a').attr('href')).toEqual('/ics/ON')
  expect($('a').attr('download')).toEqual('canada-holidays-ON.ics')
  expect($('a').attr('data-action')).toEqual('download-holidays')
  expect($('a').attr('data-label')).toEqual('download-holidays-ON')
})

test('CalButton renders properly with a custom eventName', () => {
  const $ = renderCalButton({ federal: true, year: 2022, eventName: 'public-service' })
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('Add to your calendar')
  expect($('a').attr('href')).toEqual('/ics/federal/2022')
  expect($('a').attr('download')).toBeUndefined()
  expect($('a').attr('data-action')).toEqual('public-service')
  expect($('a').attr('data-label')).toEqual('public-service-federal-2022')
})

test('CalButton renders properly with a query', () => {
  const $ = renderCalButton({ year: 2021, query: 'cd=true' })
  expect($('a').length).toBe(1)
  expect($('a').text()).toEqual('Add to your calendar')
  expect($('a').attr('href')).toEqual('/ics/2021?cd=true')
  expect($('a').attr('download')).toBeUndefined()
  expect($('a').attr('data-action')).toEqual('download-holidays')
  expect($('a').attr('data-label')).toEqual('download-holidays-canada-2021')
})
