const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const DB = require('@beenotung/better-sqlite3-helper')
const { ALLOWED_YEARS } = require('../config/vars.config')
const { pathFor, alternatePathsFor } = require('../config/routes.config')
const renderPage = require('../pages/_document.js')
const {
  dbmw,
  getRequestYear,
  requireFourDigitYear,
  checkProvinceIdErr,
  checkYearErr,
  checkRedirectProvinceId,
  checkRedirectYear,
  optionalTrue,
  nextHoliday,
  pe2pei,
} = require('../utils')
const {
  getSource,
  getProvinces,
  getHolidaysWithProvinces,
  getProvincesWithHolidays,
} = require('../queries')
const { displayDate, getCurrentHolidayYear } = require('../dates')
const { getTranslator } = require('../i18n')
const renderApiPage = require('./api-page')

const getMeta = (holiday) => `${holiday.nameEn} on ${displayDate(holiday.observedDate)}`

router.get('/', checkRedirectYear, dbmw(getHolidaysWithProvinces), (req, res) => {
  const year = getCurrentHolidayYear()
  const holidays = res.locals.rows
  const nextHol = nextHoliday(holidays)

  const meta = `Canada’s next stat holiday is ${getMeta(nextHol)}. See all ${holidays.length
    } statutory holidays in Canada in ${year}.`

  return res.send(
    renderPage({
      pageComponent: 'Province',
      title: `Canadian statutory holidays in ${year}`,
      docProps: {
        meta,
        path: req.path,
        region: 'Canada',
        year,
        richSnippets: ['breadcrumb', 'dataset', 'speakable'],
      },
      props: { data: { holidays, nextHoliday: nextHol, year } },
    }),
  )
})

router.get(
  '/:year',
  requireFourDigitYear,
  checkYearErr,
  dbmw(getHolidaysWithProvinces),
  (req, res) => {
    // if the year value isn't in ALLOWED_YEARS, it will be caught by "checkYearErr"
    const year = ALLOWED_YEARS.find((y) => y === parseInt(getRequestYear(req)))
    const holidays = res.locals.rows
    const meta = `See all ${holidays.length} statutory holidays in Canada in ${year}.`

    return res.send(
      renderPage({
        pageComponent: 'Province',
        title: `Canadian statutory holidays in ${year}`,
        docProps: {
          meta,
          path: req.path,
          region: 'Canada',
          year,
          richSnippets: ['breadcrumb', 'dataset'],
        },
        props: { data: { holidays, nextHoliday: undefined, year } },
      }),
    )
  },
)

router.get('/provinces/PEI', (req, res) => res.redirect(301, '/provinces/PE'))
router.get('/provinces/PEI/:year', (req, res) =>
  res.redirect(301, `/provinces/PE/${req.params.year}`),
)

router.get('/provinces/QB', (req, res) => res.redirect(301, '/provinces/QC'))
router.get('/provinces/QB/:year', (req, res) =>
  res.redirect(301, `/provinces/QC/${req.params.year}`),
)

router.get(
  '/provinces/:provinceId',
  checkProvinceIdErr,
  checkRedirectProvinceId,
  checkRedirectYear,
  optionalTrue,
  dbmw(getProvincesWithHolidays),
  (req, res) => {
    const {
      holidays,
      nextHoliday,
      nameEn: provinceName,
      id: provinceId,
      sourceLink,
      sourceEn,
    } = res.locals.rows[0]

    const year = getCurrentHolidayYear(provinceId)

    const meta = `${provinceName}’s next stat holiday is ${getMeta(nextHoliday)}. See all ${holidays.length
      } statutory holidays in ${provinceName}, Canada in ${year}.`

    return res.send(
      renderPage({
        pageComponent: 'Province',
        title: `${provinceName} (${pe2pei(
          provinceId,
        )}) statutory holidays in ${year} — Canada Holidays`,
        docProps: {
          meta,
          path: req.path,
          region: provinceName,
          year,
          id: provinceId,
          richSnippets: ['breadcrumb', 'dataset', 'speakable'],
        },
        props: {
          data: {
            holidays,
            nextHoliday,
            provinceName,
            provinceId,
            year,
            source: { link: sourceLink, nameEn: sourceEn },
          },
        },
      }),
    )
  },
)

router.get(
  '/provinces/:provinceId/:year',
  requireFourDigitYear,
  checkProvinceIdErr,
  checkRedirectProvinceId,
  checkYearErr,
  optionalTrue,
  dbmw(getProvincesWithHolidays),
  (req, res) => {
    // if the year value isn't in ALLOWED_YEARS, it will be caught by "checkYearErr"
    const year = ALLOWED_YEARS.find((y) => y === parseInt(getRequestYear(req)))
    const {
      holidays,
      nameEn: provinceName,
      id: provinceId,
      sourceLink,
      sourceEn,
    } = res.locals.rows[0]

    const meta = `See all ${holidays.length} statutory holidays in ${provinceName}, Canada in ${year}.`

    return res.send(
      renderPage({
        pageComponent: 'Province',
        title: `${provinceName} (${pe2pei(
          provinceId,
        )}) statutory holidays in ${year} — Canada Holidays`,
        docProps: {
          meta,
          path: req.path,
          region: provinceName,
          year,
          id: provinceId,
          richSnippets: ['breadcrumb', 'dataset'],
        },
        props: {
          data: {
            holidays,
            nextHoliday: undefined,
            provinceName,
            provinceId,
            year,
            source: { link: sourceLink, nameEn: sourceEn },
          },
        },
      }),
    )
  },
)

