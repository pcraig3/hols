const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const Picker = require('../Picker.js')

const renderPicker = ({ provinceId, federal } = {}) => {
  return cheerio.load(
    render(
      html`
        <${Picker} ...${{ provinceId, federal }}//>
      `,
    ),
  )
}

describe('<Picker>', () => {
  test(' renders properly', () => {
    const $ = renderPicker()
    expect($('label').text()).toEqual('View by region')
    expect($('select').length).toBe(1)
    expect($('select option').length).toBe(5)
    expect($('select option').text()).toEqual(
      'NationwideFederal holidaysAlbertaOntarioPrince Edward Island',
    )
  })

  test('renders selected option as "Nationwide" be default', () => {
    const $ = renderPicker()
    expect($('select').length).toBe(1)
    expect($('select option[selected]').text()).toEqual('Nationwide')
  })

  test('renders selected option with matching provinceId', () => {
    const $ = renderPicker({ provinceId: 'AB' })
    expect($('select').length).toBe(1)
    expect($('select option[selected]').text()).toEqual('Alberta')
  })

  test('renders no selected option with bad provinceId', () => {
    const $ = renderPicker({ provinceId: 'HAWAII' })
    expect($('select').length).toBe(1)
    expect($('select option[selected]').length).toBe(0)
  })

  test('renders selected option as "Federal holidays" if "federal" is true', () => {
    const $ = renderPicker({ federal: true })
    expect($('select').length).toBe(1)
    expect($('select option[selected]').text()).toEqual('Federal holidays')
  })

  test('renders province option if a provinceId AND a federal option are passed in', () => {
    const $ = renderPicker({ provinceId: 'PE', federal: true })
    expect($('select').length).toBe(1)
    expect($('select option[selected]').text()).toEqual('Prince Edward Island')
  })

  test('renders no selected option by default if a BAD provinceId AND a federal option are passed in', () => {
    const $ = renderPicker({ provinceId: 'TEXAS', federal: true })
    expect($('select').length).toBe(1)
    expect($('select option[selected]').length).toBe(0)
  })
})
