const html = require('../utils.js')
const Input = require('./Input.js')

const marginBottom = 10
const inputWidth = 59

const fieldsetStyle = {
  margin: 0,
  padding: 0,
  border: 'none',
}

const legendStyle = {
  marginBottom,
}

const hintStyle = {
  color: '#595959',
  fontSize: '.9em',
  marginBottom,
}

const inputContainerStyle = {
  display: 'inline-block',
  marginRight: 18,
}

const P0 = ({ style, children, ...props }) =>
  html`
    <p style=${{ padding: 0, margin: 0, ...style }} ...${props}>${children}</p>
  `

const DateOfBirth = () =>
  html`
    <fieldset style=${fieldsetStyle} aria-describedby="dob-hint" role="group">
      <legend style=${legendStyle}>
        <${P0} style=${{ fontWeight: 700 }}>Date of Birth<//>
      </legend>
      <${P0} style=${hintStyle} id="dob-hint">
        For example, “30 12 1990”
      <//>
      <div class="date-input" id="date-input">
        <div style=${inputContainerStyle}>
          <${Input}
            id="dob-day"
            type="number"
            pattern="[0-9]*"
            bold=${false}
            style=${{ width: inputWidth }}
          >
            Day
          <//>
        </div>
        <div style=${inputContainerStyle}>
          <${Input}
            id="dob-month"
            type="number"
            pattern="[0-9]*"
            bold=${false}
            style=${{ width: inputWidth }}
          >
            Month
          <//>
        </div>
        <div style=${inputContainerStyle}>
          <${Input}
            id="dob-year"
            type="number"
            pattern="[0-9]*"
            bold=${false}
            style=${{ width: inputWidth * 2 }}
          >
            Year
          <//>
        </div>
      </div>
    </fieldset>
  `

module.exports = DateOfBirth
