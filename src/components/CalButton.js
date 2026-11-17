const Button = require('../components/Button.js')
const { getTranslator } = require('../i18n')
const { theme } = require('../styles')
const { getProvinceIdOrFederalString, html } = require('../utils')

const CalButton = ({
  federal,
  provinceId,
  year,
  text,
  className = '',
  download = false,
  eventName = 'download-holidays',
  query = false,
  locale = 'en',
}) => {
  const provinceIdOrFederal = getProvinceIdOrFederalString({ provinceId, federal })
  const icsPrefix = locale === 'fr' ? '/fr' : ''

  const getDownloadString = ({ provinceIdOrFederal, year }) => {
    return `canada-holidays${provinceIdOrFederal ? `-${provinceIdOrFederal}` : ''}${
      year ? `-${year}` : ''
    }${locale === 'fr' ? '-fr' : ''}.ics`
  }

  const getUrlString = ({ provinceIdOrFederal, year, query }) => {
    return `${icsPrefix}/ics${provinceIdOrFederal ? `/${provinceIdOrFederal}` : ''}${
      year ? `/${year}` : ''
    }${query ? `?${query}` : ''}`
  }

  return html`
    <${Button}
      href=${getUrlString({ provinceIdOrFederal, year, query })}
      download=${download ? getDownloadString({ provinceIdOrFederal, year }) : null}
      color=${provinceIdOrFederal ? theme.color[provinceIdOrFederal] : {}}
      className=${className}
      data-event=${eventName ? 'true' : null}
      data-action=${eventName}
      data-label=${eventName
        ? `${eventName}-${provinceIdOrFederal || 'canada'}${year ? `-${year}` : ''}`
        : null}
      >${text === undefined ? getTranslator(locale)('components.calButton.addToCalendar') : text}<//
    >
  `
}

module.exports = CalButton
