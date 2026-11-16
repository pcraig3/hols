const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const DB = require('@beenotung/better-sqlite3-helper')
const { ALLOWED_YEARS } = require('../config/vars.config')
const { pathFor, alternatePathsFor, holidayPathFor, alternateHolidayPathsFor } = require('../config/routes.config')
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
const { getTranslator, localizedName } = require('../i18n')
const renderApiPage = require('./api-page')

const getHolidayDocPaths = ({ locale, provinceId, federal = false, year }) => {
  const region = provinceId || (federal ? 'federal' : undefined)
  const canonicalYear = year === getCurrentHolidayYear(region) ? undefined : year
  const options = { provinceId, federal, year: canonicalYear }

  return {
    canonicalPath: holidayPathFor({ ...options, locale }),
    alternatePaths: alternateHolidayPathsFor(options),
  }
}

const renderCanada = (locale) => (req, res) => {
  const t = getTranslator(locale)
  const hasYear = req.params.year !== undefined

  const year = hasYear
    ? ALLOWED_YEARS.find((y) => y === parseInt(getRequestYear(req)))
    : getCurrentHolidayYear()

  const holidays = res.locals.rows
  const nextHol = hasYear ? undefined : nextHoliday(holidays)

  const meta = nextHol
    ? t('routes.ui.canada.metaCurrent', 
      {
        holidayName: localizedName(nextHol, locale),
        date: displayDate(nextHol.observedDate, { locale }),
        count: holidays.length,
        year,
      })
    : t('routes.ui.canada.metaYear', 
      {
        count: holidays.length,
        year,
      })

  return res.send(
    renderPage({
      pageComponent: 'Province',
      title: t('routes.ui.canada.documentTitle', { year }),
      docProps: {
        meta,
        path: req.path,
        region: t('routes.ui.canada.region'),
        year,
        locale,
        ...getHolidayDocPaths({
          locale,
          year,
        }),
        richSnippets: hasYear
          ? ['breadcrumb', 'dataset']
          : ['breadcrumb', 'dataset', 'speakable'],
      },
      props: {
        data: {
          holidays,
          nextHoliday: nextHol,
          year,
          locale,
        },
      },
    }),
  )
}

const canadaRootPath = holidayPathFor()

router.get(
  [canadaRootPath, `/en${canadaRootPath}`],
  checkRedirectYear,
  dbmw(getHolidaysWithProvinces),
  renderCanada('en'),
)

router.get(
  holidayPathFor({ locale: 'fr' }),
  checkRedirectYear,
  dbmw(getHolidaysWithProvinces),
  renderCanada('fr'),
)

const canadaYearPath = holidayPathFor({ year: ':year' })

router.get(
  [canadaYearPath, `/en${canadaYearPath}`],
  requireFourDigitYear,
  checkYearErr,
  dbmw(getHolidaysWithProvinces),
  renderCanada('en'),
)

router.get(
  holidayPathFor({ locale: 'fr', year: ':year' }),
  requireFourDigitYear,
  checkYearErr,
  dbmw(getHolidaysWithProvinces),
  renderCanada('fr'),
)

router.get('/provinces/PEI', (req, res) => res.redirect(301, '/provinces/PE'))
router.get('/provinces/PEI/:year', (req, res) =>
  res.redirect(301, `/provinces/PE/${req.params.year}`),
)

router.get('/provinces/QB', (req, res) => res.redirect(301, '/provinces/QC'))
router.get('/provinces/QB/:year', (req, res) =>
  res.redirect(301, `/provinces/QC/${req.params.year}`),
)

const renderProvince = (locale) => (req, res) => {
  const t = getTranslator(locale)
  const hasYear = req.params.year !== undefined

  const province = res.locals.rows[0]

  const {
    holidays,
    id: provinceId,
    sourceEn,
    sourceFr,
    sourceLinkEn,
    sourceLinkFr,
  } = province

  const provinceName = localizedName(province, locale)

  const year = hasYear
    ? ALLOWED_YEARS.find((y) => y === parseInt(getRequestYear(req)))
    : getCurrentHolidayYear(provinceId)

  const nextHol = hasYear ? undefined : province.nextHoliday

  const meta = nextHol
    ? t('routes.ui.province.metaCurrent', 
      {
        provinceName,
        holidayName: localizedName(nextHol, locale),
        date: displayDate(nextHol.observedDate, { locale }),
        count: holidays.length,
        year,
      })
    : t('routes.ui.province.metaYear', 
      {
        provinceName,
        count: holidays.length,
        year,
      })

  return res.send(
    renderPage({
      pageComponent: 'Province',
      title: t('routes.ui.province.documentTitle', {
        provinceName,
        provinceCode: pe2pei(provinceId),
        year,
      }),
      docProps: {
        meta,
        path: req.path,
        region: provinceName,
        year,
        id: provinceId,
        locale,
        ...getHolidayDocPaths({
          locale,
          provinceId,
          year,
        }),
        richSnippets: hasYear
          ? ['breadcrumb', 'dataset']
          : ['breadcrumb', 'dataset', 'speakable'],
      },
      props: {
        data: {
          holidays,
          nextHoliday: nextHol,
          provinceName,
          provinceId,
          year,
          locale,
          source: {
            sourceEn,
            sourceFr,
            sourceLinkEn,
            sourceLinkFr,
          },
        },
      },
    }),
  )
}

