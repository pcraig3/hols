const { getTranslator } = require('../i18n')
const { pathFor, holidayPathFor } = require('../config/routes.config')


const breadcrumb = ({
  region,
  locale = 'en',
  provinceId,
  federal = false,
}) => {
  const t = getTranslator(locale)
  const baseUrl = 'https://canada-holidays.ca'

  const breadcrumbList = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Canada',
      item: `${baseUrl}${holidayPathFor({ locale })}`,
    },
  ]

  if (federal) {
    breadcrumbList.push({
      '@type': 'ListItem',
      position: 2,
      name: region,
    })
  } else if (provinceId) {
    breadcrumbList.push(
      {
        '@type': 'ListItem',
        position: 2,
        name: t('components.nav.allRegions'),
        item: `${baseUrl}${pathFor('provinces', { locale })}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: region,
      },
    )
  }

  return {
    '@context': 'https://schema.org/',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbList,
  }
}

const dataset = ({ region, year, path, title, meta }) => {
  const _getDescription = ({ path, meta }) => {
    if (path === '/') {
      return 'Returns all 29 Canadian public holidays for all 13 provinces and territories in Canada, including federal holidays.'
    }

    return meta.includes('next') ? meta.split('. ').pop() : meta
  }

  const _getICSUrl = ({ path, year }) => {
    const baseUrl = 'https://canada-holidays.ca/ics'

    if (path === '/') return `${baseUrl}/${year}`
    let _path = path.startsWith('/province') ? path.substring(9) : path

    return `https://canada-holidays.ca/ics${_path}${_path.endsWith(year) ? '' : `/${year}`}`
  }

  const _getJSONUrl = ({ path, year }) => {
    const baseUrl = 'https://canada-holidays.ca/api/v1'

    if (path === '/' || path === `/${year}`) return `${baseUrl}/holidays?year=${year}`
    if (path.includes('federal')) {
      return `${baseUrl}/holidays?year=${year}&federal=true`
    }

    if (path.includes('province')) {
      return `${baseUrl}/provinces/${path.split('/')[2]}?year=${year}`
    }

    // eslint-disable-next-line no-console
    console.error(`no JSON URL for ${path}`)
    return ''
  }

  return {
    '@context': 'https://schema.org/',
    '@type': 'Dataset',
    name: title.split('—')[0].trim(),
    description: _getDescription({ path, meta }),
    url: `https://canada-holidays.ca${path}`,
    alternateName: ['Canada Holidays API'],
    creator: [
      {
        '@type': 'Person',
        givenName: 'Paul',
        familyName: 'Craig',
        name: 'Paul Craig',
        email: 'paul@pcraig.ca',
        url: 'https://pcraig.ca',
      },
    ],
    license: 'https://opensource.org/licenses/MIT',
    spatialCoverage: region === 'Canada' || region === 'Federal' ? 'Canada' : `${region}, Canada`,
    temporalCoverage: `${year}`,
    distribution: [
      {
        '@type': 'DataDownload',
        encodingFormat: 'iCalendar',
        contentUrl: _getICSUrl({ path, year }),
      },
      {
        '@type': 'DataDownload',
        encodingFormat: 'JSON',
        contentUrl: _getJSONUrl({ path, year }),
      },
    ],
  }
}

const speakable = ({
  region,
  path,
  locale = 'en',
  provinceId,
  federal = false,
}) => {
  const t = getTranslator(locale)

  let name = t('utils.richSnippets.canada')

  if (federal) {
    name = t('utils.richSnippets.federal')
  } else if (provinceId) {
    name = t('utils.richSnippets.province', { region })
  }

  return {
    '@context': 'https://schema.org/',
    '@type': 'WebPage',
    name,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', 'h1 + p'],
    },
    url: `https://canada-holidays.ca${path}`,
  }
}

module.exports = {
  breadcrumb,
  dataset,
  speakable,
}
