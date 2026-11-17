const { css } = require('@emotion/css')

const { getTranslator } = require('../i18n')
const { theme } = require('../styles')
const { html } = require('../utils')

const styles = css`
  font-weight: 700;
  margin-top: -${theme.space.xxl};
  margin-bottom: calc(${theme.space.xl} + ${theme.space.xl});
  padding-bottom: ${theme.space.md};
  text-align: left;
  border-bottom: 2px solid ${theme.color.greyLight};

  @media (${theme.mq.md}) {
    text-align: center;
  }
`

const getLink = ({ provinceId, year, federal, locale }) => {
  const nextYear = year + 1
  const localePrefix = locale === 'fr' ? '/fr' : ''

  if (provinceId) { return `${localePrefix}/provinces/${provinceId}/${nextYear}` }

  if (federal) { return `${localePrefix}/federal/${nextYear}` }

  return `${localePrefix}/${nextYear}`
}

const NextYearLink = ({ provinceName, provinceId, year, federal, locale = 'en' }) => {
  const t = getTranslator(locale)
  const nextYear = year + 1

  return html`
    <div class=${`hidden-print ${styles}`}>
      <a
        href=${getLink({ provinceId, year, federal, locale })}
        class="link__next-year right-arrow"
        data-event="true"
        data-action="next-year-link"
        data-label=${`next-year-${provinceId ? provinceId : federal ? 'federal' : 'canada'}`}
        >${t(`components.nextYearLink.${federal ? 'federal' : 'province'}`, { provinceName, year: nextYear })}</a
      >
    </div>
  `
}

module.exports = NextYearLink
