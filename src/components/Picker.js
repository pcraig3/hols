const { html } = require('../utils')
const { css } = require('emotion')
const { theme, insideContainer, horizontalPadding, visuallyHidden } = require('../styles')
const Button = require('./Button')

const styles = css`
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

  label {
    display: block;
    font-weight: 600;
    margin-bottom: ${theme.space.xxs};
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
    border: 2px solid ${theme.color.red};
    border-bottom: none;
    border-radius: 0;
    box-shadow: 0 4px ${theme.color.red};

    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;

    color: ${theme.color.grey};
    background-color: transparent;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239f2f10%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
      linear-gradient(to bottom, white 0%, white 100%);
    background-repeat: no-repeat, repeat;
    background-position: right ${theme.space.xs} top 50%, 0 0;
    background-size: 12px auto, 100%;

    &::-ms-expand {
      display: none;
    }

    &:hover {
      color: ${theme.color.red};
      cursor: pointer;
    }

    &:focus {
      color: ${theme.color.grey};
      cursor: pointer;

      /*
      outline: 3px dashed ${theme.color.focus} !important;
      outline-offset: 8px !important;
      */
    }

    option {
      font-weight: normal;
    }
  }
`

const Picker = () => {
  return html`
    <div class=${styles}>
      <div>
        <form action="/provinces" method="post">
          <label for="region-select">View by region</label>

          <select name="region" id="region-select">
            <option value="CAN">Nationwide</option>
            <option value="AB">Alberta</option>
            <option value="ON">Ontario</option>
            <option value="PE">Prince Edward Island</option>
          </select>

          <${Button} type="submit" style="padding: 6.5px 9px 3.5px 9px; margin-left: 10px;"
            ><span class=${visuallyHidden}>Submit</span>→<//
          >
        </form>
      </div>
    </div>
  `
}

module.exports = Picker
