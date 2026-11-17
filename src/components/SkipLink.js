const { css } = require('@emotion/css')

const { getTranslator } = require('../i18n')
const { horizontalPadding, insideContainer, theme } = require('../styles')
const { html } = require('../utils')

const styles = css`
  ${insideContainer};

  a {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    overflow: hidden !important;
    clip: rect(0 0 0 0) !important;
    -webkit-clip-path: inset(50%) !important;
    clip-path: inset(50%) !important;
    white-space: nowrap !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: block;
    padding: ${theme.space.sm};
    ${horizontalPadding};

    &:active,
    &:focus {
      position: static !important;
      width: auto !important;
      height: auto !important;
      margin: inherit !important;
      overflow: visible !important;
      clip: auto !important;
      -webkit-clip-path: none !important;
      clip-path: none !important;
      white-space: inherit !important;
    }

    &:focus {
      outline-offset: -3px;
    }

    &:link,
    &:visited,
    &:hover,
    &:active,
    &:focus {
      color: ${theme.color.grey};
    }
  }
`

const SkipLink = ({ locale = 'en' }) => {
  const t = getTranslator(locale)

  return html`
    <div class=${styles}>
      <a href="#content">${t('components.skipLink.main')}</a>
    </div>
  `
}

module.exports = SkipLink
