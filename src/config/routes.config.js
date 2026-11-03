
const routes = {
  about: {
    en: '/about',
    fr: '/a-propos',
  },
  api: {
    en: '/api',
    fr: '/api',
  },
  feedback: {
    en: '/feedback',
    fr: '/commentaires',
  },
  sources: {
    en: '/sources',
    fr: '/sources',
  },
}

const pathFor = (page, { locale = 'en' } = {}) => {
  return locale === 'fr' ? `/fr${routes[page].fr}` : routes[page].en
}

const alternatePathsFor = (page) => ({
  'en-CA': pathFor(page),
  'fr-CA': pathFor(page, { locale: 'fr' }),
  'x-default': pathFor(page),
})

module.exports = { pathFor, alternatePathsFor }
