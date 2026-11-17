const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const DB = require('@beenotung/better-sqlite3-helper')
const { ALLOWED_YEARS } = require('../config/vars.config')
const {
  pathFor,
  alternatePathsFor,
  holidayPathFor,
  alternateHolidayPathsFor,
  pagePathsFor,
  holidayPathsFor,
} = require('../config/routes.config')
const renderPage = require('../pages/_document.js')
const {
  dbmw,
  getRequestYear,
  getRequestLocale,
  requireFourDigitYear,
  checkProvinceIdErr,
  checkYearErr,
  checkRedirectProvinceId,
  checkRedirectYear,
  optionalTrue,
  nextHoliday,
  pe2pei,
  getProvinceIdOrFederalString,
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

/**
 * Returns the requested holiday year, or the current holiday year
 * for the given region if no year is specified in the path.
 */
const getHolidayPageYear = (req, region) => {
  return req.params.year !== undefined
    ? ALLOWED_YEARS.find((y) => y === parseInt(getRequestYear(req)))
    : getCurrentHolidayYear(region)
}

/**
 * Generates the localized meta description for a holiday page.
 * Includes the next holiday's name and date when available;
 * otherwise, describes the holidays for the given year.
 */
const getHolidayMeta = (page, { locale, holidays, nextHol, year, provinceName }) => {
  const t = getTranslator(locale)
  const key = `routes.ui.${page}`

  const params = { count: holidays.length, year, provinceName }

  if (nextHol) {
    return t(`${key}.metaCurrent`, {
      ...params,
      holidayName: localizedName(nextHol, locale),
      date: displayDate(nextHol.observedDate, { locale }),
    })
  }

  return t(`${key}.metaYear`, params)
}

const getHolidayDocPaths = ({ locale, provinceId, federal = false, year }) => {
  const region = getProvinceIdOrFederalString({ provinceId, federal })
  const canonicalYear = year === getCurrentHolidayYear(region) ? undefined : year
  const options = { provinceId, federal, year: canonicalYear }

  return {
    canonicalPath: holidayPathFor({ ...options, locale }),
    alternatePaths: alternateHolidayPathsFor(options),
  }
}

/**
 * Renders an informational page with localized metadata,
 * canonical and alternate paths, and optional page data.
 */
const renderInfoPage = (req, page, pageComponent, data = {}) => {
  const locale = getRequestLocale(req)
  const t = getTranslator(locale)

  return renderPage({
    pageComponent,
    title: t(`pages.${page}.documentTitle`),
    docProps: {
      meta: t(`pages.${page}.metaDescription`),
      path: req.path,
      locale,
      canonicalPath: pathFor(page, { locale }),
      alternatePaths: alternatePathsFor(page),
    },
    props: {
      data: { ...data, locale },
    },
  })
}

const renderCanada = (req, res) => {
  const locale = getRequestLocale(req)
  const t = getTranslator(locale)
  const hasYear = req.params.year !== undefined

  const year = getHolidayPageYear(req)
  const holidays = res.locals.rows
  const nextHol = hasYear ? undefined : nextHoliday(holidays)
  const meta = getHolidayMeta('canada', { locale, holidays, nextHol, year })

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

router.get(
  holidayPathsFor(),
  checkRedirectYear,
  dbmw(getHolidaysWithProvinces),
  renderCanada,
)

router.get(
  holidayPathsFor({ year: ':year' }),
  requireFourDigitYear,
  checkYearErr,
  dbmw(getHolidaysWithProvinces),
  renderCanada,
)

const redirectProvinceAlias = ({ locale = 'en', provinceId }) => (req, res) => {
  return res.redirect(
    301,
    holidayPathFor({ locale, provinceId, year: req.params.year }),
  )
}

/* Redirect commonly mistyped PEI ids */
router.get(
  ['/provinces/PEI', '/en/provinces/PEI'],
  redirectProvinceAlias({ provinceId: 'PE' }),
)

router.get(
  ['/provinces/PEI/:year', '/en/provinces/PEI/:year'],
  requireFourDigitYear,
  redirectProvinceAlias({ provinceId: 'PE' }),
)

router.get(
  '/fr/provinces/PEI',
  redirectProvinceAlias({ locale: 'fr',provinceId: 'PE' }),

)

router.get(
  '/fr/provinces/PEI/:year',
  requireFourDigitYear,
  redirectProvinceAlias({ locale: 'fr', provinceId: 'PE' }),
)

/* Redirect commonly mistyped Quebec ids */
router.get(
  ['/provinces/QB', '/en/provinces/QB'],
  redirectProvinceAlias({ provinceId: 'QC' }),
)

router.get(
  ['/provinces/QB/:year', '/en/provinces/QB/:year'],
  requireFourDigitYear,
  redirectProvinceAlias({ provinceId: 'QC' }),
)

router.get(
  '/fr/provinces/QB',
  redirectProvinceAlias({ locale: 'fr', provinceId: 'QC' }),
)

router.get(
  '/fr/provinces/QB/:year',
  requireFourDigitYear,
  redirectProvinceAlias({ locale: 'fr', provinceId: 'QC' }),
)

const renderProvince = (req, res) => {
  const locale = getRequestLocale(req)
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
  const year = getHolidayPageYear(req, provinceId)
  const nextHol = hasYear ? undefined : province.nextHoliday
  const meta = getHolidayMeta('province', { locale, holidays, nextHol, year, provinceName })

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

router.get(
  holidayPathsFor({ provinceId: ':provinceId' }),
  checkProvinceIdErr,
  checkRedirectYear,
  checkRedirectProvinceId,
  optionalTrue,
  dbmw(getProvincesWithHolidays),
  renderProvince,
)

router.get(
  holidayPathsFor({ provinceId: ':provinceId', year: ':year' }),
  requireFourDigitYear,
  checkProvinceIdErr,
  checkRedirectProvinceId,
  checkYearErr,
  optionalTrue,
  dbmw(getProvincesWithHolidays),
  renderProvince,
)

const getFederalSourceForPage = () => getSource(DB, 'federal')

const renderFederal = (req, res) => {
  const locale = getRequestLocale(req)
  const t = getTranslator(locale)
  const hasYear = req.params.year !== undefined

  const year = getHolidayPageYear(req, 'federal')
  const holidays = res.locals.rows
  const nextHol = hasYear ? undefined : nextHoliday(holidays)
  const meta = getHolidayMeta('federal', { locale, holidays, nextHol, year })

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
        federal: true,
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

router.get(
  holidayPathsFor({ federal: true }),
  checkRedirectYear,
  dbmw(getHolidaysWithProvinces),
  renderFederal,
)

router.get(
  holidayPathsFor({ federal: true, year: ':year' }),
  requireFourDigitYear,
  checkYearErr,
  dbmw(getHolidaysWithProvinces),
  renderFederal,
)


router.get(
  pagePathsFor('provinces'),
  dbmw(getProvinces),
  (req, res) => {
    const data = {
      provinces: res.locals.rows,
    }

    return res.send(renderInfoPage(req, 'provinces', 'Provinces', data))
  },
)

const handleProvincePicker = (locale) => (req, res) => {
  const body = req.body || {}
  const region = body.region || ''
  const federal = region === 'federal'

  const provinceId =
    region && !federal
      ? encodeURIComponent(region.substring(0, 2).toUpperCase())
      : undefined

  const year = parseInt(body.year)
  const currentYear = getCurrentHolidayYear(getProvinceIdOrFederalString({ provinceId, federal }))
  const routeYear = ALLOWED_YEARS.includes(year) && year !== currentYear ? year : undefined

  return res.redirect(
    holidayPathFor({
      locale,
      provinceId,
      federal,
      year: routeYear,
    }),
  )
}

router.post('/provinces', handleProvincePicker('en'))
router.post('/fr/provinces', handleProvincePicker('fr'))

router.get('/province', (req, res) => res.redirect(301, '/provinces'))

router.get('/province/:provinceId', (req, res) => {
  return res.redirect(301, `/provinces/${req.params.provinceId}`)
})

router.get('/province/:provinceId/:year', (req, res) => {
  return res.redirect(301, `/provinces/${req.params.provinceId}/${req.params.year}`)
})

router.get(
  pagePathsFor('federallyRegulated'),
  (req, res) => {
    return res.send(renderInfoPage(req, 'federallyRegulated', 'FederallyRegulated'))
  },
)

router.get(
  pagePathsFor('optionalHolidays'),
  (req, res) => {
    return res.send(renderInfoPage(req, 'optionalHolidays', 'OptionalHolidays'))
  },
)

router.get(
  pagePathsFor('about'),
  dbmw(getHolidaysWithProvinces),
  (req, res) => {
    const data = {
      nextHoliday: nextHoliday(res.locals.rows),
    }

    return res.send(renderInfoPage(req, 'about', 'About', data))
  },
)

router.get(
  pagePathsFor('feedback'),
  (req, res) => { 
    return res.send(renderInfoPage(req, 'feedback', 'Feedback'))
  },
)

router.get(
  pagePathsFor('sources'),
  dbmw(getProvinces),
  (req, res) => {
    const data = {
      provinces: res.locals.rows,
      federalSource: getSource(DB, 'federal'),
    }

    return res.send(renderInfoPage(req, 'sources', 'Sources', data))
  },
)

router.get(
  pagePathsFor('addHolidays'),
  dbmw(getProvinces),
  (req, res) => {
    const data = {
      provinces: res.locals.rows,
      year: getCurrentHolidayYear(),
    }

    return res.send(renderInfoPage(req, 'addHolidays', 'AddHolidays', data))
  },
)

router.get(`/en${pathFor('api')}`, renderApiPage('en'))

router.get(pathFor('api', { locale: 'fr' }), renderApiPage('fr'))

router.get('/*splat', (req, res) => {
  throw new createError(404)
})

router.use(function (err, req, res, next) {
  const errObj = {}

  const status = err.status || err.statusCode || 500
  const locale = getRequestLocale(req)
  const t = getTranslator(locale)

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

  const message = status === 404 ? t('pages.error.notFound') : err.message
  const meta = status === 404 ? t('pages.error.notFoundMeta') : err.message.split('.')[0]

  return res.send(
    renderPage({
      pageComponent: 'Error',
      title: t('pages.error.documentTitle', { status }),
      docProps: { meta, path: req.path, error: true, locale },
      props: {
        data: {
          status,
          message,
          locale,
        },
      },
    }),
  )
})

module.exports = router
