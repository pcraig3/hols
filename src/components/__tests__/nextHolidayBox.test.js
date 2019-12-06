const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const NextHolidayBox = require('../NextHolidayBox.js')

const renderNextHolidayBox = props => {
  return cheerio.load(
    render(
      html`
        <${NextHolidayBox} ...${props} //>
      `,
    ),
  )
}

const getProvince = () => {
  return { id: 'PE', nameEn: 'Prince Edward Island' }
}

const getNextHoliday = () => {
  return {
    id: 20,
    date: '2019-08-16',
    nameEn: 'Gold Cup Parade Day',
    federal: 0,
    provinces: [getProvince()],
  }
}

const sp2nbsp = str => str.replace(/ /g, '\u00a0')

test('nextHolidayBox displays next holiday properly for Canada', () => {
  const nextHoliday = getNextHoliday()
  const $ = renderNextHolidayBox({ nextHoliday })

  expect($('div h1').length).toBe(1)
  expect($('h1').text()).toEqual(
    `Canada’s next statutory holiday is${sp2nbsp('August 16')}${sp2nbsp(nextHoliday.nameEn)}`,
  )
  expect($('h1 + p').text()).toEqual('Celebrated by Prince Edward Island')
})

test('nextHolidayBox uses province IDs when more than 1 province exists', () => {
  const nextHoliday = getNextHoliday()
  nextHoliday.provinces = [{ id: 'PE', nameEn: 'Prince Edward Island' }, { id: 'AB' }, { id: 'QC' }]

  const $ = renderNextHolidayBox({ nextHoliday })

  expect($('div h1').length).toBe(1)
  expect($('h1').text()).toEqual(
    `Canada’s next statutory holiday is${sp2nbsp('August 16')}${sp2nbsp(nextHoliday.nameEn)}`,
  )
  expect($('h1 + p').text()).toEqual('Celebrated by PE, AB, and QC')
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

test('nextHolidayBox says "all provinces and territories" when there are 13 provinces', () => {
  const nextHoliday = getNextHoliday()
  nextHoliday.provinces = [
    { id: 'PE', nameEn: 'Prince Edward Island' },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 },
    { id: 13 },
  ]

  const $ = renderNextHolidayBox({ nextHoliday })

  expect($('div h1').length).toBe(1)
  expect($('h1').text()).toEqual(
    `Canada’s next statutory holiday is${sp2nbsp('August 16')}${sp2nbsp(nextHoliday.nameEn)}`,
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
