const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const { ALLOWED_YEARS } = require('../config/vars.config')
const renderPage = require('../pages/_document.js')
const {
  dbmw,
  checkProvinceIdErr,
  checkYearErr,
  checkRedirectProvinceId,
  checkRedirectYear,
  optionalTrue,
  param2query,
  nextHoliday,
  pe2pei,
} = require('../utils')
const { getProvinces, getHolidaysWithProvinces, getProvincesWithHolidays } = require('../queries')
const { displayDate, getCurrentHolidayYear } = require('../dates')

const getMeta = (holiday) => `${holiday.nameEn} on ${displayDate(holiday.observedDate)}`

router.get('/', checkRedirectYear, dbmw(getHolidaysWithProvinces), (req, res) => {
  const year = getCurrentHolidayYear()
  const holidays = res.locals.rows
  const nextHol = nextHoliday(holidays)

  const meta = `Canada’s next stat holiday is ${getMeta(nextHol)}. See all ${
    holidays.length
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
  '/:year(\\d{4})',
  param2query('year'),
  checkYearErr,
  dbmw(getHolidaysWithProvinces),
  (req, res) => {
    // if the year value isn't in ALLOWED_YEARS, it will be caught by "checkYearErr"
    const year = ALLOWED_YEARS.find((y) => y === parseInt(req.query.year))
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

    const meta = `${provinceName}’s next stat holiday is ${getMeta(nextHoliday)}. See all ${
      holidays.length
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
  '/provinces/:provinceId/:year(\\d{4})',
  param2query('year'),
  checkProvinceIdErr,
  checkRedirectProvinceId,
  checkYearErr,
  optionalTrue,
  dbmw(getProvincesWithHolidays),
  (req, res) => {
    // if the year value isn't in ALLOWED_YEARS, it will be caught by "checkYearErr"
    const year = ALLOWED_YEARS.find((y) => y === parseInt(req.query.year))
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

// manually add source for federal holidays — it's not clean but w/e
const federalSource = {
  link: 'https://www.tpsgc-pwgsc.gc.ca/remuneration-compensation/services-paye-pay-services/paye-information-pay/vie-life/vie-conge-life-leave/conge-paye-holiday-pay-eng.html',
  nameEn: 'Statutory holiday pay, Canada.ca',
}

router.get('/federal', checkRedirectYear, dbmw(getHolidaysWithProvinces), (req, res) => {
  const year = getCurrentHolidayYear('federal')
  const holidays = res.locals.rows
  const nextHol = nextHoliday(holidays)

  const meta = `Canada’s next federal stat holiday is ${getMeta(nextHol)}. See all ${
    holidays.length
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
          source: federalSource,
        },
      },
    }),
  )
})

router.get(
  '/federal/:year(\\d{4})',
  param2query('year'),
  checkYearErr,
  dbmw(getHolidaysWithProvinces),
  (req, res) => {
    // if the year value isn't in ALLOWED_YEARS, it will be caught by "checkYearErr"
    const year = ALLOWED_YEARS.find((y) => y === parseInt(req.query.year))
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
          data: { holidays, nextHoliday: undefined, federal: true, year, source: federalSource },
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
      props: { data: { provinces: res.locals.rows } },
    }),
  )
})

router.post('/provinces', (req, res) => {
  let url = '/'
  const region = req.body.region || ''
  const year = parseInt(req.body.year)
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

router.get('/do-federal-holidays-apply-to-me', (req, res) => {
  return res.send(
    renderPage({
      pageComponent: 'FederallyRegulated',
      title: 'Do federal holidays apply to me? — Canada Holidays',
      docProps: {
        meta: 'How to tell if you get federal holidays or provincial holidays in Canada.',
        path: req.path,
      },
    }),
  )
})

router.get('/optional-holidays-in-canada', (req, res) => {
  return res.send(
    renderPage({
      pageComponent: 'OptionalHolidays',
      title: 'Optional holidays in Canada — Canada Holidays',
      docProps: {
        meta: 'Optional holidays are commonly observed but not legally mandated. Your workplace may observe optional holidays.',
        path: req.path,
      },
    }),
  )
})

router.get('/about', dbmw(getHolidaysWithProvinces), (req, res) => {
  const nextHol = nextHoliday(res.locals.rows)

  return res.send(
    renderPage({
      pageComponent: 'About',
      title: 'About — Canada Holidays',
      docProps: {
        meta: 'Check my sources, use the API, get in touch, etc.',
        path: req.path,
      },
      props: { data: { nextHoliday: nextHol } },
    }),
  )
})

router.get('/feedback', (req, res) => {
  return res.send(
    renderPage({
      pageComponent: 'Feedback',
      title: 'Feedback — Canada Holidays',
      docProps: {
        meta: 'Reprt a problem, tell me I’m cool, or let’s just chat even.',
        path: req.path,
      },
    }),
  )
})

router.get('/sources', dbmw(getProvinces), (req, res) => {
  return res.send(
    renderPage({
      pageComponent: 'Sources',
      title: 'All sources — Canada Holidays',
      docProps: {
        meta: 'Aggregated sources for Canadian statutory holidays. Canada’s holidays vary by region and industry, so here they are collected in one place.',
        path: req.path,
      },
      props: { data: { provinces: res.locals.rows } },
    }),
  )
})

router.get('/add-holidays-to-calendar', dbmw(getProvinces), (req, res) => {
  const year = getCurrentHolidayYear()
  return res.send(
    renderPage({
      pageComponent: 'AddHolidays',
      title: 'Add Canadian holidays to your calendar — Canada Holidays',
      docProps: {
        meta: 'Stream or download Canadian holidays and import them to your Outlook, iCal, or Google Calendar. Add all Canadian statutory holidays or just for your region.',
        path: req.path,
      },
      props: { data: { provinces: res.locals.rows, year } },
    }),
  )
})

router.get('*', (req, res) => {
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
