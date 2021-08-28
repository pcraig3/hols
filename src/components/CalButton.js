const { html, getProvinceIdOrFederalString } = require('../utils')
const Button = require('../components/Button.js')
const { theme } = require('../styles')

const CalButton = ({ federal, provinceId, year = 2021, className = '' }) => {
  const provinceIdOrFederal = getProvinceIdOrFederalString({ provinceId, federal })

  return html`
    <${Button}
      href=${`${federal ? '/ics/federal' : provinceId ? `/ics/${provinceId}` : '/ics'}/${year}`}
      download=${provinceIdOrFederal
        ? `canada-holidays-${provinceIdOrFederal}-${year}.ics`
        : `canada-holidays-${year}.ics`}
      color=${provinceIdOrFederal ? theme.color[provinceIdOrFederal] : {}}
      className=${className}
      data-event="true"
      data-action="download-holidays"
      data-label=${`download-holidays-${provinceIdOrFederal || 'canada'}-${year}`}
      >Add to your calendar<//
    >
  `
}

module.exports = CalButton
