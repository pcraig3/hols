const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const NextHolidayBox = require('../NextHolidayBox.js')

const renderNextHolidayBox = (props) => {
  return cheerio.load(render(html` <${NextHolidayBox} ...${props} //> `))
}

const getProvince = () => {
  return { id: 'PE', nameEn: 'Prince Edward Island' }
}

const getNextHoliday = ({ federal } = {}) => {
  return {
    id: 20,
    observedDate: '2019-08-16',
    nameEn: 'Gold Cup Parade Day',
    federal: federal ? 1 : 0,
    provinces: [getProvince()],
  }
}

const sp2nbsp = (str) => str.replace(/ /, '\u00a0')

test('NextHolidayBox displays next holiday properly for Canada', () => {
  const nextHoliday = getNextHoliday()
  const $ = renderNextHolidayBox({ nextHoliday })

  expect($('div h1').length).toBe(1)
  expect($('h1').text()).toEqual(
    `Canada’s next statutory holiday is${sp2nbsp('August 16')}${sp2nbsp(nextHoliday.nameEn)}`,
  )
})

test('NextHolidayBox refers to federal holidays when "federal" variable is passed in', () => {
  const nextHoliday = getNextHoliday()
  const $ = renderNextHolidayBox({ nextHoliday, federal: true })

  expect($('div h1').length).toBe(1)
  expect($('h1').text()).toEqual(
    `Canada’s next federal statutory holiday is${sp2nbsp('August 16')}${sp2nbsp(
      nextHoliday.nameEn,
    )}`,
  )
  expect($('h1 + p').text()).toMatch(/That’s in (about)?\d\d (days|month(s)?)/)
  expect($('h1 + p + p').text()).toEqual('Find out who gets federal statutory holidays')
})

test('NextHolidayBox displays next holiday properly for a given province', () => {
  const nextHoliday = getNextHoliday()
  delete nextHoliday.provinces

  const $ = renderNextHolidayBox({
    nextHoliday,
    provinceName: getProvince().nameEn,
  })

  expect($('div h1').length).toBe(1)
  expect($('h1').text()).toEqual(
    `Prince Edward Island’s next statutory holiday is${sp2nbsp('August 16')}${sp2nbsp(
      nextHoliday.nameEn,
    )}`,
  )
  expect($('h1 + p').text()).toMatch(/That’s in (about)?\d\d (days|month(s)?)/)
})

test('NextHolidayBox displays next holiday properly for a given province', () => {
  const nextHoliday = getNextHoliday()
  delete nextHoliday.provinces

  const $ = renderNextHolidayBox({
    nextHoliday,
    provinceName: getProvince().nameEn,
  })

  expect($('div h1').length).toBe(1)
  expect($('h1').text()).toEqual(
    `Prince Edward Island’s next statutory holiday is${sp2nbsp('August 16')}${sp2nbsp(
      nextHoliday.nameEn,
    )}`,
  )
  expect($('h1 + p').text()).toMatch(/That’s in (about)?\d\d (days|month(s)?)/)
})

test('NextHolidayBox displays provinceName and year and "add to calendar" link', () => {
  const $ = renderNextHolidayBox({
    nextHoliday: undefined,
    provinceName: getProvince().nameEn,
    provinceId: getProvince().id,
    year: 2021,
  })

  expect($('div h1').length).toBe(1)
  expect($('h1').text()).toEqual('Prince Edward Islandstatutory Holidays in 2021')
  expect($('h1 + p').length).toBe(1)
  expect($('h1 ~ p').text()).toEqual('Add to your calendar')
  expect($('h1 ~ p a').attr('href')).toEqual('/ics/PE/2021')
})

test('NextHolidayBox displays provinceName and year and "add to calendar" link for federal holidays when no next holiday', () => {
  const $ = renderNextHolidayBox({
    nextHoliday: undefined,
    federal: true,
    year: 2022,
  })

  expect($('div h1').length).toBe(1)
  expect($('h1').text()).toEqual('CanadaFederal statutory holidays in 2022')
  expect($('h1 ~ p').text()).toEqual('Add to your calendar')
  expect($('h1 ~ p a').attr('href')).toEqual('/ics/federal/2022')
})

test('NextHolidayBox displays provinceName and year and "add to calendar" link for Canada when no next holiday', () => {
  const $ = renderNextHolidayBox({
    nextHoliday: undefined,
    year: 2019,
  })

  expect($('div h1').length).toBe(1)
  expect($('h1').text()).toEqual('Canadastatutory Holidays in 2019')
  expect($('h1 ~ p').text()).toEqual('Add to your calendar')
  expect($('h1 ~ p a').attr('href')).toEqual('/ics/2019')
})
