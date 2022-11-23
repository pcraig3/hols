const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')
const { getCurrentHolidayYear } = require('../../dates')

const NextHolidayBox = require('../NextHolidayBox.js')

const renderNextHolidayBox = (props) => {
  return cheerio.load(render(html` <${NextHolidayBox} ...${props} //> `))
}

const getProvince = () => {
  return { id: 'NU', nameEn: 'Nunavut' }
}

const getNextHoliday = ({ federal } = {}) => {
  const currentYear = getCurrentHolidayYear()

  return {
    id: 16,
    date: `${currentYear}-07-09`,
    observedDate: `${currentYear}-07-11`,
    nameEn: 'Nunavut Day',
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
    `Canada’s next statutory holiday\u00a0is${sp2nbsp(nextHoliday.nameEn)}, on${sp2nbsp(
      'July 9',
    )}*`,
  )
})

test('NextHolidayBox refers to federal holidays when "federal" variable is passed in', () => {
  const nextHoliday = getNextHoliday()
  const $ = renderNextHolidayBox({ nextHoliday, federal: true })

  expect($('div h1').length).toBe(1)
  expect($('h1').text()).toEqual(
    `Canada’s next federal statutory holiday\u00a0is${sp2nbsp(nextHoliday.nameEn)}, on${sp2nbsp(
      'July 9',
    )}*`,
  )
  expect($('h1 + p').text()).toMatch(/That’s in (about )?\d+ (days|month(s)?|year)/)
  expect($('h1 + p + p').text()).toEqual('Find out who gets federal holidays')
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
    `Nunavut’s next statutory holiday\u00a0is${sp2nbsp(nextHoliday.nameEn)}, on${sp2nbsp(
      'July 9',
    )}*`,
  )
  expect($('h1 + p').text()).toMatch(/That’s in (about )?\d+ (days|month(s)?|year)/)
})

test('NextHolidayBox displays provinceName and year and "add to calendar" link', () => {
  const $ = renderNextHolidayBox({
    nextHoliday: undefined,
    provinceName: getProvince().nameEn,
    provinceId: getProvince().id,
    year: 2021,
  })

  expect($('div h1').length).toBe(1)
  expect($('h1').text()).toEqual('Nunavutstatutory Holidays in 2021')
  expect($('h1 + p').length).toBe(1)
  expect($('h1 ~ p').text()).toEqual('Add to your calendar')
  expect($('h1 ~ p a').attr('href')).toEqual('/ics/NU/2021')
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