const getFederalSourceForPage = () => {
  const { sourceEn, sourceLinkEn } = getSource(DB, 'federal')

  return {
    link: sourceLinkEn,
    nameEn: sourceEn,
  }
}

router.get('/federal', checkRedirectYear, dbmw(getHolidaysWithProvinces), (req, res) => {
  const year = getCurrentHolidayYear('federal')
  const holidays = res.locals.rows
  const nextHol = nextHoliday(holidays)

  const meta = `Canada’s next federal stat holiday is ${getMeta(nextHol)}. See all ${holidays.length
    } federal statutory holidays in Canada in ${year}.`

  return res.send(
    renderPage({
      pageComponent: 'Province',
      title: `Federal statutory holidays in Canada in ${year}`,
      docProps: {
        meta,
        path: req.path,
        region: 'Federal',
        year,
        richSnippets: ['breadcrumb', 'dataset', 'speakable'],
      },
      props: {
        data: {
          holidays,
          nextHoliday: nextHol,
          federal: true,
          year,
          source: getFederalSourceForPage(),
        },
      },
    }),
  )
})

router.get(
  '/federal/:year',
  requireFourDigitYear,
  checkYearErr,
  dbmw(getHolidaysWithProvinces),
  (req, res) => {
    // if the year value isn't in ALLOWED_YEARS, it will be caught by "checkYearErr"
    const year = ALLOWED_YEARS.find((y) => y === parseInt(getRequestYear(req)))
    const holidays = res.locals.rows
    const meta = `See all ${holidays.length} federal statutory holidays in Canada in ${year}.`

    return res.send(
      renderPage({
        pageComponent: 'Province',
        title: `Federal statutory holidays in Canada in ${year}`,
        docProps: {
          meta,
          path: req.path,
          region: 'Federal',
          year,
          richSnippets: ['breadcrumb', 'dataset'],
        },
        props: {
          data: { holidays, nextHoliday: undefined, federal: true, year, source: getFederalSourceForPage() },
        },
      }),
    )
  },
)

router.get('/provinces', dbmw(getProvinces), (req, res) => {
  return res.send(
    renderPage({
      pageComponent: 'Provinces',
      title: 'All regions in Canada — Canada Holidays',
      docProps: {
        meta: 'Upcoming stat holidays for all regions in Canada.',
        path: req.path,
      },
      props: {
        data: {
          provinces: res.locals.rows,
          federalSource: getSource(DB, 'federal'),
        },
      },
    }),
  )
})

router.post('/provinces', (req, res) => {
  let url = '/'
  const body = req.body || {}
  const region = body.region || ''
  const year = parseInt(body.year)
  const GOOD_YEARS = ALLOWED_YEARS.filter((y) => y !== getCurrentHolidayYear())

  switch (region) {
    case '':
      break
    case 'federal':
      url = '/federal'
      break
    default:
      url = `/provinces/${encodeURIComponent(region.substring(0, 2).toUpperCase())}`
  }

  // if year is a truthy value and is whitelisted, add it to the path
  if (year && GOOD_YEARS.includes(year)) {
    url = url.endsWith('/') ? `${url}${year}` : `${url}/${year}`
  }

  return res.redirect(url)
})

router.get('/province', (req, res) => res.redirect(301, '/provinces'))

router.get('/province/:provinceId', (req, res) => {
  return res.redirect(301, `/provinces/${req.params.provinceId}`)
})

router.get('/province/:provinceId/:year', (req, res) => {
  return res.redirect(301, `/provinces/${req.params.provinceId}/${req.params.year}`)
})

const renderFederallyRegulated = (locale) => (req, res) => {
  const t = getTranslator(locale)

  return res.send(
    renderPage({
      pageComponent: 'FederallyRegulated',
      title: t('pages.federallyRegulated.documentTitle'),
      docProps: {
        meta: t('pages.federallyRegulated.metaDescription'),
        path: req.path,
        locale,
        canonicalPath: pathFor('federallyRegulated', { locale }),
        alternatePaths: alternatePathsFor('federallyRegulated'),
      },
      props: { data: { locale } },
    }),
  )
}

router.get(
  [
    pathFor('federallyRegulated'),
    `/en${pathFor('federallyRegulated')}`,
  ],
  renderFederallyRegulated('en'),
)

router.get(
  pathFor('federallyRegulated', { locale: 'fr' }),
  renderFederallyRegulated('fr'),
)

const renderOptionalHolidays = (locale) => (req, res) => {
  const t = getTranslator(locale)

  return res.send(
    renderPage({
      pageComponent: 'OptionalHolidays',
      title: t('pages.optionalHolidays.documentTitle'),
      docProps: {
        meta: t('pages.optionalHolidays.metaDescription'),
        path: req.path,
        locale,
        canonicalPath: pathFor('optionalHolidays', { locale }),
        alternatePaths: alternatePathsFor('optionalHolidays'),
      },
      props: { data: { locale } },
    }),
  )
}

