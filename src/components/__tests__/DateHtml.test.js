const cheerio = require('cheerio')
const render = require('preact-render-to-string')

const { html } = require('../../utils')
const DateHtml = require('../DateHtml.js')

const renderDate = (props) => {
  return cheerio.load(render(html`<${DateHtml} ...${props} //>`))
}

describe('DateHtml', () => {
  test('displays dates in English by default', () => {
    const $ = renderDate({
      dateString: '2019-01-01',
    })

    expect($('time').length).toBe(1)
    expect($('time').attr('datetime')).toEqual('2019-01-01')
    expect($('time').text()).toEqual('January\u00a01')
  })

  test('displays dates in French', () => {
    const $ = renderDate({
      dateString: '2019-01-01',
      locale: 'fr',
    })

    expect($('time').text()).toEqual('1\u00a0janvier')
  })

  test('displays weekdays in English', () => {
    const $ = renderDate({
      dateString: '2019-01-01',
      weekday: true,
    })

    expect($('time').text()).toEqual('January\u00a01, Tuesday')
  })

  test('displays weekdays in French', () => {
    const $ = renderDate({
      dateString: '2019-01-01',
      weekday: true,
      locale: 'fr',
    })

    expect($('time').text()).toEqual('1\u00a0janvier, mardi')
  })
})
