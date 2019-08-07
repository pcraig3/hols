const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const NextHolidayBox = require('../NextHolidayBox.js')

const nextHoliday = {
  id: 20,
  date: '2019-08-16',
  nameEn: 'Gold Cup Parade Day',
  federal: 0,
  provinces: [{ id: 'PE', nameEn: 'Prince Edward Island' }],
}

test('nextHolidayBox displays next holiday properly', () => {
  const $ = cheerio.load(
    render(
      html`
        <${NextHolidayBox} nextHoliday=${nextHoliday} //>
      `,
    ),
  )
  expect($('div').length).toBe(1)
  expect($('h1').text()).toEqual(
    'Canada’s next public holiday is Gold Cup Parade Day on August 16th',
  )
  expect($('h1 + span').text()).toEqual('Celebrated by Prince Edward Island')
})
