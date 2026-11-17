const {
  alternateHolidayPathsFor,
  holidayPathFor,
  pathFor,
} = require('../../config/routes.config')

test('pathFor always generates canonical English URLs', () => {
  expect(pathFor('about')).toBe('/about')
  expect(pathFor('about', { locale: 'en' })).toBe('/about')
  expect(pathFor('about', { locale: 'fr' })).toBe('/fr/a-propos')

  expect(pathFor('feedback')).toBe('/feedback')
  expect(pathFor('feedback', { locale: 'fr' })).toBe('/fr/commentaires')

  expect(pathFor('provinces')).toBe('/provinces')
  expect(pathFor('provinces', { locale: 'en' })).toBe('/provinces')
  expect(pathFor('provinces', { locale: 'fr' })).toBe('/fr/provinces')
})

test('holidayPathFor generates canonical dynamic holiday URLs', () => {
  expect(holidayPathFor()).toBe('/')
  expect(holidayPathFor({ locale: 'fr' })).toBe('/fr/')

  expect(holidayPathFor({ year: 2027 })).toBe('/2027')
  expect(holidayPathFor({ locale: 'fr', year: 2027 })).toBe('/fr/2027')

  expect(holidayPathFor({ provinceId: 'BC' })).toBe('/provinces/BC')
  expect(
    holidayPathFor({
      locale: 'fr',
      provinceId: 'BC',
      year: 2027,
    }),
  ).toBe('/fr/provinces/BC/2027')

  expect(holidayPathFor({ federal: true })).toBe('/federal')
  expect(
    holidayPathFor({
      locale: 'fr',
      federal: true,
      year: 2027,
    }),
  ).toBe('/fr/federal/2027')
})

test('alternateHolidayPathsFor returns canonical EN/FR paths', () => {
  expect(
    alternateHolidayPathsFor({
      provinceId: 'QC',
      year: 2027,
    }),
  ).toEqual({
    'en-CA': '/provinces/QC/2027',
    'fr-CA': '/fr/provinces/QC/2027',
    'x-default': '/provinces/QC/2027',
  })
})
