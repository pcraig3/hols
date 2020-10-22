const { html } = require('../utils')

const ProvinceTitle = ({ provinceName = 'Canada', federal, year }) => {
  return html`
    <h1>
      <div class="h1--lg">${provinceName}</div>
      <div class="h1--md">
        ${federal ? 'Federal ' : ''}<span class="visuallyHidden">statutory</span>${federal
          ? ' h'
          : ' H'}olidays${` in ${year}`}
      </div>
    </h1>
  `
}

module.exports = ProvinceTitle
