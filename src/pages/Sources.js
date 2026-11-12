const { html } = require('../utils')
const { css } = require('@emotion/css')
const { theme } = require('../styles')
const { getTranslator, getRichTranslator, localizedName } = require('../i18n')

const Layout = require('../components/Layout.js')
const Content = require('../components/Content.js')
const SummaryTable = require('../components/SummaryTable.js')
const { External } = require('../components/Svg.js')

const summaryTableStyles = css`
  .key a {
    color: ${theme.color.grey};
    font-weight: 600;
  }

  .value a svg {
    fill: ${theme.color.grey};
  }

  @media (${theme.mq.lg}) {
    .key {
      width: 50%;
    }

    .value {
      width: 50%;
      text-align: left;
      padding-right: ${theme.space.xs};
    }
  }
`

const createRows = ({ provinces, locale }) => {
  return provinces.map((p) => {
    return {
      key: html`<a href="/provinces/${p.id}">${localizedName(p, locale)}</a>`,
      value: html`<span class="external-link"
        ><a href="${p.sourceLink}" target="_blank" rel="noopener"
          >${p.sourceEn}<${External} /></a
        ></span
      >`,
      className: summaryTableStyles,
    }
  })
}

const Sources = ({ data: { provinces, federalSource, locale = 'en' } }) => {
  const t = getTranslator(locale)
  const rich = getRichTranslator(locale)

  return html`
    <${Layout}>
      <${Content}>
        <h1>${t('pages.sources.title')}</h1>

        <p>${t('pages.sources.intro')}</p>

        <p
          dangerouslySetInnerHTML=${rich('pages.sources.formatsAside', {
            legislationAnchorUrl: '#legislation',
          })}
        />

        <${SummaryTable}
          title=${t('pages.sources.federalTitle')}
          rows=${[
            {
              key: html`<a href="/federal">${t('pages.sources.federalHolidays')}</a>`,
              value: html`<span class="external-link"
                ><a
                  href="${federalSource.sourceLinkEn}"
                  target="_blank"
                  rel="noopener"
                  >${federalSource.sourceEn}<${External} /></a
                ></span>`,
              className: summaryTableStyles,
            },
          ]}
        >
          <h2>${t('pages.sources.federalTitle')}</h2>
          <p>${t('pages.sources.federalDescription')}</p>
        <//>

        <${SummaryTable}
          title=${t('pages.sources.provincesTitle')}
          rows=${createRows({ provinces, locale })}
        >
          <h2>${t('pages.sources.provincesTitle')}</h2>
          <p>${t('pages.sources.provincesDescription')}</p>
        <//>

        <h2 id="legislation" tabindex="-1">${t('pages.sources.legislationTitle')}</h2>

        <p
          dangerouslySetInnerHTML=${rich('pages.sources.legislationBody', {
            legislationUrl: 'https://github.com/pcraig3/hols#citations',
            legislationLinkTitle: t('pages.sources.legislationLinkTitle'),
          })}
        />

        <br />
        <br />

        <span class="bottom-link">
          <a href="#html" class="up-arrow">${t('pages.sources.backToTop')}</a>
        </span>
      <//>
    <//>
  `
}

module.exports = Sources
