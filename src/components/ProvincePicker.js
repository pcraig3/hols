const { html, getProvinceIdOrFederalString } = require('../utils')
const { css } = require('emotion')
const { ALLOWED_YEARS } = require('../config/vars.config')
const { theme, insideContainer, horizontalPadding, visuallyHidden } = require('../styles')
const Button = require('./Button')

const styles = ({ accent = theme.color.red, focus = theme.color.focus } = {}) => css`
  padding-top: ${theme.space.md};
  padding-bottom: ${theme.space.md};
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
    margin-right: ${theme.space.xs};
    margin-bottom: ${theme.space.xs};

    &:last-of-type{
      display: block;
      @media (${theme.mq.md}) {
        display: inline-block;
      }
    }
  }

  form span {
    font-weight: 500;
    display: inline-block;
    margin-right: ${theme.space.xs};
  }

  select {
    display: inline-block;
    font-size: 1em;
    line-height: 1.33;
    width: auto;
    padding: ${theme.space.xxs};
    padding-right: ${theme.space.lg};
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

  /*
  #region-select {
    width: 9em;
    margin-right: ${theme.space.xs};
  }
  */

  *[data-hidden] {
    display: none;
  }
`

const ProvincePicker = ({ provinceId, federal, year = 2020 }) => {
  const provinceIdOrFederal = getProvinceIdOrFederalString({ provinceId, federal })
  return html`
    <div class=${provinceIdOrFederal ? styles(theme.color[provinceIdOrFederal]) : styles()}>
      <div>
        <form action="/provinces" method="post">
          <div>
            <label for="region-select" class=${visuallyHidden}>View by region</label>

            <select
              name="region"
              id="region-select"
              data-event="true"
              data-action="region-select"
              data-label=${`region-select-${provinceIdOrFederal || 'canada'}`}
            >
              <option value="" selected=${!provinceId && !federal}>Nationwide</option>
              <option value="federal" selected=${!provinceId && federal}>Federal holidays</option>
              <option disabled>──────────</option>
              <option value="AB" selected=${provinceId === 'AB'}>Alberta</option>
              <option value="BC" selected=${provinceId === 'BC'}>British Columbia</option>
              <option value="MB" selected=${provinceId === 'MB'}>Manitoba</option>
              <option value="NB" selected=${provinceId === 'NB'}>New Brunswick</option>
              <option value="NL" selected=${provinceId === 'NL'}>Newfoundland and Labrador</option>
              <option value="NS" selected=${provinceId === 'NS'}>Nova Scotia</option>
              <option value="NT" selected=${provinceId === 'NT'}
                >Northwest <span class=${visuallyHidden}>Territories</span></option
              >
              <option value="NU" selected=${provinceId === 'NU'}>Nunavut</option>
              <option value="ON" selected=${provinceId === 'ON'}>Ontario</option>
              <option value="PE" selected=${provinceId === 'PE'}>Prince Edward Island</option>
              <option value="QC" selected=${provinceId === 'QC'}>Quebec</option>
              <option value="SK" selected=${provinceId === 'SK'}>Saskatchewan</option>
              <option value="YT" selected=${provinceId === 'YT'}>Yukon</option>
            </select>
          </div>

          <div>
            <label for="year-select" class=${visuallyHidden}>View by year</label>
            <span aria-hidden="true">holidays for</span>

            <select
              name="year"
              id="year-select"
              data-event="true"
              data-action="year-select"
              data-label=${`year-select-${provinceIdOrFederal || 'canada'}`}
            >
              ${ALLOWED_YEARS.map((allowedYear) => {
                return html`
                  <option value=${allowedYear} selected=${year === allowedYear}
                    >${allowedYear}</option
                  >
                `
              })}
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
      <script src="/js/picker.js"></script>
    </div>
  `
}

module.exports = ProvincePicker
