const { html, getProvinceIdOrFederalString } = require('../utils')
const Button = require('../components/Button.js')
const { theme } = require('../styles')

const CalButton = ({
  federal,
  provinceId,
  year,
  text = 'Add to your calendar',
  className = '',
  download = false,
  eventName = 'download-holidays',
  query = false,
}) => {
  const provinceIdOrFederal = getProvinceIdOrFederalString({ provinceId, federal })

  const getDownloadString = ({ provinceIdOrFederal, year }) => {
    return `canada-holidays${provinceIdOrFederal ? `-${provinceIdOrFederal}` : ''}${
      year ? `-${year}` : ''
    }.ics`
  }

  const getUrlString = ({ provinceIdOrFederal, year, query }) => {
    return `/ics${provinceIdOrFederal ? `/${provinceIdOrFederal}` : ''}${year ? `/${year}` : ''}${
      query ? `?${query}` : ''
    }`
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
      >${text}<//
    >
  `
}

module.exports = CalButton
