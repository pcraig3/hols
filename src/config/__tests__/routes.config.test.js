const { pathFor } = require('../../config/routes.config')

test('pathFor always generates canonical English URLs', () => {
  expect(pathFor('about')).toBe('/about')
  expect(pathFor('about', { locale: 'en' })).toBe('/about')
  expect(pathFor('about', { locale: 'fr' })).toBe('/fr/a-propos')

  expect(pathFor('feedback')).toBe('/feedback')
  expect(pathFor('feedback', { locale: 'fr' })).toBe('/fr/commentaires')
})
