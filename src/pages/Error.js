const { html } = require('../utils')
const { getTranslator } = require('../i18n')
const { holidayPathFor } = require('../config/routes.config')

const Layout = require('../components/Layout.js')
const Content = require('../components/Content.js')

const Error = ({
  data: { status, message, locale = 'en' } = {},
}) => {
  const t = getTranslator(locale)

  return html`
    <${Layout} locale=${locale}>
      <${Content}>
        <h1>${status}</h1>

        <p>${message}</p>

        <span class="bottom-link">
          <a href=${holidayPathFor({ locale })}>
            <span aria-hidden="true">←</span>
            ${' '}${t('pages.error.backHome')}
          </a>
        </span>
      <//>
    <//>
  `
}

module.exports = Error