router.get(
  [
    pathFor('optionalHolidays'),
    `/en${pathFor('optionalHolidays')}`,
  ],
  renderOptionalHolidays('en'),
)

router.get(
  pathFor('optionalHolidays', { locale: 'fr' }),
  renderOptionalHolidays('fr'),
)


const renderAbout = (locale) => (req, res) => {
  const nextHol = nextHoliday(res.locals.rows)
  const t = getTranslator(locale)

  return res.send(
    renderPage({
      pageComponent: 'About',
      title: t('pages.about.documentTitle'),
      docProps: {
        meta: t('pages.about.metaDescription'),
        path: req.path,
        locale,
        canonicalPath: pathFor('about', { locale }),
        alternatePaths: alternatePathsFor('about'),
      },
      props: { data: { nextHoliday: nextHol, locale } },
    }),
  )
}

router.get(
  [pathFor('about'), `/en${pathFor('about')}`],
  dbmw(getHolidaysWithProvinces),
  renderAbout('en'),
)

router.get(
  pathFor('about', { locale: 'fr' }),
  dbmw(getHolidaysWithProvinces),
  renderAbout('fr'),
)


const renderFeedback = (locale) => (req, res) => {
  const t = getTranslator(locale)

  return res.send(
    renderPage({
      pageComponent: 'Feedback',
      title: t('pages.feedback.documentTitle'),
      docProps: {
        meta: t('pages.feedback.metaDescription'),
        path: req.path,
        locale,
        canonicalPath: pathFor('feedback', { locale }),
        alternatePaths: alternatePathsFor('feedback'),
      },
      props: { data: { locale } },
    }),
  )
}

router.get(
  [pathFor('feedback'), `/en${pathFor('feedback')}`],
  renderFeedback('en'),
)

router.get(
  pathFor('feedback', { locale: 'fr' }),
  renderFeedback('fr'),
)


const renderSources = (locale) => (req, res) => {
  const t = getTranslator(locale)

  return res.send(
    renderPage({
      pageComponent: 'Sources',
      title: t('pages.sources.documentTitle'),
      docProps: {
        meta: t('pages.sources.metaDescription'),
        path: req.path,
        locale,
        canonicalPath: pathFor('sources', { locale }),
        alternatePaths: alternatePathsFor('sources'),
      },
      props: {
        data: {
          provinces: res.locals.rows,
          federalSource: getSource(DB, 'federal'),
          locale,
        },
      },
    }),
  )
}

router.get(
  [pathFor('sources'), `/en${pathFor('sources')}`],
  dbmw(getProvinces),
  renderSources('en'),
)

router.get(
  pathFor('sources', { locale: 'fr' }),
  dbmw(getProvinces),
  renderSources('fr'),
)


const renderAddHolidays = (locale) => (req, res) => {
  const t = getTranslator(locale)
  const year = getCurrentHolidayYear()

  return res.send(
    renderPage({
      pageComponent: 'AddHolidays',
      title: t('pages.addHolidays.documentTitle'),
      docProps: {
        meta: t('pages.addHolidays.metaDescription'),
        path: req.path,
        locale,
        canonicalPath: pathFor('addHolidays', { locale }),
        alternatePaths: alternatePathsFor('addHolidays'),
      },
      props: {
        data: {
          provinces: res.locals.rows,
          year,
          locale,
        },
      },
    }),
  )
}

router.get(
  [pathFor('addHolidays'), `/en${pathFor('addHolidays')}`],
  dbmw(getProvinces),
  renderAddHolidays('en'),
)

router.get(
  pathFor('addHolidays', { locale: 'fr' }),
  dbmw(getProvinces),
  renderAddHolidays('fr'),
)

router.get(`/en${pathFor('api')}`, renderApiPage('en'))

router.get(pathFor('api', { locale: 'fr' }), renderApiPage('fr'))

router.get('/*splat', (req, res) => {
  res.status(404)
  throw new createError(404, 'Oopsie daisy. Maybe head back to the home page? 👇')
})

router.use(function (err, req, res, next) {
  const errObj = {}

  const status = err.status || err.statusCode || 500
  res.statusCode = status

  errObj.status = status
  if (err.message) errObj.message = err.message
  if (err.stack) errObj.stack = err.stack
  if (err.code) errObj.code = err.code
  if (err.name) errObj.name = err.name
  if (err.type) errObj.type = err.type

  res.locals.err = errObj

  // eslint-disable-next-line no-console
  process.env.NODE_ENV === 'development' && console.error(errObj)

  return res.send(
    renderPage({
      pageComponent: 'Error',
      title: `Error: ${res.statusCode} — Canada Holidays`,
      docProps: { meta: err.message.split('.')[0], path: req.path, error: true },
      props: {
        data: {
          status: res.statusCode,
          message: err.message,
        },
      },
    }),
  )
})

module.exports = router
