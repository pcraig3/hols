const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')
const CalButton = require('../CalButton')
const NextHoliday = require('../NextHoliday')
const NextHolidayBox = require('../NextHolidayBox')
const NextYearLink = require('../NextYearLink')
const ObservingProvinces = require('../ObservingProvinces')
const ProvincePicker = require('../ProvincePicker')
const ProvinceTitle = require('../ProvinceTitle')

const nextHoliday = {
  nameEn: 'Christmas Day',
  nameFr: 'Noël',
  date: '2027-12-25',
  observedDate: '2027-12-27',
  provinces: [],
}

const french = (Component, props = {}) =>
  cheerio.load(render(html`<${Component} ...${props} locale="fr" />`))

test('calendar button translates its default text and preserves custom text', () => {
  expect(french(CalButton)('a').text()).toBe('Ajouter à votre calendrier')
  expect(french(CalButton, { text: 'Custom' })('a').text()).toBe('Custom')
})

test('next holiday translates its heading, holiday name, and observed date title', () => {
  const $ = french(NextHoliday, { nextHoliday })
  expect($('.h1--xs').text()).toBe('Le prochain jour férié au Canada est')
  expect($('.h1--md').text()).toBe('Noël')
  expect($('#next-holiday-link').attr('title')).toContain('Observé :')
})

test('next holiday box passes French to nested components', () => {
  const $ = french(NextHolidayBox, { nextHoliday, federal: true })
  expect($('.h1--xs').text()).toBe('Le prochain jour férié fédéral au Canada est')
  expect($('h1 + p + p').text()).toBe('Découvrez à qui s’appliquent les jours fériés fédéraux')
})

test('year headings and links interpolate French labels', () => {
  expect(french(ProvinceTitle, { year: 2027 })('.h1--md').text()).toBe('Jours fériés en 2027')
  const $ = french(NextYearLink, { year: 2027, federal: true })
  expect($('a').text()).toBe('Jours fériés fédéraux en 2028')
  expect($('a').attr('href')).toBe('/fr/federal/2028')
})

test('observing provinces uses French names, conjunctions, and federal labels', () => {
  const $ = french(ObservingProvinces, {
    provinces: [{ id: 'QC', nameEn: 'Quebec', nameFr: 'Québec' }],
    federal: true,
  })
  expect($('p').text()).toBe('Observé dans la région suivante : Québec, ainsi que dans les secteurs sous réglementation fédérale.')
  expect($('a').first().attr('href')).toBe('/fr/provinces/QC')
})

test('province picker translates controls and region names', () => {
  const $ = french(ProvincePicker, { provinceId: 'BC' })
  expect($('#region-select-width').text()).toBe('Colombie-Britannique')
  expect($('label[for="region-select"]').text()).toBe('Afficher par région')
  expect($('#region-select__button').text()).toBe('Afficher →')
})
