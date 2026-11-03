
const renderPage = require('../pages/_document.js')
const { getTranslator } = require('../i18n')
const { pathFor, alternatePathsFor } = require('../config/routes.config')

const renderApiPage = (locale) => (req, res) => {
  const t = getTranslator(locale)

  return res.send(
    renderPage({
      pageComponent: 'API',
      title: t('pages.api.documentTitle'),
      docProps: {
        meta: t('pages.api.metaDescription'),
        path: req.originalUrl.split('?')[0],
        locale,
        canonicalPath: pathFor('api', { locale }),
        alternatePaths: alternatePathsFor('api'),
      },
      props: { data: { locale } },
    }),
  )
}

module.exports = renderApiPage
