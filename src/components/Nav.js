const { css } = require('@emotion/css')
const { html } = require('../utils')
const { theme, insideContainer } = require('../styles')
const { getTranslator } = require('../i18n')
const { pathFor } = require('../config/routes.config')

const Logo = require('./Logo')
const Details = require('./Details')

const styles = css`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  @media (${theme.mq.md}) {
    align-items: center;
  }

  ${insideContainer};

  .links {
    flex: auto;
    text-align: right;

    .links--sm {
      display: initial;
      font-size: 0.86em;
    }

    .links--md {
      display: none;
      font-size: 0.76em;
    }

    @media (${theme.mq.md}) {
      .links--sm {
        display: none;
      }

      .links--md {
        display: initial;
      }
    }
  }
`

const linkStyles = css`
  list-style: none;
  margin: 0;
  padding-left: ${theme.space.sm};

  li {
    margin-top: ${theme.space.sm};

    &:first-of-type {
      margin-top: ${theme.space.lg};
    }

    &:last-of-type {
      margin-bottom: ${theme.space.xs};
    }

    a, a:visited {
      color: ${theme.color.grey};

      &.active {
        font-weight: 600;
      }
    }
  }

  @media (${theme.mq.md}) {
    li {
      display: inline-block;
      margin-left: ${theme.space.md};
      margin-top: 0;

      &:first-of-type,
      &:last-of-type {
        margin-top: 0;
        margin-bottom: 0;
      }

      a.active {
          font-weight: 500;
        }
      }
    }
  }
`

const NavLinks = ({ route, locale = 'en' }) => {
  const t = getTranslator(locale)

  return html`
    <ul class=${linkStyles}>
      <li>
        <a class=${route === pathFor('provinces') ? 'active' : ''} href=${pathFor('provinces', { locale })}>
          ${t('components.nav.allRegions')}
        </a>
      </li>

      <li>
        <a class=${route === pathFor('about') ? 'active' : ''} href=${pathFor('about', { locale })}>
          ${t('components.nav.about')}
        </a>
      </li>

      <li>
        <a class=${route === pathFor('api') ? 'active' : ''} href=${pathFor('api', { locale })}>
          ${t('components.nav.api')}
        </a>
      </li>

      <li>
        <a class=${route === pathFor('feedback') ? 'active' : ''} href=${pathFor('feedback', { locale })}>
          ${t('components.nav.feedback')}
        </a>
      </li>
    </ul>
  `
}

const Nav = ({ color, route, locale = 'en' }) => {
  const t = getTranslator(locale)

  return html`
    <nav class=${styles}>
      <${Logo} color=${color} locale=${locale} />

      <div class="links">
        <div class="links--sm">
          <${Details} summary=${t('components.nav.menu')}>
            <${NavLinks} route=${route} locale=${locale} />
          <//>
        </div>

        <div class="links--md">
          <${NavLinks} route=${route} locale=${locale} />
        </div>
      </div>
    </nav>
  `
}

module.exports = Nav
