const html = require('../utils.js')
const Input = require('./Input.js')
const { css } = require('emotion')

const marginBottom = '10px'

const fieldset = css`
  margin: 0;
  padding: 0;
  border: none;

  legend {
    margin-bottom: ${marginBottom};
    font-weight: 700;
  }

  p {
    padding: 0;
    margin: 0;
  }

  .hint {
    color: #595959;
    font-size: 0.9em;
    margin-bottom: ${marginBottom};
  }

  #dateInput > div {
    display: inline-block;
    margin-right: 18px;
  }
`

const dobInputProps = {
  type: 'number',
  pattern: '[0-9]*',
  bold: false,
  style: { width: 59 },
}

const DateOfBirth = ({ dobDay = '', dobMonth = '', dobYear = '' }) =>
  html`
    <fieldset class=${fieldset} aria-describedby="dobHint" role="group">
      <legend>
        <p>Date of Birth</p>
      </legend>

      <p class="hint" id="dobHint">
        For example, “30 12 1990”
      </p>
      <div id="dateInput">
        <div>
          <${Input} ...${dobInputProps} id="dobDay" value=${dobDay}>
            Day
          <//>
        </div>
        <div>
          <${Input} ...${dobInputProps} id="dobMonth" value=${dobMonth}>
            Month
          <//>
        </div>
        <div>
          <${Input}
            ...${dobInputProps}
            id="dobYear"
            value=${dobYear}
            style=${{ width: dobInputProps.style.width * 2 }}
          >
            Year
          <//>
        </div>
      </div>
    </fieldset>
  `

module.exports = DateOfBirth
