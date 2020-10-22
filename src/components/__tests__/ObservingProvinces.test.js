const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const ObservingProvinces = require('../ObservingProvinces.js')

const renderObservingProvinces = (props) => {
  return cheerio.load(render(html`<${ObservingProvinces} ...${props} //>`))
}

const getProvinces = (count) => {
  const _provinces = [
    { id: 'PE', nameEn: 'Prince Edward Island' },
    { id: 'QC', nameEn: 'Quebec' },
    { id: 'SK', nameEn: 'Saskatchewan' },
  ]

  if (![1, 2, 3].includes(count)) {
    throw new Error('ObservingProvinces.test.js: getProvinces() only accepts 2 or 3')
  }

  if (count === 1) return [_provinces[0]]
  if (count === 2) return [_provinces[0], _provinces[1]]
  return _provinces
}

describe('ObservingProvinces', () => {
  test('returns an empty string for no provices or "federal" flag', () => {
    const $ = renderObservingProvinces()
    expect($('p').text()).toEqual('')
  })

  test('refers to one province by full name when only one province exists', () => {
    const provinces = getProvinces(1)

    const $ = renderObservingProvinces({ provinces })
    expect($('p').text()).toEqual('Observed in Prince Edward Island.')
  })

  test('refers to provinces by full name when less than 3 provinces exist', () => {
    const provinces = getProvinces(2)

    const $ = renderObservingProvinces({ provinces })
    expect($('p').text()).toEqual('Observed in Prince Edward Island and Quebec.')
  })

  test('refers to provinces by ID when at least 3 provinces exist', () => {
    const provinces = getProvinces(3)

    const $ = renderObservingProvinces({ provinces })
    expect($('p').text()).toEqual('Observed in PEI, QC, and SK.')
  })

  describe('with federal industries', () => {
    test('refers to federal industries with no provinces but "federal" is true', () => {
      const provinces = []

      const $ = renderObservingProvinces({ provinces, federal: true })
      expect($('p').text()).toEqual('Observed by federal industries.')
    })

    test('refers to one province by full name and federal industries when only one province exists', () => {
      const provinces = getProvinces(1)

      const $ = renderObservingProvinces({ provinces, federal: true })
      expect($('p').text()).toEqual('Observed in Prince Edward Island and by federal industries.')
    })

    test('refers to provinces by full name and federal industries when less than 3 provinces exist', () => {
      const provinces = getProvinces(2)

      const $ = renderObservingProvinces({ provinces, federal: true })
      expect($('p').text()).toEqual(
        'Observed in Prince Edward Island, Quebec, and by federal industries.',
      )
    })

    test('refers to provinces by ID and federal industries when at least 3 provinces exist', () => {
      const provinces = getProvinces(3)

      const $ = renderObservingProvinces({ provinces, federal: true })
      expect($('p').text()).toEqual('Observed in PEI, QC, SK, and by federal industries.')
    })
  })

  test('says "National holiday" when thirteen "provinces" entries exist', () => {
    // an array with length 5 and undefined as values: https://stackoverflow.com/a/28599347
    const provinces = Array.apply(null, Array(13)).map(() => {})

    const $ = renderObservingProvinces({ provinces })
    expect($('p').text()).toEqual('National holiday')
  })
})