const provincePath = holidayPathFor({ provinceId: ':provinceId' })

router.get(
  [provincePath, `/en${provincePath}`],
  checkProvinceIdErr,
  checkRedirectProvinceId,
  checkRedirectYear,
  optionalTrue,
  dbmw(getProvincesWithHolidays),
  renderProvince('en'),
)

router.get(
  holidayPathFor({
    locale: 'fr',
    provinceId: ':provinceId',
  }),
  checkProvinceIdErr,
  checkRedirectProvinceId,
  checkRedirectYear,
  optionalTrue,
  dbmw(getProvincesWithHolidays),
  renderProvince('fr'),
)

const provinceYearPath = holidayPathFor({ provinceId: ':provinceId', year: ':year' })

router.get(
  [provinceYearPath, `/en${provinceYearPath}`],
  requireFourDigitYear,
  checkProvinceIdErr,
  checkRedirectProvinceId,
  checkYearErr,
  optionalTrue,
  dbmw(getProvincesWithHolidays),
  renderProvince('en'),
)

router.get(
  holidayPathFor({ locale: 'fr', provinceId: ':provinceId', year: ':year' }),
  requireFourDigitYear,
  checkProvinceIdErr,
  checkRedirectProvinceId,
  checkYearErr,
  optionalTrue,
  dbmw(getProvincesWithHolidays),
  renderProvince('fr'),
)

const getFederalSourceForPage = () => getSource(DB, 'federal')

const renderFederal = (locale) => (req, res) => {
  const t = getTranslator(locale)
  const hasYear = req.params.year !== undefined

  const year = hasYear
    ? ALLOWED_YEARS.find((y) => y === parseInt(getRequestYear(req)))
    : getCurrentHolidayYear('federal')

  const holidays = res.locals.rows
  const nextHol = hasYear ? undefined : nextHoliday(holidays)

  const meta = nextHol
    ? t('routes.ui.federal.metaCurrent',
      {
        holidayName: localizedName(nextHol, locale),
        date: displayDate(nextHol.observedDate, { locale }),
        count: holidays.length,
        year,
      })
    : t('routes.ui.federal.metaYear',
      {
        count: holidays.length,
        year,
      })

  return res.send(
    renderPage({
      pageComponent: 'Province',
      title: t('routes.ui.federal.documentTitle', {
        year,
      }),
      docProps: {
        meta,
        path: req.path,
        region: t('routes.ui.federal.region'),
        year,
        locale,
        ...getHolidayDocPaths({
          locale,
          federal: true,
          year,
        }),
        richSnippets: hasYear
          ? ['breadcrumb', 'dataset']
          : ['breadcrumb', 'dataset', 'speakable'],
      },
      props: {
        data: {
          holidays,
          nextHoliday: nextHol,
          federal: true,
          year,
          locale,
          source: getFederalSourceForPage(),
        },
      },
    }),
  )
}

const federalPath = holidayPathFor({
  federal: true,
})

router.get(
  [federalPath, `/en${federalPath}`],
  checkRedirectYear,
  dbmw(getHolidaysWithProvinces),
  renderFederal('en'),
)

router.get(
  holidayPathFor({
    locale: 'fr',
    federal: true,
  }),
  checkRedirectYear,
  dbmw(getHolidaysWithProvinces),
  renderFederal('fr'),
)

const federalYearPath = holidayPathFor({ federal: true, year: ':year' })

router.get(
  [federalYearPath, `/en${federalYearPath}`],
  requireFourDigitYear,
  checkYearErr,
  dbmw(getHolidaysWithProvinces),
  renderFederal('en'),
)

router.get(
  holidayPathFor({ locale: 'fr', federal: true, year: ':year'}),
  requireFourDigitYear,
  checkYearErr,
  dbmw(getHolidaysWithProvinces),
  renderFederal('fr'),
)

const renderProvinces = (locale) => (req, res) => {
  const t = getTranslator(locale)

  return res.send(
    renderPage({
      pageComponent: 'Provinces',
      title: t('pages.provinces.documentTitle'),
      docProps: {
        meta: t('pages.provinces.metaDescription'),
        path: req.path,
        locale,
        canonicalPath: pathFor('provinces', { locale }),
        alternatePaths: alternatePathsFor('provinces'),
      },
      props: {
        data: {
          provinces: res.locals.rows,
          locale,
        },
      },
    }),
  )
}

router.get(
  [pathFor('provinces'), `/en${pathFor('provinces')}`],
  dbmw(getProvinces),
  renderProvinces('en'),
)

router.get(
  pathFor('provinces', { locale: 'fr' }),
  dbmw(getProvinces),
  renderProvinces('fr'),
)

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
