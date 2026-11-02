const { html } = require('../utils')
const { css } = require('@emotion/css')
const { getTranslator, getRichTranslator } = require('../i18n')
const Layout = require('../components/Layout.js')
const Content = require('../components/Content.js')

const linkStyle = css`
  /* for obfuscating emails. Idea comes from https://mauriciorobayo.github.io/react-obfuscate-email/?path=/docs/react-obfuscate-email--mail */
  a > span.roe::after {
    content: '@';
  }
`

const Feedback = ({ data: { locale = 'en' } }) => {
  const t = getTranslator(locale)
  const rich = getRichTranslator(locale)

  return html`
    <${Layout} route="/feedback">
      <${Content}>
        <h1>${t('pages.feedback.title')}</h1>

        <p dangerouslySetInnerHTML=${rich('pages.feedback.intro')} />

        <p dangerouslySetInnerHTML=${rich('pages.feedback.support')} />

        <p className=${linkStyle}>
          ${t('pages.feedback.emailPrompt')} <span aria-hidden="true">👉</span>${' '}
          <span
            class="email--swap"
            data-email="cGF1bEBwY3JhaWcuY2E/c3ViamVjdD1Tb21ldGhpbmcgaXMgVVAgd2l0aCBjYW5hZGEtaG9saWRheXMuY2E="
            >“paul [a] pcraig [dot] ca”</span
          >
        </p>
      <//>
    <//>
  `
}

module.exports = Feedback
