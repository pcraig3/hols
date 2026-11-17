
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
  provinces: {
    en: '/provinces',
    fr: '/provinces',
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

const holidayPathFor = ({
  locale = 'en',
  provinceId,
  federal = false,
  year,
} = {}) => {
  const prefix = locale === 'fr' ? '/fr' : ''
  let path = '/'

  if (provinceId) {
    path = `/provinces/${provinceId}`
  } else if (federal) {
    path = '/federal'
  }

  if (year) {
    path = path === '/' ? `/${year}` : `${path}/${year}`
  }

  return `${prefix}${path}`
}

const alternateHolidayPathsFor = ({
  provinceId,
  federal = false,
  year,
} = {}) => ({
  'en-CA': holidayPathFor({ provinceId, federal, year }),
  'fr-CA': holidayPathFor({
    locale: 'fr',
    provinceId,
    federal,
    year,
  }),
  'x-default': holidayPathFor({ provinceId, federal, year }),
})

const pagePathsFor = (page) => {
  const enPath = pathFor(page)

  return [
    enPath,
    `/en${enPath}`,
    pathFor(page, { locale: 'fr' }),
  ]
}

const holidayPathsFor = (options = {}) => {
  const enPath = holidayPathFor({ ...options, locale: 'en' })

  return [
    enPath,
    `/en${enPath}`,
    holidayPathFor({ ...options, locale: 'fr' }),
  ]
}

module.exports = {
  pathFor,
  alternatePathsFor,
  holidayPathFor,
  alternateHolidayPathsFor,
  pagePathsFor,
  holidayPathsFor,
}
