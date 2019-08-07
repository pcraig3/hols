const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const DateHtml = require('../DateHtml.js')

test('DateHtml displays dates properly', () => {
  const dateString = '2019-01-01'
  const $ = cheerio.load(
    render(
      html`
        <${DateHtml} dateString=${dateString} //>
      `,
    ),
  )
  expect($('time').length).toBe(1)
  expect($('time').attr('datetime')).toEqual('2019-01-01')
  expect($('time').text()).toEqual('January 1st')
})

test('DateHtml displays dates properly with the weekday', () => {
  const dateString = '2019-01-01'
  const $ = cheerio.load(
    render(
      html`
        <${DateHtml} dateString=${dateString} weekday=${true} //>
      `,
    ),
  )
  expect($('time').length).toBe(1)
  expect($('time').attr('datetime')).toEqual('2019-01-01')
  expect($('time').text()).toEqual('Tue, January 1st')
})
