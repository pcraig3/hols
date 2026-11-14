const { html, pe2pei } = require('../utils')
const { getTranslator, localizedName } = require('../i18n')

const ObservingProvinces = ({ provinces = [], federal = false, locale = 'en' }) => {
  const t = getTranslator(locale)
  const prefix = locale === 'fr' ? '/fr' : ''
  const label = (key) => t(`components.observingProvinces.${key}`)

  if (provinces.length === 13) {
    return html`<p>${t('pages.province.nationalHoliday')}</p>`
  }
  if (!provinces.length && !federal) return ''

  const many = provinces.length > 1
  const links = provinces.map((province, index) => {
    const name = localizedName(province, locale)
    const separator = index === 0 ? '' : index === provinces.length - 1 && !federal
      ? (provinces.length === 2 && locale === 'en' ? ' and ' : label('listLastSeparator'))
      : label('listMiddleSeparator')
    return html`${separator}<a href=${`${prefix}/provinces/${province.id}`}
      aria-label=${provinces.length > 2 ? name : null}
      >${provinces.length > 2 ? pe2pei(province.id) : name}</a>`
  })

  return html`<p>
    ${label(provinces.length ? (many ? 'observedInMany' : 'observedInOne') : 'observedFederally')}${' '}${links}${federal && html`${provinces.length ? label(many ? 'andFederalMany' : 'andFederalOne') + ' ' : ''}<a href=${`${prefix}/federal`}>${label('federalIndustries')}</a>`}<span class="visuallyHidden">.</span>
  </p>`
}

module.exports = ObservingProvinces
