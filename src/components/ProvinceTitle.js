const { html } = require('../utils')

const { getTranslator } = require('../i18n')

const ProvinceTitle = ({ provinceName = 'Canada', federal, year, locale = 'en' }) => {
  const t = getTranslator(locale)
  return html`<h1>
    <span class="h1--lg">${provinceName}</span>
    <span class="h1--md">${t(`components.provinceTitle.${federal ? 'federalTitle' : 'title'}`, { year })}</span>
  </h1>`
}

module.exports = ProvinceTitle
