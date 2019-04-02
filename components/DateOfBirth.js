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

const DateOfBirth = ({ dobDay = '', dobMonth = '', dobYear = '' }) =>
  html`
    <fieldset style=${fieldsetStyle} aria-describedby="dobHint" role="group">
      <legend style=${legendStyle}>
        <${P0} style=${{ fontWeight: 700 }}>Date of Birth<//>
      </legend>
      <${P0} style=${hintStyle} id="dobHint">
        For example, “30 12 1990”
      <//>
      <div id="dateInput">
        <div style=${inputContainerStyle}>
          <${Input}
            id="dobDay"
            type="number"
            pattern="[0-9]*"
            bold=${false}
            style=${{ width: inputWidth }}
            value=${dobDay}
          >
            Day
          <//>
        </div>
        <div style=${inputContainerStyle}>
          <${Input}
            id="dobMonth"
            type="number"
            pattern="[0-9]*"
            bold=${false}
            style=${{ width: inputWidth }}
            value=${dobMonth}
          >
            Month
          <//>
        </div>
        <div style=${inputContainerStyle}>
          <${Input}
            id="dobYear"
            type="number"
            pattern="[0-9]*"
            bold=${false}
            style=${{ width: inputWidth * 2 }}
            value=${dobYear}
          >
            Year
          <//>
        </div>
      </div>
    </fieldset>
  `

module.exports = DateOfBirth
