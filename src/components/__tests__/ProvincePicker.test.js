const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const ProvincePicker = require('../ProvincePicker.js')

const renderProvincePicker = ({ provinceId, federal } = {}) => {
  return cheerio.load(
    render(
      html`
        <${ProvincePicker} ...${{ provinceId, federal }}//>
      `,
    ),
  )
}

describe('<ProvincePicker>', () => {
  test(' renders properly', () => {
    const $ = renderProvincePicker()
    expect($('label').text()).toEqual('View by region')
    expect($('select').length).toBe(1)
    expect($('select option').length).toBe(16)
    expect($('select option').text()).toEqual(
      'NationwideFederal holidays──────────AlbertaBritish ColumbiaManitobaNew BrunswickNewfoundland and LabradorNova ScotiaNorthwest TerritoriesNunavutOntarioPrince Edward IslandQuebecSaskatchewanYukon',
    )
  })

  test('renders selected option as "Nationwide" be default', () => {
    const $ = renderProvincePicker()
    expect($('select').length).toBe(1)
    expect($('select option[selected]').text()).toEqual('Nationwide')
  })

  test('renders selected option with matching provinceId', () => {
    const $ = renderProvincePicker({ provinceId: 'AB' })
    expect($('select').length).toBe(1)
    expect($('select option[selected]').text()).toEqual('Alberta')
  })

  test('renders no selected option with bad provinceId', () => {
    const $ = renderProvincePicker({ provinceId: 'HAWAII' })
    expect($('select').length).toBe(1)
    expect($('select option[selected]').length).toBe(0)
  })

  test('renders selected option as "Federal holidays" if "federal" is true', () => {
    const $ = renderProvincePicker({ federal: true })
    expect($('select').length).toBe(1)
    expect($('select option[selected]').text()).toEqual('Federal holidays')
  })

  test('renders province option if a provinceId AND a federal option are passed in', () => {
    const $ = renderProvincePicker({ provinceId: 'PE', federal: true })
    expect($('select').length).toBe(1)
    expect($('select option[selected]').text()).toEqual('Prince Edward Island')
  })

  test('renders no selected option by default if a BAD provinceId AND a federal option are passed in', () => {
    const $ = renderProvincePicker({ provinceId: 'TEXAS', federal: true })
    expect($('select').length).toBe(1)
    expect($('select option[selected]').length).toBe(0)
  })
})
