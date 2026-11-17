const { alternatePathsFor, pathFor } = require('../config/routes.config')
const { getTranslator } = require('../i18n')
const renderPage = require('../pages/_document.js')

const renderApiPage = (locale) => (_req, res) => {
  const t = getTranslator(locale)

  return res.send(
    renderPage({
      pageComponent: 'API',
      title: t('pages.api.documentTitle'),
      docProps: {
        meta: t('pages.api.metaDescription'),
        locale,
        canonicalPath: pathFor('api', { locale }),
        alternatePaths: alternatePathsFor('api'),
      },
      props: { data: { locale } },
    }),
  )
}

module.exports = renderApiPage
