const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')
const { ALLOWED_YEARS } = require('../../config/vars.config')

const ProvincePicker = require('../ProvincePicker.js')

const renderProvincePicker = ({ provinceId, federal, year } = {}) => {
  return cheerio.load(render(html` <${ProvincePicker} ...${{ provinceId, federal, year }}//> `))
}

describe('<ProvincePicker>', () => {
  test(' renders properly', () => {
    const $ = renderProvincePicker()
    expect($('label').text()).toEqual('View by regionView by year')
    expect($('select').length).toBe(2)
    expect($('select option').length).toBe(26)
    expect($('select option').text()).toEqual(
      `NationwideFederal──────────AlbertaBritish ColumbiaManitobaNew BrunswickNewfoundland and LabradorNova ScotiaNorthwest TerritoriesNunavutOntarioPrince Edward IslandQuebecSaskatchewanYukon${ALLOWED_YEARS.join(
        '',
      )}`,
    )
  })

  describe('province select', () => {
    test('renders selected region as "Nationwide" be default', () => {
      const $ = renderProvincePicker()
      expect($('select').eq(0).find('option[selected]').text()).toEqual('Nationwide')
    })

    test('renders selected region with matching provinceId', () => {
      const $ = renderProvincePicker({ provinceId: 'AB' })
      expect($('select').eq(0).find('option[selected]').text()).toEqual('Alberta')
    })

    test('renders no selected region with bad provinceId', () => {
      const $ = renderProvincePicker({ provinceId: 'HAWAII' })
      expect($('select').eq(0).find('option[selected]').length).toBe(0)
    })

    test('renders selected region as "Federal" if "federal" is true', () => {
      const $ = renderProvincePicker({ federal: true })
      expect($('select').eq(0).find('option[selected]').text()).toEqual('Federal')
    })

    test('renders province region if a provinceId AND a federal option are passed in', () => {
      const $ = renderProvincePicker({ provinceId: 'PE', federal: true })
      expect($('select').eq(0).find('option[selected]').text()).toEqual('Prince Edward Island')
    })

    test('renders no selected region by default if a BAD provinceId AND a federal option are passed in', () => {
      const $ = renderProvincePicker({ provinceId: 'TEXAS', federal: true })
      expect($('select').eq(0).find('option[selected]').length).toBe(0)
    })
  })

  describe('year select', () => {
    test('renders selected year as "2021" by default', () => {
      const $ = renderProvincePicker()
      expect($('select').eq(1).find('option[selected]').text()).toEqual('2021')
    })

    ALLOWED_YEARS.map((year) => {
      test(`renders selected year as ${year} when passed in`, () => {
        const $ = renderProvincePicker({ year })
        expect($('select').eq(1).find('option[selected]').text()).toEqual(`${year}`)
      })
    })

    test('renders no selected year when a bad year is passed', () => {
      const $ = renderProvincePicker({ year: '1999' })
      expect($('select').eq(1).find('option[selected]').length).toBe(0)
    })
  })
})
