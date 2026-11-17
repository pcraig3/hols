const { getTranslator, localizedName } = require('../i18n')
const { html, pe2pei } = require('../utils')

const ObservingProvinces = ({
  provinces = [],
  federal = false,
  locale = 'en',
}) => {
  const t = getTranslator(locale)
  const prefix = locale === 'fr' ? '/fr' : ''

  if (provinces.length === 13) {
    return html`
      <p>${t('components.observingProvinces.nationalHoliday')}</p>
    `
  }

  if (!provinces.length && !federal) return ''

  const many = provinces.length > 1

  const links = provinces.map((province, index) => {
    const name = localizedName(province, locale)

    const separator =
      index === 0
        ? ''
        : index === provinces.length - 1 && !federal
          ? provinces.length === 2
            ? t('components.observingProvinces.listTwoSeparator')
            : t('components.observingProvinces.listLastSeparator')
          : t('components.observingProvinces.listMiddleSeparator')

    return html`
      ${separator}<a
        href=${`${prefix}/provinces/${province.id}`}
        aria-label=${provinces.length > 2 ? name : null}
      >
        ${provinces.length > 2 ? pe2pei(province.id) : name}
      </a>
    `
  })

  const observedText = t(
    provinces.length
      ? many
        ? 'components.observingProvinces.observedInMany'
        : 'components.observingProvinces.observedInOne'
      : 'components.observingProvinces.observedFederally',
  )

  const federalText = provinces.length
    ? t(many ? 'components.observingProvinces.andFederalMany' : 'components.observingProvinces.andFederalOne') : ''

  return html`
    <p>
      ${observedText}${' '}${links}${federal &&
      html`
        ${federalText}${federalText ? ' ' : ''}<a
          href=${`${prefix}/federal`}
        >
          ${t('components.observingProvinces.federalIndustries')}
        </a>
      `}<span class="visuallyHidden">.</span>
    </p>
  `
}

module.exports = ObservingProvinces
