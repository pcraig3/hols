const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const NextHolidayBox = require('../NextHolidayBox.js')

const renderNextHolidayBox = (props) => {
  return cheerio.load(render(html` <${NextHolidayBox} ...${props} //> `))
}

const getProvince = ({ endsWithS = false } = {}) => {
  return endsWithS
    ? { id: 'NT', nameEn: 'Northwest Territories' }
    : { id: 'PE', nameEn: 'Prince Edward Island' }
}

const getNextHoliday = ({ federal } = {}) => {
  return {
    id: 20,
    date: '2019-08-16',
    nameEn: 'Gold Cup Parade Day',
    federal: federal ? 1 : 0,
    provinces: [getProvince()],
  }
}

const sp2nbsp = (str) => str.replace(/ /g, '\u00a0')

test('nextHolidayBox displays next holiday properly for Canada', () => {
  const nextHoliday = getNextHoliday()
  const $ = renderNextHolidayBox({ nextHoliday })

  expect($('div h1').length).toBe(1)
  expect($('h1').text()).toEqual(
    `Canada’s next statutory holiday is${sp2nbsp('August 16')}${sp2nbsp(nextHoliday.nameEn)}`,
  )
})

test('nextHolidayBox refers to federal holidays when "federal" variable is passed in', () => {
  const nextHoliday = getNextHoliday()
  const $ = renderNextHolidayBox({ nextHoliday, federal: true })

  expect($('div h1').length).toBe(1)
  expect($('h1').text()).toEqual(
    `Canada’s next federal statutory holiday is${sp2nbsp('August 16')}${sp2nbsp(
      nextHoliday.nameEn,
    )}`,
  )
  expect($('h1 + p').text()).toMatch(/That’s in (about )?(\d\d days|\d month(s)?)/)
})

test('nextHolidayBox displays next holiday properly for a given province', () => {
  const nextHoliday = getNextHoliday()
  delete nextHoliday.provinces

  const $ = renderNextHolidayBox({
    nextHoliday,
    provinceId: getProvince().id,
    provinceName: getProvince().nameEn,
  })

  expect($('div h1').length).toBe(1)
  expect($('h1').text()).toEqual(
    `Prince Edward Island’s next statutory holiday is${sp2nbsp('August 16')}${sp2nbsp(
      nextHoliday.nameEn,
    )}`,
  )
  expect($('h1 + p').text()).toMatch(/That’s in (about )?(\d\d days|\d month(s)?)/)
})

test('nextHolidayBox doesn’t put an "s" after the apostrophe for a province that ends in "s"', () => {
  const nextHoliday = getNextHoliday()
  delete nextHoliday.provinces

  const $ = renderNextHolidayBox({
    nextHoliday,
    provinceId: getProvince({ endsWithS: true }).id,
    provinceName: getProvince({ endsWithS: true }).nameEn,
  })

  expect($('div h1').length).toBe(1)
  expect($('h1').text()).toEqual(
    `Northwest Territories’ next statutory holiday is${sp2nbsp('August 16')}${sp2nbsp(
      nextHoliday.nameEn,
    )}`,
  )
})
