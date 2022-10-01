const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const ObservedDateKey = require('../ObservedDateKey.js')

test('ObservedDateKey displays properly', () => {
  const holiday = { date: '2021-12-25', observedDate: '2021-12-27', nameEn: 'Christmas Day' }
  const $ = cheerio.load(render(html` <${ObservedDateKey} holiday=${holiday} //> `))
  expect($('summary').text()).toEqual('December 25, Saturday')
  expect($('details div p').eq(0).text()).toEqual('Observed: December 27, Monday')
  expect($('details div p').eq(1).text()).toEqual(
    'When Christmas Day falls on a weekend, it is observed the following Monday.',
  )
})

test('ObservedDateKey displays properly for Boxing Day on Sunday', () => {
  const holiday = { date: '2021-12-26', observedDate: '2021-12-28', nameEn: 'Boxing Day' }
  const $ = cheerio.load(render(html` <${ObservedDateKey} holiday=${holiday} //> `))
  expect($('summary').text()).toEqual('December 26, Sunday')
  expect($('details div p').eq(0).text()).toEqual('Observed: December 28, Tuesday')
  expect($('details div p').eq(1).text()).toEqual(
    'Because Christmas is observed on Monday, Boxing Day is pushed to the following Tuesday.',
  )
})

test('ObservedDateKey displays properly for Boxing Day on Monday', () => {
  const holiday = { date: '2022-12-26', observedDate: '2022-12-27', nameEn: 'Boxing Day' }
  const $ = cheerio.load(render(html` <${ObservedDateKey} holiday=${holiday} //> `))
  expect($('summary').text()).toEqual('December 26, Monday')
  expect($('details div p').eq(0).text()).toEqual('Observed: December 27, Tuesday')
  expect($('details div p').eq(1).text()).toEqual(
    'Because Christmas is observed on Monday, Boxing Day is pushed to the following Tuesday.',
  )
})

test('ObservedDateKey displays properly for Saint George’s Day', () => {
  const holiday = { date: '2021-04-23', observedDate: '2021-04-26', nameEn: 'Saint George’s Day' }
  const $ = cheerio.load(render(html` <${ObservedDateKey} holiday=${holiday} //> `))
  expect($('summary').text()).toEqual('April 23, Friday')
  expect($('details div p').eq(0).text()).toEqual('Observed: April 26, Monday')
  expect($('details div p').eq(1).text()).toEqual(
    'When Saint George’s Day falls on a weekend, it is observed the following Monday.',
  )
})

test('ObservedDateKey displays no details element if the observed date is the same as the calendar date', () => {
  const holiday = { date: '2021-07-01', observedDate: '2021-07-01', nameEn: 'Canada Day' }
  const $ = cheerio.load(render(html` <${ObservedDateKey} holiday=${holiday} //> `))
  expect($('time').text()).toEqual('July 1, Thursday')
  expect($('details').length).toBe(0)
})
