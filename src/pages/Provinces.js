const { css } = require('@emotion/css')
const { html } = require('../utils')
const { theme } = require('../styles')
const { getTranslator, getRichTranslator, localizedName } = require('../i18n')
const { pathFor, holidayPathFor } = require('../config/routes.config')

const Content = require('../components/Content.js')
const Layout = require('../components/Layout.js')
const Details = require('../components/Details.js')

const styles = css`
  div {
    margin-bottom: ${theme.space.md};
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    margin-bottom: ${theme.space.xl};

    @media (${theme.mq.md}) {
      margin-bottom: ${theme.space.xxl};
    }

    li {
      margin-bottom: ${theme.space.xs};

      @media (${theme.mq.lg}) {
        width: 48%;
        display: inline-block;
        margin-right: ${theme.space.xs};
      }
    }
  }
`

const Provinces = ({ data: { provinces, locale = 'en' }, alternatePaths }) => {
  const t = getTranslator(locale)
  const rich = getRichTranslator(locale)

  const industriesUrl =
    locale === 'fr'
      ? 'https://www.canada.ca/fr/services/emplois/milieu-travail/milieux-reglementation-federale.html'
      : 'https://www.canada.ca/en/employment-social-development/programs/employment-equity/regulated-industries.html'

  return html`
    <${Layout} route=${pathFor('provinces')} locale=${locale} alternatePaths=${alternatePaths}>
      <${Content} className=${styles}>
        <h1>${t('pages.provinces.title')}</h1>

        <div>
          <p>
            <a href=${holidayPathFor({ locale })}>
              ${t('pages.provinces.allHolidays')}
            </a>
          </p>
        </div>

        <div>
          <a href=${holidayPathFor({ locale, federal: true })}>
            ${t('pages.provinces.federalHolidays')}
          </a>

          <${Details}
            summary=${t('pages.federallyRegulated.title')}
            data-event="true"
            data-label="federal-holidays"
          >
            <div>
              <p
                dangerouslySetInnerHTML=${rich('pages.provinces.federalDescription', {
                  industriesUrl,
                })}
              />

              <p>
                <a href=${pathFor('federallyRegulated', { locale })}>
                  ${t('pages.provinces.federalMore')}
                </a>.
              </p>
            </div>
          <//>
        </div>

        <ul>
          ${provinces.map(
            (province) => html`
              <li>
                <a href=${holidayPathFor({ locale, provinceId: province.id })}>
                  ${localizedName(province, locale)}
                </a>
              </li>
            `,
          )}
        </ul>
      <//>
    <//>
  `
}

module.exports = Provinces
