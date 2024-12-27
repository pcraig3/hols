const { html, getProvinceIdOrFederalString } = require('../utils')
const { css } = require('@emotion/css')
const { ALLOWED_YEARS, PROVINCE_IDS } = require('../config/vars.config')
const { theme, insideContainer, hiddenOnMobile, horizontalPadding } = require('../styles')
const Button = require('./Button')

const styles = ({ accent = theme.color.red, focus = theme.color.focus } = {}) => css`
  padding-top: ${theme.space.md};
  padding-bottom: ${theme.space.xxs};
  border-top: 3px solid ${theme.color.greyLight};
  border-bottom: 3px solid ${theme.color.greyLight};

  @media (${theme.mq.md}) {
    padding-top: ${theme.space.lg};
    padding-bottom: ${theme.space.lg};
  }

  ${horizontalPadding};

  > div {
    ${insideContainer};
  }

  form > div {
    display: inline-block;
    margin-right: ${theme.space.xxs};
    margin-bottom: ${theme.space.xs};

    @media (${theme.mq.md}) {
      margin-right: ${theme.space.xs};
    }

    &:last-of-type {
      display: block;

      @media (${theme.mq.md}) {
        display: inline-block;
      }
    }
  }

  form span {
    font-weight: 500;
    display: inline-block;
    margin-right: ${theme.space.xxs};

    @media (${theme.mq.md}) {
      margin-right: ${theme.space.xs};
    }
  }

  select {
    font-family: inherit;
    display: inline-block;
    font-size: 1em;
    line-height: 1.33;
    width: auto;
    padding: ${theme.space.xxs};
    padding-right: 25px;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0;
    border: 2px solid ${accent};
    border-bottom: none;
    border-radius: 0;
    box-shadow: 0 4px ${accent};

    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;

    color: ${theme.color.grey};
    background-color: transparent;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23${accent.replace(
        /#/g,
        '',
      )}%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, white 0%, white 100%);
    background-repeat: no-repeat, repeat;
    background-position: right ${theme.space.xs} top 50%, 0 0;
    background-size: 12px auto, 100%;

    &::-ms-expand {
      display: none;
    }

    &:hover {
      color: ${accent};
      cursor: pointer;
    }

    &:focus {
      color: ${theme.color.grey};
      cursor: pointer;

      outline: 4px solid ${focus} !important;
      outline-offset: -3px !important;
    }

    option {
      font-weight: normal;
    }
  }

  #region-select {
    width: var(--region-select-width);
  }

  #region-select-width {
    font-weight: 500;
    position: absolute;
    visibility: hidden;
  }

  .js & {
    *[data-display-none='true'] {
      display: none;
    }

    *[data-hidden='true'] {
      visibility: hidden;
    }
  }
`

const getProvinceNameFromId = (provinceId) => {
  switch (provinceId) {
    case 'AB':
      return 'Alberta'
    case 'BC':
      return 'British Columbia'
    case 'MB':
      return 'Manitoba'
    case 'NB':
      return 'New Brunswick'
    case 'NL':
      return 'Newfoundland and Labrador'
    case 'NS':
      return 'Nova Scotia'
    case 'NT':
      return 'Northwest Territories'
    case 'NU':
      return 'Nunavut'
    case 'ON':
      return 'Ontario'
    case 'PE':
      return 'Prince Edward Island'
    case 'QC':
      return 'Quebec'
    case 'SK':
      return 'Saskatchewan'
    case 'YT':
      return 'Yukon'
    default:
      return
  }
}

const ProvincePicker = ({ provinceId, federal, year = 2025 }) => {
  const provinceIdOrFederal = getProvinceIdOrFederalString({ provinceId, federal })
  let regionName = getProvinceNameFromId(provinceId)
  regionName = regionName || (federal ? 'Federal' : 'Nationwide')

  return html`
    <div class=${provinceIdOrFederal ? styles(theme.color[provinceIdOrFederal]) : styles()}>
      <div id="picker-container" data-hidden="true">
        <form action="/provinces" method="post">
          <div>
            <div id="region-select-width" aria-hidden="true">${regionName}</div>

            <label for="region-select" class="visuallyHidden">View by region</label>
            <span class=${hiddenOnMobile} aria-hidden="true">See</span>
            <select
              name="region"
              id="region-select"
              data-event="true"
              data-action="region-select"
              data-label=${`region-select-${provinceIdOrFederal || 'canada'}`}
            >
              <option value="" selected=${!provinceId && !federal}>Nationwide</option>
              <option value="federal" selected=${!provinceId && federal}>Federal</option>
              <option disabled>──────────</option>
              ${PROVINCE_IDS.map(
                (pid) =>
                  html`<option value=${pid} selected=${provinceId === pid}>
                    ${getProvinceNameFromId(pid)}
                  </option>`,
              )}
            </select>
          </div>

          <div>
            <label for="year-select" class="visuallyHidden">View by year</label>
            <span aria-hidden="true">holidays for</span>
            <select
              name="year"
              id="year-select"
              data-event="true"
              data-action="year-select"
              data-label=${`year-select-${provinceIdOrFederal || 'canada'}`}
            >
              ${ALLOWED_YEARS.filter((y) => y >= 2022 && y <= 2029).map(
                (y) => html` <option value=${y} selected=${year === y}>${y}</option> `,
              )}
            </select>
          </div>

          <div>
            <${Button}
              type="submit"
              id="region-select__button"
              className=${'hover-color'}
              style="padding: 6.5px 9px 3.5px 9px; font-weight: 500;"
              color="${provinceIdOrFederal ? theme.color[provinceIdOrFederal] : {}}"
              ><span class="">Submit</span> →<//
            >
          </div>
        </form>
      </div>
    </div>
  `
}

module.exports = ProvincePicker
