
const routes = {
  about: {
    en: '/about',
    fr: '/a-propos',
  },
  addHolidays: {
    en: '/add-holidays-to-calendar',
    fr: '/ajouter-des-jours-feries-au-calendrier',
  },
  api: {
    en: '/api',
    fr: '/api',
  },
  federallyRegulated: {
    en: '/do-federal-holidays-apply-to-me',
    fr: '/les-jours-feries-federaux-sappliquent-ils-a-moi',
  },
  feedback: {
    en: '/feedback',
    fr: '/commentaires',
  },
  optionalHolidays: {
    en: '/optional-holidays-in-canada',
    fr: '/jours-feries-facultatifs-au-canada',
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
