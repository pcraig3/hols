const { html } = require('../utils')
const { css } = require('@emotion/css')
const { theme } = require('../styles')
const { getTranslator, getRichTranslator, localizedName } = require('../i18n')
const { pathFor } = require('../config/routes.config')

const Layout = require('../components/Layout.js')
const Content = require('../components/Content.js')
const SummaryTable = require('../components/SummaryTable.js')
const CalButton = require('../components/CalButton.js')

const headerStyles = css`
  h2 {
    font-size: 1.3em;
  }

  h3 {
    font-size: 1.05em;
  }

  .push-down {
    margin-bottom: calc(${theme.space.xl} + ${theme.space.xl});
  }
`

const summaryTableStylesUrls = css`
  @media (${theme.mq.lg}) {
    .key {
      width: 33%;
    }

    .value {
      width: 66%;
      text-align: right;
      padding-right: ${theme.space.xs};
    }
  }
`

const summaryTableStylesButtons = css`
  @media (${theme.mq.lg}) {
    .key {
      width: 55%;
    }

    .value {
      width: 45%;
      text-align: right;
      padding-right: ${theme.space.xs};
    }
  }
`

const createRows = ({ provinces, locale = 'en' }) => {
  const t = getTranslator(locale)

  return provinces.map((p) => ({
    key: localizedName(p, locale),
    value: CalButton({
      provinceId: p.id,
      text: t('pages.addHolidays.getRegional', { id: p.id }),
      query: 'cd=true',
      eventName: 'page-download-holidays',
      locale,
    }),
    className: summaryTableStylesButtons,
  }))
}

const AddHolidays = ({ data: { provinces, year, locale = 'en' } }) => {
  const t = getTranslator(locale)
  const rich = getRichTranslator(locale)
  const icsBaseUrl = `https://canada-holidays.ca${locale === 'fr' ? '/fr' : ''}/ics`

  return html`
    <${Layout}>
      <${Content} className=${headerStyles}>
        <h1>${t('pages.addHolidays.title')}</h1>
        <p>${t('pages.addHolidays.intro')}</p>

        <div>
          <ul>
            <li>${t('pages.addHolidays.remoteOption')}</li>
            <li>${t('pages.addHolidays.downloadOption')}</li>
          </ul>
        </div>

        <${SummaryTable}
          title=${t('pages.addHolidays.streamTitle')}
          rows=${[
            {
              key: 'Canada',
              value: html`<a href="${icsBaseUrl}">${icsBaseUrl}</a>`,
              className: summaryTableStylesUrls,
            },
            {
              key: 'Alberta',
              value: html`<a href="${icsBaseUrl}/AB">${icsBaseUrl}/AB</a>`,
              className: summaryTableStylesUrls,
            },
            {
              key: 'Ontario',
              value: html`<a href="${icsBaseUrl}/ON">${icsBaseUrl}/ON</a>`,
              className: summaryTableStylesUrls,
            },
            {
              key: 'etc.',
              value: html`${icsBaseUrl}/<code>[regionID]</code>`,
              className: summaryTableStylesUrls,
            },
          ]}
        >
          <h2>${t('pages.addHolidays.remoteTitle')}</h2>

          <p>
            ${t('pages.addHolidays.remoteDescription', {
              year,
              nextYear: year + 1,
              followingYear: year + 2,
            })}
          </p>

          <p
            dangerouslySetInnerHTML=${rich('pages.addHolidays.regionalCodeHelp', {
              codesUrl: 'https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/completing-slips-summaries/financial-slips-summaries/return-investment-income-t5/provincial-territorial-codes.html',
            })}
          />
        <//>

        <h2>${t('pages.addHolidays.downloadTitle')}</h2>

        <p
          class="push-down"
          dangerouslySetInnerHTML=${rich('pages.addHolidays.downloadHelp', {
            importAriaLabel: t('pages.addHolidays.importAriaLabel'),
          })}
        />

        <${SummaryTable}
          title=${t('pages.addHolidays.allTitle')}
          rows=${[
            {
              key: 'Canada',
              value: CalButton({
                text: t('pages.addHolidays.getAll'),
                query: 'cd=true',
                eventName: 'page-download-holidays',
                locale,
              }),
              className: summaryTableStylesButtons,
            },
          ]}
        >
          <h3 dangerouslySetInnerHTML=${rich('pages.addHolidays.allHeading')} />
          <p>${t('pages.addHolidays.allDescription')}</p>
        <//>

        <${SummaryTable}
          title=${t('pages.addHolidays.federalTitle')}
          rows=${[
            {
              key: t('pages.addHolidays.federalRow'),
              value: CalButton({
                text: t('pages.addHolidays.getFederal'),
                federal: true,
                query: 'cd=true',
                eventName: 'page-download-holidays',
                locale,
              }),
              className: summaryTableStylesButtons,
            },
          ]}
        >
          <h3 dangerouslySetInnerHTML=${rich('pages.addHolidays.federalHeading')} />

          <p
            dangerouslySetInnerHTML=${rich('pages.addHolidays.federalDescription', {
              federalUrl: pathFor('federallyRegulated', { locale }),
            })}
          />
        <//>

        <${SummaryTable}
          title=${t('pages.addHolidays.regionalTitle')}
          rows=${createRows({ provinces, locale })}
        >
          <h3 dangerouslySetInnerHTML=${rich('pages.addHolidays.regionalHeading')} />
          <p>${t('pages.addHolidays.regionalDescription')}</p>
        <//>

        <h3
          id="import-holidays"
          dangerouslySetInnerHTML=${rich('pages.addHolidays.importHeading')}
        />

        <p>${t('pages.addHolidays.importDescription')}</p>
        <p>${t('pages.addHolidays.importEasy')}</p>

        <ol>
          <li
            dangerouslySetInnerHTML=${rich('pages.addHolidays.importStep1', {
              year,
              nextYear: year + 1,
            })}
          />
          <li>${t('pages.addHolidays.importStep2')}</li>
          <li>${t('pages.addHolidays.importStep3')}</li>
          <li dangerouslySetInnerHTML=${rich('pages.addHolidays.importStep4')} />
        </ol>

        <br />
        <br />

        <span class="bottom-link">
          <a href="#html" class="up-arrow">${t('pages.addHolidays.backToTop')}</a>
        </span>
      <//>
    <//>
  `
}

module.exports = AddHolidays
