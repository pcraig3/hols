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
  speakable,
}
