
const { css } = require('@emotion/css')

const { theme } = require('../styles')
const { html } = require('../utils')

const styles = (color) => css`
  white-space: nowrap;
  flex-shrink: 0;
  font-size: 0.86em;

  a,
  a:visited {
    color: ${color ? theme.color[color].accent : theme.color.red};
  }

  .language-name {
    display: none;
  }

  .language-code {
    text-decoration: none;
    border-bottom: none;
  }

  @media (${theme.mq.md}) {
    font-size: 0.76em;
    margin-left: 0;
    padding-left: ${theme.space.sm};
    border-left: 2px solid ${theme.color.greyLight};
  }

  @media (${theme.mq.lg}) {
    margin-left: ${theme.space.xxs};
    padding-left: ${theme.space.md};

    .language-name {
      display: inline;
    }

    .language-code {
      display: none;
    }
  }
`

const LanguageSwitcher = ({
  locale = 'en',
  alternatePaths,
  color,
}) => {
  const targetLocale = locale === 'fr' ? 'en' : 'fr'
  const targetPath = alternatePaths?.[
    targetLocale === 'fr' ? 'fr-CA' : 'en-CA'
  ]

  if (!targetPath) return null

  const name = targetLocale === 'fr' ? 'Français' : 'English'
  const code = targetLocale.toUpperCase()

  return html`
    <span class=${`language-switcher ${styles(color)}`}>
      <a
        href=${targetPath}
        lang=${targetLocale}
        aria-label=${name}
        translate="no"
      >
        <span class="language-name">${name}</span>
        <abbr
          class="language-code"
          title=${name}
          aria-hidden="true"
        >${code}</abbr>
      </a>
    </span>
  `
}

module.exports = LanguageSwitcher
