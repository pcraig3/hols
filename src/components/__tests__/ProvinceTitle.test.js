const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const ProvinceTitle = require('../ProvinceTitle.js')

const renderProvinceTitle = (props) => {
  return cheerio.load(render(html`<${ProvinceTitle} ...${props} //>`))
}

describe('ProvinceTitle renders', () => {
  const year = 2022

  test('for Canada in 2022', () => {
    const $ = renderProvinceTitle({ year })

    expect($('h1').length).toBe(1)
    expect($('.h1--xs').length).toBe(0)
    expect($('.h1--lg').text()).toEqual('Canada')
    expect($('.h1--md').text()).toEqual('statutory Holidays in 2022')
  })

  test('for Federal Canadian holidays in 2022', () => {
    const $ = renderProvinceTitle({ federal: true, year })

    expect($('h1').length).toBe(1)
    expect($('.h1--lg').text()).toEqual('Canada')
    expect($('.h1--md').text()).toEqual('Federal statutory holidays in 2022')
  })

  test('for PEI holidays in 2022', () => {
    const $ = renderProvinceTitle({ provinceName: 'Prince Edward Island', year })

    expect($('h1').length).toBe(1)
    expect($('.h1--lg').text()).toEqual('Prince Edward Island')
    expect($('.h1--md').text()).toEqual('statutory Holidays in 2022')
  })

  test('for PEI holidays in 2025', () => {
    const $ = renderProvinceTitle({ provinceName: 'Prince Edward Island', year: 2025 })

    expect($('h1').length).toBe(1)
    expect($('.h1--lg').text()).toEqual('Prince Edward Island')
    expect($('.h1--md').text()).toEqual('statutory Holidays in 2025')
  })
})
