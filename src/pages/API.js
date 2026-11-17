const { css } = require('@emotion/css')

const Content = require('../components/Content.js')
const Details = require('../components/Details.js')
const Layout = require('../components/Layout.js')
const { pathFor } = require('../config/routes.config')
const { getRichTranslator, getTranslator } = require('../i18n')
const { theme } = require('../styles')
const { html } = require('../utils')

const linkStyle = css`
  text-decoration: none;
`

const detailsStyle = css`
  font-size: 1em !important;
  margin-bottom: ${theme.space.md};

  ul {
    padding-left: 25px !important;

    @media (${theme.mq.md}) {
      padding-left: 35px !important;
    }
  }
`

const API = ({ data: { locale = 'en' } = {}, alternatePaths }) => {
  const t = getTranslator(locale)
  const rich = getRichTranslator(locale)

  const apiUrl = 'https://canada-holidays.ca/api/v1/'
  const githubUrl = t('pages.api.links.github')
  const specUrl = t('pages.api.links.spec')

  return html`
    <${Layout} route="/api" locale=${locale} alternatePaths=${alternatePaths}>
      <${Content}>
        <h1>${t('pages.api.title')}</h1>

        <p
          dangerouslySetInnerHTML=${rich('pages.api.intro', {
            apiUrl,
          })}
        />

        <p>
          <span aria-hidden="true">👉</span>${' '}
          <strong>
            <a class=${linkStyle} href=${apiUrl} target="_blank" rel="noopener">
              ${apiUrl}
            </a>
          </strong>
        </p>

        <h2>${t('pages.api.featuresTitle')}</h2>

        <ul>
          <li>${t('pages.api.allHolidays')}</li>
          <li>${t('pages.api.allRegions')}</li>
          <li>${t('pages.api.federalHolidays')}</li>
          <li>${t('pages.api.nationalHolidays')}</li>
          <li>${t('pages.api.nextHoliday')}</li>
          <li dangerouslySetInnerHTML=${rich('pages.api.years')} />
        </ul>

        <${Details}
          summary=${t('pages.api.extraFeaturesTitle')}
          className=${detailsStyle}
          data-event="true"
          data-label="api-features"
        >
          <ul>
            <li dangerouslySetInnerHTML=${rich('pages.api.free')} />

            <li
              dangerouslySetInnerHTML=${rich('pages.api.support', {
                supportUrl: t('pages.api.links.support'),
              })}
            />

            <li>${t('pages.api.bilingual')}</li>

            <li
              dangerouslySetInnerHTML=${rich('pages.api.standards', {
                standardsUrl: t('pages.api.links.standards'),
              })}
            />

            <li
              dangerouslySetInnerHTML=${rich('pages.api.openSource', {
                githubUrl,
              })}
            />

            <li
              dangerouslySetInnerHTML=${rich('pages.api.openApi', {
                specUrl,
              })}
            />
          </ul>
        <//>

        <p>${t('pages.api.missionCritical')}</p>

        <h2>${t('pages.api.documentationTitle')}</h2>

        <p
          dangerouslySetInnerHTML=${rich('pages.api.documentation', {
            specUrl,
            swaggerUrl: t('pages.api.links.swagger'),
          })}
        />

        <p
          dangerouslySetInnerHTML=${rich('pages.api.githubOverview', {
            overviewUrl: t('pages.api.links.overview'),
          })}
        />

        <h2>${t('pages.api.citationsTitle')}</h2>

        <p
          dangerouslySetInnerHTML=${rich('pages.api.citations', {
            sourcesUrl: pathFor('sources', { locale }),
          })}
        />

        <p
          dangerouslySetInnerHTML=${rich('pages.api.mistakes', {
            feedbackUrl: pathFor('feedback', { locale }),
          })}
        />

        <br />
        <br />

        <span class="bottom-link">
          <a href="#html" class="up-arrow">${t('pages.api.backToTop')}</a>
        </span>
      <//>
    <//>
  `
}

module.exports = API
