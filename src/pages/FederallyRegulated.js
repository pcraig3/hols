
const { html } = require('../utils')
const { getTranslator, getRichTranslator } = require('../i18n')

const Layout = require('../components/Layout.js')
const Content = require('../components/Content.js')

const FederallyRegulated = ({ data: { locale = 'en' } = {} }) => {
  const t = getTranslator(locale)
  const rich = getRichTranslator(locale)

  const industriesUrl =
    locale === 'fr'
      ? 'https://www.canada.ca/fr/services/emplois/milieu-travail/milieux-reglementation-federale.html'
      : 'https://www.canada.ca/en/services/jobs/workplace/federally-regulated-industries.html'

  return html`
    <${Layout}>
      <${Content}>
        <h1>${t('pages.federallyRegulated.title')}</h1>

        <p>${t('pages.federallyRegulated.intro')}</p>

        <aside>
          <ul>
            <li
              dangerouslySetInnerHTML=${rich('pages.federallyRegulated.provincesLink', {
                provincesUrl: '/provinces',
              })}
            />
            <li
              dangerouslySetInnerHTML=${rich('pages.federallyRegulated.federalLink', {
                federalUrl: '/federal',
              })}
            />
          </ul>
        </aside>

        <h2>${t('pages.federallyRegulated.regulatedTitle')}</h2>

        <p
          dangerouslySetInnerHTML=${rich('pages.federallyRegulated.regulatedIntro')}
        />

        <p>${t('pages.federallyRegulated.regulatedExamples')}</p>

        <ul class="no-space">
          <li>${t('pages.federallyRegulated.banks')}</li>
          <li>${t('pages.federallyRegulated.airlines')}</li>
          <li>${t('pages.federallyRegulated.postOffices')}</li>
          <li>${t('pages.federallyRegulated.civilService')}</li>
        </ul>

        <p
          dangerouslySetInnerHTML=${rich('pages.federallyRegulated.fullList', {
            industriesUrl,
          })}
        />

        <h2>${t('pages.federallyRegulated.differenceTitle')}</h2>

        <p>${t('pages.federallyRegulated.differenceIntro')}</p>

        <p>${t('pages.federallyRegulated.remembranceIntro')}</p>

        <ul>
          <li>${t('pages.federallyRegulated.remembranceExample')}</li>
        </ul>

        <p>${t('pages.federallyRegulated.familyIntro')}</p>

        <ul>
          <li>${t('pages.federallyRegulated.familyExample')}</li>
        </ul>

        <h2>${t('pages.federallyRegulated.howTitle')}</h2>

        <p
          dangerouslySetInnerHTML=${rich('pages.federallyRegulated.howIntro', {
            industriesUrl,
          })}
        />

        <br />
        <br />

        <span class="bottom-link">
          <a href="#html" class="up-arrow">
            ${t('pages.federallyRegulated.backToTop')}
          </a>
        </span>
      <//>
    <//>
  `
}

module.exports = FederallyRegulated
